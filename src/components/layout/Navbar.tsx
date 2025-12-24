"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Anasayfa", href: "/" },
    { name: "Hakkımda", href: "/hakkimda" },
    { name: "Faaliyet Alanları", href: "/faaliyet-alanlari" },
    { name: "Blog", href: "/blog" },
    { name: "Hesaplama", href: "/hesaplama" },
    { name: "İletişim", href: "/iletisim" },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-white/80 backdrop-blur-md shadow-sm py-4"
                    : "bg-transparent py-6"
            )}
        >
            <nav
                className="container mx-auto flex items-center justify-between px-6 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200">
                            <Image
                                src="/logo.png"
                                alt="Av. Duygu Sultan Açıkgöz Işık"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className={cn("text-lg font-bold tracking-tight text-slate-900", scrolled ? "opacity-100" : "lg:text-slate-900")}>
                            Av. Duygu Sultan Açıkgöz Işık
                        </span>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Menüyü aç</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex lg:gap-x-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-semibold leading-6 text-slate-900 hover:text-blue-600 transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop CTA */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link
                        href="/iletisim"
                        className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors"
                    >
                        <Phone className="h-4 w-4" />
                        <span>0 (258) 123 45 67</span>
                    </Link>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={cn("lg:hidden", mobileMenuOpen ? "fixed inset-0 z-50" : "hidden")}>
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
                <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                                <Image src="/logo.png" alt="Logo" fill className="object-cover" />
                            </div>
                            <span className="font-bold text-slate-900">Av. Duygu Sultan Açıkgöz Işık</span>
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-slate-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Menüyü kapat</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-900 hover:bg-slate-50"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6">
                                <Link
                                    href="/iletisim"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-slate-900 hover:bg-slate-50"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    İletişime Geçin
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
