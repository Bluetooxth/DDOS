import {middleware as rateLimitMiddleware} from './middleware/rateLimit';
import {middleware as securityMiddleware} from './middleware/securityMiddleware';

export async function middleware(req) {
    // First, run the rate limit middleware
    const rateLimitResponse = rateLimitMiddleware(req);
    if (rateLimitResponse) {
        return rateLimitResponse; // If rate limit is exceeded, block the request
    }

    // Next, check the security middleware (for IP blocking)
    const securityResponse = securityMiddleware(req);
    if (securityResponse) {
        return securityResponse; // If IP is blocked, block the request
    }

    // If both checks pass, continue to the next middleware or request handler
    return NextResponse.next();
}