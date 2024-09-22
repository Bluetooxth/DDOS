import { NextResponse } from 'next/server';

const rateLimit = {};
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 10;

export function middleware(req) {
    const clientIP = req.headers.get('x-forwarded-for') || req.ip;

    if (!rateLimit[clientIP]) {
        rateLimit[clientIP] = { count: 0, lastRequestTime: Date.now() };
        console.log(`New entry for IP: ${clientIP}`);
    }

    const currentTime = Date.now();
    const timeSinceLastRequest = currentTime - rateLimit[clientIP].lastRequestTime;

    if (timeSinceLastRequest > RATE_LIMIT_WINDOW_MS) {
        console.log(`Resetting request count for IP: ${clientIP}`);
        rateLimit[clientIP].count = 0;
        rateLimit[clientIP].lastRequestTime = currentTime;
    }

    rateLimit[clientIP].count++;
    console.log(`Request count for IP ${clientIP}: ${rateLimit[clientIP].count}`);

    if (rateLimit[clientIP].count > MAX_REQUESTS) {
        console.log(`Rate limit exceeded for IP: ${clientIP}. Count: ${rateLimit[clientIP].count}`);
        return NextResponse.json({ message: "Too many requests, please try again later." }, { status: 429 });
    }

    console.log(`Request allowed for IP: ${clientIP}. Count: ${rateLimit[clientIP].count}`);
    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*', '/:path*'],
};