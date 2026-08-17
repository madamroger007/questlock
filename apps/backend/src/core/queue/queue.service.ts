import { redis } from '@/config/redis.js';
import type { AuthQueueJob } from './queue.types.js';

const AUTH_QUEUE = 'questlock:queue:auth';

export class AuthQueue {
    static async push(job: AuthQueueJob): Promise<void> {
        try {
            await redis.lPush(
                AUTH_QUEUE,
                JSON.stringify(job)
            );
        } catch (error) {
            console.error('Auth queue error:', error);
        }
    }
}