const rateLimitMap = new Map();
const MAX_REQUESTS = 50; // Max requests allowed
const WINDOW_MS = 90000; // 90 seconds window

export function rateLimitMiddleware(req) {
    const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';
    const now = Date.now();

    if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, { count: 1, firstRequestTime: now });
        return null; // Not exceeded
    }

    const data = rateLimitMap.get(ip);
    
    // Reset count if the time window has passed
    if (now - data.firstRequestTime > WINDOW_MS) {
        data.count = 1;
        data.firstRequestTime = now;
    } else {
        data.count += 1;
    }

    // Check if the limit is exceeded
    if (data.count > MAX_REQUESTS) {
        return true; // Rate limit exceeded
    }

    return null; // Not exceeded
}

// Export the function to get the request count
export function getRequestsCount(ip) {
    return rateLimitMap.has(ip) ? rateLimitMap.get(ip).count : 0;
}
