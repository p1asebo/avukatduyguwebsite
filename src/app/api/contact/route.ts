/**
 * Contact Form API Endpoint
 * 
 * Handles contact form submissions with rate limiting and XSS protection
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, getClientIP } from "@/lib/rate-limiter";
// Note: For production, use isomorphic-dompurify for XSS protection
// import DOMPurify from "isomorphic-dompurify";

// Validation schema
const contactSchema = z.object({
    name: z.string()
        .min(2, "İsim en az 2 karakter olmalıdır")
        .max(100, "İsim çok uzun")
        .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "İsim sadece harf içermelidir"),
    phone: z.string()
        .min(10, "Telefon numarası en az 10 karakter olmalıdır")
        .max(20, "Telefon numarası çok uzun")
        .regex(/^[0-9\s\-\+\(\)]+$/, "Geçersiz telefon numarası"),
    subject: z.enum(["genel", "aile", "icra", "ceza", "diger"]),
    message: z.string()
        .min(10, "Mesaj en az 10 karakter olmalıdır")
        .max(2000, "Mesaj çok uzun"),
});

/**
 * Simple XSS sanitization (basic version)
 * For production, use DOMPurify
 */
function sanitizeInput(input: string): string {
    return input
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;")
        .trim();
}

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const clientIP = getClientIP(request.headers);
        const rateLimit = checkRateLimit(clientIP, {
            maxRequests: 5,        // 5 requests
            windowSeconds: 300,   // per 5 minutes
        });

        if (!rateLimit.allowed) {
            return NextResponse.json(
                {
                    error: "Çok fazla istek gönderildi",
                    message: `Lütfen ${rateLimit.resetIn} saniye sonra tekrar deneyin.`,
                },
                {
                    status: 429,
                    headers: {
                        "Retry-After": String(rateLimit.resetIn),
                        "X-RateLimit-Remaining": String(rateLimit.remaining),
                    },
                }
            );
        }

        // Parse and validate body
        const body = await request.json();
        const validationResult = contactSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    error: "Geçersiz form verisi",
                    details: validationResult.error.issues.map(i => i.message),
                },
                { status: 400 }
            );
        }

        const { name, phone, subject, message } = validationResult.data;

        // Sanitize inputs
        const sanitizedData = {
            name: sanitizeInput(name),
            phone: sanitizeInput(phone),
            subject,
            message: sanitizeInput(message),
            submittedAt: new Date().toISOString(),
            clientIP,
        };

        // TODO: In production, send email or save to database
        // For now, just log and return success
        console.log("Contact form submission:", sanitizedData);

        // You would typically:
        // 1. Send email notification (Resend, SendGrid, etc.)
        // 2. Save to database (Supabase, MongoDB, etc.)
        // 3. Send to CRM (HubSpot, etc.)

        return NextResponse.json(
            {
                success: true,
                message: "Mesajınız başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.",
            },
            {
                status: 200,
                headers: {
                    "X-RateLimit-Remaining": String(rateLimit.remaining),
                },
            }
        );
    } catch (error) {
        console.error("Contact form error:", error);

        return NextResponse.json(
            {
                error: "Bir hata oluştu",
                message: "Lütfen daha sonra tekrar deneyin.",
            },
            { status: 500 }
        );
    }
}

// Handle unsupported methods
export async function GET() {
    return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 }
    );
}
