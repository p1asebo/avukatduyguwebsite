import Link from "next/link";
import { ArrowRight, Scale, Gavel, Shield, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-slate-50 pt-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="container relative z-10 mx-auto px-6 text-center">
                    <h1 className="font-playfair text-5xl font-bold leading-tight tracking-tight text-slate-900 sm:text-7xl">
                        <span className="block">Hukuk,</span>
                        <span className="block text-blue-600">Adaletin Sanatıdır.</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 italic font-serif">
                        "Ius est ars boni et aequi" <br />
                        <span className="text-sm not-italic mt-2 block font-sans text-slate-500">- Marcus Tullius Cicero</span>
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button size="lg" href="/iletisim">
                            Ücretsiz Ön Görüşme
                        </Button>
                        <Button variant="outline" size="lg" href="/uzmanlik-alanlari">
                            Uzmanlık Alanlarımız
                        </Button>
                    </div>
                </div>
            </section>

            {/* Specialties Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Uzmanlık Alanları</h2>
                        <p className="mt-4 text-lg text-slate-600">
                            Size en iyi hizmeti sunmak için odaklandığımız temel hukuk dalları.
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { title: "Aile Hukuku", icon: Shield, desc: "Boşanma, velayet ve nafaka davalarında yanınızdayız." },
                            { title: "İcra Hukuku", icon: Scale, desc: "Alacak tahsili ve icra takiplerinde hızlı çözümler." },
                            { title: "Miras Hukuku", icon: BookOpen, desc: "Veraset, vasiyetname ve miras paylaşımı süreçleri." },
                            { title: "Ceza Hukuku", icon: Gavel, desc: "Soruşturma ve kovuşturma aşamalarında etkili savunma." },
                        ].map((item, i) => (
                            <Card key={i} className="group hover:-translate-y-1 hover:shadow-xl hover:border-blue-100">
                                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-slate-900">{item.title}</h3>
                                <p className="text-slate-600">{item.desc}</p>
                                <Link href="/uzmanlik-alanlari" className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700">
                                    Devamını Oku <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Summary */}
            <section className="relative overflow-hidden py-24 bg-slate-900 text-white">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold sm:text-4xl mb-6">Av. Duygu Sultan Açıkgöz Işık</h2>
                            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                                Hukukun üstünlüğüne olan inancı ve müvekkil odaklı yaklaşımıyla, hukuki süreçlerinizde
                                yanınızda yer alıyoruz. Modern, şeffaf ve sonuç odaklı bir anlayışla adaletin
                                tecellisi için çalışıyoruz.
                            </p>
                            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900" href="/hakkimda">
                                Detaylı Biyografi
                            </Button>
                        </div>
                        <div className="relative h-[400px] rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 flex items-center justify-center shadow-2xl">
                            {/* Placeholder for optional photo */}
                            <span className="text-slate-500 font-semibold">[Avukat Fotoğrafı Buraya Gelecek]</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Preview & Tools */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Blog Preview */}
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-slate-900">Güncel Hukuki Makaleler</h2>
                                <Link href="/blog" className="text-blue-600 font-semibold hover:underline">Tümünü Gör</Link>
                            </div>
                            <div className="space-y-6">
                                {[
                                    "Anlaşmalı Boşanma Protokolü Nasıl Hazırlanır?",
                                    "Kira Tespit Davalarında Yeni Düzenlemeler",
                                    "İş Kazası Sonrası Yapılması Gerekenler"
                                ].map((title, i) => (
                                    <Card key={i} className="p-4 hover:bg-blue-50/50 cursor-pointer transition-colors border-0 shadow-none bg-white">
                                        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">{title}</h3>
                                        <p className="text-sm text-slate-500 mt-1">10 dk okuma süresi</p>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Calculation Tools Preview */}
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-slate-900">Hesaplama Araçları</h2>
                                <Link href="/hesaplama" className="text-blue-600 font-semibold hover:underline">Tüm Araçlar</Link>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    "Kıdem Tazminatı", "Miras Payı", "İcra Faizi", "Avukatlık Ücreti"
                                ].map((tool, i) => (
                                    <Card key={i} variant="outline" className="p-4 hover:border-blue-500 hover:text-blue-600 cursor-pointer flex items-center justify-center text-center font-semibold bg-white">
                                        {tool} Hesaplama
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
