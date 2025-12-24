"use client";

import { TableOfContents } from "@/components/ui/TableOfContents";

interface BlogDetailClientProps {
    content?: string;
    excerpt: string;
}

export function BlogDetailClient({ content, excerpt }: BlogDetailClientProps) {
    return (
        <div className="container mx-auto px-6 py-12 max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar TOC - Desktop */}
                {content && (
                    <aside className="hidden lg:block w-72 shrink-0">
                        <div className="sticky top-28">
                            <TableOfContents className="shadow-sm" />
                        </div>
                    </aside>
                )}

                {/* Main Content */}
                <div className="flex-1 max-w-4xl">
                    {/* Mobile TOC */}
                    {content && (
                        <div className="lg:hidden mb-8">
                            <TableOfContents />
                        </div>
                    )}

                    {content ? (
                        <div
                            className="blog-content"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    ) : (
                        <div>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {excerpt}
                            </p>
                            <p className="text-slate-500 mt-8 italic">
                                Bu makalenin tam içeriği yakında eklenecektir.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
