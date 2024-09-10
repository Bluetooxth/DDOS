import { NextResponse } from 'next/server';
import QuickLRU from 'quick-lru';

const rateLimitCache = new QuickLRU({ maxSize: 1000 });

const rateLimit = (ip) => {
  const currentTime = Date.now();
  const rateLimitData = rateLimitCache.get(ip) || { count: 0, lastRequest: currentTime };

  if (currentTime - rateLimitData.lastRequest > 60 * 1000) {
    rateLimitData.count = 0;
  }

  rateLimitData.count += 1;
  rateLimitData.lastRequest = currentTime;
  rateLimitCache.set(ip, rateLimitData);

  return rateLimitData.count > 100;
};

const connectionLimits = new Map();
const connectionLimit = 20;
const connectionWindowTime = 60 * 1000;

const connectionRateLimit = (ip) => {
  const now = Date.now();
  const connectionData = connectionLimits.get(ip) || { count: 0, firstRequest: now };

  if (now - connectionData.firstRequest > connectionWindowTime) {
    connectionLimits.set(ip, { count: 1, firstRequest: now });
  } else {
    if (connectionData.count > connectionLimit) {
      return true;
    }
    connectionLimits.set(ip, { count: connectionData.count + 1, firstRequest: connectionData.firstRequest });
  }

  return false;
};

export function middleware(req) {
  const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown';
  
  if (rateLimit(ip)) {
    return new Response('Rate limit exceeded', { status: 429 });
  }

  if (connectionRateLimit(ip)) {
    return new Response('Connection limit exceeded', { status: 429 });
  }

  return NextResponse.next();
}