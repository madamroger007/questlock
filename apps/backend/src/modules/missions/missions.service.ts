import { supabase } from '../../config/supabase.js';
import { AppError } from '../../core/errors/custom-error.js';

export class MissionsService {
    static async getUserMissions(userId: string) {
        const { data, error } = await supabase
            .from('missions')
            .select('*')
            .eq('user_id', userId);

        if (error) throw new AppError(error.message, 500);
        return data;
    }

    static async completeMission(userId: string, missionId: string) {
        const { data, error } = await supabase
            .from('missions')
            .update({ is_completed: true, completed_at: new Date().toISOString() })
            .eq('id', missionId)
            .eq('user_id', userId)
            .select()
            .single();

        if (error) throw new AppError(error.message, 400);
        return data;
    }
}