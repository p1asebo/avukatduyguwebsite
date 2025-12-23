import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
    return (
        <div className="bg-white pb-24 pt-12">
            <div className="container mx-auto px-6">
                <h1 className="mb-12 text-center text-4xl font-bold text-slate-900 font-playfair">Hakkımda</h1>

                <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100 shadow-xl border border-slate-200">
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-semibold">
                            [Avukat Fotoğrafı detaylı]
                        </div>
                    </div>

                    <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                        <h2 className="text-2xl font-bold text-slate-900">Av. Duygu Sultan Açıkgöz Işık</h2>
                        <p>
                            Hukuk eğitimini başarıyla tamamladıktan sonra Denizli Barosu'na kayıtlı olarak
                            avukatlık mesleğini icra etmeye başlamıştır. Meslek hayatı boyunca dürüstlük,
                            şeffaflık ve müvekkil odaklılık ilkelerinden ödün vermeden çalışmaktadır.
                        </p>
                        <p>
                            Özellikle Aile Hukuku, İcra İflas Hukuku ve Ceza Hukuku alanlarında yoğunlaşan
                            çalışmalarıyla, müvekkillerine en etkili hukuki çözümleri sunmayı hedeflemektedir.
                        </p>

                        <div className="pt-6">
                            <h3 className="mb-4 text-xl font-bold text-slate-900">Eğitim ve Sertifikalar</h3>
                            <ul className="list-disc pl-5 space-y-2 text-base">
                                <li>Örnek Üniversitesi Hukuk Fakültesi (Lisans)</li>
                                <li>Aile Hukuku İleri Eğitim Sertifikası</li>
                                <li>CMK Uygulamaları Eğitimi</li>
                                <li>Uzlaştırmacı Eğitimi</li>
                            </ul>
                        </div>

                        <div className="pt-8">
                            <Button href="/iletisim">Hemen İletişime Geçin</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
