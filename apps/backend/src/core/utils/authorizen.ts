import { Context } from 'hono';
import { AppError } from '../errors/app-error.js'; // Pastikan path ini benar

// Perhatikan tambahan ': string' di bawah ini
export const reqAuthToken = (c: Context): string => {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError('Unauthorized: No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
        throw new AppError('Unauthorized: Invalid token format', 401);
    }

    return token;
};