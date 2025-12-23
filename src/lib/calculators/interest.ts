/**
 * Gecikme Faizi Hesaplama
 * 
 * Yasal ve ticari faiz oranlarına göre tarih bazlı hesaplama
 */

import { differenceInDays, parseISO, format } from "date-fns";
import { LEGAL_INTEREST_RATES, COMMERCIAL_INTEREST_RATES } from "../constants";
import type { InterestInput } from "./schemas";

export interface InterestPeriod {
    startDate: string;
    endDate: string;
    days: number;
    rate: number;
    interest: number;
}

export interface InterestResult {
    /** Ana para */
    principal: number;

    /** Toplam faiz */
    totalInterest: number;

    /** Toplam tutar (ana para + faiz) */
    totalAmount: number;

    /** Toplam gün sayısı */
    totalDays: number;

    /** Faiz türü */
    interestType: "legal" | "commercial";

    /** Dönem bazlı ayrıntı */
    periods: InterestPeriod[];

    /** Ağırlıklı ortalama oran */
    weightedAverageRate: number;
}

/**
 * Belirli bir tarih için geçerli faiz oranını bulur
 */
function getInterestRateForDate(
    date: Date,
    rates: { startDate: string; rate: number }[]
): number {
    const sortedRates = [...rates].sort(
        (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );

    for (const rateEntry of sortedRates) {
        if (date >= new Date(rateEntry.startDate)) {
            return rateEntry.rate;
        }
    }

    // Varsayılan oran (en eski kayıt)
    return sortedRates[sortedRates.length - 1]?.rate ?? 9;
}

/**
 * Gecikme faizi hesaplar
 */
export function calculateInterest(input: InterestInput): InterestResult {
    const startDate = parseISO(input.startDate);
    const endDate = input.endDate ? parseISO(input.endDate) : new Date();
    const rates = input.interestType === "commercial"
        ? COMMERCIAL_INTEREST_RATES
        : LEGAL_INTEREST_RATES;

    const periods: InterestPeriod[] = [];
    let totalInterest = 0;
    let currentDate = startDate;
    let totalWeightedRate = 0;
    let totalDays = 0;

    // Tüm oran değişiklik tarihlerini al
    const rateDates = rates
        .map(r => parseISO(r.startDate))
        .filter(d => d > startDate && d < endDate)
        .sort((a, b) => a.getTime() - b.getTime());

    // Bitiş tarihini de ekle
    rateDates.push(endDate);

    for (const periodEnd of rateDates) {
        const days = differenceInDays(periodEnd, currentDate);
        if (days <= 0) continue;

        const rate = getInterestRateForDate(currentDate, rates);
        const dailyRate = rate / 365 / 100;
        const periodInterest = input.principal * dailyRate * days;

        periods.push({
            startDate: format(currentDate, "yyyy-MM-dd"),
            endDate: format(periodEnd, "yyyy-MM-dd"),
            days,
            rate,
            interest: Math.round(periodInterest * 100) / 100,
        });

        totalInterest += periodInterest;
        totalWeightedRate += rate * days;
        totalDays += days;
        currentDate = periodEnd;
    }

    const weightedAverageRate = totalDays > 0 ? totalWeightedRate / totalDays : 0;

    return {
        principal: input.principal,
        totalInterest: Math.round(totalInterest * 100) / 100,
        totalAmount: Math.round((input.principal + totalInterest) * 100) / 100,
        totalDays,
        interestType: input.interestType ?? "legal",
        periods,
        weightedAverageRate: Math.round(weightedAverageRate * 100) / 100,
    };
}
