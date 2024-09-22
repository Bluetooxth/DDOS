const blockedIPs = new Set(['192.0.2.1', '203.0.113.5']); // Example blocked IPs

export function securityMiddleware(req) {
    const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';

    if (blockedIPs.has(ip)) {
        return NextResponse.json({ message: 'Your IP is blocked due to security policies.' }, { status: 403 });
    }

    return null; // Not blocked
}
