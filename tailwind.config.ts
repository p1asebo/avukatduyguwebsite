import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#F8FAFC", // Slate 50
                foreground: "#0F172A", // Slate 900
                primary: {
                    DEFAULT: "#0F172A", // Navy
                    hover: "#1E293B",
                },
                accent: {
                    DEFAULT: "#3B82F6", // Bright Blue
                    hover: "#2563EB",
                },
            },
            fontFamily: {
                sans: ['var(--font-jakarta)', 'sans-serif'],
                playfair: ['var(--font-playfair)', 'serif'],
            },
        },
    },
    plugins: [],
};
export default config;
