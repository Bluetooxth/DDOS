import { generateCaptcha } from '../utils/captchaUtils'; // Make sure this function is defined

export function middleware(req) {
    const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';

    const challenge = generateCaptcha(); // Generate CAPTCHA

    return new NextResponse.json({
        message: 'Please solve CAPTCHA',
        captcha: challenge,
    }, { status: 403 }); // Use an appropriate status code
}
