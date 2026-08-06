import { supabase, supabaseAdmin } from '../../config/supabase';
import { UserProfile } from './auth.types';

export class AuthRepository {
    /**
     * Mengambil data profil dari tabel public.users berdasarkan ID
     */
    static async findUserById(userId: string): Promise<UserProfile | null> {
        const { data, error } = await supabase
            .from('users')
            .select('id, email, name, role, status, avatar')
            .eq('id', userId)
            .single();

        if (error || !data) return null;
        return data as UserProfile;
    }

    /**
     * Menyinkronkan/Membuat profil baru pengguna di tabel public.users
     */
    static async createUserProfile(user: UserProfile): Promise<void> {
        const { error } = await supabaseAdmin.from('users').upsert({
            id: user.id,
            email: user.email,
            name: user.name || user.email.split('@')[0],
            role: user.role || 'USER',
            status: user.status || 'ACTIVE',
            avatar: user.avatar || null,
        });

        if (error) {
            console.error('[AuthRepository] Gagal sinkronisasi user profile:', error.message);
        }
    }
}