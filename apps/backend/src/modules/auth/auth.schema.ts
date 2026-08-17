import { z } from 'zod';
// change to language english
export const registerSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Password and confirm password do not match',
    path: ['confirmPassword'],
});

export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(1, { message: 'Password is required' }),
});

export const callbackSchema = z.object({
    code: z.string().min(1, { message: 'Verification code is required' }),
});

export const verifyEmailSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    token: z.string().min(6, { message: 'Token OTP/Verification must be at least 6 characters long' }),
    type: z.enum(['signup', 'recovery', 'email']).default('signup'),
});

export const confirmEmailSchema = z.object({
    tokenHash: z.string().min(6, { message: 'Token OTP/Verification must be at least 6 characters long' }),
    type: z.enum(['signup', 'recovery', 'email']).default('signup'),

})

export const resendVerificationSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    type: z.enum(['signup', 'email_change']).default('signup'),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
});


export const resetPasswordSchema = z.object({
    newPassword: z.string().min(8, { message: 'New password must be at least 8 characters long' }),
});

export const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1, { message: 'Refresh token is required' }),
});