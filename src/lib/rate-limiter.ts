/**
 * Rate Limiter for API endpoints
 * 
 * Simple in-memory rate limiting (suitable for serverless)
 */

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

// In-memory store (resets on cold start, which is acceptable for basic protection)
const rateLimitStore = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
    /** Maximum requests allowed */
    maxRequests: number;
    /** Time window in seconds */
    windowSeconds: number;
}

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetIn: number; // seconds until reset
}

/**
 * Check if request should be rate limited
 */
export function checkRateLimit(
    identifier: string, // Usually IP address
    config: RateLimitConfig = { maxRequests: 5, windowSeconds: 60 }
): RateLimitResult {
    const now = Date.now();
    const key = `rate:${identifier}`;

    const entry = rateLimitStore.get(key);

    // No existing entry or window expired
    if (!entry || now > entry.resetTime) {
        rateLimitStore.set(key, {
            count: 1,
            resetTime: now + (config.windowSeconds * 1000),
        });

        return {
            allowed: true,
            remaining: config.maxRequests - 1,
            resetIn: config.windowSeconds,
        };
    }

    // Within window
    const remaining = config.maxRequests - entry.count - 1;
    const resetIn = Math.ceil((entry.resetTime - now) / 1000);

    if (entry.count >= config.maxRequests) {
        return {
            allowed: false,
            remaining: 0,
            resetIn,
        };
    }

    // Increment counter
    entry.count++;

    return {
        allowed: true,
        remaining: Math.max(0, remaining),
        resetIn,
    };
}

/**
 * Get client IP from request headers
 */
export function getClientIP(headers: Headers): string {
    // Check common proxy headers
    const forwarded = headers.get("x-forwarded-for");
    if (forwarded) {
        return forwarded.split(",")[0].trim();
    }

    const realIP = headers.get("x-real-ip");
    if (realIP) {
        return realIP;
    }

    // Fallback
    return "unknown";
}

/**
 * Clean up expired entries (call periodically in production)
 */
export function cleanupRateLimitStore(): void {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
        if (now > entry.resetTime) {
            rateLimitStore.delete(key);
        }
    }
}
