"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface TOCItem {
    id: string;
    title: string;
    level: number;
}

interface TableOfContentsProps {
    contentSelector?: string;
    className?: string;
}

export function TableOfContents({ contentSelector = ".blog-content", className = "" }: TableOfContentsProps) {
    const [items, setItems] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // Extract headings from content
        const content = document.querySelector(contentSelector);
        if (!content) return;

        const headings = content.querySelectorAll("h2, h3");
        const tocItems: TOCItem[] = [];

        headings.forEach((heading, index) => {
            // Generate ID if not present
            if (!heading.id) {
                heading.id = `section-${index}`;
            }

            tocItems.push({
                id: heading.id,
                title: heading.textContent || "",
                level: heading.tagName === "H2" ? 2 : 3,
            });
        });

        setItems(tocItems);
    }, [contentSelector]);

    useEffect(() => {
        // Intersection observer for scroll spy
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-100px 0px -80% 0px" }
        );

        items.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [items]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Account for fixed header
            const top = element.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    if (items.length === 0) return null;

    return (
        <nav className={`bg-slate-50 rounded-xl p-5 ${className}`}>
            <div className="flex items-center gap-2 mb-4 text-slate-700">
                <List className="h-5 w-5" />
                <h3 className="font-bold text-sm uppercase tracking-wide">İçindekiler</h3>
            </div>
            <ul className="space-y-1">
                {items.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => scrollToSection(item.id)}
                            className={`w-full text-left py-2 px-3 rounded-lg text-sm transition-colors ${item.level === 3 ? "pl-6" : ""
                                } ${activeId === item.id
                                    ? "bg-blue-100 text-blue-700 font-medium"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                }`}
                        >
                            {item.title}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
