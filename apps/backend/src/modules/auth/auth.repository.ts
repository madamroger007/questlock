import { AuthResponse } from '@supabase/supabase-js/dist/index.cjs';
import { supabase, supabaseAdmin } from '../../config/supabase';
import { RegisterDTO, UserProfile, UserRole, VerifyType } from '@/shared/types/auth.js';
import { env } from '@/config';
import { BadRequestError } from '@/core/errors/app-error';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

export class AuthRepository {
    static async findUserById(userId: string): Promise<UserProfile | null> {
        const { data, error } = await supabase
            .from('users')
            .select('id, email, name, role, status, avatar')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data as UserProfile;
    }

    static async createUserProfile(user: UserProfile): Promise<void> {
        const { error } = await supabaseAdmin.from('users').upsert({
            id: user.id,
            email: user.email,
            name: user.name || user.email.split('@')[0],
            role: user.role || 'USER',
            status: user.status || 'ACTIVE',
            avatar: user.avatar || null,
        });

        if (error) throw error;
    }

    static async getUserRole(userId: UserRole): Promise<UserProfile | null> {
        const { data, error } = await supabase
            .from('users')
            .select('role')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data?.role;

    }

    static async exchangeCodeSession(code: string) {
        return await supabase.auth.exchangeCodeForSession(code);
    }

    static async supabaseSignUp(data: RegisterDTO): Promise<AuthResponse> {
        const response = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    name: data.name || data.email.split('@')[0],
                },
                emailRedirectTo: `${env.URL_PUBLIC_APP}/auth/callback`,
            },
        });
        return response;
    }

    static async supabaseSignInWithOtp(email: string): Promise<AuthResponse> {
        const response = await supabase.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: false,
            }
        });
        return response;
    }

    static async supabaseSignInWithPassword(data: { email: string; password: string }): Promise<AuthResponse> {
        try {
            const response = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });
            return response
        } catch (error) {
            throw new Error('Failed to sign in with password: ' + (error as Error).message);
        }
    }

    static async supabaseResetPassword(password: string, userId: string): Promise<void> {
        const { error, data } = await supabase.auth.admin.updateUserById(userId, { password });
        if (error || !data) {
            throw new BadRequestError(ERROR_MESSAGES.AUTH.PASSWORD_RESET_FAILED);
        }
    }

    static async supabaseVerifyOtp(data: { email: string; token: string; type: VerifyType }): Promise<AuthResponse> {
        const response = await supabase.auth.verifyOtp({
            email: data.email,
            token: data.token,
            type: data.type,
        });
        return response
    }

    static async supabaseConfirmEmail(
        tokenHash: string
    ) {
        return await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: 'email',
        });
    }

    static async resendVerificationEmail(data: { email: string; type?: 'signup' | 'email_change' }): Promise<AuthResponse> {
        const response = await supabase.auth.resend({
            type: data.type ?? 'signup',
            email: data.email,
        });
        return response
    }
}