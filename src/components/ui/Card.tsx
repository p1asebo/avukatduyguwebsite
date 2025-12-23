import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "glass" | "outline";
}

export function Card({ children, className, variant = "default", ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-3xl p-6 transition-all duration-300",
                {
                    "bg-white shadow-sm border border-slate-100": variant === "default",
                    "bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg": variant === "glass",
                    "border-2 border-slate-200 bg-transparent": variant === "outline",
                },
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
