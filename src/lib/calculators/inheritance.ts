/**
 * Miras Payı Hesaplama
 * 
 * Türk Medeni Kanunu'na göre yasal mirasçı payları
 */

import { SPOUSE_SHARES, RESERVED_PORTIONS } from "../constants";
import type { InheritanceInput } from "./schemas";

export interface Heir {
    type: "spouse" | "child" | "parent" | "grandparent" | "sibling" | "state";
    label: string;
    share: number;          // Kesirli pay (0-1 arası)
    shareLabel: string;     // Görüntüleme için (örn: "1/4")
    amount: number;         // TL cinsinden
    reservedPortion: number; // Saklı pay tutarı
}

export interface InheritanceResult {
    /** Toplam miras değeri */
    totalEstate: number;

    /** Mirasçı listesi ve payları */
    heirs: Heir[];

    /** Tasarruf edilebilir kısım */
    disposablePortion: number;

    /** Toplam saklı pay */
    totalReservedPortion: number;

    /** Özet açıklama */
    summary: string;
}

/**
 * Kesiri en küçük haline indirir ve string olarak döner
 */
function fractionToString(numerator: number, denominator: number): string {
    const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;
    const divisor = gcd(Math.round(numerator * 1000), Math.round(denominator * 1000));
    const n = Math.round((numerator * 1000) / divisor);
    const d = Math.round((denominator * 1000) / divisor);

    if (n === d) return "Tamamı";
    if (n === 0) return "0";
    return `${n}/${d}`;
}

/**
 * Miras paylarını hesaplar
 */
export function calculateInheritance(input: InheritanceInput): InheritanceResult {
    const heirs: Heir[] = [];
    let remainingShare = 1;
    let totalReservedPortion = 0;

    const {
        totalEstate,
        hasSpouse,
        numberOfChildren,
        hasLivingParents,
        hasLivingGrandparents,
        hasSiblings,
        numberOfSiblings = 0
    } = input;

    // 1. ZÜMRE: Alt soy (çocuklar ve torunlar)
    if (numberOfChildren > 0) {
        // Eş varsa 1/4, çocuklar 3/4'ü eşit paylaşır
        if (hasSpouse) {
            const spouseShare = SPOUSE_SHARES.withChildren;
            const spouseReserved = spouseShare * RESERVED_PORTIONS.spouse;
            heirs.push({
                type: "spouse",
                label: "Sağ Kalan Eş",
                share: spouseShare,
                shareLabel: fractionToString(spouseShare, 1),
                amount: totalEstate * spouseShare,
                reservedPortion: totalEstate * spouseReserved,
            });
            remainingShare -= spouseShare;
            totalReservedPortion += spouseReserved;
        }

        const childShare = remainingShare / numberOfChildren;
        const childReserved = childShare * RESERVED_PORTIONS.descendant;

        for (let i = 0; i < numberOfChildren; i++) {
            heirs.push({
                type: "child",
                label: `${i + 1}. Çocuk`,
                share: childShare,
                shareLabel: fractionToString(childShare, 1),
                amount: totalEstate * childShare,
                reservedPortion: totalEstate * childReserved,
            });
            totalReservedPortion += childReserved;
        }
    }
    // 2. ZÜMRE: Anne-baba ve onların alt soyu
    else if (hasLivingParents) {
        if (hasSpouse) {
            const spouseShare = SPOUSE_SHARES.withParents;
            const spouseReserved = spouseShare * RESERVED_PORTIONS.spouse;
            heirs.push({
                type: "spouse",
                label: "Sağ Kalan Eş",
                share: spouseShare,
                shareLabel: fractionToString(spouseShare, 1),
                amount: totalEstate * spouseShare,
                reservedPortion: totalEstate * spouseReserved,
            });
            remainingShare -= spouseShare;
            totalReservedPortion += spouseReserved;
        }

        // Anne ve baba eşit pay (her biri remaining/2)
        const parentShare = remainingShare / 2;
        const parentReserved = parentShare * RESERVED_PORTIONS.parent;

        heirs.push({
            type: "parent",
            label: "Anne",
            share: parentShare,
            shareLabel: fractionToString(parentShare, 1),
            amount: totalEstate * parentShare,
            reservedPortion: totalEstate * parentReserved,
        });
        heirs.push({
            type: "parent",
            label: "Baba",
            share: parentShare,
            shareLabel: fractionToString(parentShare, 1),
            amount: totalEstate * parentShare,
            reservedPortion: totalEstate * parentReserved,
        });
        totalReservedPortion += parentReserved * 2;
    }
    // 3. ZÜMRE: Büyükanne-büyükbaba
    else if (hasLivingGrandparents) {
        if (hasSpouse) {
            const spouseShare = SPOUSE_SHARES.withGrandparents;
            heirs.push({
                type: "spouse",
                label: "Sağ Kalan Eş",
                share: spouseShare,
                shareLabel: fractionToString(spouseShare, 1),
                amount: totalEstate * spouseShare,
                reservedPortion: 0, // Büyükanne-babalarla birlikte eşin saklı payı yok
            });
            remainingShare -= spouseShare;
        }

        // Büyükanne-babalar eşit pay
        const grandparentShare = remainingShare / 4;
        for (let i = 0; i < 4; i++) {
            heirs.push({
                type: "grandparent",
                label: ["Anne tarafı büyükanne", "Anne tarafı büyükbaba", "Baba tarafı büyükanne", "Baba tarafı büyükbaba"][i],
                share: grandparentShare,
                shareLabel: fractionToString(grandparentShare, 1),
                amount: totalEstate * grandparentShare,
                reservedPortion: 0,
            });
        }
    }
    // Sadece eş kaldıysa
    else if (hasSpouse) {
        heirs.push({
            type: "spouse",
            label: "Sağ Kalan Eş",
            share: SPOUSE_SHARES.alone,
            shareLabel: "Tamamı",
            amount: totalEstate,
            reservedPortion: totalEstate * RESERVED_PORTIONS.spouse,
        });
        totalReservedPortion = RESERVED_PORTIONS.spouse;
    }
    // Hiç mirasçı yoksa devlet
    else {
        heirs.push({
            type: "state",
            label: "Devlet",
            share: 1,
            shareLabel: "Tamamı",
            amount: totalEstate,
            reservedPortion: 0,
        });
    }

    const disposablePortion = totalEstate * (1 - totalReservedPortion);

    // Özet oluştur
    let summary = "";
    if (numberOfChildren > 0) {
        summary = hasSpouse
            ? `Eş 1/4, ${numberOfChildren} çocuk kalan 3/4'ü eşit paylaşır.`
            : `${numberOfChildren} çocuk mirası eşit paylaşır.`;
    } else if (hasLivingParents) {
        summary = hasSpouse
            ? "Eş 1/2, anne ve baba kalan 1/2'yi eşit paylaşır."
            : "Anne ve baba mirası eşit paylaşır.";
    } else if (hasSpouse) {
        summary = "Sağ kalan eş tek mirasçı olarak mirasın tamamını alır.";
    } else {
        summary = "Yasal mirasçı bulunmadığından miras devlete kalır.";
    }

    return {
        totalEstate,
        heirs,
        disposablePortion: Math.round(disposablePortion * 100) / 100,
        totalReservedPortion: Math.round(totalReservedPortion * totalEstate * 100) / 100,
        summary,
    };
}
