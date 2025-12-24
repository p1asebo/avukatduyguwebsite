import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { generateWebsiteSchema } from "@/lib/schema";

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-jakarta",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Av. Duygu Sultan Açıkgöz Işık | Denizli Avukat",
        template: "%s | Av. Duygu Sultan Açıkgöz Işık",
    },
    description: "Denizli'de Aile, İcra, Miras ve Ceza Hukuku alanlarında avukatlık hizmeti sunan hukuk bürosu.",
    keywords: ["denizli avukat", "boşanma avukatı", "icra avukatı", "miras avukatı", "ceza avukatı"],
    authors: [{ name: "Av. Duygu Sultan Açıkgöz Işık" }],
    creator: "Av. Duygu Sultan Açıkgöz Işık",
    publisher: "Av. Duygu Sultan Açıkgöz Işık",
    formatDetection: {
        telephone: true,
        email: true,
    },
    metadataBase: new URL("https://avukatduygu.com"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Av. Duygu Sultan Açıkgöz Işık | Denizli Avukat",
        description: "Denizli'de Aile, İcra, Miras ve Ceza Hukuku alanlarında avukatlık hizmeti.",
        url: "https://avukatduygu.com",
        siteName: "Av. Duygu Sultan Açıkgöz Işık",
        locale: "tr_TR",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        // Google Search Console doğrulama kodu buraya eklenecek
        // google: "your-google-verification-code",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const schema = generateWebsiteSchema();

    return (
        <html lang="tr">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            </head>
            <body className={`${jakarta.variable} ${playfair.variable} font-sans`}>
                <div className="flex min-h-screen flex-col">
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}

