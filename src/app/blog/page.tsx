"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Tag, Calendar, Clock, AlertCircle, Eye } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { searchBlog, getCategories, type BlogPost } from "@/lib/search";

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const categories = getCategories();

    const searchResult = useMemo(() => {
        return searchBlog(searchQuery);
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-slate-50 pb-24 pt-20">
            {/* Search Header */}
            <div className="bg-slate-900 py-20 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="mb-8 text-4xl font-bold font-playfair">Hukuki Blog & Makaleler</h1>
                    <div className="mx-auto max-w-2xl relative">
                        <input
                            type="search"
                            name="search"
                            aria-label="Blog yazılarında ara"
                            placeholder="Kiracı tahliyesi, boşanma protokolü ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-full border-0 bg-white/10 px-6 py-4 pl-14 text-white placeholder:text-slate-400 backdrop-blur-md focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    </div>

                    {/* Category Pills */}
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        {categories.map((cat) => (
                            <button
                                key={cat.slug}
                                onClick={() => setSearchQuery(cat.name)}
                                className="px-4 py-1.5 rounded-full bg-white/10 text-sm hover:bg-white/20 transition-colors"
                            >
                                {cat.name} ({cat.count})
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-12 px-6">
                {/* Search Results Info */}
                {searchQuery && (
                    <div className="mb-8">
                        <p className="text-slate-600">
                            "{searchQuery}" için
                            <span className="font-semibold text-blue-600 ml-1">
                                {searchResult.posts.length} sonuç
                            </span>
                            {" "}bulundu
                        </p>
                    </div>
                )}

                {/* No Results */}
                {!searchResult.hasResults && (
                    <div className="text-center py-16">
                        <AlertCircle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-slate-700 mb-2">Sonuç Bulunamadı</h2>
                        <p className="text-slate-500 mb-6">
                            "{searchQuery}" ile eşleşen yazı bulunamadı.
                        </p>
                        {searchResult.suggestions.length > 0 && (
                            <div>
                                <p className="text-slate-600 mb-3">Bu kategorilere göz atmak ister misiniz?</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {searchResult.suggestions.map((cat, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSearchQuery(cat)}
                                            className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Blog Posts Grid */}
                {searchResult.hasResults && (
                    <>
                        {/* Featured Posts (only show when no search) */}
                        {!searchQuery && (
                            <div className="mb-16">
                                <h2 className="text-2xl font-bold mb-8 text-slate-800 border-l-4 border-blue-500 pl-4">
                                    Öne Çıkan Yazılar
                                </h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    {searchResult.posts.slice(0, 2).map((post) => (
                                        <Link key={post.slug} href={`/blog/${post.categorySlug}/${post.slug}`}>
                                            <Card className="hover:shadow-lg cursor-pointer bg-white group overflow-hidden">
                                                <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                                                    {post.thumbnail ? (
                                                        <Image
                                                            src={post.thumbnail}
                                                            alt={post.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <span className="text-white/70 text-lg font-medium">{post.category}</span>
                                                    )}
                                                </div>
                                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                    {post.title}
                                                </h3>
                                                <p className="text-slate-600 line-clamp-2">{post.excerpt}</p>
                                                <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {new Date(post.date).toLocaleDateString("tr-TR")}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {post.readTime}
                                                    </span>
                                                    {post.views && (
                                                        <span className="flex items-center gap-1">
                                                            <Eye className="h-4 w-4" />
                                                            {post.views.toLocaleString("tr-TR")}
                                                        </span>
                                                    )}
                                                </div>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* All/Filtered Posts */}
                        <h2 className="text-2xl font-bold mb-8 text-slate-800 border-l-4 border-blue-500 pl-4">
                            {searchQuery ? "Arama Sonuçları" : "Son Yazılar"}
                        </h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {(searchQuery ? searchResult.posts : searchResult.posts.slice(2)).map((post) => (
                                <Link key={post.slug} href={`/blog/${post.categorySlug}/${post.slug}`}>
                                    <Card className="hover:shadow-md cursor-pointer transition-all hover:bg-white bg-white/80 h-full group">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Tag className="h-4 w-4 text-blue-500" />
                                            <span className="text-sm font-medium text-blue-600">{post.category}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-3 flex items-center gap-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(post.date).toLocaleDateString("tr-TR")}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {post.readTime}
                                            </span>
                                        </p>
                                        <p className="text-slate-600 text-sm line-clamp-2">{post.excerpt}</p>
                                        {post.tags && (
                                            <div className="flex flex-wrap gap-1 mt-3">
                                                {post.tags.slice(0, 3).map((tag, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

