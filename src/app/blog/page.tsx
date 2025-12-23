import { Search } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* Search Header */}
            <div className="bg-slate-900 py-20 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="mb-8 text-4xl font-bold font-playfair">Hukuki Blog & Makaleler</h1>
                    <div className="mx-auto max-w-2xl relative">
                        <input
                            type="text"
                            placeholder="Kiracı tahliyesi, boşanma protokolü ara..."
                            className="w-full rounded-full border-0 bg-white/10 px-6 py-4 pl-14 text-white placeholder:text-slate-400 backdrop-blur-md focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-16 px-6">
                {/* Pillar Content / Featured */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold mb-8 text-slate-800 border-l-4 border-blue-500 pl-4">Öne Çıkan Rehberler</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="hover:shadow-lg cursor-pointer bg-white">
                            <div className="h-48 bg-slate-200 rounded-lg mb-4 flex items-center justify-center text-slate-400">Görsel</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Boşanma Davası Rehberi: A'dan Z'ye Süreç</h3>
                            <p className="text-slate-600">Çekişmeli ve anlaşmalı boşanma arasındaki farklar, nafaka ve velayet süreçleri hakkında bilmeniz gereken her şey.</p>
                        </Card>
                        <Card className="hover:shadow-lg cursor-pointer bg-white">
                            <div className="h-48 bg-slate-200 rounded-lg mb-4 flex items-center justify-center text-slate-400">Görsel</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Kiracı Tahliye Süreçleri ve Haklarınız</h3>
                            <p className="text-slate-600">Yeni yasalar ışığında ev sahibi ve kiracı hakları, tahliye taahhütnamesi ve dava süreçleri.</p>
                        </Card>
                    </div>
                </div>

                {/* Latest Articles */}
                <h2 className="text-2xl font-bold mb-8 text-slate-800 border-l-4 border-blue-500 pl-4">Son Yazılar</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Card key={i} className="hover:shadow-md cursor-pointer transition-all hover:bg-white bg-white/50">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Örnek Makale Başlığı {i}</h3>
                            <p className="text-sm text-slate-500 mb-3">12 Ekim 2025 • Aile Hukuku</p>
                            <p className="text-slate-600 text-sm">Hukuki konularda bilgilendirici kısa özet metin buraya gelecek...</p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
