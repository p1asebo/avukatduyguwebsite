/**
 * Zod Validation Schemas for Legal Calculators
 * 
 * Strict input validation to prevent invalid data
 */

import { z } from "zod";

// ============================================
// ORTAK ŞEMALAR
// ============================================

/** Pozitif sayı şeması */
export const positiveNumber = z.number()
    .positive("Değer pozitif olmalıdır")
    .finite("Geçersiz sayı");

/** Pozitif veya sıfır sayı şeması */
export const nonNegativeNumber = z.number()
    .nonnegative("Değer negatif olamaz")
    .finite("Geçersiz sayı");

/** Para birimi şeması (kuruş hassasiyeti) */
export const currencyAmount = z.number()
    .nonnegative("Tutar negatif olamaz")
    .multipleOf(0.01, "Tutar en fazla 2 ondalık basamak içerebilir")
    .max(1_000_000_000, "Tutar çok yüksek");

/** Geçmiş tarih şeması (bugün veya öncesi) */
export const pastDate = z.date()
    .max(new Date(), "Tarih gelecekte olamaz");

/** Gelecek tarih şeması (bugün veya sonrası) */
export const futureDate = z.date()
    .min(new Date(new Date().setHours(0, 0, 0, 0)), "Tarih geçmişte olamaz");

/** Tarih string şeması (YYYY-MM-DD formatı) */
export const dateString = z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Tarih YYYY-MM-DD formatında olmalıdır")
    .refine((date) => !isNaN(Date.parse(date)), "Geçersiz tarih");

// ============================================
// KIDEM TAZMİNATI
// ============================================

export const severanceInputSchema = z.object({
    startDate: dateString.refine(
        (date) => new Date(date) <= new Date(),
        "İşe giriş tarihi gelecekte olamaz"
    ),
    endDate: dateString.refine(
        (date) => new Date(date) <= new Date(),
        "İşten çıkış tarihi gelecekte olamaz"
    ),
    grossSalary: currencyAmount.min(1, "Maaş girilmelidir"),
}).refine(
    (data) => new Date(data.startDate) < new Date(data.endDate),
    {
        message: "İşe giriş tarihi, çıkış tarihinden önce olmalıdır",
        path: ["startDate"],
    }
);

export type SeveranceInput = z.infer<typeof severanceInputSchema>;

// ============================================
// MİRAS PAYI
// ============================================

export const inheritanceInputSchema = z.object({
    totalEstate: currencyAmount.min(1, "Miras değeri girilmelidir"),
    hasSpouse: z.boolean(),
    numberOfChildren: z.number().int().nonnegative("Çocuk sayısı negatif olamaz"),
    hasLivingParents: z.boolean(),
    hasLivingGrandparents: z.boolean(),
    hasSiblings: z.boolean(),
    numberOfSiblings: z.number().int().nonnegative().optional(),
});

export type InheritanceInput = z.infer<typeof inheritanceInputSchema>;

// ============================================
// GECİKME FAİZİ
// ============================================

export const interestInputSchema = z.object({
    principal: currencyAmount.min(1, "Ana para girilmelidir"),
    startDate: dateString,
    endDate: dateString.optional(), // Varsayılan: bugün
    interestType: z.enum(["legal", "commercial"]).default("legal"),
}).refine(
    (data) => {
        const end = data.endDate ? new Date(data.endDate) : new Date();
        return new Date(data.startDate) < end;
    },
    {
        message: "Başlangıç tarihi bitiş tarihinden önce olmalıdır",
        path: ["startDate"],
    }
);

export type InterestInput = z.infer<typeof interestInputSchema>;

// ============================================
// İNFAZ (YATAR) HESAPLAMA
// ============================================

export const crimeType = z.enum([
    "standard",       // Standart suçlar
    "terrorism",      // Terör suçları
    "sexualCrime",    // Cinsel suçlar
    "organizedCrime", // Örgütlü suçlar
    "aggravatedLife", // Ağırlaştırılmış müebbet
    "life",           // Müebbet hapis
]);

export const executionInputSchema = z.object({
    crimeDate: dateString.refine(
        (date) => new Date(date) <= new Date(),
        "Suç tarihi gelecekte olamaz"
    ),
    crimeType: crimeType,
    sentenceYears: z.number().int().nonnegative().max(100, "Ceza süresi çok yüksek"),
    sentenceMonths: z.number().int().min(0).max(11),
    sentenceDays: z.number().int().min(0).max(30),
    isRecidivist: z.boolean().default(false), // Tekerrür
    isMinor: z.boolean().default(false),      // Yaş küçüklüğü
    detentionDays: z.number().int().nonnegative().default(0), // Tutukluluk süresi
});

export type ExecutionInput = z.infer<typeof executionInputSchema>;

// ============================================
// MAL REJİMİ
// ============================================

const assetSchema = z.object({
    name: z.string().min(1, "Mal adı girilmelidir"),
    value: currencyAmount,
    acquisitionDate: dateString.optional(),
});

export const propertyRegimeInputSchema = z.object({
    marriageDate: dateString,
    separationDate: dateString.optional(), // Varsayılan: bugün

    // Eş 1 (Talep eden)
    spouse1PersonalAssets: z.array(assetSchema).default([]),
    spouse1AcquiredAssets: z.array(assetSchema).default([]),
    spouse1Debts: currencyAmount.default(0),

    // Eş 2 (Karşı taraf)
    spouse2PersonalAssets: z.array(assetSchema).default([]),
    spouse2AcquiredAssets: z.array(assetSchema).default([]),
    spouse2Debts: currencyAmount.default(0),
}).refine(
    (data) => {
        const separation = data.separationDate ? new Date(data.separationDate) : new Date();
        return new Date(data.marriageDate) < separation;
    },
    {
        message: "Evlilik tarihi ayrılık tarihinden önce olmalıdır",
        path: ["marriageDate"],
    }
);

export type PropertyRegimeInput = z.infer<typeof propertyRegimeInputSchema>;

// ============================================
// VERGİ CEZASI VE GECİKME FAİZİ
// ============================================

export const taxPenaltyInputSchema = z.object({
    taxPrincipal: currencyAmount.min(1, "Vergi aslı girilmelidir"),
    dueDate: dateString,
    calculationDate: dateString.optional(), // Varsayılan: bugün
    includeRestructuring: z.boolean().default(true),
});

export type TaxPenaltyInput = z.infer<typeof taxPenaltyInputSchema>;

// ============================================
// DAVA HARÇLARI
// ============================================

export const caseType = z.enum([
    "bosanma",           // Boşanma davası
    "velayet",           // Velayet davası
    "nafaka",            // Nafaka davası
    "tapuIptali",        // Tapu iptal davası
    "alacak",            // Alacak davası
    "tazminat",          // Tazminat davası
    "iseDavasi",         // İşe iade davası
    "kidemTazminati",    // Kıdem tazminatı davası
    "tahliye",           // Kiracı tahliye davası
    "icraInkar",         // İcra inkar tazminatı
    "mirasPaylaşimi",    // Miras paylaşımı
    "ortakliginGiderilmesi", // Ortaklığın giderilmesi
    "other",             // Diğer
]);

export const courtFeeInputSchema = z.object({
    caseType: caseType,
    caseValue: currencyAmount.optional(), // Nispi harç için zorunlu
    courtType: z.enum([
        "asliHukuk",
        "asliyeCeza",
        "isMahkemesi",
        "icraMahkemesi",
        "aileMahkemesi",
    ]).default("asliHukuk"),
});

export type CourtFeeInput = z.infer<typeof courtFeeInputSchema>;

// ============================================
// HATA MESAJLARI
// ============================================

/** Zod hata mesajlarını Türkçe'ye çevirir */
export function formatZodError(error: z.ZodError<unknown>): string[] {
    return error.issues.map((issue) => {
        const path = issue.path.join(".");
        return path ? `${path}: ${issue.message}` : issue.message;
    });
}

