/**
 * Mal Rejimi (Edinilmiş Mallara Katılma) Hesaplama
 * 
 * Türk Medeni Kanunu 218-241. maddelere göre katılma alacağı simülasyonu
 * 
 * ⚠️ UYARI: Bu simülasyon tahminidir. Gerçek mal paylaşımı birçok
 * değişkene bağlıdır ve mahkeme kararıyla belirlenir.
 */

import { PARTICIPATION_CLAIM_RATE } from "../constants";
import type { PropertyRegimeInput } from "./schemas";

export interface PropertySummary {
    personalAssetTotal: number;
    acquiredAssetTotal: number;
    debts: number;
    netAcquiredAssets: number;
}

export interface PropertyRegimeResult {
    /** Eş 1 mal özeti */
    spouse1Summary: PropertySummary;

    /** Eş 2 mal özeti */
    spouse2Summary: PropertySummary;

    /** Eş 1'in artık değeri */
    spouse1SurplusValue: number;

    /** Eş 2'nin artık değeri */
    spouse2SurplusValue: number;

    /** Katılma alacağı (pozitif: Eş 1'e, negatif: Eş 2'ye ödenir) */
    participationClaim: number;

    /** Alacaklı taraf */
    creditor: "spouse1" | "spouse2" | "equal";

    /** Ödenecek tutar */
    amountToPay: number;

    /** Açıklama */
    explanation: string;

    /** Detaylı hesaplama */
    breakdown: {
        label: string;
        spouse1: number;
        spouse2: number;
    }[];
}

/**
 * Bir eşin mal özetini hesaplar
 */
function calculatePropertySummary(
    personalAssets: { value: number }[],
    acquiredAssets: { value: number }[],
    debts: number
): PropertySummary {
    const personalAssetTotal = personalAssets.reduce((sum, a) => sum + a.value, 0);
    const acquiredAssetTotal = acquiredAssets.reduce((sum, a) => sum + a.value, 0);

    // Net edinilmiş mal = Edinilmiş mallar - Borçlar (negatif olamaz)
    const netAcquiredAssets = Math.max(0, acquiredAssetTotal - debts);

    return {
        personalAssetTotal,
        acquiredAssetTotal,
        debts,
        netAcquiredAssets,
    };
}

/**
 * Mal rejimi hesaplaması yapar
 */
export function calculatePropertyRegime(input: PropertyRegimeInput): PropertyRegimeResult {
    // Eş 1 özeti
    const spouse1Summary = calculatePropertySummary(
        input.spouse1PersonalAssets,
        input.spouse1AcquiredAssets,
        input.spouse1Debts
    );

    // Eş 2 özeti
    const spouse2Summary = calculatePropertySummary(
        input.spouse2PersonalAssets,
        input.spouse2AcquiredAssets,
        input.spouse2Debts
    );

    // Artık değer = Net edinilmiş mallar
    const spouse1SurplusValue = spouse1Summary.netAcquiredAssets;
    const spouse2SurplusValue = spouse2Summary.netAcquiredAssets;

    // Artık değer farkının yarısı = Katılma alacağı
    // Düşük artık değere sahip olan, farkın yarısını alacaklıdır
    const difference = spouse2SurplusValue - spouse1SurplusValue;
    const participationClaim = difference * PARTICIPATION_CLAIM_RATE;

    let creditor: "spouse1" | "spouse2" | "equal";
    let amountToPay: number;
    let explanation: string;

    if (participationClaim > 0) {
        creditor = "spouse1";
        amountToPay = participationClaim;
        explanation = `Eş 2'nin artık değeri daha yüksek olduğundan, Eş 1'e ${amountToPay.toLocaleString("tr-TR")} TL katılma alacağı ödenmesi gerekir.`;
    } else if (participationClaim < 0) {
        creditor = "spouse2";
        amountToPay = Math.abs(participationClaim);
        explanation = `Eş 1'in artık değeri daha yüksek olduğundan, Eş 2'ye ${amountToPay.toLocaleString("tr-TR")} TL katılma alacağı ödenmesi gerekir.`;
    } else {
        creditor = "equal";
        amountToPay = 0;
        explanation = "Her iki eşin artık değeri eşit olduğundan, karşılıklı alacak bulunmamaktadır.";
    }

    return {
        spouse1Summary,
        spouse2Summary,
        spouse1SurplusValue,
        spouse2SurplusValue,
        participationClaim,
        creditor,
        amountToPay: Math.round(amountToPay * 100) / 100,
        explanation,
        breakdown: [
            {
                label: "Kişisel Mallar Toplamı",
                spouse1: spouse1Summary.personalAssetTotal,
                spouse2: spouse2Summary.personalAssetTotal,
            },
            {
                label: "Edinilmiş Mallar Toplamı",
                spouse1: spouse1Summary.acquiredAssetTotal,
                spouse2: spouse2Summary.acquiredAssetTotal,
            },
            {
                label: "Borçlar",
                spouse1: spouse1Summary.debts,
                spouse2: spouse2Summary.debts,
            },
            {
                label: "Net Edinilmiş Mallar",
                spouse1: spouse1Summary.netAcquiredAssets,
                spouse2: spouse2Summary.netAcquiredAssets,
            },
            {
                label: "Artık Değer",
                spouse1: spouse1SurplusValue,
                spouse2: spouse2SurplusValue,
            },
        ],
    };
}
