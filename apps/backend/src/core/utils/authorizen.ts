import { Context } from 'hono';
import { AppError } from '../errors/app-error.js'; // Pastikan path ini benar
import { getCookie } from 'hono/cookie';
import { ACCESS_TOKEN_COOKIE } from '../permissions/auth-cookie.js';

export const reqAuthToken = (c: Context): string => {
    const cookieToken = getCookie(
        c,
        ACCESS_TOKEN_COOKIE
    );
    const authorization = c.req.header('Authorization');

    if (cookieToken) {
        return cookieToken;
    }

    if (
        authorization &&
        authorization.startsWith('Bearer ')
    ) {
        const token =
            authorization.slice(7).trim();

        if (token) {
            return token;
        }
    }


    throw new AppError(
        'Unauthorized: No token provided',
        401
    );
};