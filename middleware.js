import { middleware as rateLimitMiddleware } from './app/middleware/rateLimit';
import { middleware as securityMiddleware } from './app/middleware/securityMiddleware';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';
    console.log(`Incoming request from IP: ${ip}`);

    // Run the rate limit middleware
    const rateLimitResponse = rateLimitMiddleware(req);
    if (rateLimitResponse) {
        console.log(`IP ${ip} exceeded rate limit`);
        return rateLimitResponse; // If rate limit is exceeded, block the request
    }

    // Run the security middleware (for IP blocking)
    const securityResponse = securityMiddleware(req);
    if (securityResponse) {
        console.log(`IP ${ip} is blocked due to security policies`);
        return securityResponse; // If IP is blocked, block the request
    }

    // If both checks pass, allow the request to proceed
    console.log(`IP ${ip} passed rate limit and security checks`);
    return NextResponse.next();
}