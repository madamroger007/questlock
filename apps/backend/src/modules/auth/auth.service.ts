import { env } from '@/config/env.js';
import { supabase } from '../../config/supabase.js';
import { BadRequestError, InternalServerError, NotFoundError, UnauthorizedError } from '../../core/errors/app-error.js';
import { AuthRepository } from './auth.repository.js';
import {
    RegisterDTO,
    LoginDTO,
    VerifyEmailDTO,
    ResendVerificationDTO,
    ForgotPasswordDTO,
    ResetPasswordDTO,
    RefreshTokenDTO
} from '@/shared/types/auth.js';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages.js';

export class AuthService {
    static async register(dto: RegisterDTO) {
        const { data, error } = await AuthRepository.supabaseSignUp(dto);
        if (error) {
            throw new NotFoundError(ERROR_MESSAGES.AUTH.USER_NOT_FOUND);
        }
        return {
            userId: data.user?.id,
            email: data.user?.email,
            isEmailConfirmed: data.user?.email_confirmed_at != null,
            message: 'Registrasi Success. Lets verify your email to activate your account.',
        };
    }

    static async login(dto: LoginDTO) {
        const { data, error } = await AuthRepository.supabaseSignInWithPassword(dto);
        console.log('Login data:', dto);
        if (error || !data.user) {
            throw new UnauthorizedError(ERROR_MESSAGES.AUTH.UNAUTHORIZED);
        }

        await supabase.auth.signOut();

        const { error: otpError } = await AuthRepository.supabaseSignInWithOtp(dto.email);

        if (otpError) {
            throw new BadRequestError(ERROR_MESSAGES.AUTH.OTP_SEND_FAILED);
        }

        return {
            requiresOtp: true,
            email: data.user.email,
            message: 'Password valid. OTP have been sent to your email for verification.',
        };
    }

    static async verifyEmail(dto: VerifyEmailDTO) {
        let { data, error } = await AuthRepository.supabaseVerifyOtp(dto);

        if (error || !data.user) {
            throw new BadRequestError(
                ERROR_MESSAGES.AUTH.EMAIL_VERIFICATION_FAILED
            );
        }

        return {
            message: 'Email successfully verified.',
            session: data.session
                ? {
                    accessToken: data.session.access_token,
                    refreshToken: data.session.refresh_token,
                    expiresIn: data.session.expires_in,
                    user: {
                        id: data.session.user.id,
                        email: data.session.user.email!,
                        role: data.session.user.user_metadata?.role || 'USER',
                    },
                }
                : null,
        };
    }

    static async resendVerification(dto: ResendVerificationDTO) {
        const { error } = await AuthRepository.resendVerificationEmail(dto);
        if (error) throw new BadRequestError(ERROR_MESSAGES.AUTH.EMAIL_VERIFICATION_FAILED);
        return { message: 'Code/Email verification has been resent.' };
    }

    static async forgotPassword(dto: ForgotPasswordDTO) {
        const { email, redirectUrl } = dto;
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: redirectUrl || env.URL_PUBLIC_APP,
        });
        if (error) throw new BadRequestError(ERROR_MESSAGES.AUTH.PASSWORD_RESET_FAILED);

        return { message: 'Link/Instructions for resetting password have been sent to your email.' };
    }

    static async resetPassword(jwtToken: string | undefined, dto: ResetPasswordDTO) {
        const { newPassword } = dto;
        if (!jwtToken) {
            throw new UnauthorizedError(ERROR_MESSAGES.AUTH.PASSWORD_RESET_FAILED);
        }
        const { error: sessionError } = await supabase.auth.setSession({
            access_token: jwtToken,
            refresh_token: jwtToken,
        });

        if (sessionError) {
            throw new UnauthorizedError(ERROR_MESSAGES.AUTH.PASSWORD_RESET_FAILED);
        }

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) throw new BadRequestError(ERROR_MESSAGES.AUTH.PASSWORD_RESET_FAILED);

        return { message: 'Password successfully updated.' };
    }

    static async refreshToken(dto: RefreshTokenDTO) {
        const { refreshToken } = dto;
        const { data, error } = await supabase.auth.refreshSession({
            refresh_token: refreshToken,
        });

        if (error || !data.session) {
            throw new UnauthorizedError(ERROR_MESSAGES.AUTH.UNAUTHORIZED);
        }

        return {
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
            expiresIn: data.session.expires_in,
        };
    }

    static async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) throw new InternalServerError(ERROR_MESSAGES.AUTH.LOGOUT_FAILED);
        return { message: 'Berhasil logout.' };
    }
}