import { rateLimitMiddleware } from './app/middleware/rateLimit';
import { securityMiddleware } from './app/middleware/securityMiddleware';
import { captchaChallengeMiddleware } from './app/middleware/captchaChallenge';
import { NextResponse } from 'next/server';

const CAPTCHA_THRESHOLD = 30; // Number of requests before CAPTCHA is triggered

export async function middleware(req) {
    const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';
    console.log(`Incoming request from IP: ${ip}`);

    // Run the rate limit middleware
    const rateLimitResponse = rateLimitMiddleware(req);
    if (rateLimitResponse) {
        console.log(`IP ${ip} exceeded rate limit`);
        return NextResponse.json({ message: 'Rate limit exceeded. Access blocked.' }, { status: 429 });
    }

    // Run the security middleware (for IP blocking)
    const securityResponse = securityMiddleware(req);
    if (securityResponse) {
        console.log(`IP ${ip} is blocked due to security policies`);
        return securityResponse;
    }

    // Check if CAPTCHA is required
    const requestsCount = rateLimitMiddleware.getRequestsCount(ip);
    const captchaRequired = requestsCount > CAPTCHA_THRESHOLD;

    if (captchaRequired) {
        console.log(`IP ${ip} requires CAPTCHA challenge`);
        return captchaChallengeMiddleware(req);
    }

    // Allow the request to proceed
    console.log(`IP ${ip} passed all checks`);
    return NextResponse.next();
}

export const config = {
    matcher: '/((?!_next/static|favicon.ico).*)',
};
