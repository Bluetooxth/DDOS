import { unblockIp } from '../../utils/ipUtils';
import { captchaChallenges } from '../../middleware/rateLimit'; // Ensure middleware has this exported

export default async function handler(req, res) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const { captchaAnswer } = req.body;

    const challenge = captchaChallenges.get(ip);

    if (!challenge) {
        return res.status(400).json({ message: 'No CAPTCHA challenge found for this IP.' });
    }

    const currentTime = Date.now();

    // Check if the challenge is still valid
    if (currentTime - challenge.timestamp > captchaConfig.windowMs) {
        captchaChallenges.delete(ip);
        return res.status(400).json({ message: 'CAPTCHA challenge has expired.' });
    }

    // Validate CAPTCHA answer
    if (parseInt(captchaAnswer) === challenge.answer) {
        // Unblock the IP and remove from challenges
        unblockIp(ip);
        captchaChallenges.delete(ip);
        return res.status(200).json({ message: 'CAPTCHA solved. Your IP is now unblocked.' });
    }

    // Increment retry count
    challenge.retries += 1;

    if (challenge.retries >= captchaConfig.retryLimit) {
        captchaChallenges.delete(ip);
        return res.status(429).json({ message: 'CAPTCHA retry limit exceeded. Try again later.' });
    }

    return res.status(400).json({ message: 'CAPTCHA answer is incorrect. Please try again.' });
}
