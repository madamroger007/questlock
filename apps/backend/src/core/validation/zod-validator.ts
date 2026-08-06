import { Context, MiddlewareHandler } from 'hono';
import { ZodSchema } from 'zod';
import { AppError } from '../errors/custom-error.js';

export const validateBody = <T>(schema: ZodSchema<T>): MiddlewareHandler => {
    return async (c: Context, next) => {
        try {
            const body = await c.req.json();
            const parsed = schema.safeParse(body);

            if (!parsed.success) {
                const firstError = parsed.error.issues[0]?.message || 'Input tidak valid';
                throw new AppError(firstError, 400);
            }

            c.set('validBody', parsed.data);
            await next();
        } catch (err: any) {
            if (err instanceof AppError) throw err;
            throw new AppError('Body request harus berupa JSON yang valid', 400);
        }
    };
};