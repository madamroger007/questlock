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
    UserProfile,
    ConfirmEmailDTO
} from '@/shared/types/auth.js';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages.js';
import { CacheService } from '@/core/cache/cache.service.js';
import { CACHE_KEYS } from '@/core/cache/cache.keys.js';
import { AuthQueue } from '@/core/queue/queue.service.js';
import { logger } from '@/config/logger.js';
export class AuthService {
    static async register(dto: RegisterDTO) {
        const { data, error } = await AuthRepository.supabaseSignUp(dto);
        if (error) {
            throw new BadRequestError(error.message);
        }

        if (!data.user) {
            throw new BadRequestError(
                ERROR_MESSAGES.AUTH.REGISTRATION_FAILED
            );
        }

        const isEmailConfirmed =
            data.user.email_confirmed_at !== null;

        return {
            userId: data.user?.id,
            email: data.user?.email,
            isEmailConfirmed,
            requiresEmailVerification: isEmailConfirmed,
            message: isEmailConfirmed
                ? 'Registration successful.'
                : 'Registration successful. Please verify your email.',
        };
    }

    static async login(dto: LoginDTO) {
        const { data, error } = await AuthRepository.supabaseSignInWithPassword(dto);

        if (error || !data.user) {
            throw new UnauthorizedError(ERROR_MESSAGES.AUTH.UNAUTHORIZED);
        }

        const { error: otpError } = await AuthRepository.supabaseSignInWithOtp(dto.email);

        if (otpError) {
            throw new BadRequestError(ERROR_MESSAGES.AUTH.OTP_SEND_FAILED);
        }

        await AuthQueue.push({
            type: 'auth.login',
            payload: {
                userId: data.user.id,
                email: data.user.email!,
            },
        }).catch((err) => {
            logger.error('Failed to push auth.login job to queue:', err);
        });

        return {
            requiresOtp: true,
            email: data.user.email,
            message: 'Password valid. OTP have been sent to your email for verification.',
        };
    }

    static async handleAuthCallback(code: string) {
        if (!code) {
            throw new BadRequestError(
                ERROR_MESSAGES.AUTH.EMAIL_VERIFICATION_FAILED
            );
        }

        const { data, error } = await AuthRepository.exchangeCodeSession(code);

        if (
            error ||
            !data.user ||
            !data.session
        ) {
            throw new BadRequestError(
                ERROR_MESSAGES.AUTH.EMAIL_VERIFICATION_FAILED
            );
        }

        const user: UserProfile = {
            id: data.user.id,
            email: data.user.email!,
            role:
                data.user.user_metadata?.role ||
                'USER',
        };

        await CacheService.set(
            CACHE_KEYS.user(user.id),
            user,
            300
        );

        await AuthQueue.push({
            type: 'auth.login.success',
            payload: {
                userId: user.id,
                email: user.email,
            },
        });

        return {
            user,
            session: {
                accessToken: data.session.access_token,
                refreshToken: data.session.refresh_token,
                expiresIn: data.session.expires_in,
            },
        };
    }

    static async verifyEmail(dto: VerifyEmailDTO) {
        let { data, error } = await AuthRepository.supabaseVerifyOtp(dto);
        if (error || !data.user || !data.session) {
            throw new BadRequestError(
                ERROR_MESSAGES.AUTH.EMAIL_VERIFICATION_FAILED
            );
        }

        const user: UserProfile = {
            id: data.session.user.id,
            email: data.session.user.email!,
            role:
                data.session.user.user_metadata?.role ||
                'USER',
        };

        try {
            await CacheService.set(
                CACHE_KEYS.user(user.id),
                user,
                300
            );
        } catch (error) {
            logger.error(
                '[REDIS] Failed to cache user:' + error
            );
        }

        AuthQueue.push({
            type: 'auth.login.success',
            payload: {
                userId: user.id,
                email: user.email,
            },
        }).catch((err) => {
            logger.error(
                'Failed to push auth.login.success job to queue:' +
                err
            );
        });


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

    static async confirmEmail(
        dto: ConfirmEmailDTO
    ) {
        const { data, error } =
            await AuthRepository.supabaseConfirmEmail(
                dto.tokenHash
            );

        if (
            error ||
            !data.user
        ) {
            throw new BadRequestError(
                ERROR_MESSAGES.AUTH
                    .EMAIL_VERIFICATION_FAILED
            );
        }

        const user: UserProfile = {
            id: data.user.id,
            email: data.user.email!,
            role:
                data.user.user_metadata?.role ||
                'USER',
        };

        await CacheService.set(
            CACHE_KEYS.user(user.id),
            user,
            300
        );

        void AuthQueue.push({
            type: 'auth.login.success',
            payload: {
                userId: user.id,
                email: user.email,
            },
        });

        return {
            message:
                'Email successfully verified.',

            user,
        };
    }

    static async resendVerification(dto: ResendVerificationDTO) {
        const { error } = await AuthRepository.resendVerificationEmail(dto);
        if (error) throw new BadRequestError(ERROR_MESSAGES.AUTH.EMAIL_VERIFICATION_FAILED);
        return { message: 'Code/Email verification has been resent.' };
    }

    static async forgotPassword(dto: ForgotPasswordDTO) {
        const { email } = dto;
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw new BadRequestError(ERROR_MESSAGES.AUTH.PASSWORD_RESET_FAILED);

        return { message: 'Link/Instructions for resetting password have been sent to your email.' };
    }

    static async resetPassword(jwtToken: string | undefined, dto: ResetPasswordDTO) {
        if (!jwtToken) {
            throw new UnauthorizedError(ERROR_MESSAGES.AUTH.PASSWORD_RESET_FAILED);
        }

        const { data: userData, error: userError } = await supabase.auth.getUser(jwtToken);

        if (userError || !userData.user) {
            throw new UnauthorizedError(ERROR_MESSAGES.AUTH.PASSWORD_RESET_FAILED);
        }
        await AuthRepository.supabaseResetPassword(userData.user.id, dto.newPassword);

        try {
            await CacheService.delete(CACHE_KEYS.user(userData.user.id));
        } catch (error) {
            logger.error('[REDIS] Failed to invalidate user cache:' + error);
        }

        AuthQueue.push({
            type: 'auth.password.reset',
            payload: {
                userId: userData.user.id,
            },
        }).catch((err) => {
            logger.error('Failed to push auth.password.reset job to queue:' + err);
        });

        return {
            message:
                'Password successfully updated.',
        };
    }


    static async refreshToken(refreshToken: string) {
        if (!refreshToken) {
            throw new UnauthorizedError(ERROR_MESSAGES.AUTH.UNAUTHORIZED);
        }
        const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });

        if (error || !data.session) {
            throw new UnauthorizedError(ERROR_MESSAGES.AUTH.UNAUTHORIZED);
        }

        const user: UserProfile = {
            id: data.session.user.id,
            email:
                data.session.user.email!,
            role:
                data.session.user.user_metadata?.role ||
                'USER',
        };

        return {
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
            expiresIn: data.session.expires_in,
            user: user,
        };
    }

    static async logout(userId: string) {
        try {
            await CacheService.delete(CACHE_KEYS.user(userId));
        } catch (error) {
            logger.error('[REDIS] Failed to clear user cache:' + error);
        }

        AuthQueue.push({
            type: 'auth.logout',
            payload: {
                userId,
            },
        }).catch((error) => {
            logger.error('[AUTH_QUEUE] logout event failed:' + error);
        });

        return {
            message:
                'Logout successful.',
        };
    }


    static async me(userId: string) {
        const cacheKey = CACHE_KEYS.user(userId);
        try {
            const cached = await CacheService.get<UserProfile>(cacheKey);

            if (cached) {
                return cached;
            }
        } catch (error) {
            logger.error('[REDIS] Failed to fetch user from cache:' + error);
        }

        const user = await AuthRepository.findUserById(userId);


        if (!user) {
            throw new NotFoundError(ERROR_MESSAGES.AUTH.USER_NOT_FOUND);
        }
        try {
            await CacheService.set(
                cacheKey,
                user,
                300
            );
        } catch (error) {
            logger.error('[REDIS] Failed to cache user:' + error);
        }

        return user;
    }
}