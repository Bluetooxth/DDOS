import { NextResponse } from 'next/server';

const rateLimitMap = new Map();
const BLOCK_DURATION = 300 * 1000;
const REQUEST_LIMIT = 50;
const TIME_FRAME = 90 * 1000;

export async function middleware(req) {
    const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';
    const currentTime = Date.now();

    if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, { count: 0, firstRequestTime: currentTime, blockedUntil: null });
    }

    const ipData = rateLimitMap.get(ip);

    if (ipData.blockedUntil && currentTime < ipData.blockedUntil) {
        return NextResponse.json({ message: 'Access blocked due to too many requests.' }, { status: 429 });
    }

    if (currentTime - ipData.firstRequestTime > TIME_FRAME) {
        ipData.count = 0;
        ipData.firstRequestTime = currentTime;
    }

    ipData.count++;

    if (ipData.count > REQUEST_LIMIT) {
        ipData.blockedUntil = currentTime + BLOCK_DURATION;
        return NextResponse.json({ message: 'Rate limit exceeded. Access blocked.' }, { status: 429 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!_next/static|favicon.ico).*)',
};