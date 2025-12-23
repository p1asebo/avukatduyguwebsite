import { Card } from "@/components/ui/Card";
import { Calculator, Users, Percent, Scale, Home, Receipt, FileText } from "lucide-react";
import Link from "next/link";

const tools = [
    {
        title: "Kıdem Tazminatı Hesaplama",
        href: "/hesaplama/kidem-tazminati",
        description: "2025 tavanıyla kıdem tazminatınızı hesaplayın",
        icon: Calculator,
    },
    {
        title: "Miras Payı Hesaplama",
        href: "/hesaplama/miras-payi",
        description: "Yasal mirasçı paylarını hesaplayın",
        icon: Users,
    },
    {
        title: "Yasal Faiz Hesaplama",
        href: "/hesaplama/gecikme-faizi",
        description: "Yasal ve ticari faiz hesabı",
        icon: Percent,
    },
    {
        title: "İnfaz (Yatar) Hesaplama",
        href: "/hesaplama/infaz-hesaplama",
        description: "Koşullu salıverilme tahmini",
        icon: Scale,
    },
    {
        title: "Mal Rejimi Simülasyonu",
        href: "/hesaplama/mal-rejimi",
        description: "Katılma alacağı hesaplama",
        icon: Home,
    },
    {
        title: "Vergi Gecikme Faizi",
        href: "/hesaplama/vergi-cezasi",
        description: "Yapılandırma karşılaştırması",
        icon: Receipt,
    },
    {
        title: "Dava Harçları Hesaplama",
        href: "/hesaplama/dava-harclari",
        description: "2025 harç tarifesi ile hesaplama",
        icon: FileText,
    },
];

export default function CalculatorsPage() {
    return (
        <div className="bg-slate-50 py-16 pt-28 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 font-playfair">Hesaplama Araçları</h1>
                    <p className="mt-4 text-lg text-slate-600">
                        Hukuki süreçlerinizde ön bilgi edinmenizi sağlayan pratik hesaplama araçları.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {tools.map((tool, i) => (
                        <Link key={i} href={tool.href}>
                            <Card className="hover:border-blue-500 hover:shadow-lg group h-full flex flex-col items-center text-center p-8 bg-white cursor-pointer transition-all">
                                <div className="mb-4 h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <tool.icon className="h-7 w-7" />
                                </div>
                                <h3 className="font-bold text-lg text-slate-900">{tool.title}</h3>
                                <p className="text-sm text-slate-500 mt-2">{tool.description}</p>
                                <span className="mt-4 text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-transform inline-block">
                                    Hesapla &rarr;
                                </span>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 rounded-xl bg-blue-50 p-6 text-center text-sm text-blue-800 border border-blue-100">
                    <strong>Yasal Uyarı:</strong> Bu araçlar tarafından yapılan hesaplamalar yalnızca bilgilendirme amaçlıdır ve kesin hukuki sonuç teşkil etmez. Resmi hesaplamalar için lütfen profesyonel destek alınız.
                </div>
            </div>
        </div>
    );
}

