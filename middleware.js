import { NextResponse } from 'next/server';
import { sha256 } from 'js-sha256';

const RATE_LIMIT = 100;
const TIME_FRAME = 90 * 1000;
const requestCounts = {};

function getBrowserCharacteristics(req) {
    const headers = req.headers;
    return {
        userAgent: headers.get('user-agent') || '',
        acceptLanguage: headers.get('accept-language') || '',
    };
}

function generateMouseMovementFingerprint(movements) {
    return sha256(JSON.stringify(movements));
}

export async function middleware(req) {
    console.log('--- Middleware Execution Started ---');

    const storedFingerprint = req.cookies.get('mouseMovementFingerprint');
    console.log('Stored Fingerprint:', storedFingerprint ? storedFingerprint.value : 'None');

    if (!storedFingerprint) {
        console.log('No mouse movement fingerprint found.');
        return NextResponse.next();
    }

    const clientIP = req.ip || req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || 'unknown';
    const currentTime = Date.now();

    if (!requestCounts[clientIP]) {
        requestCounts[clientIP] = { count: 1, firstRequestTime: currentTime };
    } else {
        if (currentTime - requestCounts[clientIP].firstRequestTime < TIME_FRAME) {
            requestCounts[clientIP].count += 1;
        } else {
            requestCounts[clientIP] = { count: 1, firstRequestTime: currentTime };
        }
    }

    console.log('Current Request Count for IP:', clientIP, requestCounts[clientIP].count);

    if (requestCounts[clientIP].count > RATE_LIMIT) {
        console.log('Rate limit exceeded, access denied.');
        return NextResponse.json({ message: 'Rate limit exceeded. Access denied.' }, { status: 429 });
    }

    console.log('Mouse movement fingerprint found, proceeding with request.');
    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*', '/:path*'],
};
