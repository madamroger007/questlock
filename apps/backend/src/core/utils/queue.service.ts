import { Client } from '@upstash/qstash';
import { env, isProd } from '../../config/env.js';

const qstashClient = isProd && env.QSTASH_TOKEN
    ? new Client({ token: env.QSTASH_TOKEN })
    : null;

export class QueueService {
    /**
     * @param endpoint Path endpoint worker, misal: '/api/notifications/worker'
     * @param payload Data JSON yang akan dikirim
     * @param delaySeconds Opsional: Tunda eksekusi (misal: kirim email 5 detik lagi)
     */
    static async publish(endpoint: string, payload: any, delaySeconds?: number): Promise<void> {
        if (qstashClient) {
            // PROD: Lempar ke QStash Vercel
            // Ganti domain ini dengan domain Vercel asli Anda nanti!
            const targetUrl = `https://api.questlock.com${endpoint}`;

            await qstashClient.publishJSON({
                url: targetUrl,
                body: payload,
                ...(delaySeconds !== undefined && { delay: delaySeconds }), // Dukungan delay native!
                retries: 3, // Coba lagi 3x jika Hono error
            });
        } else {
            // LOKAL: Tembak endpoint Hono di localhost
            const targetUrl = `${env.APP_URL}${endpoint}`;
            console.log(`🚀 [Local Queue] Menyiapkan antrean ke: ${targetUrl}`);

            // Fire and forget menggunakan setTimeout
            setTimeout(() => {
                fetch(targetUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                }).catch(err => console.error(`❌ [Local Queue] Gagal mengeksekusi worker`, err));
            }, (delaySeconds || 0) * 1000);
        }
    }
}