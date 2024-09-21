const requestLog = new Map(); // To store IP request data

/**
 * Tracks and limits the number of requests from a given IP.
 * 
 * @param {string} ip - The IP address of the client making the request.
 * @param {number} limit - Maximum number of requests allowed within the windowMs timeframe.
 * @param {number} windowMs - The time window in milliseconds (e.g., 90 seconds).
 * 
 * @returns {object} - Object containing 'allowed' (boolean) and 'remainingTime' (milliseconds)
 */
export function checkRateLimit(ip, limit, windowMs) {
    const currentTime = Date.now();
    const requestInfo = requestLog.get(ip) || { count: 0, firstRequestTime: currentTime };

    // If time window has passed, reset the request count for the IP
    if (currentTime - requestInfo.firstRequestTime > windowMs) {
        requestInfo.count = 1;  // Reset request count
        requestInfo.firstRequestTime = currentTime;
    } else {
        requestInfo.count += 1; // Increment request count within the window
    }

    requestLog.set(ip, requestInfo);

    // If request count exceeds limit, block the IP
    if (requestInfo.count > limit) {
        return {
            allowed: false,
            remainingTime: windowMs - (currentTime - requestInfo.firstRequestTime) // Time left to reset the limit
        };
    }

    return { allowed: true, remainingTime: 0 };
}

/**
 * Removes an IP from the request log (unblocks after a time window).
 * @param {string} ip - The IP address to remove.
 */
export function resetRateLimit(ip) {
    requestLog.delete(ip);
}

/**
 * Gets the current number of requests an IP has made within the time window.
 * 
 * @param {string} ip - The IP address of the client making the request.
 * @returns {number} - The current request count for the IP.
 */
export function getRequestCount(ip) {
    const requestInfo = requestLog.get(ip);
    return requestInfo ? requestInfo.count : 0;
}