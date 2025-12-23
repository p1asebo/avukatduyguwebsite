/**
 * Vergi Gecikme Faizi ve Yapılandırma Hesaplama
 * 
 * Aylık gecikme zammı oranları ve Yİ-ÜFE bazlı yapılandırma karşılaştırması
 */

import { differenceInMonths, parseISO, format, addMonths } from "date-fns";
import { DELAY_INTEREST_RATES, YIUFE_RATES } from "../constants";
import type { TaxPenaltyInput } from "./schemas";

export interface MonthlyCalculation {
    month: string;
    principal: number;
    rate: number;
    interest: number;
    cumulative: number;
}

export interface TaxPenaltyResult {
    /** Vergi aslı */
    taxPrincipal: number;

    /** Normal gecikme faizi hesabı */
    normalCalculation: {
        totalInterest: number;
        totalAmount: number;
        monthlyBreakdown: MonthlyCalculation[];
    };

    /** Yapılandırma hesabı (Yİ-ÜFE bazlı) */
    restructuringCalculation: {
        yiufeInterest: number;
        totalAmount: number;
        savings: number;
        savingsPercentage: number;
    };

    /** Toplam gecikme süresi (ay) */
    delayMonths: number;

    /** Karşılaştırma özeti */
    comparison: {
        label: string;
        normal: number;
        restructuring: number;
        difference: number;
    }[];

    /** Öneri */
    recommendation: string;
}

/**
 * Belirli bir tarih için gecikme zammı oranını bulur
 */
function getDelayRateForDate(date: Date): number {
    const sortedRates = [...DELAY_INTEREST_RATES].sort(
        (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );

    for (const rateEntry of sortedRates) {
        if (date >= new Date(rateEntry.startDate)) {
            return rateEntry.monthlyRate;
        }
    }

    return sortedRates[sortedRates.length - 1]?.monthlyRate ?? 2.5;
}

/**
 * Yİ-ÜFE oranını hesaplar
 */
function calculateYiufeRate(startMonth: string, endMonth: string): number {
    const startIndex = YIUFE_RATES.find(r => r.month === startMonth)?.index;
    const endIndex = YIUFE_RATES.find(r => r.month === endMonth)?.index;

    if (!startIndex || !endIndex) {
        // Veri yoksa tahmini oran
        return 0.85; // Ortalama yıllık %85 varsayımı
    }

    return (endIndex - startIndex) / startIndex;
}

/**
 * Vergi gecikme faizi ve yapılandırma hesabı
 */
export function calculateTaxPenalty(input: TaxPenaltyInput): TaxPenaltyResult {
    const dueDate = parseISO(input.dueDate);
    const calcDate = input.calculationDate
        ? parseISO(input.calculationDate)
        : new Date();

    const delayMonths = Math.max(0, differenceInMonths(calcDate, dueDate));

    // Normal gecikme faizi hesabı (aylık bileşik)
    const monthlyBreakdown: MonthlyCalculation[] = [];
    let cumulativeInterest = 0;
    let currentDate = dueDate;

    for (let i = 0; i < delayMonths; i++) {
        currentDate = addMonths(dueDate, i);
        const monthlyRate = getDelayRateForDate(currentDate);
        const monthlyInterest = input.taxPrincipal * (monthlyRate / 100);
        cumulativeInterest += monthlyInterest;

        monthlyBreakdown.push({
            month: format(currentDate, "yyyy-MM"),
            principal: input.taxPrincipal,
            rate: monthlyRate,
            interest: Math.round(monthlyInterest * 100) / 100,
            cumulative: Math.round(cumulativeInterest * 100) / 100,
        });
    }

    const normalTotal = input.taxPrincipal + cumulativeInterest;

    // Yapılandırma hesabı (Yİ-ÜFE bazlı)
    const startMonth = format(dueDate, "yyyy-MM");
    const endMonth = format(calcDate, "yyyy-MM");
    const yiufeRate = calculateYiufeRate(startMonth, endMonth);
    const yiufeInterest = input.taxPrincipal * yiufeRate;
    const restructuringTotal = input.taxPrincipal + yiufeInterest;

    const savings = normalTotal - restructuringTotal;
    const savingsPercentage = (savings / normalTotal) * 100;

    // Öneri
    let recommendation: string;
    if (savings > 0) {
        recommendation = `Yapılandırma size ${savings.toLocaleString("tr-TR")} TL (%${savingsPercentage.toFixed(1)}) tasarruf sağlar. Yapılandırmayı değerlendirmenizi öneririz.`;
    } else if (savings < 0) {
        recommendation = `Bu durumda yapılandırma avantajlı değil. Normal ödeme yapmanız daha uygun.`;
    } else {
        recommendation = `Her iki seçenek de aynı tutara denk geliyor.`;
    }

    return {
        taxPrincipal: input.taxPrincipal,
        normalCalculation: {
            totalInterest: Math.round(cumulativeInterest * 100) / 100,
            totalAmount: Math.round(normalTotal * 100) / 100,
            monthlyBreakdown,
        },
        restructuringCalculation: {
            yiufeInterest: Math.round(yiufeInterest * 100) / 100,
            totalAmount: Math.round(restructuringTotal * 100) / 100,
            savings: Math.round(savings * 100) / 100,
            savingsPercentage: Math.round(savingsPercentage * 100) / 100,
        },
        delayMonths,
        comparison: [
            {
                label: "Vergi Aslı",
                normal: input.taxPrincipal,
                restructuring: input.taxPrincipal,
                difference: 0,
            },
            {
                label: "Faiz/Zam",
                normal: Math.round(cumulativeInterest * 100) / 100,
                restructuring: Math.round(yiufeInterest * 100) / 100,
                difference: Math.round((cumulativeInterest - yiufeInterest) * 100) / 100,
            },
            {
                label: "Toplam Ödeme",
                normal: Math.round(normalTotal * 100) / 100,
                restructuring: Math.round(restructuringTotal * 100) / 100,
                difference: Math.round(savings * 100) / 100,
            },
        ],
        recommendation,
    };
}
