import { env } from '@/config';
import type { Context } from 'hono';
import { setCookie, deleteCookie } from 'hono/cookie';

export const ACCESS_TOKEN_COOKIE = 'questlock_access_token';
export const REFRESH_TOKEN_COOKIE = 'questlock_refresh_token';

const IS_PRODUCTION = env.NODE_ENV === 'production';

export function setAuthCookies(
    c: Context,
    accessToken: string,
    refreshToken: string,
    expiresIn: number
): void {
    // Access Token
    setCookie(c, ACCESS_TOKEN_COOKIE, accessToken, {
        httpOnly: true,
        secure: IS_PRODUCTION,
        sameSite: 'Lax',
        path: '/',
        maxAge: expiresIn,
    });

    // Refresh Token
    setCookie(c, REFRESH_TOKEN_COOKIE, refreshToken, {
        httpOnly: true,
        secure: IS_PRODUCTION,
        sameSite: 'Lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
    });
}

export function clearAuthCookies(c: Context): void {
    deleteCookie(c, ACCESS_TOKEN_COOKIE, {
        path: '/',
    });

    deleteCookie(c, REFRESH_TOKEN_COOKIE, {
        path: '/',
    });
}