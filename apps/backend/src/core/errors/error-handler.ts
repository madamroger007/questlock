import { ErrorHandler } from 'hono';
import { AppError } from './app-error.js';
import { env } from '@/config';
import { sendErrorToDiscord } from '../utils/error-notifier.js';

export const globalErrorHandler: ErrorHandler = (err, c) => {
    const isDev = env.NODE_ENV === 'development';

    if (err instanceof AppError) {
        if (isDev) console.warn(`${err.code}: ${err.message}`);
        return c.json({
            success: false,
            code: err.code,
            message: err.message,
            ...(err.details && { details: err.details }),
        }, err.statusCode as any);
    }

    if (err.name === 'ZodError') {
        return c.json({ success: false, code: 'VALIDATION_ERROR', message: 'Input not valid', details: (err as any).issues }, 400);
    }

    console.error(`[CRITICAL ERROR]:`, err);

    const requestUrl = c.req.url;

    if (c.executionCtx) {
        c.executionCtx.waitUntil(sendErrorToDiscord(err, requestUrl));
    } else {
        sendErrorToDiscord(err, requestUrl).catch(console.error);
    }

    return c.json(
        {
            success: false,
            code: 'INTERNAL_SERVER_ERROR',
            message: isDev ? err.message : 'An internal server error occurred',
            ...(isDev && { stack: err.stack }),
        },
        500
    );
};