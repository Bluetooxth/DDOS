import { NextResponse } from 'next/server';
import { checkRateLimit } from '../utils/rateLimiter';

const MAX_REQUESTS = 50; // Set your max requests here
const WINDOW_MS = 90000; // Set your window time in milliseconds (90 seconds)

export function middleware(req) {
    const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';

    // Check if the IP is rate-limited
    const { allowed, remainingTime } = checkRateLimit(ip, MAX_REQUESTS, WINDOW_MS);

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