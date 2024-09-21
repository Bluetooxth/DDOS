import { NextResponse } from 'next/server';
import { isIpBlocked } from '../utils/ipUtils';

export function middleware(req) {
    const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';

    if (isIpBlocked(ip)) {
        return new NextResponse.json({
            message: 'Your IP is blocked due to suspicious activity. Please complete the CAPTCHA to proceed.',
        }, { status: 403 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!_next/static|favicon.ico).*)',
};
