import { middleware as rateLimitMiddleware } from './app/middleware/rateLimit';
import { middleware as securityMiddleware } from './app/middleware/securityMiddleware';
import { middleware as captchaChallengeMiddleware } from './app/middleware/captchaChallenge';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';

    const rateLimitResponse = rateLimitMiddleware(req);
    if (rateLimitResponse) return rateLimitResponse;

    const securityResponse = securityMiddleware(req);
    if (securityResponse) return securityResponse;

    const captchaRequired = Math.random() < 0.1;
    if (captchaRequired) {
        return captchaChallengeMiddleware(req);
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!_next/static|favicon.ico).*)',
};