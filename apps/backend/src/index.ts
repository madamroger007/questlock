import { serve } from '@hono/node-server';
import app from './app';
import { connectRedis } from './config/redis.js';

async function bootstrap() {
  await connectRedis();
  serve({
    fetch: app.fetch,
    port: Number(process.env.PORT ?? 3000),
  });

  console.log(
    `Server running on port ${process.env.PORT ?? 3000}`,
  );
}

bootstrap().catch((error) => {
  console.error('[Bootstrap] Failed to start application:', error);
  process.exit(1);
});