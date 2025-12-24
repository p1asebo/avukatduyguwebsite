"use client";

import { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
    id: string;
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
}

export function AccordionItem({ id, title, children, defaultOpen = false }: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-slate-200" id={id}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-4 px-6 text-left hover:bg-slate-50 transition-colors"
                aria-expanded={isOpen}
            >
                <h2 className="text-lg font-bold text-slate-900">{title}</h2>
                <ChevronDown
                    className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-6 pb-6 prose prose-slate max-w-none">
                    {children}
                </div>
            </div>
        </div>
    );
}

interface AccordionProps {
    children: ReactNode;
    className?: string;
}

export function Accordion({ children, className = "" }: AccordionProps) {
    return (
        <div className={`border border-slate-200 rounded-xl overflow-hidden bg-white ${className}`}>
            {children}
        </div>
    );
}
