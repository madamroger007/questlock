import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email({ message: 'Format email tidak valid' }),
    password: z.string().min(8, { message: 'Password minimal 8 karakter' }),
    confirmPassword: z.string().min(8, { message: 'Konfirmasi password minimal 8 karakter' }),
    name: z.string().min(2, { message: 'Nama minimal 2 karakter' }).optional(),
});

export const loginSchema = z.object({
    email: z.string().email({ message: 'Format email tidak valid' }),
    password: z.string().min(1, { message: 'Password wajib diisi' }),
    confirmPassword: z.string().min(1, { message: 'Konfirmasi password wajib diisi' }),

});

export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: 'Format email tidak valid' }),
});

export const resetPasswordSchema = z.object({
    newPassword: z.string().min(8, { message: 'Password baru minimal 8 karakter' }),
    confirmPassword: z.string().min(8, { message: 'Konfirmasi password baru minimal 8 karakter' }),
});

export const verifyEmailSchema = z.object({
    email: z.string().email({ message: 'Format email tidak valid' }),
    token: z.string().min(6, { message: 'Token/OTP tidak valid' }),
    type: z.enum(['signup', 'recovery', 'email_change']).default('signup'),
});

export const resendVerificationSchema = z.object({
    email: z.string().email({ message: 'Format email tidak valid' }),
});

export const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1, { message: 'Refresh token wajib diisi' }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type ResendVerificationInput = z.infer<typeof resendVerificationSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;