/**
 * Dava Harçları Hesaplama
 * 
 * 2025 Harçlar Kanunu tarifesine göre nispi ve maktu harç hesabı
 */

import { PROPORTIONAL_FEE_RATE, ADVANCE_FEE_PERCENTAGE, FIXED_FEES_2025, EXPENSE_ADVANCE_2025 } from "../constants";
import type { CourtFeeInput } from "./schemas";

export interface CourtFeeResult {
    /** Dava türü */
    caseType: string;
    caseTypeLabel: string;

    /** Harç türü */
    feeType: "nispi" | "maktu";

    /** Dava değeri (nispi için) */
    caseValue?: number;

    /** Nispi harç hesabı */
    proportionalFee?: {
        totalFee: number;
        advanceFee: number;
        remainingFee: number;
        rate: string;
    };

    /** Maktu harç */
    fixedFee?: number;

    /** Gider avansı */
    expenseAdvance: number;

    /** Toplam ödenecek (peşin) */
    totalAdvancePayment: number;

    /** Toplam harç tutarı */
    totalCourtFee: number;

    /** Hesaplama detayları */
    breakdown: {
        label: string;
        value: number;
        note?: string;
    }[];
}

/** Dava türü etiketleri */
const CASE_TYPE_LABELS: Record<string, string> = {
    bosanma: "Boşanma Davası",
    velayet: "Velayet Davası",
    nafaka: "Nafaka Davası",
    tapuIptali: "Tapu İptali ve Tescil Davası",
    alacak: "Alacak Davası",
    tazminat: "Tazminat Davası",
    iseDavasi: "İşe İade Davası",
    kidemTazminati: "Kıdem Tazminatı Davası",
    tahliye: "Kiracı Tahliye Davası",
    icraInkar: "İcra İnkar Tazminatı Davası",
    mirasPaylaşimi: "Miras Paylaşımı (Ortaklığın Giderilmesi) Davası",
    ortakliginGiderilmesi: "Ortaklığın Giderilmesi Davası",
    other: "Diğer Dava",
};

/** Nispi harç gerektiren dava türleri */
const PROPORTIONAL_FEE_CASES = [
    "tapuIptali",
    "alacak",
    "tazminat",
    "kidemTazminati",
    "icraInkar",
    "mirasPaylaşimi",
    "ortakliginGiderilmesi",
];

/**
 * Dava harçlarını hesaplar
 */
export function calculateCourtFees(input: CourtFeeInput): CourtFeeResult {
    const caseTypeLabel = CASE_TYPE_LABELS[input.caseType] || "Dava";
    const isProportional = PROPORTIONAL_FEE_CASES.includes(input.caseType);

    const breakdown: { label: string; value: number; note?: string }[] = [];

    let proportionalFee: CourtFeeResult["proportionalFee"];
    let fixedFee: number | undefined;
    let totalCourtFee: number;

    if (isProportional && input.caseValue) {
        // Nispi harç hesabı
        const rate = PROPORTIONAL_FEE_RATE / 1000; // Binde'den ondalığa
        const totalFee = input.caseValue * rate;
        const advanceFee = totalFee * (ADVANCE_FEE_PERCENTAGE / 100);
        const remainingFee = totalFee - advanceFee;

        proportionalFee = {
            totalFee: Math.round(totalFee * 100) / 100,
            advanceFee: Math.round(advanceFee * 100) / 100,
            remainingFee: Math.round(remainingFee * 100) / 100,
            rate: `Binde ${PROPORTIONAL_FEE_RATE}`,
        };

        totalCourtFee = totalFee;

        breakdown.push(
            { label: "Dava Değeri", value: input.caseValue },
            { label: `Nispi Harç (Binde ${PROPORTIONAL_FEE_RATE})`, value: totalFee },
            { label: "Peşin Harç (1/4)", value: advanceFee, note: "Dava açılırken ödenir" },
            { label: "Bakiye Harç (3/4)", value: remainingFee, note: "Karar sonrası ödenir" }
        );
    } else {
        // Maktu harç
        fixedFee = FIXED_FEES_2025[input.caseType as keyof typeof FIXED_FEES_2025]
            || FIXED_FEES_2025.default;

        totalCourtFee = fixedFee;

        breakdown.push(
            { label: "Maktu Harç", value: fixedFee, note: "Sabit tutar" }
        );
    }

    // Gider avansı
    const expenseAdvance = EXPENSE_ADVANCE_2025[input.courtType]
        || EXPENSE_ADVANCE_2025.default;

    breakdown.push(
        { label: "Gider Avansı", value: expenseAdvance, note: "Tahmini tebligat ve posta giderleri" }
    );

    // Toplam peşin ödeme
    const advanceCourtFee = proportionalFee
        ? proportionalFee.advanceFee
        : (fixedFee || 0);
    const totalAdvancePayment = advanceCourtFee + expenseAdvance;

    breakdown.push(
        { label: "Toplam Peşin Ödeme", value: totalAdvancePayment, note: "Dava açılışında ödenecek" }
    );

    return {
        caseType: input.caseType,
        caseTypeLabel,
        feeType: isProportional ? "nispi" : "maktu",
        caseValue: input.caseValue,
        proportionalFee,
        fixedFee,
        expenseAdvance,
        totalAdvancePayment: Math.round(totalAdvancePayment * 100) / 100,
        totalCourtFee: Math.round(totalCourtFee * 100) / 100,
        breakdown,
    };
}
