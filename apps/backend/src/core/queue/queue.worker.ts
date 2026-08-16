import { redis } from '@/config/redis.js';
import type { AuthQueueJob } from './queue.types.js';

const QUEUE_KEY = 'questlock:queue';

async function processJob(job: AuthQueueJob) {
    switch (job.type) {
        case 'auth.login':
            console.log(
                `Processing auth.login for userId: ${job.payload.userId}, email: ${job.payload.email}`
            );
            // Implement your logic for auth.login here
            break;
        case 'auth.login.success':
            console.log(
                `Processing auth.login.success for userId: ${job.payload.userId}, email: ${job.payload.email}`
            );
        
    }
}

async function worker() {
    console.log('Queue worker started');

    while (true) {
        try {
            const result = await redis.rpop<string>(
                QUEUE_KEY
            );

            if (!result) {
                await new Promise(resolve =>
                    setTimeout(resolve, 1000)
                );

                continue;
            }

            const job = JSON.parse(result) as AuthQueueJob;

            await processJob(job);
        } catch (error) {
            console.error(
                'Queue worker error:',
                error
            );

            await new Promise(resolve =>
                setTimeout(resolve, 2000)
            );
        }
    }
}

worker();