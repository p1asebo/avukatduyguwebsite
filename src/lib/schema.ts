/**
 * SEO Schema Generators
 * 
 * JSON-LD structured data for legal services
 */

export interface AttorneyInfo {
    name: string;
    description: string;
    image?: string;
    telephone: string;
    email: string;
    address: {
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
    };
    areaServed: string[];
    priceRange: string;
    openingHours: string[];
}

export interface FAQItem {
    question: string;
    answer: string;
}

const defaultAttorney: AttorneyInfo = {
    name: "Av. Duygu Sultan Açıkgöz Işık",
    description: "Denizli'de Aile, İcra, Miras ve Ceza Hukuku alanlarında uzman avukatlık hizmeti sunan hukuk bürosu.",
    telephone: "+90 258 123 45 67",
    email: "info@avukatduygu.com",
    address: {
        streetAddress: "Adalet Mah. 10043. Sok. No:1",
        addressLocality: "Denizli",
        addressRegion: "TR-20",
        postalCode: "20000",
        addressCountry: "TR",
    },
    areaServed: ["Denizli", "Pamukkale", "Merkezefendi", "Honaz", "Çivril"],
    priceRange: "₺₺",
    openingHours: ["Mo-Fr 09:00-18:00"],
};

/**
 * Generates LegalService schema
 */
export function generateLegalServiceSchema(attorney: AttorneyInfo = defaultAttorney) {
    return {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "@id": "https://avukatduygu.com/#legalservice",
        name: attorney.name,
        description: attorney.description,
        image: attorney.image,
        telephone: attorney.telephone,
        email: attorney.email,
        url: "https://avukatduygu.com",
        address: {
            "@type": "PostalAddress",
            ...attorney.address,
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: "37.7833",
            longitude: "29.0942",
        },
        areaServed: attorney.areaServed.map(area => ({
            "@type": "City",
            name: area,
        })),
        priceRange: attorney.priceRange,
        openingHoursSpecification: attorney.openingHours.map(hours => {
            const [days, time] = hours.split(" ");
            const [open, close] = time.split("-");
            return {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: days === "Mo-Fr"
                    ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
                    : [days],
                opens: open,
                closes: close,
            };
        }),
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Hukuki Hizmetler",
            itemListElement: [
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Aile Hukuku Danışmanlığı",
                        description: "Boşanma, velayet, nafaka ve mal paylaşımı davaları",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "İcra ve İflas Hukuku",
                        description: "Alacak tahsili, icra takibi ve konkordato işlemleri",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Ceza Hukuku",
                        description: "Ceza davalarında müdafilik ve mağdur vekilliği",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Miras Hukuku",
                        description: "Veraset, vasiyetname ve miras paylaşımı",
                    },
                },
            ],
        },
    };
}

/**
 * Generates Attorney (Person) schema
 */
export function generateAttorneySchema(attorney: AttorneyInfo = defaultAttorney) {
    return {
        "@context": "https://schema.org",
        "@type": "Attorney",
        "@id": "https://avukatduygu.com/#attorney",
        name: attorney.name,
        description: attorney.description,
        image: attorney.image,
        telephone: attorney.telephone,
        email: attorney.email,
        url: "https://avukatduygu.com/hakkimda",
        jobTitle: "Avukat",
        worksFor: {
            "@id": "https://avukatduygu.com/#legalservice",
        },
        address: {
            "@type": "PostalAddress",
            ...attorney.address,
        },
        alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Hukuk Fakültesi",
        },
        memberOf: {
            "@type": "ProfessionalService",
            name: "Denizli Barosu",
        },
        knowsAbout: [
            "Aile Hukuku",
            "İcra Hukuku",
            "Ceza Hukuku",
            "Miras Hukuku",
            "İş Hukuku",
            "Ticaret Hukuku",
        ],
    };
}

/**
 * Generates FAQ schema for page-specific questions
 */
export function generateFAQSchema(items: FAQItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map(item => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };
}

/**
 * Generates BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

/**
 * Combines multiple schemas into a single graph
 */
export function combineSchemas(...schemas: object[]) {
    return {
        "@context": "https://schema.org",
        "@graph": schemas,
    };
}

/**
 * Generates complete schema for the website
 */
export function generateWebsiteSchema() {
    return combineSchemas(
        generateLegalServiceSchema(),
        generateAttorneySchema(),
        {
            "@type": "WebSite",
            "@id": "https://avukatduygu.com/#website",
            url: "https://avukatduygu.com",
            name: "Av. Duygu Sultan Açıkgöz Işık | Denizli Avukat",
            description: "Denizli'de Aile, İcra, Miras ve Ceza Hukuku alanlarında uzman avukatlık bürosu.",
            publisher: {
                "@id": "https://avukatduygu.com/#legalservice",
            },
            potentialAction: {
                "@type": "SearchAction",
                target: "https://avukatduygu.com/blog?q={search_term_string}",
                "query-input": "required name=search_term_string",
            },
        }
    );
}
