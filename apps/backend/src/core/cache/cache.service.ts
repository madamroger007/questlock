import { redis } from '@/config/redis.js';

export class CacheService {
    /**
     * Get cached value.
     *
     * Cache failure must never break application flow.
     */
    static async get<T>(key: string): Promise<T | null> {
        try {
            const value = await redis.get(key);

            if (value === null) {
                return null;
            }

            return JSON.parse(value) as T;
        } catch (error) {
            console.error('[CacheService] GET error:', {
                key,
                error,
            });

            return null;
        }
    }

    /**
     * Set cached value with TTL.
     */
    static async set<T>(
        key: string,
        value: T,
        ttlSeconds = 300,
    ): Promise<void> {
        if (ttlSeconds <= 0) {
            return;
        }

        try {
            await redis.set(
                key,
                JSON.stringify(value),
                {
                    EX: ttlSeconds,
                },
            );
        } catch (error) {
            console.error('[CacheService] SET error:', {
                key,
                error,
            });
        }
    }

    /**
     * Delete a cached value.
     */
    static async delete(key: string): Promise<void> {
        try {
            await redis.del(key);
        } catch (error) {
            console.error('[CacheService] DELETE error:', {
                key,
                error,
            });
        }
    }

    /**
     * Check whether a cache key exists.
     */
    static async has(key: string): Promise<boolean> {
        try {
            return (await redis.exists(key)) > 0;
        } catch (error) {
            console.error('[CacheService] EXISTS error:', {
                key,
                error,
            });

            return false;
        }
    }

    /**
     * Delete multiple cache keys.
     */
    static async deleteMany(keys: string[]): Promise<void> {
        if (keys.length === 0) {
            return;
        }

        try {
            await redis.del(keys);
        } catch (error) {
            console.error('[CacheService] DELETE MANY error:', {
                keysCount: keys.length,
                error,
            });
        }
    }

    /**
     * Clear the current Redis database.
     *
     * WARNING:
     * Do not use this in normal application flow.
     */
    static async clear(): Promise<void> {
        try {
            await redis.flushDb();
        } catch (error) {
            console.error('[CacheService] CLEAR error:', error);
        }
    }
}