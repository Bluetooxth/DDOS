import { NextResponse } from 'next/server';
import { checkRateLimit } from '../utils/rateLimiter';
import { rateLimitConfig } from '../config/securityRules';

export function middleware(req) {
    const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';
    const { maxRequests, windowMs } = rateLimitConfig;

    // Check if the IP is rate-limited
    const { allowed, remainingTime } = checkRateLimit(ip, maxRequests, windowMs);

    if (!allowed) {
        return new NextResponse.json({
            message: `Rate limit exceeded. Try again in ${Math.round(remainingTime / 1000)} seconds.`
        }, { status: 429 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!_next/static|favicon.ico).*)',
};
