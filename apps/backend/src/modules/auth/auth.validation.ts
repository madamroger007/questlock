import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email({ message: 'Format email tidak valid' }),
    password: z.string().min(8, { message: 'Password minimal 8 karakter' }),
    confirmPassword: z.string().min(8, { message: 'Konfirmasi password minimal 8 karakter' }),
    name: z.string().min(2, { message: 'Nama minimal 2 karakter' }),
});

export const loginSchema = z.object({
    email: z.string().email({ message: 'Format email tidak valid' }),
    password: z.string().min(1, { message: 'Password wajib diisi' }),
});

export const verifyEmailSchema = z.object({
    email: z.string().email({ message: 'Format email tidak valid' }),
    token: z.string().min(6, { message: 'Token OTP/Verifikasi minimal 6 karakter' }),
    type: z.enum(['signup', 'recovery', 'email']).default('signup'),
});

export const resendVerificationSchema = z.object({
    email: z.string().email({ message: 'Format email tidak valid' }),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: 'Format email tidak valid' }),
    redirectUrl: z.string().optional(),
});

export const resetPasswordSchema = z.object({
    newPassword: z.string().min(8, { message: 'Password baru minimal 8 karakter' }),
});

export const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1, { message: 'Refresh token wajib diisi' }),
});