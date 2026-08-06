import { ErrorHandler } from 'hono';
import { AppError } from '../errors/custom-error.js';

export const globalErrorHandler: ErrorHandler = (err, c) => {
    console.error(`[ERROR]: ${err.message}`);

    if (err instanceof AppError) {
        return c.json({ success: false, message: err.message }, err.statusCode);
    }

    return c.json(
        {
            success: false,
            message: 'Internal Server Error',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined,
        },
        500
    );
};