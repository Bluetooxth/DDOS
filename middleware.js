import { NextResponse } from 'next/server';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many requests from this IP, please try again later.",
});

const isIPBlocked = (ip) => {
    if (typeof window !== 'undefined') {
        const blockedIPs = JSON.parse(localStorage.getItem('blockedIPs')) || [];
        return blockedIPs.includes(ip);
    }
    return false;
};

const blockIP = (ip) => {
    if (typeof window !== 'undefined') {
        const blockedIPs = JSON.parse(localStorage.getItem('blockedIPs')) || [];
        if (!blockedIPs.includes(ip)) {
            blockedIPs.push(ip);
            localStorage.setItem('blockedIPs', JSON.stringify(blockedIPs));
            console.log(`Blocked IP: ${ip}`);
        }
    }
};

export function middleware(req) {
    const clientIP = req.headers.get('x-forwarded-for') || req.ip;

    if (isIPBlocked(clientIP)) {
        console.log(`Access denied for blocked IP: ${clientIP}`);
        return NextResponse.json({ message: "Access denied." }, { status: 403 });
    }

    const rateLimitResponse = limiter(req, {}, () => {});
    
    if (rateLimitResponse && rateLimitResponse.headers) {
        console.log(`Rate limit exceeded for IP: ${clientIP}. Requests: ${rateLimit.max}`);
        return rateLimitResponse;
    }

    console.log(`Request allowed for IP: ${clientIP}`);
    return NextResponse.next();
}

export const blockIPAddress = (ip) => {
    blockIP(ip);
};

export const config = {
    matcher: ['/api/:path*', '/:path*'],
}