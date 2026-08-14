import { AuthResponse } from '@supabase/supabase-js/dist/index.cjs';
import { supabase, supabaseAdmin } from '../../config/supabase';
import { RegisterDTO, UserProfile, UserRole, VerifyType } from '@/shared/types/auth.js';
import { env } from '@/config';

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
        const { data: profile, error } = await supabase
            .from('users')
            .select('role')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return profile?.role;

    }

    static async supabaseSignUp(data: RegisterDTO): Promise<AuthResponse> {
        const response = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    name: data.name || data.email.split('@')[0],
                },
                emailRedirectTo: `${env.URL_PUBLIC_APP}/auth/callback?type=signup`,
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
        const response = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });

        return response
    }

    static async supabaseVerifyOtp(data: { email: string; token: string; type?: VerifyType }): Promise<AuthResponse> {
        const response = await supabase.auth.verifyOtp({
            email: data.email,
            token: data.token,
            type: data.type as VerifyType,
        });
        return response
    }

    static async resendVerificationEmail(data: { email: string; type?: 'signup' | 'email_change' }): Promise<AuthResponse> {
        const response = await supabase.auth.resend({
            type: data.type ?? 'signup',
            email: data.email,
        });
        return response
    }
}