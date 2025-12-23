/**
 * Kıdem Tazminatı Hesaplama
 * 
 * 2025 güncel tavan ve vergi hesaplamaları
 */

import { differenceInDays, differenceInYears, differenceInMonths } from "date-fns";
import { SEVERANCE_CEILING_2025, SEVERANCE_DAYS_PER_YEAR } from "../constants";
import type { SeveranceInput } from "./schemas";

export interface SeveranceResult {
    /** Toplam çalışma süresi (yıl, ay, gün) */
    workDuration: {
        years: number;
        months: number;
        days: number;
        totalDays: number;
    };

    /** Brüt kıdem tazminatı */
    grossSeverance: number;

    /** Uygulanan tavan tutarı */
    ceilingApplied: boolean;
    ceilingAmount: number;

    /** Yıllık brüt tazminat (tavan öncesi) */
    yearlyGross: number;

    /** Damga vergisi (%0.759) */
    stampTax: number;

    /** Net kıdem tazminatı */
    netSeverance: number;

    /** Hesaplama detayları */
    breakdown: {
        label: string;
        value: number;
    }[];
}

/**
 * Kıdem tazminatı hesaplar
 */
export function calculateSeverance(input: SeveranceInput): SeveranceResult {
    const startDate = new Date(input.startDate);
    const endDate = new Date(input.endDate);

    // Çalışma süresi hesaplama
    const totalDays = differenceInDays(endDate, startDate);
    const years = differenceInYears(endDate, startDate);
    const monthsAfterYears = differenceInMonths(endDate, startDate) % 12;
    const daysAfterMonths = differenceInDays(
        endDate,
        new Date(startDate.getTime() + (years * 365 + monthsAfterYears * 30) * 24 * 60 * 60 * 1000)
    );

    // Yıllık brüt tazminat (30 günlük brüt maaş)
    const dailySalary = input.grossSalary / SEVERANCE_DAYS_PER_YEAR;
    const yearlyGross = dailySalary * SEVERANCE_DAYS_PER_YEAR;

    // Tavana göre düzeltme
    const effectiveYearlyGross = Math.min(yearlyGross, SEVERANCE_CEILING_2025);
    const ceilingApplied = yearlyGross > SEVERANCE_CEILING_2025;

    // Toplam brüt tazminat (gün bazında oransal)
    const totalYears = totalDays / 365;
    const grossSeverance = effectiveYearlyGross * totalYears;

    // Damga vergisi (%0.759)
    const stampTaxRate = 0.00759;
    const stampTax = grossSeverance * stampTaxRate;

    // Net tazminat
    const netSeverance = grossSeverance - stampTax;

    return {
        workDuration: {
            years,
            months: monthsAfterYears,
            days: Math.max(0, daysAfterMonths),
            totalDays,
        },
        grossSeverance: Math.round(grossSeverance * 100) / 100,
        ceilingApplied,
        ceilingAmount: SEVERANCE_CEILING_2025,
        yearlyGross: Math.round(yearlyGross * 100) / 100,
        stampTax: Math.round(stampTax * 100) / 100,
        netSeverance: Math.round(netSeverance * 100) / 100,
        breakdown: [
            { label: "Brüt Aylık Maaş", value: input.grossSalary },
            { label: "Günlük Ücret", value: Math.round(dailySalary * 100) / 100 },
            { label: "Yıllık Kıdem Tutarı", value: Math.round(effectiveYearlyGross * 100) / 100 },
            { label: "Toplam Çalışma (Yıl)", value: Math.round(totalYears * 100) / 100 },
            { label: "Brüt Kıdem Tazminatı", value: Math.round(grossSeverance * 100) / 100 },
            { label: "Damga Vergisi (%0.759)", value: Math.round(stampTax * 100) / 100 },
            { label: "Net Kıdem Tazminatı", value: Math.round(netSeverance * 100) / 100 },
        ],
    };
}
