import { redis } from '@/config/redis.js';
import type { AuthQueueJob } from './queue.types.js';

const AUTH_QUEUE = 'questlock:queue:auth';

export class AuthQueue {
    static async push(job: AuthQueueJob): Promise<void> {
        try {
            await redis.lpush(
                AUTH_QUEUE,
                JSON.stringify(job)
            );
        } catch (error) {
            /**
             * Queue merupakan background processing.
             * Jangan membuat login gagal hanya karena
             * Redis Queue sedang bermasalah.
             */
            console.error('Auth queue error:', error);
        }
    }
}