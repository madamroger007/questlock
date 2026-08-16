import { createClient, type RedisClientType } from 'redis';

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
    throw new Error(
        '[Redis] REDIS_URL is not configured.'
    );
}

export const redis: RedisClientType = createClient({
    url: REDIS_URL,
    socket: {
        reconnectStrategy(retries) {
            const delay = Math.min(retries * 500, 5000);

            console.warn(
                `[Redis] Reconnecting in ${delay}ms...`
            );

            return delay;
        },
    },
});

redis.on('connect', () => {
    console.log('[Redis] Connecting...');
});

redis.on('ready', () => {
    console.log('[Redis] Ready');
});

redis.on('reconnecting', () => {
    console.warn('[Redis] Reconnecting...');
});

redis.on('error', (error) => {
    console.error('[Redis] Client error:', error);
});

redis.on('end', () => {
    console.warn('[Redis] Connection closed');
});

export async function connectRedis(): Promise<void> {
    if (redis.isOpen) {
        return;
    }

    await redis.connect();

    console.log('[Redis] Connected');
}

export async function disconnectRedis(): Promise<void> {
    if (!redis.isOpen) {
        return;
    }

    await redis.quit();

    console.log('[Redis] Disconnected');
}