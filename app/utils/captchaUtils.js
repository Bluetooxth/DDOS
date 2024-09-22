export function generateCaptcha() {
    // Example: generate a simple numeric CAPTCHA
    const captcha = Math.floor(1000 + Math.random() * 9000); // 4-digit number
    // Store the captcha for verification if needed (e.g., in memory or a cache)
    return captcha.toString();
}

// Add more utility functions for CAPTCHA validation as needed
