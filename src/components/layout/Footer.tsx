import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="container mx-auto px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 bg-white rounded-full p-1">
                                <Image src="/logo.png" alt="Logo" fill className="object-contain p-1" />
                            </div>
                            <span className="text-xl font-bold">Av. Duygu Sultan Açıkgöz Işık</span>
                        </div>
                        <p className="text-sm leading-6 text-slate-300 max-w-sm">
                            Hukuk, adaletin sanatıdır. Denizli'de profesyonel hukuki danışmanlık ve avukatlık hizmetleri.
                        </p>
                        <div className="text-sm text-slate-400">
                            <p>Adalet Mah. 10043. Sok. No:1</p>
                            <p>Merkezefendi / Denizli</p>
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">Hızlı Erişim</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <Link href="/" className="text-sm leading-6 text-slate-300 hover:text-white">
                                            Anasayfa
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/hakkimda" className="text-sm leading-6 text-slate-300 hover:text-white">
                                            Hakkımda
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/uzmanlik-alanlari" className="text-sm leading-6 text-slate-300 hover:text-white">
                                            Uzmanlık Alanları
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/iletisim" className="text-sm leading-6 text-slate-300 hover:text-white">
                                            İletişim
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">Hesaplama Araçları</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <Link href="/hesaplama" className="text-sm leading-6 text-slate-300 hover:text-white">
                                            Kıdem Tazminatı
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/hesaplama" className="text-sm leading-6 text-slate-300 hover:text-white">
                                            Miras Paylaşımı
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/hesaplama" className="text-sm leading-6 text-slate-300 hover:text-white">
                                            Faiz Hesaplama
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">Yasal Uyarı</h3>
                                <p className="mt-6 text-sm leading-6 text-slate-300">
                                    Bu web sitesindeki bilgiler yalnızca bilgilendirme amaçlıdır ve hukuki tavsiye niteliği taşımaz.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-slate-400">
                        &copy; {new Date().getFullYear()} Av. Duygu Sultan Açıkgöz Işık. Tüm hakları saklıdır.
                    </p>
                </div>
            </div>
        </footer>
    );
}
