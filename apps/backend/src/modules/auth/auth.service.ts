import { env } from '@/config/env.js';
import { supabase } from '../../config/supabase.js';
import { AppError } from '../../core/errors/custom-error.js';
import { AuthRepository } from './auth.repository.js';
import {
    RegisterDTO,
    LoginDTO,
    VerifyEmailDTO,
    ResendVerificationDTO,
    ForgotPasswordDTO,
    ResetPasswordDTO,
    RefreshTokenDTO,
    AuthSessionResponse,
    UserProfile,
    VerifyType,
} from '../../shared/types/auth.js';
export class AuthService {
    static async register(dto: RegisterDTO) {
        const { data, error } = await AuthRepository.supabaseSignUp(dto);
        if (error) throw new AppError(error.message, 400);

        if (data.user) {
            await AuthRepository.createUserProfile(data.user as UserProfile);
        }

        return {
            userId: data.user?.id,
            email: data.user?.email,
            isEmailConfirmed: data.user?.email_confirmed_at != null,
            message: 'Registrasi Success. Lets verify your email to activate your account.',
        };
    }
    
    static async login(dto: LoginDTO): Promise<AuthSessionResponse> {
        const { data, error } = await AuthRepository.supabaseSignInWithPassword(dto);
        if (error || !data.session || !data.user) {
            const msg = error?.message || 'Login gagal, periksa email dan password Anda.';
            throw new AppError(msg, 401);
        }

        let userProfile = await AuthRepository.findUserById(data.user.id);

        if (!userProfile) {
            userProfile = {
                id: data.user.id,
                email: data.user.email!,
                role: data.user.user_metadata?.role || 'USER',
            };
        }

        return {
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
            expiresIn: data.session.expires_in,
            user: userProfile,
        };
    }

    static async loginStepOne(dto: LoginDTO) {

        const { data, error } = await AuthRepository.supabaseSignInWithPassword(dto);

        if (error || !data.user) {
            throw new AppError('Email atau password salah.', 401);
        }

        await supabase.auth.signOut();

        const { error: otpError } = await AuthRepository.supabaseSignInWithOtp(dto.email);

        if (otpError) {
            throw new AppError(`Gagal mengirim OTP: ${otpError.message}`, 400);
        }

        return {
            requiresOtp: true,
            email: data.user.email,
            message: 'Password valid. OTP have been sent to your email for verification.',
        };
    }

    static async verifyEmail(dto: VerifyEmailDTO) {
        let { data, error } = await AuthRepository.supabaseVerifyOtp(dto);
        if (error) {
            const retryVerify = await AuthRepository.supabaseVerifyOtp(dto);
            if (retryVerify.error) {
                throw new AppError(`Verification failed: ${error.message}`, 400);
            }
            data = retryVerify.data;
        }

        return {
            message: 'Email successfully verified.',
            session: data.session
                ? {
                    accessToken: data.session.access_token,
                    refreshToken: data.session.refresh_token,
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
        const { email } = dto;

        const { error } = await supabase.auth.resend({
            type: 'signup',
            email,
        });

        if (error) throw new AppError(error.message, 400);

        return { message: 'Kode/Email verifikasi berhasil dikirim ulang.' };
    }

    static async forgotPassword(dto: ForgotPasswordDTO) {
        const { email, redirectUrl } = dto;
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: redirectUrl || env.URL_PUBLIC_APP,
        });
        if (error) throw new AppError(error.message, 400);

        return { message: 'Tautan/Petunjuk reset password telah dikirim ke email Anda.' };
    }

    static async resetPassword(jwtToken: string | undefined, dto: ResetPasswordDTO) {
        const { newPassword } = dto;
        if (!jwtToken) {
            throw new AppError('Token is empty', 401);
        }
        const { error: sessionError } = await supabase.auth.setSession({
            access_token: jwtToken,
            refresh_token: jwtToken,
        });

        if (sessionError) {
            throw new AppError('Token password reset is invalid or expired', 401);
        }

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) throw new AppError(error.message, 400);

        return { message: 'Password successfully updated.' };
    }

    static async refreshToken(dto: RefreshTokenDTO) {
        const { refreshToken } = dto;
        const { data, error } = await supabase.auth.refreshSession({
            refresh_token: refreshToken,
        });

        if (error || !data.session) {
            throw new AppError('Refresh token tidak valid atau kadaluarsa', 401);
        }

        return {
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
            expiresIn: data.session.expires_in,
        };
    }

    static async logout() {
        await supabase.auth.signOut();
        return { message: 'Berhasil logout.' };
    }
}