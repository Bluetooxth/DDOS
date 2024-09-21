import { NextResponse } from 'next/server';

const requestLog = new Map();

export function middleware(req) {
  const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';

  const currentTime = Date.now();
  const requestInfo = requestLog.get(ip) || { count: 0, lastRequest: currentTime };

  const timeDifference = currentTime - requestInfo.lastRequest;

  if (timeDifference > 60000) {
    requestInfo.count = 1;
    requestInfo.lastRequest = currentTime;
  } else {
    requestInfo.count += 1;
  }

  requestLog.set(ip, requestInfo);

  if (requestInfo.count > 100) {
    return new NextResponse(null, { status: 429 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next/static|favicon.ico).*)',
};