import { NextResponse } from 'next/server';

const requestLog = new Map();
const CHALLENGE_LIMIT = 50;
const BLOCK_DURATION = 90 * 1000;

export function middleware(req) {
    const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';
    const currentTime = Date.now();
    
    const customUrl = req.headers.get('url');
    if (ip === '127.0.0.1' || ip === '::1') {
        return NextResponse.next();
    }
    if (!customUrl) {
        return new NextResponse.json({ message: 'Access denied. URL must be provided.' }, { status: 403 });
    }

    const requestInfo = requestLog.get(ip) || { count: 0, lastRequest: currentTime, blockedUntil: null };

    if (requestInfo.blockedUntil && currentTime < requestInfo.blockedUntil) {
        return new NextResponse.json({ message: 'You are temporarily blocked due to excessive requests. Please try again later.' }, { status: 429 });
    }

    if (currentTime - requestInfo.lastRequest > BLOCK_DURATION) {
        requestInfo.count = 1;
        requestInfo.lastRequest = currentTime;
    } else {
        requestInfo.count += 1;
    }

    requestLog.set(ip, requestInfo);

    if (requestInfo.count > CHALLENGE_LIMIT) {
        requestInfo.blockedUntil = currentTime + BLOCK_DURATION;
        requestLog.set(ip, requestInfo);
        return new NextResponse.json({ message: 'You have exceeded the maximum number of requests. Please wait before trying again.' }, { status: 429 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!_next/static|favicon.ico).*)',
};