import { Card } from "@/components/ui/Card";
import { Calculator } from "lucide-react";
import Link from "next/link";

const tools = [
    "Kıdem Tazminatı Hesaplama",
    "Miras Payı Hesaplama",
    "Yasal Faiz Hesaplama",
    "Hapis Cezası Yatar Hesaplama",
    "Mal Rejimi Paylaşım Simülasyonu",
    "Vergi Cezası Gecikme Faizi",
    "Yapılandırma Öncesi/Sonrası Karşılaştırma",
    "Tahmini Dava Masrafları",
    "Harç Hesaplama (Nispi/Maktu)"
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
                        <Link key={i} href={`/hesaplama?tool=${i}`}>
                            <Card className="hover:border-blue-500 hover:shadow-lg group h-full flex flex-col items-center text-center p-8 bg-white cursor-pointer">
                                <div className="mb-4 h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Calculator className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-lg text-slate-900">{tool}</h3>
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
