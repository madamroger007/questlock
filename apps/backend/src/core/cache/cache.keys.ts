import { createHash } from 'node:crypto';

function hashIdentifier(value: string): string {
    return createHash('sha256')
        .update(value.trim().toLowerCase())
        .digest('hex');
}

export const CACHE_KEYS = {
    user: (userId: string) =>
        `auth:user:${userId}`,

    loginAttempt: (email: string) =>
        `auth:login-attempt:${hashIdentifier(email)}`,

    otpCooldown: (email: string) =>
        `auth:otp-cooldown:${hashIdentifier(email)}`,
} as const;