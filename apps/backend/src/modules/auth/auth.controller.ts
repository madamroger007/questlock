import { Context } from 'hono';
import { AuthService } from './auth.service.js';
import {
    RegisterDTO,
    LoginDTO,
    VerifyEmailDTO,
    ResendVerificationDTO,
    ForgotPasswordDTO,
    ResetPasswordDTO,
    RefreshTokenDTO
} from '@/shared/types/auth.js';
import { reqAuthToken } from '@/core/utils/authorizen.js';

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

    static async loginStepOne(c: Context) {
        const body: LoginDTO = await c.req.json();
        const result = await AuthService.loginStepOne(body);
        return c.json({ success: true, data: result }, 200);
    }


    static async verifyEmail(c: Context) {
        const body: VerifyEmailDTO = await c.req.json();
        const result = await AuthService.verifyEmail(body);
        return c.json({ success: true, data: result }, 200);
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
        const body: RefreshTokenDTO = await c.req.json();
        const result = await AuthService.refreshToken(body);
        return c.json({ success: true, data: result }, 200);
    }

    static async logout(c: Context) {
        const result = await AuthService.logout();
        return c.json({ success: true, data: result }, 200);
    }
}