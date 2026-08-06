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
} from './auth.types.js';

export class AuthService {
    /**
     * 1. Register User Baru
     */
    static async register(dto: RegisterDTO) {
        const { email, password, confirmPassword, name } = dto;

        if (password !== confirmPassword) {
            throw new AppError('Password mismatch', 400);
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: name || email.split('@')[0],
                },
            },
        });

        if (error) throw new AppError(error.message, 400);

        const { error: otpError } = await supabase.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: false, // Karena user baru saja dibuat lewat signUp
            }
        });

        // Sinkronisasi profil ke tabel public.users
        if (data.user) {
            await AuthRepository.createUserProfile({
                id: data.user.id,
                email: data.user.email!,
                name: name || email.split('@')[0],
            });
        }

        return {
            userId: data.user?.id,
            email: data.user?.email,
            isEmailConfirmed: data.user?.email_confirmed_at != null,
            message: 'Registrasi Success. Lets verify your email to activate your account.',
        };
    }

    /**
     * 2. Login User
     */
    static async login(dto: LoginDTO): Promise<AuthSessionResponse> {
        const { email, password } = dto;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error || !data.session) {
            const msg = error?.message || 'Login gagal, periksa email dan password Anda.';
            throw new AppError(msg, 401);
        }

        // Ambil detail profil user dari database
        let userProfile = await AuthRepository.findUserById(data.user.id);

        if (!userProfile) {
            userProfile = {
                id: data.user.id,
                email: data.user.email!,
                name: data.user.user_metadata?.name || '',
                role: 'USER',
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
        const { email, password } = dto;

        // Validasi email & password dengan Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error || !data.user) {
            throw new AppError('Email atau password salah.', 401);
        }

        // Segera sign out sesi sementara agar user belum dianggap login penuh sebelum OTP
        await supabase.auth.signOut();

        // Atau gunakan fungsi bawaan Supabase: supabase.auth.signInWithOtp
        const { error: otpError } = await supabase.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: false,
            },
        });

        if (otpError) {
            throw new AppError(`Gagal mengirim OTP: ${otpError.message}`, 400);
        }

        return {
            requiresOtp: true,
            email: data.user.email,
            message: 'Password benar. Kode OTP verifikasi telah dikirim ke email Anda.',
        };
    }


    /**
     * 3. Verifikasi Email via OTP / Token
     */
    static async verifyEmail(dto: VerifyEmailDTO) {
        const { email, token, type } = dto;
        const otpType = type === 'email' ? 'email' : (type || 'signup');
        console.log(`Verifying email: ${email}, token: ${token}, type: ${otpType}`);
        let { data, error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: otpType as any,
        });

        if (error) {
            const fallbackType = otpType === 'signup' ? 'email' : 'signup';

            const retryVerify = await supabase.auth.verifyOtp({
                email,
                token,
                type: fallbackType as any,
            });

            if (retryVerify.error) {
                throw new AppError(`Verification failed: ${error.message}`, 400);
            }

            // Jika fallback berhasil, gunakan data dari retryVerify
            data = retryVerify.data;
        }

        return {
            message: 'Email berhasil diverifikasi.',
            session: data.session
                ? {
                    accessToken: data.session.access_token,
                    refreshToken: data.session.refresh_token,
                }
                : null,
        };
    }

    /**
     * 4. Kirim Ulang Email / OTP Verifikasi
     */
    static async resendVerification(dto: ResendVerificationDTO) {
        const { email } = dto;

        const { error } = await supabase.auth.resend({
            type: 'signup',
            email,
        });

        if (error) throw new AppError(error.message, 400);

        return { message: 'Kode/Email verifikasi berhasil dikirim ulang.' };
    }

    /**
     * 5. Lupa Password
     */
    static async forgotPassword(dto: ForgotPasswordDTO, redirectUrl?: string) {
        const { email } = dto;

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.URL_PUBLIC_APP}/auth/callback`,
        });

        if (error) throw new AppError(error.message, 400);

        return { message: 'Tautan/Petunjuk reset password telah dikirim ke email Anda.' };
    }

    /**
     * 6. Reset Password Baru
     */
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

    /**
     * 7. Refresh Token
     */
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

    /**
     * 8. Logout User
     */
    static async logout() {
        await supabase.auth.signOut();
        return { message: 'Berhasil logout.' };
    }
}