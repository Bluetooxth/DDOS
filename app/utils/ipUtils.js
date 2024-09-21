const blockedIps = new Set();

/**
 * Block an IP address.
 * @param {string} ip - The IP address to block.
 */
export function blockIp(ip) {
    blockedIps.add(ip);
}

/**
 * Check if an IP address is blocked.
 * @param {string} ip - The IP address to check.
 * @returns {boolean} - True if the IP is blocked, false otherwise.
 */
export function isIpBlocked(ip) {
    return blockedIps.has(ip);
}

/**
 * Unblock an IP address.
 * @param {string} ip - The IP address to unblock.
 */
export function unblockIp(ip) {
    blockedIps.delete(ip);
}
