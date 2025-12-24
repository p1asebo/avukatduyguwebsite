import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Tag, User, Eye } from "lucide-react";
import { blogPosts, getPostBySlug } from "@/lib/search";
import { BlogDetailClient } from "./BlogDetailClient";

// Generate static params for all blog posts
export function generateStaticParams() {
    return blogPosts.map((post) => ({
        category: post.categorySlug,
        slug: post.slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: "Yazı Bulunamadı",
        };
    }

    return {
        title: post.title,
        description: post.metaDescription || post.excerpt,
        keywords: post.tags,
        openGraph: {
            title: post.title,
            description: post.metaDescription || post.excerpt,
            type: "article",
            publishedTime: post.date,
            authors: ["Av. Duygu Sultan Açıkgöz Işık"],
            tags: post.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.metaDescription || post.excerpt,
        },
    };
}

export default async function BlogPostPage({
    params
}: {
    params: Promise<{ category: string; slug: string }>
}) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // JSON-LD for Article
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.metaDescription || post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        author: {
            "@type": "Person",
            name: "Av. Duygu Sultan Açıkgöz Işık",
            url: "https://avukatduygu.com/hakkimda",
        },
        publisher: {
            "@type": "Organization",
            name: "Av. Duygu Sultan Açıkgöz Işık Hukuk Bürosu",
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://avukatduygu.com/blog/${post.categorySlug}/${post.slug}`,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

            <article className="bg-white min-h-screen">
                {/* Hero Header */}
                <div className="bg-slate-900 text-white py-16 pt-32">
                    <div className="container mx-auto px-6 max-w-4xl">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Tüm Yazılar
                        </Link>

                        <div className="flex items-center gap-2 mb-4">
                            <Tag className="h-4 w-4 text-blue-400" />
                            <Link
                                href={`/blog?category=${post.categorySlug}`}
                                className="text-blue-400 font-medium hover:text-blue-300"
                            >
                                {post.category}
                            </Link>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair leading-tight mb-6">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-slate-400">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>Av. Duygu Sultan Açıkgöz Işık</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <time dateTime={post.date}>
                                    {new Date(post.date).toLocaleDateString("tr-TR", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </time>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{post.readTime} okuma</span>
                            </div>
                            {post.views && (
                                <div className="flex items-center gap-2">
                                    <Eye className="h-4 w-4" />
                                    <span>{post.views.toLocaleString("tr-TR")} görüntülenme</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content with TOC */}
                <BlogDetailClient content={post.content} excerpt={post.excerpt} />

                {/* Bottom sections container */}
                <div className="container mx-auto px-6 max-w-4xl pb-16">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="pt-8 border-t border-slate-200">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase mb-3">Etiketler</h3>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Legal Disclaimer */}
                    <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
                        <h4 className="font-bold text-amber-800 mb-2">⚖️ Yasal Uyarı</h4>
                        <p className="text-amber-700 text-sm leading-relaxed">
                            Bu makale genel bilgilendirme amacıyla hazırlanmış olup, hukuki mütalaa veya tavsiye niteliği taşımaz.
                            Her hukuki durum kendine özgü koşullar içerdiğinden, yazıda yer alan bilgilerin somut olayınıza
                            doğrudan uygulanabilirliği konusunda mutlaka bir avukattan profesyonel destek alınız.
                            İçerikteki bilgilere dayanılarak yapılan işlemlerden doğacak sonuçlardan sorumluluk kabul edilmez.
                        </p>
                    </div>

                    {/* Share & CTA */}
                    <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-slate-50 rounded-2xl">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Bu konuda danışmanlık almak ister misiniz?</h3>
                            <p className="text-slate-600">Uzman avukat desteği için hemen iletişime geçin.</p>
                        </div>
                        <Link
                            href="/iletisim"
                            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
                        >
                            Randevu Al
                        </Link>
                    </div>
                </div>
            </article>
        </>
    );
}

