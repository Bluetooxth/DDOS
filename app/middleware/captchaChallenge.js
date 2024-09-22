import { NextResponse } from 'next/server';
import { generateCaptcha } from '../utils/captchaUtils';

export function middleware(req) {
    const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';
    
    const challenge = generateCaptcha();
    
    return NextResponse.json({ message: 'Please solve CAPTCHA', captcha: challenge });
}