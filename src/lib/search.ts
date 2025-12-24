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
    metaDescription?: string;
    content?: string;
}

// Blog posts (newest first)
export const blogPosts: BlogPost[] = [
    {
        slug: "dugun-takilari-kimin-yargitay-2025-karari",
        title: "Düğün Takıları Kime Ait? Yargıtay'ın 2025 \"Ezber Bozan\" Yeni Kriterleri",
        excerpt: "Yargıtay 2025 yılında ziynet eşyası kararını değiştirdi! Erkeğe takılan altınlar artık kadının değil mi? Sandığa atılan takılar nasıl paylaşılır? Güncel içtihat analizi.",
        category: "Aile Hukuku",
        categorySlug: "aile-hukuku",
        date: "2024-12-24",
        readTime: "7 dk",
        tags: ["düğün takıları", "yargıtay ziynet kararı", "boşanmada altın paylaşımı", "ziynet eşyası"],
        metaDescription: "Yargıtay 2025 yılında ziynet eşyası kararını değiştirdi! Erkeğe takılan altınlar artık kadının değil mi? Sandığa atılan takılar nasıl paylaşılır? Güncel içtihat analizi.",
        content: `
<div class="summary-box">
    <strong>🚀 1 Dakikada Özet (Vatandaş İçin Hızlı Cevap):</strong>
    <p>Yargıtay'ın kökleşmiş "Kadına takılan da, erkeğe takılan da kadına aittir" görüşü <strong>DEĞİŞTİ.</strong></p>
    <p>Yeni (2024-2025) uygulamaya göre kural şudur: <strong>"Kime takıldıysa onundur."</strong></p>
    <ul>
        <li><strong>Kadına takılanlar:</strong> Kadının.</li>
        <li><strong>Erkeğe takılanlar:</strong> Erkeğin (Kadına özgü değilse).</li>
        <li><strong>Ortak Sandık/Torba:</strong> Paylı (Ortak) mülkiyet.</li>
    </ul>
</div>

<p>Boşanma aşamasındaki çiftlerin en büyük anlaşmazlık konularından biri olan "ziynet eşyası alacağı" davalarında hukuki zemin 2024 yılı itibarıyla önemli bir değişime uğradı. Yıllardır uygulanan "Erkeğe takılan takılar da, kadına takılmış sayılır ve kadının kişisel malıdır" içtihadı, Yargıtay 2. Hukuk Dairesi'nin güncel kararlarıyla yerini çok daha detaylı bir ayrıma bıraktı.</p>

<p>Peki, 2025 yılında boşanma davalarında düğün takıları nasıl paylaşılacak? "Sandık/Torba" detayı kararı nasıl etkiliyor? İşte Yargıtay Hukuk Genel Kurulu ve 2. Hukuk Dairesi'nin benimsediği yeni kriterler.</p>

<h2>1. Adım: Anlaşma ve Örf Adet Var mı?</h2>
<p>Mahkemeler ziynet eşyası paylaşımında öncelikle şu sırayı takip eder:</p>
<ol>
    <li><strong>Eşler Arası Anlaşma:</strong> Taraflar evlenirken veya sonrasında takıların kime ait olacağına dair yazılı veya sözlü (ispatlanmak kaydıyla) bir anlaşma yapmışsa, mahkeme bu anlaşmayı esas alır.</li>
    <li><strong>Yerel Örf ve Adet:</strong> Anlaşma yoksa, düğünün yapıldığı yöredeki örf ve adete bakılır. Ancak bu adetlerin varlığını iddia eden tarafın bunu ispatlaması gerekir.</li>
</ol>

<h2>2. Adım: "Kime Takıldıysa Onundur" İlkesi (Yeni Dönem)</h2>
<p>Eğer anlaşma veya belirgin bir örf yoksa, Yargıtay'ın (E. 2023/5704, K. 2024/2402 sayılı kararı gibi) güncel içtihatları devreye girer. Eski uygulamanın aksine, artık cinsiyet ayrımı ve "takılan yer" hayati önem taşımaktadır.</p>

<h3>Kadına Özgü Takılar (Bilezik, Kolye, Küpe)</h3>
<p>Doğası gereği sadece kadının kullanabileceği ziynet eşyaları (bilezik, gerdanlık, küpe vb.) erkeğe takılmış olsa bile <strong>kadına ait sayılır.</strong> Burada bir değişiklik yoktur. Yargıtay, bu eşyaların erkeğin kullanımına uygun olmadığı gerekçesiyle kadının kişisel malı olduğunu kabul eder.</p>

<h3>Erkeğe Takılan "Genel" Takılar (Çeyrek, Tam, Cumhuriyet Altını)</h3>
<p>İşte en büyük değişiklik buradadır. Eskiden erkeğin yakasına takılan çeyrek altınlar bile "evin/kadının" sayılırdı. <strong>Yeni kararlara göre;</strong> erkeğe takılan ve "kadına özgü olmayan" takılar (çeyrek altın, yarım altın, tam altın, nakit para, saat vb.) artık <strong>ERKEĞE AİTTİR.</strong></p>
<p><em>Önemli Not:</em> Bu kuralın uygulanabilmesi için düğün videoları ve fotoğraflarının bilirkişi tarafından incelenmesi ve takının bizzat erkeğin üstüne/yakasına takıldığının tespit edilmesi gerekir.</p>

<h2>3. Kritik Detay: "Sandık ve Torba" Ayrımı</h2>
<p>Düğünlerde takıların tek tek eşlerin üzerine takılmayıp, dolaştırılan bir "keseye", "sandığa" veya "torbaya" atılması durumu hukuki sonucu tamamen değiştirir.</p>

<p>Yargıtay'ın bakış açısına göre:</p>
<ul>
    <li><strong>Kime takıldığı belli değilse:</strong> Takılar bir torbada toplandıysa ve kimin (gelinin tarafı mı, damadın tarafı mı) kime taktığı ayrıştırılamıyorsa,</li>
    <li><strong>Ortak Mülkiyet:</strong> Bu takılar eşlerin <strong>"Paylı Mülkiyetinde" (Ortak)</strong> sayılır. Yani boşanma durumunda bu torbadaki altınlar yarı yarıya paylaşılır.</li>
</ul>

<h2>Boşanma Davasında İspat Yükü Kimdedir?</h2>
<p>Ziynet alacağı davasında kural şudur: "İddia eden ispatla mükelleftir."</p>
<ul>
    <li><strong>Kadın eş:</strong> Takıların kendisine ait olduğunu veya erkeğin bu takıları alıp harcadığını ve geri vermediğini ispatlamalıdır.</li>
    <li><strong>Erkek eş:</strong> Eğer takılar bozdurulduysa, bu paranın "evin ortak ihtiyaçlarına" veya "kadının rızasıyla geri alınmamak üzere" harcandığını ispatlamalıdır. Kadının rızasıyla bozdurulup evin ihtiyacına harcanan altınların iadesi gerekmez (Bağış sayılır), ancak ispat yükü erkektedir.</li>
</ul>

<h2>Sonuç Olarak</h2>
<p>2025 yılına girerken düğün takıları davalarında "Kadın her şeyi alır" algısı hukuken sona ermiştir. Düğün videolarının saniye saniye incelendiği, "Kime takıldı?" ve "Torbaya mı atıldı?" sorularının cevabına göre milyonlarca liralık farkların oluştuğu bir dönemdeyiz. Hak kaybına uğramamak için sürecin tecrübeli bir avukatla yönetilmesi elzemdir.</p>
        `,
    },
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

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find(p => p.slug === slug);
}

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
