import { z } from 'zod';
import {
    registerSchema,
    loginSchema,
    verifyEmailSchema,
    resendVerificationSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    refreshTokenSchema,
} from '../../modules/auth/auth.schema';

export type RegisterDTO = z.infer<typeof registerSchema>;
export type ConfirmSignupDTO = {
    tokenHash: string
};
export type LoginDTO = z.infer<typeof loginSchema>;
export type LogOutDTO = { id: string; };
export type LoginStepOneDTO = z.infer<typeof loginSchema>;
export type VerifyEmailDTO = z.infer<typeof verifyEmailSchema>;
export type ResendVerificationDTO = z.infer<typeof resendVerificationSchema>;
export type ForgotPasswordDTO = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordDTO = z.infer<typeof resetPasswordSchema>;
export type RefreshTokenDTO = z.infer<typeof refreshTokenSchema>;

export type UserRole = 'ADMIN' | 'USER' | 'GUEST' | string;

export type UserProfile = {
    id: string;
    email: string;
    name?: string | undefined;
    role?: UserRole;
    status?: 'ACTIVE' | 'INACTIVE';
    avatar?: string | null;
};

export type UserSession = {
    accessToken: string;
    refreshToken: string;
    user: UserProfile;
};


export interface AuthSessionResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn?: number;
    user: UserProfile;
}

export type VerifyType = 'signup' | 'email' | 'recovery' | 'magiclink' | 'invite' | 'phone_change' | 'email_change' | string;