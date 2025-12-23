/**
 * Legal Constants - 2025 Values
 * 
 * Bu dosya tüm yasal hesaplamalar için merkezi değerleri içerir.
 * Yıllık güncellemeler için sadece bu dosyayı düzenlemeniz yeterlidir.
 * 
 * Son Güncelleme: Ocak 2025
 */

// ============================================
// KIDEM TAZMİNATI
// ============================================

/** Kıdem tazminatı tavan tutarı (6 aylık dönemler için güncellenir) */
export const SEVERANCE_CEILING_2025 = 35058.58; // TL (Ocak 2025)

/** Kıdem tazminatı yıllık gün sayısı */
export const SEVERANCE_DAYS_PER_YEAR = 30;

// ============================================
// YASAL FAİZ ORANLARI (Yıllık %)
// ============================================

/** Yasal faiz oranları geçmişi (tarih bazlı) */
export const LEGAL_INTEREST_RATES: { startDate: string; rate: number }[] = [
    { startDate: "2024-07-01", rate: 24 },
    { startDate: "2024-01-01", rate: 24 },
    { startDate: "2023-07-01", rate: 24 },
    { startDate: "2023-01-01", rate: 24 },
    { startDate: "2022-07-01", rate: 18 },
    { startDate: "2022-01-01", rate: 18 },
    { startDate: "2021-01-01", rate: 9 },
    { startDate: "2020-01-01", rate: 9 },
    { startDate: "2019-01-01", rate: 9 },
    // Daha eski oranlar eklenebilir
];

/** Ticari temerrüt faizi oranları */
export const COMMERCIAL_INTEREST_RATES: { startDate: string; rate: number }[] = [
    { startDate: "2024-07-01", rate: 54 },
    { startDate: "2024-01-01", rate: 48 },
    { startDate: "2023-07-01", rate: 36 },
    { startDate: "2023-01-01", rate: 24 },
];

// ============================================
// GECİKME ZAMMI ORANLARI (Vergi için aylık %)
// ============================================

export const DELAY_INTEREST_RATES: { startDate: string; monthlyRate: number }[] = [
    { startDate: "2024-07-01", monthlyRate: 4.5 },
    { startDate: "2024-01-01", monthlyRate: 4.5 },
    { startDate: "2023-07-01", monthlyRate: 3.5 },
    { startDate: "2023-01-01", monthlyRate: 2.5 },
    { startDate: "2022-07-01", monthlyRate: 2.5 },
    { startDate: "2022-01-01", monthlyRate: 1.6 },
];

// ============================================
// DAVA HARÇLARI 2025
// ============================================

/** Nispi harç oranı (binde) */
export const PROPORTIONAL_FEE_RATE = 68.31; // Binde 68.31

/** Peşin harç oranı (nispi harcın yüzdesi) */
export const ADVANCE_FEE_PERCENTAGE = 25; // %25 (1/4)

/** Maktu harç tutarları (TL) */
export const FIXED_FEES_2025 = {
    bosanma: 1197.90,
    velayet: 1197.90,
    nafaka: 1197.90,
    iseDavas: 1197.90,
    tahliye: 1197.90,
    icraInkar: 1197.90,
    default: 1197.90,
} as const;

/** Gider avansı tarifesi (TL) */
export const EXPENSE_ADVANCE_2025 = {
    asliHukuk: 850,
    asliyeCeza: 650,
    isMahkemesi: 750,
    icraMahkemesi: 450,
    aileMahkemesi: 950,
    default: 850,
} as const;

// ============================================
// MİRAS PAYI ORANLARI
// ============================================

/** Eş ile birlikte mirasçılık durumunda eşin payı */
export const SPOUSE_SHARES = {
    withChildren: 0.25,      // Çocuklarla birlikte: 1/4
    withParents: 0.50,       // Anne-babayla birlikte: 1/2
    withGrandparents: 0.75,  // Büyükanne-babolarla: 3/4
    alone: 1.0,              // Tek başına: Tamamı
} as const;

/** Saklı pay oranları */
export const RESERVED_PORTIONS = {
    descendant: 0.50,  // Alt soy: Yasal payın yarısı
    parent: 0.25,      // Anne-baba: Yasal payın 1/4'ü
    spouse: 0.50,      // Eş: Yasal payın yarısı
} as const;

// ============================================
// İNFAZ ORANLARI (Koşullu Salıverilme)
// ============================================

/** Koşullu salıverilme oranları */
export const CONDITIONAL_RELEASE_RATES = {
    standard: 0.50,          // Standart suçlar: 1/2
    terrorism: 0.75,         // Terör suçları: 3/4
    sexualCrime: 0.75,       // Cinsel suçlar: 3/4
    organizedCrime: 0.75,    // Örgütlü suçlar: 3/4
    aggravatedLife: 30,      // Ağırlaştırılmış müebbet: 30 yıl
    life: 24,                // Müebbet: 24 yıl
} as const;

/** Denetimli serbestlik süreleri (yıl) */
export const SUPERVISED_RELEASE = {
    maxYears: 3,
    minMonths: 1,
} as const;

/** Tekerrür durumunda ek oran */
export const RECIDIVISM_ADDITION = 0.125; // 1/8 ek süre

// ============================================
// MAL REJİMİ
// ============================================

/** Edinilmiş mallara katılma alacağı oranı */
export const PARTICIPATION_CLAIM_RATE = 0.50; // %50

// ============================================
// YİÜFE ENDEKSLERİ (Yapılandırma hesabı için)
// ============================================

export const YIUFE_RATES: { month: string; index: number }[] = [
    { month: "2024-12", index: 2834.56 },
    { month: "2024-11", index: 2789.23 },
    { month: "2024-10", index: 2756.89 },
    { month: "2024-09", index: 2701.45 },
    { month: "2024-08", index: 2678.12 },
    { month: "2024-07", index: 2623.78 },
    { month: "2024-06", index: 2589.34 },
    { month: "2024-05", index: 2534.67 },
    { month: "2024-04", index: 2489.23 },
    { month: "2024-03", index: 2445.89 },
    { month: "2024-02", index: 2398.56 },
    { month: "2024-01", index: 2356.12 },
    // Daha eski endeksler eklenebilir
];

// ============================================
// GENEL AYARLAR
// ============================================

/** Hesaplama sonuçlarında gösterilecek uyarı metinleri */
export const DISCLAIMERS = {
    general: "Bu hesaplama bilgilendirme amaçlıdır ve kesin hukuki sonuç teşkil etmez. Resmi işlemler için mutlaka profesyonel danışmanlık alınız.",
    execution: "⚠️ TAHMİNİ SİMÜLASYONDUR: Bu hesaplama yalnızca fikir vermek amaçlıdır. Gerçek infaz süreleri mahkeme kararına, iyi hal indirimlerine ve mevzuat değişikliklerine göre farklılık gösterebilir.",
    propertyRegime: "⚠️ TAHMİNİ SİMÜLASYONDUR: Mal rejimi hesaplamaları birçok değişkene bağlıdır. Kesin sonuç için avukat danışmanlığı gereklidir.",
    tax: "Bu hesaplamalar güncel mevzuata göre yapılmıştır. Vergi idaresinin resmi hesaplaması farklılık gösterebilir.",
} as const;
