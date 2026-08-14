import { createMiddleware } from 'hono/factory';
import { supabase } from '@/config';

export const requireRole = (allowedRoles: string[]) => {
    return createMiddleware(async (c, next) => {
        const user = c.get('user');
        if (!user || !user.id) {
            return c.json({ success: false, message: 'Unauthorized: No user found in context' }, 401);
        }

        const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (error || !profile || !allowedRoles.includes(profile.role)) {
            return c.json({
                success: false,
                message: `Rejected access for roles: ${allowedRoles.join(' or ')}`
            }, 403);
        }

        await next();
    });
};