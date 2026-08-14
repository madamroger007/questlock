import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { globalErrorHandler } from './core/errors/error-handler';
import { APP_CONSTANTS } from './config/constants';
import { authRoutes } from './modules/auth/auth.route';

const app = new Hono();

// Global Middlewares
app.use('*', logger());
app.use('*', cors());

// Error Handler
app.onError(globalErrorHandler);


// Register Modules
app.route(`${APP_CONSTANTS.API_PREFIX}/auth`, authRoutes);


export default app;