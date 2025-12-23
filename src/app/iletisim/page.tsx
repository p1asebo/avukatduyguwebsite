"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Mail, MapPin, Phone, Clock, CheckCircle } from "lucide-react";

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate form submission (replace with actual API call later)
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsLoading(false);
        setIsSubmitted(true);
    };

    return (
        <div className="bg-white py-16 pt-28">
            <div className="container mx-auto px-6">
                <h1 className="mb-12 text-center text-4xl font-bold text-slate-900 font-playfair">İletişim</h1>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Bize Ulaşın</h2>
                            <p className="text-slate-600 mb-8">
                                Hukuki sorunlarınız için aşağıdaki iletişim kanallarından bize ulaşabilir veya formu doldurarak randevu talep edebilirsiniz.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="h-6 w-6 text-blue-600 mt-1 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-slate-900">Adres</h3>
                                    <p className="text-slate-600">Adalet Mah. 10043. Sok. No:1<br />Merkezefendi / Denizli</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Phone className="h-6 w-6 text-blue-600 mt-1 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-slate-900">Telefon</h3>
                                    <p className="text-slate-600">0 (258) 123 45 67</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Mail className="h-6 w-6 text-blue-600 mt-1 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-slate-900">E-Posta</h3>
                                    <p className="text-slate-600">info@avukatduygu.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Clock className="h-6 w-6 text-blue-600 mt-1 shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-slate-900">Çalışma Saatleri</h3>
                                    <p className="text-slate-600">Hafta İçi: 09:00 - 18:00</p>
                                </div>
                            </div>
                        </div>

                        {/* Google Map Embed */}
                        <div className="h-64 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100904.2882262791!2d29.014285741679054!3d37.78301548682705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c7120df682a39b%3A0xe549553754e33967!2sDenizli!5e0!3m2!1str!2str!4v1709400000000!5m2!1str!2str"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ofis Konumu"
                            />
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Randevu Formu</h2>

                        {isSubmitted ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Mesajınız Alındı!</h3>
                                <p className="text-slate-600">En kısa sürede sizinle iletişime geçeceğiz.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Adınız Soyadınız
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
                                        placeholder="Adınız Soyadınız"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Telefon Numaranız
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
                                        placeholder="0500 000 00 00"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Konu
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none bg-white"
                                    >
                                        <option value="genel">Genel Danışmanlık</option>
                                        <option value="aile">Boşanma / Aile Hukuku</option>
                                        <option value="icra">İcra Takibi</option>
                                        <option value="ceza">Ceza Hukuku</option>
                                        <option value="diger">Diğer</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Mesajınız
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        required
                                        className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
                                        placeholder="Kısaca durumunuzu özetleyin..."
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Gönderiliyor..." : "Gönder"}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
