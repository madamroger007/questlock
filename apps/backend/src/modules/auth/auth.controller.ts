import { Context } from 'hono';
import { AuthService } from './auth.service.js';
import {
    RegisterDTO,
    LoginDTO,
    VerifyEmailDTO,
    ResendVerificationDTO,
    ForgotPasswordDTO,
    ResetPasswordDTO,
    LogOutDTO,
    ConfirmEmailDTO
} from '@/shared/types/auth.js';
import { reqAuthToken } from '@/core/utils/authorizen.js';
import { setAuthCookies, clearAuthCookies, REFRESH_TOKEN_COOKIE } from '@/core/permissions/auth-cookie.js';
import { getCookie } from 'hono/cookie';

export class AuthController {
    static async register(c: Context) {
        const body: RegisterDTO = await c.req.json();
        const result = await AuthService.register(body);
        return c.json({ success: true, data: result }, 201);
    }

    static async login(c: Context) {
        const body: LoginDTO = await c.req.json();
        const result = await AuthService.login(body);
        return c.json({ success: true, data: result }, 200);
    }

    static async callback(c: Context) {
        const body = await c.req.json();
        const result = await AuthService.handleAuthCallback(body.code);
        setAuthCookies(
            c,
            result.session.accessToken,
            result.session.refreshToken,
            result.session.expiresIn
        );
        return c.json({
            success: true,
            data: {
                user: result.user,
            },
        });
    }

    static async verifyEmail(c: Context) {
        const body: VerifyEmailDTO = await c.req.json();
        const result = await AuthService.verifyEmail(body);

        if (result.session) {
            setAuthCookies(
                c,
                result.session.accessToken,
                result.session.refreshToken,
                result.session.expiresIn
            );
        }

        return c.json({
            success: true, data: {
                message: result.message,
                user: result.session?.user
            }
        }, 200);
    }

    static async confirmEmail(c: Context) {
        const body =
            await c.req.json<ConfirmEmailDTO>();

        const result =
            await AuthService.confirmEmail(body);

        return c.json({
            success: true,
            data: result,
        });
    }

    static async resendVerification(c: Context) {
        const body: ResendVerificationDTO = await c.req.json();
        const result = await AuthService.resendVerification(body);
        return c.json({ success: true, data: result }, 200);
    }

    static async forgotPassword(c: Context) {
        const body: ForgotPasswordDTO = await c.req.json();
        const result = await AuthService.forgotPassword(body);
        return c.json({ success: true, data: result }, 200);
    }

    static async resetPassword(c: Context) {
        const token = reqAuthToken(c);
        const body: ResetPasswordDTO = await c.req.json();
        const result = await AuthService.resetPassword(token, body);

        return c.json({ success: true, data: result }, 200);
    }

    static async refreshToken(c: Context) {
        const refreshToken = getCookie(c, REFRESH_TOKEN_COOKIE);
        if (!refreshToken) {
            return c.json({ success: false, message: 'Refresh token not found' }, 401);
        }
        const result = await AuthService.refreshToken(refreshToken);
        setAuthCookies(
            c,
            result.accessToken,
            result.refreshToken,
            result.expiresIn
        );
        return c.json({ success: true, data: result }, 200);
    }

    static async logout(c: Context) {
        const body: LogOutDTO = await c.req.json();
        const result = await AuthService.logout(body.id);

        clearAuthCookies(c);
        return c.json({ success: true, data: result, }, 200);
    }

    static async me(c: Context) {
        const user = c.get('user');

        const result =
            await AuthService.me(user.id);
        return c.json({ success: true, data: { result } }, 200);
    }
}