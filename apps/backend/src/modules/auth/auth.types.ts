import { z } from 'zod';
import {
    registerSchema,
    loginSchema,
    verifyEmailSchema,
    resendVerificationSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    refreshTokenSchema,
} from './auth.validation';

export type RegisterDTO = z.infer<typeof registerSchema>;
export type LoginDTO = z.infer<typeof loginSchema>;
export type LoginStepOneDTO = z.infer<typeof loginSchema>;
export type VerifyEmailDTO = z.infer<typeof verifyEmailSchema>;
export type ResendVerificationDTO = z.infer<typeof resendVerificationSchema>;
export type ForgotPasswordDTO = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordDTO = z.infer<typeof resetPasswordSchema>;
export type RefreshTokenDTO = z.infer<typeof refreshTokenSchema>;

export interface UserProfile {
    id: string;
    email: string;
    name?: string | undefined;
    role?: string;
    status?: string;
    avatar?: string;
}

export interface AuthSessionResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn?: number;
    user: UserProfile;
}