import { serve } from '@hono/node-server';
import app from './app';
import { env } from './config/env';

serve({
  fetch: app.fetch,
  port: parseInt(env.PORT),
});

console.log(`Server running on http://localhost:${env.PORT}`);