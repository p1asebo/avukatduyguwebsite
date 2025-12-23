/**
 * Blog Search with Fuse.js
 * 
 * Fuzzy search with Turkish character support and typo tolerance
 */

import Fuse from "fuse.js";

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    categorySlug: string;
    date: string;
    readTime: string;
    tags?: string[];
}

// Sample blog posts (will be replaced with MDX content later)
export const blogPosts: BlogPost[] = [
    {
        slug: "anlasmali-bosanma-protokolu",
        title: "Anlaşmalı Boşanma Protokolü Nasıl Hazırlanır?",
        excerpt: "Anlaşmalı boşanma davası açmadan önce hazırlanması gereken protokol ve dikkat edilmesi gereken hususlar hakkında kapsamlı rehber.",
        category: "Aile Hukuku",
        categorySlug: "aile-hukuku",
        date: "2024-12-15",
        readTime: "8 dk",
        tags: ["boşanma", "anlaşmalı boşanma", "protokol"],
    },
    {
        slug: "nafaka-hesaplama-kriterleri",
        title: "Nafaka Nasıl Hesaplanır? 2025 Kriterleri",
        excerpt: "Yoksulluk nafakası, iştirak nafakası ve tedbir nafakası türleri ile hesaplama kriterleri hakkında bilmeniz gerekenler.",
        category: "Aile Hukuku",
        categorySlug: "aile-hukuku",
        date: "2024-12-10",
        readTime: "6 dk",
        tags: ["nafaka", "boşanma", "çocuk nafakası"],
    },
    {
        slug: "velayet-davasi-sureci",
        title: "Velayet Davası Süreci ve Şartları",
        excerpt: "Boşanma sonrası velayet davası nasıl açılır, hangi kriterler değerlendirilir ve çocuğun görüşü ne kadar önemlidir?",
        category: "Aile Hukuku",
        categorySlug: "aile-hukuku",
        date: "2024-12-05",
        readTime: "7 dk",
        tags: ["velayet", "boşanma", "çocuk hakları"],
    },
    {
        slug: "icra-takibi-nasil-yapilir",
        title: "İcra Takibi Nasıl Başlatılır?",
        excerpt: "Alacak tahsili için icra takibi başlatma adımları, gerekli belgeler ve süreçler hakkında detaylı bilgi.",
        category: "İcra Hukuku",
        categorySlug: "icra-hukuku",
        date: "2024-11-28",
        readTime: "5 dk",
        tags: ["icra", "alacak", "takip"],
    },
    {
        slug: "kiraci-tahliyesi",
        title: "Kiracı Tahliyesi Nasıl Yapılır?",
        excerpt: "Kiracının tahliyesi için yasal yollar, tahliye davası süreci ve dikkat edilmesi gereken noktalar.",
        category: "Kira Hukuku",
        categorySlug: "kira-hukuku",
        date: "2024-11-20",
        readTime: "6 dk",
        tags: ["kiracı", "tahliye", "kira"],
    },
    {
        slug: "miras-payi-hesaplama",
        title: "Miras Paylaşımı Nasıl Yapılır?",
        excerpt: "Yasal mirasçılar, saklı pay oranları ve miras paylaşımında dikkat edilmesi gereken hukuki konular.",
        category: "Miras Hukuku",
        categorySlug: "miras-hukuku",
        date: "2024-11-15",
        readTime: "9 dk",
        tags: ["miras", "veraset", "paylaşım"],
    },
    {
        slug: "is-davasi-tazminat",
        title: "İş Davası ve Tazminat Hakları",
        excerpt: "İşten haksız çıkarılma durumunda başvurulabilecek hukuki yollar ve tazminat hakları.",
        category: "İş Hukuku",
        categorySlug: "is-hukuku",
        date: "2024-11-10",
        readTime: "7 dk",
        tags: ["iş davası", "kıdem", "ihbar", "tazminat"],
    },
    {
        slug: "ceza-davasi-sureci",
        title: "Ceza Davası Süreci Nasıl İşler?",
        excerpt: "Soruşturmadan kovuşturmaya, tutukluluktan tahliyeye ceza davası sürecinin tüm aşamaları.",
        category: "Ceza Hukuku",
        categorySlug: "ceza-hukuku",
        date: "2024-11-05",
        readTime: "10 dk",
        tags: ["ceza davası", "savunma", "tutukluluk"],
    },
];

// Turkish character normalization map
const turkishMap: Record<string, string> = {
    "ı": "i",
    "İ": "I",
    "ş": "s",
    "Ş": "S",
    "ğ": "g",
    "Ğ": "G",
    "ü": "u",
    "Ü": "U",
    "ö": "o",
    "Ö": "O",
    "ç": "c",
    "Ç": "C",
};

/**
 * Normalizes Turkish characters for search
 */
export function normalizeTurkish(str: string): string {
    return str.replace(/[ıİşŞğĞüÜöÖçÇ]/g, (char) => turkishMap[char] || char);
}

// Fuse.js configuration
const fuseOptions = {
    keys: [
        { name: "title", weight: 0.4 },
        { name: "excerpt", weight: 0.3 },
        { name: "tags", weight: 0.2 },
        { name: "category", weight: 0.1 },
    ],
    threshold: 0.4,          // Typo tolerance (0 = exact, 1 = match anything)
    distance: 100,           // How close matches must be to the fuzzy location
    minMatchCharLength: 2,   // Minimum characters before a match is returned
    includeScore: true,
    includeMatches: true,
    findAllMatches: true,
    ignoreLocation: true,    // Search entire string
    useExtendedSearch: true,
};

// Create Fuse instance with normalized data
const normalizedPosts = blogPosts.map(post => ({
    ...post,
    normalizedTitle: normalizeTurkish(post.title.toLowerCase()),
    normalizedExcerpt: normalizeTurkish(post.excerpt.toLowerCase()),
    normalizedTags: post.tags?.map(t => normalizeTurkish(t.toLowerCase())),
}));

const fuse = new Fuse(normalizedPosts, {
    ...fuseOptions,
    keys: [
        { name: "normalizedTitle", weight: 0.4 },
        { name: "normalizedExcerpt", weight: 0.3 },
        { name: "normalizedTags", weight: 0.2 },
        { name: "category", weight: 0.1 },
    ],
});

export interface SearchResult {
    posts: BlogPost[];
    suggestions: string[];
    hasResults: boolean;
}

/**
 * Search blog posts with fuzzy matching
 */
export function searchBlog(query: string): SearchResult {
    if (!query || query.length < 2) {
        return {
            posts: blogPosts,
            suggestions: [],
            hasResults: true,
        };
    }

    const normalizedQuery = normalizeTurkish(query.toLowerCase());
    const results = fuse.search(normalizedQuery);

    if (results.length > 0) {
        return {
            posts: results.map(r => {
                // Return original post without normalized fields
                const { normalizedTitle, normalizedExcerpt, normalizedTags, ...post } = r.item as typeof r.item & {
                    normalizedTitle: string;
                    normalizedExcerpt: string;
                    normalizedTags?: string[];
                };
                return post;
            }),
            suggestions: [],
            hasResults: true,
        };
    }

    // No results - suggest categories
    const categories = [...new Set(blogPosts.map(p => p.category))];
    return {
        posts: [],
        suggestions: categories,
        hasResults: false,
    };
}

/**
 * Get posts by category
 */
export function getPostsByCategory(categorySlug: string): BlogPost[] {
    return blogPosts.filter(p => p.categorySlug === categorySlug);
}

/**
 * Get unique categories
 */
export function getCategories(): { name: string; slug: string; count: number }[] {
    const categoryMap = new Map<string, { name: string; slug: string; count: number }>();

    blogPosts.forEach(post => {
        const existing = categoryMap.get(post.categorySlug);
        if (existing) {
            existing.count++;
        } else {
            categoryMap.set(post.categorySlug, {
                name: post.category,
                slug: post.categorySlug,
                count: 1,
            });
        }
    });

    return Array.from(categoryMap.values());
}
