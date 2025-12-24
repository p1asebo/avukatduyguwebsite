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
    thumbnail?: string;
    views?: number;
}

// Blog posts (newest first)
export const blogPosts: BlogPost[] = [
    {
        slug: "yargitay-2024-ziynet-esyasi-ictihat-degisikligi",
        title: "Yargıtay 2. Hukuk Dairesi'nin 2024 Ziynet Eşyası İçtihat Değişikliği ve Uygulama Rehberi",
        excerpt: "Yargıtay'ın ziynet eşyaları konusundaki 2024 içtihadını, eski uygulamalarla karşılaştırarak inceleyen kapsamlı hukuki analiz. Mülkiyet hakkı, ispat yükü ve üçlü test kriterleri.",
        category: "Aile Hukuku",
        categorySlug: "aile-hukuku",
        date: "2024-12-24",
        readTime: "12 dk",
        tags: ["ziynet eşyası", "yargıtay 2024", "boşanmada altın", "düğün takıları", "mülkiyet hakkı", "ispat yükü"],
        metaDescription: "Yargıtay 2. Hukuk Dairesi'nin 2024 ziynet eşyası içtihat değişikliği. Düğün takılarının mülkiyeti, ispat yükü ve üçlü test kriterleri hakkında kapsamlı hukuki analiz.",
        thumbnail: "/images/blog/dugun-takilari.png",
        views: 2847,
        content: `
<div class="summary-box">
    <strong>📋 Makalenin Kapsamı</strong>
    <p>Bu rehber, Yargıtay 2. Hukuk Dairesi'nin <strong>E. 2023/5704, K. 2024/2402</strong> sayılı kararı ile değişen ziynet eşyası içtihadını, eski uygulamalarla karşılaştırarak analiz etmektedir. Hedef kitle: Boşanma aşamasındaki bireyler, hukuki gelişmeleri takip eden vatandaşlar ve stajyer avukatlar.</p>
</div>

<h2>A. Giriş: Hukuki Paradigma Değişimi</h2>

<p>Türk boşanma hukukunda uzun yıllar boyunca yerleşik bir anlayış hâkim olmuştur: <em>"Düğünde takılan her şey kadına aittir."</em> Bu anlayış, toplumsal kabul görmekle birlikte, mülkiyet hukukunun temel ilkeleriyle çatışma potansiyeli taşımaktaydı.</p>

<p>2024 yılında Yargıtay 2. Hukuk Dairesi, <strong>E. 2023/5704, K. 2024/2402</strong> sayılı kararıyla bu yerleşik içtihadın revizyonuna gitti. Söz konusu kararın temel gerekçesi şu şekilde özetlenebilir:</p>

<ul>
    <li><strong>Mülkiyet Hakkının Tespiti:</strong> Bir malın mülkiyetinin tespitinde, o malın fiilen kime verildiği veya teslim edildiği esas alınmalıdır.</li>
    <li><strong>Güncel Yaşam Koşulları:</strong> Modern düğün organizasyonlarında takıların takılma biçimleri çeşitlenmiş olup, bu durumun hukuki değerlendirmede göz önünde bulundurulması gerekmektedir.</li>
    <li><strong>Cinsiyet Ayrımı:</strong> Takının niteliği (kadına özgü, erkeğe özgü veya nötr) mülkiyet tespitinde belirleyici kriter olarak kabul edilmektedir.</li>
</ul>

<h2>B. Ziynet Mülkiyetinin Belirlenmesinde "Üçlü Test" (The Three-Step Test)</h2>

<p>Güncel içtihada göre, ziynet eşyasının mülkiyetinin tespitinde aşağıdaki hiyerarşik değerlendirme uygulanmaktadır:</p>

<h3>1. Birinci Öncelik: Eşler Arası Anlaşma</h3>
<p>Tarafların evlilik öncesinde veya sırasında ziynet eşyalarının mülkiyetine ilişkin açık veya zımni bir anlaşma yapıp yapmadıkları araştırılır. Yazılı protokoller veya tanık beyanlarıyla ispat edilebilen sözlü anlaşmalar bu kapsamda değerlendirilir.</p>

<h3>2. İkinci Öncelik: Yöresel Örf ve Adet</h3>
<p>Anlaşmanın bulunmadığı hallerde, düğünün yapıldığı yörede geçerli olan örf ve adetlere başvurulur. Ancak bu noktada dikkat edilmesi gereken husus şudur: <em>Örf ve adetin varlığını iddia eden taraf, bu iddiasını ispatla yükümlüdür.</em></p>

<h3>3. Üçüncü Öncelik: Genel Kural – "Kime Takıldıysa Onundur"</h3>
<p>İlk iki kriter uygulanamadığında, Yargıtay'ın 2024 içtihadı devreye girer: <strong>Ziynet eşyası, fiziken kime takıldı veya kime teslim edildiyse, o kişinin kişisel malı olarak kabul edilir.</strong></p>

<h2>C. Kritik Ayrım: Cinsiyet Özgülüğü ve Nötr Takılar</h2>

<p>Ziynet eşyalarının mülkiyet tespitinde "takının niteliği" özel önem taşımaktadır. Bu bağlamda üç kategori söz konusudur:</p>

<h3>Kadına Özgü Ziynet Eşyaları</h3>
<p>Bilezik, kolye, küpe, gerdanlık, broş gibi doğası gereği yalnızca kadının kullanabileceği takılar bu kategoridedir. Bu eşyaların erkeğin koluna takılması veya erkeğin cebinde taşınması, mülkiyeti etkilememektedir. Yargıtay, bu tür eşyaların erkeğin kullanımına uygun olmadığı gerekçesiyle, <strong>daima kadının kişisel malı</strong> olduğuna hükmetmektedir.</p>

<h3>Erkeğe Özgü Ziynet Eşyaları</h3>
<p>Erkek kol saati, kol düğmesi, kravat iğnesi gibi doğası gereği yalnızca erkeğin kullanabileceği takılar erkeğe aittir.</p>

<h3>Nötr (Unisex) Ziynet Eşyaları – En Önemli Kategori</h3>
<p>Çeyrek altın, yarım altın, tam altın, Cumhuriyet altını, Reşat altını ve nakit para/döviz "nötr" kategoride yer almaktadır. <strong>2024 içtihadının getirdiği en önemli değişiklik bu kategoride gerçekleşmiştir:</strong></p>

<ul>
    <li>Bu eşyalar <strong>erkeğe takılmışsa → erkeğin kişisel malıdır</strong></li>
    <li>Bu eşyalar <strong>kadına takılmışsa → kadının kişisel malıdır</strong></li>
</ul>

<p>Eski içtihadın aksine, damadın yakasına takılan çeyrek altınlar artık kadına ait sayılmamaktadır.</p>

<h3>Karşılaştırmalı Tablo: 2024 İçtihadına Göre Mülkiyet Durumu</h3>

<div class="table-responsive">
<table>
<thead>
<tr>
<th>Takı Türü</th>
<th>Takılma Şekli / Yeri</th>
<th>Mülkiyet (2024 İçtihadı)</th>
</tr>
</thead>
<tbody>
<tr>
<td>Bilezik</td>
<td>Erkeğin koluna veya cebine</td>
<td><strong>Kadın</strong> (Cinsiyete özgü)</td>
</tr>
<tr>
<td>Çeyrek Altın</td>
<td>Erkeğin yakasına</td>
<td><strong>Erkek</strong> (Kime takıldıysa)</td>
</tr>
<tr>
<td>Çeyrek Altın</td>
<td>Gelinin kurdelesine</td>
<td><strong>Kadın</strong> (Kime takıldıysa)</td>
</tr>
<tr>
<td>Para / Döviz</td>
<td>Ortak sandığa / torbaya</td>
<td><strong>Paylı mülkiyet</strong> (Yarı yarıya)</td>
</tr>
<tr>
<td>Tam Altın</td>
<td>Erkeğin eline teslim</td>
<td><strong>Erkek</strong></td>
</tr>
<tr>
<td>Kolye</td>
<td>Erkeğe verilmiş olsa dahi</td>
<td><strong>Kadın</strong> (Cinsiyete özgü)</td>
</tr>
</tbody>
</table>
</div>

<h2>D. "Takı Sandığı" (Torba/Kese) Durumu</h2>

<p>Düğün organizasyonlarında takıların kişilerin üzerine tek tek takılmayıp, dolaştırılan bir kese, sandık veya torbaya atılması sıklıkla karşılaşılan bir uygulamadır. Bu durumun hukuki sonucu özel önem taşımaktadır.</p>

<p><strong>Hukuki Değerlendirme:</strong></p>
<ul>
    <li>Takıların kime takıldığı tespit edilemiyorsa,</li>
    <li>İçindeki nötr değerler (çeyrek altın, nakit para vb.) <strong>Paylı Mülkiyet (Ortak Mülkiyet)</strong> kapsamında değerlendirilir.</li>
    <li>Boşanma durumunda bu torbadaki değerler <strong>eşit olarak paylaştırılır</strong>.</li>
</ul>

<p><em>Önemli:</em> Bu paylaşımın söz konusu olabilmesi için takıların gerçekten "ortak sandığa" atıldığının ve bireysel takım ayrımının yapılamadığının ispat edilmesi gerekmektedir.</p>

<h2>E. İspat Yükü ve Deliller</h2>

<h3>Olağan Akış İlkesi</h3>
<p>Yargıtay'ın yerleşik uygulamasına göre, hayatın olağan akışı gereği ziynet eşyalarının kadının zilyetliğinde (uhdesinde) olduğu varsayılır. Kadın eş, takıların elinden alındığını veya zorla bozdurulduğunu iddia ediyorsa, <strong>bu iddiasını ispatla yükümlüdür</strong>.</p>

<h3>Düğün Videoları ve Fotoğraflar</h3>
<p>Güncel uygulamada en önemli ispat araçlarından biri düğün video kayıtlarıdır. Bilirkişiler bu görüntüleri inceleyerek:</p>
<ul>
    <li>Takının bizzat kime takıldığını,</li>
    <li>Takının sandığa mı atıldığını yoksa kişiye mi verildiğini,</li>
    <li>Takının niteliğini (kadına özgü mü, nötr mü)</li>
</ul>
<p>tespit etmektedir.</p>

<h3>"Geri Verdim" Savunması</h3>
<p>Erkek eşin "takıları aldım ancak geri verdim" şeklinde savunma yapması halinde, <strong>ispat yükü erkeğe geçer</strong>. Erkeğin bu savunmasını destekler delil sunması gerekmektedir.</p>

<h2>F. Zamanaşımı ve Dava Türleri</h2>

<h3>Aynen İade (İstihkak) Davası</h3>
<p>Ziynet eşyasının aynen iadesi talep ediliyorsa, bu talep mülkiyet hakkına dayandığından <strong>zamanaşımına tabi değildir</strong>. Mülkiyet hakkının zaman aşımına uğramayacağı evrensel bir hukuk ilkesidir.</p>

<h3>Bedel İadesi (Tazminat) Davası</h3>
<p>Ziynet eşyasının bedelinin ödenmesi talep ediliyorsa, boşanma kararının kesinleşmesinden itibaren <strong>10 yıllık genel zamanaşımı süresi</strong> uygulanır.</p>

<h2>G. Örnek Senaryolar (Somut Olay Değerlendirmeleri)</h2>

<div class="summary-box">
    <strong>Senaryo 1: Damada Takılan Çeyrek Altınlar</strong>
    <p><em>Durum:</em> Düğünde damadın yakasına 20 adet çeyrek altın takılmıştır.</p>
    <p><em>Sonuç:</em> 2024 içtihadına göre bu altınlar <strong>damadın kişisel malıdır</strong>. Çeyrek altın "nötr" kategoride olup, kime takıldıysa ona aittir.</p>
</div>

<div class="summary-box">
    <strong>Senaryo 2: Damada Takılan Bilezik</strong>
    <p><em>Durum:</em> Damadın annesi, damadın koluna bir "Trabzon Hasır Bilezik" takmıştır.</p>
    <p><em>Sonuç:</em> Bilezik kadına özgü bir takı olduğundan, erkeğe takılmış olsa dahi <strong>kadının kişisel malıdır</strong>.</p>
</div>

<div class="summary-box">
    <strong>Senaryo 3: Ortak Torbadaki Paralar</strong>
    <p><em>Durum:</em> Düğünde takılan paralar bir torbada toplanmış, sonrasında erkek tarafından araç alımında kullanılmıştır.</p>
    <p><em>Sonuç:</em> Paralar ortak torbaya atıldığından <strong>paylı mülkiyet</strong> kapsamındadır. Erkek, kadının payını (yarısını) iade etmekle yükümlüdür.</p>
</div>

<h2>Sonuç</h2>

<p>Yargıtay 2. Hukuk Dairesi'nin 2024 yılındaki içtihat değişikliği, ziynet eşyası davalarında önemli bir paradigma dönüşümünü temsil etmektedir. "Düğünde takılan her şey kadına aittir" şeklindeki geleneksel anlayış yerini, mülkiyet hukukunun temel ilkelerine dayanan daha detaylı bir değerlendirme sistemine bırakmıştır.</p>

<p>Her davanın kendine özgü koşulları bulunmakta olup, somut olayın özelliklerine göre farklı sonuçlara ulaşılması mümkündür. Hukuki süreçlerin hak kayıplarına yol açmaması adına, konunun avukat marifetiyle değerlendirilmesi tavsiye edilmektedir.</p>

<p><em>Bu makale genel bilgilendirme amaçlı hazırlanmış olup, hukuki mütalaa niteliği taşımamaktadır.</em></p>
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
