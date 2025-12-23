/**
 * İnfaz (Yatar) Hesaplama
 * 
 * TCK ve İnfaz Kanunu kurallarına göre koşullu salıverilme hesabı
 * 
 * ⚠️ UYARI: Bu hesaplama tahminidir. Gerçek infaz süreleri mahkeme kararına,
 * iyi hal indirimlerine ve mevzuat değişikliklerine göre farklılık gösterebilir.
 */

import { addDays, addMonths, addYears, differenceInDays, parseISO, format } from "date-fns";
import { CONDITIONAL_RELEASE_RATES, SUPERVISED_RELEASE, RECIDIVISM_ADDITION } from "../constants";
import type { ExecutionInput } from "./schemas";

export interface ExecutionResult {
    /** Toplam ceza süresi (gün) */
    totalSentenceDays: number;

    /** Koşullu salıverilme oranı */
    conditionalReleaseRate: number;

    /** Yatılması gereken süre (gün) */
    requiredDays: number;

    /** Tutukluluk mahsubu sonrası kalan (gün) */
    remainingAfterDetention: number;

    /** Denetimli serbestlik süresi (gün) */
    supervisedReleaseDays: number;

    /** Net yatar süresi (gün) */
    netPrisonDays: number;

    /** Tahmini koşullu salıverilme tarihi */
    estimatedReleaseDate: string;

    /** Tahmini cezaevi çıkış tarihi (denetimli serbestlik başlangıcı) */
    estimatedPrisonExitDate: string;

    /** Hesaplama detayları */
    breakdown: {
        label: string;
        value: string;
    }[];

    /** Uygulanan kurallar */
    appliedRules: string[];
}

/**
 * Ceza süresini gün olarak hesaplar
 */
function calculateTotalDays(years: number, months: number, days: number): number {
    // Her yıl 365 gün, her ay 30 gün
    return (years * 365) + (months * 30) + days;
}

/**
 * Günü yıl/ay/gün formatına çevirir
 */
function daysToYMD(totalDays: number): string {
    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const days = totalDays % 30;

    const parts = [];
    if (years > 0) parts.push(`${years} yıl`);
    if (months > 0) parts.push(`${months} ay`);
    if (days > 0) parts.push(`${days} gün`);

    return parts.length > 0 ? parts.join(" ") : "0 gün";
}

/**
 * İnfaz süresini hesaplar
 */
export function calculateExecution(input: ExecutionInput): ExecutionResult {
    const appliedRules: string[] = [];
    const crimeDate = parseISO(input.crimeDate);

    // Toplam ceza süresi
    let totalDays = calculateTotalDays(
        input.sentenceYears,
        input.sentenceMonths,
        input.sentenceDays
    );

    // Müebbet ve ağırlaştırılmış müebbet için özel hesaplama
    let isLifeSentence = false;
    if (input.crimeType === "aggravatedLife") {
        totalDays = CONDITIONAL_RELEASE_RATES.aggravatedLife * 365;
        isLifeSentence = true;
        appliedRules.push("Ağırlaştırılmış müebbet hapis: 30 yıl sonra koşullu salıverilme");
    } else if (input.crimeType === "life") {
        totalDays = CONDITIONAL_RELEASE_RATES.life * 365;
        isLifeSentence = true;
        appliedRules.push("Müebbet hapis: 24 yıl sonra koşullu salıverilme");
    }

    // Koşullu salıverilme oranı
    let releaseRate: number = CONDITIONAL_RELEASE_RATES.standard;

    switch (input.crimeType) {
        case "terrorism":
            releaseRate = CONDITIONAL_RELEASE_RATES.terrorism;
            appliedRules.push("Terör suçu: 3/4 oranı uygulandı");
            break;
        case "sexualCrime":
            releaseRate = CONDITIONAL_RELEASE_RATES.sexualCrime;
            appliedRules.push("Cinsel suç: 3/4 oranı uygulandı");
            break;
        case "organizedCrime":
            releaseRate = CONDITIONAL_RELEASE_RATES.organizedCrime;
            appliedRules.push("Örgütlü suç: 3/4 oranı uygulandı");
            break;
        case "standard":
            appliedRules.push("Standart suç: 1/2 oranı uygulandı");
            break;
    }

    // Tekerrür durumu
    if (input.isRecidivist) {
        releaseRate += RECIDIVISM_ADDITION;
        appliedRules.push(`Tekerrür: Orana 1/8 eklendi (Yeni oran: ${Math.round(releaseRate * 100)}%)`);
    }

    // Yaş küçüklüğü (18 yaş altı suç tarihi)
    if (input.isMinor) {
        releaseRate = Math.max(releaseRate * 0.8, 0.4); // En az %40
        appliedRules.push("Yaş küçüklüğü: Oran %20 azaltıldı");
    }

    // Müebbet cezalarda oran uygulanmaz
    let requiredDays: number;
    if (isLifeSentence) {
        requiredDays = totalDays;
    } else {
        requiredDays = Math.ceil(totalDays * releaseRate);
    }

    // Tutukluluk mahsubu
    const remainingAfterDetention = Math.max(0, requiredDays - input.detentionDays);
    if (input.detentionDays > 0) {
        appliedRules.push(`Tutukluluk mahsubu: ${input.detentionDays} gün düşüldü`);
    }

    // Denetimli serbestlik (son 1-3 yıl)
    // Kalan sürenin 1/2'si kadar, en fazla 3 yıl
    let supervisedDays = Math.min(
        Math.floor(remainingAfterDetention * 0.5),
        SUPERVISED_RELEASE.maxYears * 365
    );
    // En az 1 ay
    supervisedDays = Math.max(supervisedDays, SUPERVISED_RELEASE.minMonths * 30);

    // 1 yıldan az cezalarda denetimli serbestlik uygulanmaz
    if (totalDays < 365) {
        supervisedDays = 0;
        appliedRules.push("1 yıldan az ceza: Denetimli serbestlik uygulanmaz");
    } else {
        appliedRules.push(`Denetimli serbestlik: ${daysToYMD(supervisedDays)}`);
    }

    // Net yatar süresi
    const netPrisonDays = Math.max(0, remainingAfterDetention - supervisedDays);

    // Tahmini tarihler (suç tarihinden itibaren)
    const estimatedPrisonExitDate = addDays(crimeDate, netPrisonDays);
    const estimatedReleaseDate = addDays(crimeDate, remainingAfterDetention);

    return {
        totalSentenceDays: totalDays,
        conditionalReleaseRate: Math.round(releaseRate * 100) / 100,
        requiredDays,
        remainingAfterDetention,
        supervisedReleaseDays: supervisedDays,
        netPrisonDays,
        estimatedReleaseDate: format(estimatedReleaseDate, "yyyy-MM-dd"),
        estimatedPrisonExitDate: format(estimatedPrisonExitDate, "yyyy-MM-dd"),
        breakdown: [
            { label: "Toplam Ceza Süresi", value: daysToYMD(totalDays) },
            { label: "Koşullu Salıverilme Oranı", value: `%${Math.round(releaseRate * 100)}` },
            { label: "İnfaz Edilecek Süre", value: daysToYMD(requiredDays) },
            { label: "Tutukluluk Mahsubu", value: `${input.detentionDays} gün` },
            { label: "Kalan Süre", value: daysToYMD(remainingAfterDetention) },
            { label: "Denetimli Serbestlik", value: daysToYMD(supervisedDays) },
            { label: "Net Yatar Süre", value: daysToYMD(netPrisonDays) },
            { label: "Tahmini Cezaevinden Çıkış", value: format(estimatedPrisonExitDate, "dd.MM.yyyy") },
            { label: "Tahmini Koşullu Salıverilme", value: format(estimatedReleaseDate, "dd.MM.yyyy") },
        ],
        appliedRules,
    };
}
