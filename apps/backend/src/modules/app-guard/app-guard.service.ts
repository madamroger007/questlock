import { supabase } from '../../config/supabase.js';

export class AppGuardService {
    /**
     * Mengecek apakah device diizinkan menjalankan game/aplikasi tertentu.
     */
    static async checkAppAccess(userId: string, processName: string) {
        // 1. Cek apakah processName masuk ke daftar blacklist user
        const { data: blacklist } = await supabase
            .from('app_guard_rules')
            .select('*')
            .eq('user_id', userId)
            .eq('process_name', processName)
            .single();

        if (!blacklist) {
            // Tidak terdaftar dalam aplikasi terkunci -> Izinkan
            return { allowed: true, reason: 'App is not restricted' };
        }

        // 2. Cek apakah masih ada misi harian yang BELUM selesai
        const { count: pendingMissionsCount } = await supabase
            .from('missions')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('is_completed', false);

        if (pendingMissionsCount && pendingMissionsCount > 0) {
            return {
                allowed: false,
                reason: `Access blocked! You have ${pendingMissionsCount} pending missions to complete.`,
            };
        }

        return { allowed: true, reason: 'All daily quests completed!' };
    }
}