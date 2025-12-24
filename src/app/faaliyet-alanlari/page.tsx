import { Card } from "@/components/ui/Card";
import { Scale, Gavel, Shield, BookOpen, Users, Briefcase } from "lucide-react";

const practices = [
    { icon: Shield, title: "Aile Hukuku", text: "Boşanma, velayet, nafaka, mal rejimi davaları ve aile içi şiddet konularında hukuki destek." },
    { icon: Scale, title: "İcra ve İflas Hukuku", text: "Alacak tahsili, icra takibi başlatılması, itiraz süreçleri ve konkordato işlemleri." },
    { icon: BookOpen, title: "Miras Hukuku", text: "Veraset ilamı, vasiyetname hazırlama, miras paylaşımı ve tenkis davaları." },
    { icon: Gavel, title: "Ceza Hukuku", text: "Ağır ceza ve asliye ceza mahkemelerindeki davalarda şüpheli/sanık müdafiliği ve mağdur vekilliği." },
    { icon: Users, title: "İş Hukuku", text: "İşe iade, kıdem ve ihbar tazminatı, mobbing ve iş kazası davaları." },
    { icon: Briefcase, title: "Ticaret Hukuku", text: "Şirket kuruluşları, sözleşme hazırlama, ticari uyuşmazlıklar ve danışmanlık." },
];

export default function PracticeAreasPage() {
    return (
        <div className="bg-slate-50 py-16 pt-28">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 font-playfair">Faaliyet Alanlarımız</h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Hukuki süreçlerinizde profesyonel desteğe ihtiyaç duyabileceğiniz temel alanlar.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {practices.map((item, i) => (
                        <Card key={i} className="group hover:shadow-2xl hover:-translate-y-2 hover:bg-slate-900 transition-all duration-300 cursor-pointer">
                            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <item.icon className="h-7 w-7" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-white transition-colors">{item.title}</h3>
                            <p className="text-slate-600 leading-relaxed group-hover:text-slate-300 transition-colors">{item.text}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
