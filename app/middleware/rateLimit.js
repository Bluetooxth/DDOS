const rateLimitMap = new Map();

export function checkRateLimit(ip, maxRequests, windowMs) {
    const currentTime = Date.now();
    const requestData = rateLimitMap.get(ip) || { count: 0, firstRequestTime: currentTime };

    // Reset count if the window has passed
    if (currentTime - requestData.firstRequestTime > windowMs) {
        requestData.count = 1; // Reset count
        requestData.firstRequestTime = currentTime;
    } else {
        requestData.count += 1;
    }

    rateLimitMap.set(ip, requestData);

    if (requestData.count > maxRequests) {
        const remainingTime = windowMs - (currentTime - requestData.firstRequestTime);
        return { allowed: false, remainingTime };
    }

    return { allowed: true, remainingTime: 0 };
}

export function middleware(req) {
    const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';
    const maxRequests = 50; // Set your max requests here
    const windowMs = 90000; // Set your window time in milliseconds (90 seconds)

    const { allowed, remainingTime } = checkRateLimit(ip, maxRequests, windowMs);

    if (!allowed) {
        return new NextResponse.json({
            message: `Rate limit exceeded. Try again in ${Math.round(remainingTime / 1000)} seconds.`
        }, { status: 429 });
    }

    return null; // Allow request to proceed
}
