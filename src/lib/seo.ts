/**
 * SEO Metadata Utilities
 * 
 * Page-specific SEO metadata generators with question-focused titles
 */

import type { Metadata } from "next";

const BASE_URL = "https://avukatduygu.com";
const SITE_NAME = "Av. Duygu Sultan Açıkgöz Işık";
const DEFAULT_DESCRIPTION = "Denizli'de Aile, İcra, Miras ve Ceza Hukuku alanlarında avukatlık hizmeti sunan hukuk bürosu.";

interface PageSEOConfig {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
    ogImage?: string;
}

/**
 * Generates complete Metadata for a page
 */
export function generatePageMetadata(config: PageSEOConfig): Metadata {
    const fullUrl = `${BASE_URL}${config.path}`;

    return {
        title: config.title,
        description: config.description,
        keywords: config.keywords?.join(", "),
        authors: [{ name: SITE_NAME }],
        creator: SITE_NAME,
        publisher: SITE_NAME,
        formatDetection: {
            telephone: true,
            email: true,
        },
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: fullUrl,
        },
        openGraph: {
            title: config.title,
            description: config.description,
            url: fullUrl,
            siteName: SITE_NAME,
            locale: "tr_TR",
            type: "website",
            images: config.ogImage ? [
                {
                    url: config.ogImage,
                    width: 1200,
                    height: 630,
                    alt: config.title,
                },
            ] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: config.title,
            description: config.description,
            images: config.ogImage ? [config.ogImage] : undefined,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

/**
 * Pre-configured SEO metadata for each page
 */
export const pageSEO = {
    home: generatePageMetadata({
        title: "Denizli Avukat | Av. Duygu Sultan Açıkgöz Işık | Hukuk Bürosu",
        description: DEFAULT_DESCRIPTION,
        path: "/",
        keywords: ["denizli avukat", "denizli hukuk bürosu", "boşanma avukatı denizli", "icra avukatı denizli"],
    }),

    about: generatePageMetadata({
        title: "Hakkımda | Av. Duygu Sultan Açıkgöz Işık | Denizli Avukat",
        description: "Av. Duygu Sultan Açıkgöz Işık hakkında detaylı bilgi. Denizli Barosu'na kayıtlı avukat.",
        path: "/hakkimda",
        keywords: ["denizli avukat", "aile hukuku avukatı", "ceza avukatı"],
    }),

    practiceAreas: generatePageMetadata({
        title: "Faaliyet Alanları | Denizli Boşanma, İcra, Miras Avukatı",
        description: "Aile Hukuku, İcra Hukuku, Miras Hukuku, Ceza Hukuku, İş Hukuku ve Ticaret Hukuku alanlarında profesyonel avukatlık hizmeti.",
        path: "/faaliyet-alanlari",
        keywords: ["boşanma avukatı", "icra avukatı", "miras avukatı", "ceza avukatı", "iş avukatı"],
    }),

    blog: generatePageMetadata({
        title: "Hukuki Blog | Denizli Avukat Makaleleri ve Rehberler",
        description: "Boşanma, velayet, nafaka, icra takibi, miras paylaşımı ve ceza hukuku hakkında güncel makaleler ve kapsamlı rehberler.",
        path: "/blog",
        keywords: ["hukuk blogu", "boşanma rehberi", "nafaka hesaplama", "velayet davası"],
    }),

    calculators: generatePageMetadata({
        title: "Hukuki Hesaplama Araçları | Kıdem, Miras, Faiz Hesaplama",
        description: "Kıdem tazminatı, miras payı, yasal faiz, dava harçları ve daha fazlası için ücretsiz hesaplama araçları.",
        path: "/hesaplama",
        keywords: ["kıdem tazminatı hesaplama", "miras payı hesaplama", "yasal faiz hesaplama", "dava harçları"],
    }),

    contact: generatePageMetadata({
        title: "İletişim | Denizli Avukat Randevu | Av. Duygu Sultan Açıkgöz Işık",
        description: "Hukuki danışmanlık için randevu alın. Denizli Merkezefendi'de bulunan ofisimize ulaşın veya online görüşme talep edin.",
        path: "/iletisim",
        keywords: ["denizli avukat iletişim", "avukat randevu", "hukuki danışmanlık"],
    }),
};

/**
 * Calculator-specific SEO metadata
 */
export const calculatorSEO = {
    severance: generatePageMetadata({
        title: "Kıdem Tazminatı Hesaplama 2025 | Ne Kadar Alırım?",
        description: "2025 güncel tavanıyla kıdem tazminatınızı hesaplayın. Brüt maaş, çalışma süresi ve vergi kesintilerini otomatik hesaplar.",
        path: "/hesaplama/kidem-tazminati",
        keywords: ["kıdem tazminatı hesaplama", "2025 kıdem tazminatı", "kıdem hesaplama", "tazminat hesaplama"],
    }),

    inheritance: generatePageMetadata({
        title: "Miras Payı Hesaplama | Kim Ne Kadar Alır?",
        description: "Yasal mirasçılar arasında miras paylaşımını hesaplayın. Eş, çocuk, anne-baba payları ve saklı pay oranları.",
        path: "/hesaplama/miras-payi",
        keywords: ["miras payı hesaplama", "mirasçı payları", "eş miras payı", "saklı pay"],
    }),

    interest: generatePageMetadata({
        title: "Yasal Faiz Hesaplama 2025 | Gecikme Faizi Hesapla",
        description: "Yasal ve ticari faiz hesaplama aracı. Tarih bazlı, güncel oranlarla otomatik faiz hesaplayın.",
        path: "/hesaplama/gecikme-faizi",
        keywords: ["yasal faiz hesaplama", "gecikme faizi", "ticari faiz", "temerrüt faizi"],
    }),

    execution: generatePageMetadata({
        title: "İnfaz (Yatar) Hesaplama | Koşullu Salıverilme Ne Zaman?",
        description: "Hapis cezası infaz süresi hesaplama. Koşullu salıverilme ve denetimli serbestlik tarihlerini öğrenin.",
        path: "/hesaplama/infaz-hesaplama",
        keywords: ["yatar hesaplama", "infaz hesaplama", "koşullu salıverilme", "denetimli serbestlik"],
    }),

    propertyRegime: generatePageMetadata({
        title: "Mal Rejimi Hesaplama | Boşanmada Mal Paylaşımı Simülasyonu",
        description: "Edinilmiş mallara katılma rejiminde mal paylaşımı simülasyonu. Katılma alacağınızı tahmin edin.",
        path: "/hesaplama/mal-rejimi",
        keywords: ["mal paylaşımı hesaplama", "boşanmada mal paylaşımı", "katılma alacağı", "edinilmiş mal"],
    }),

    taxPenalty: generatePageMetadata({
        title: "Vergi Gecikme Faizi Hesaplama | Yapılandırma Karşılaştırması",
        description: "Vergi borcu gecikme faizi ve yapılandırma karşılaştırması. Hangi seçenek daha avantajlı?",
        path: "/hesaplama/vergi-cezasi",
        keywords: ["vergi gecikme faizi", "vergi yapılandırma", "yİ-üfe hesaplama"],
    }),

    courtFees: generatePageMetadata({
        title: "Dava Harçları Hesaplama 2025 | Nispi ve Maktu Harçlar",
        description: "2025 harçlar kanunu tarifesiyle dava harçlarını hesaplayın. Nispi, maktu harç ve gider avansı hesaplama.",
        path: "/hesaplama/dava-harclari",
        keywords: ["dava harçları", "harç hesaplama", "nispi harç", "maktu harç", "gider avansı"],
    }),
};
