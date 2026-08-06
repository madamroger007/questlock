import { MiddlewareHandler } from 'hono';
import { supabase } from '../../config/supabase.js';
import { AppEnv } from '../../shared/types/context.type.js';

export const authMiddleware: MiddlewareHandler<AppEnv> = async (c, next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ success: false, message: 'Unauthorized: No token provided' }, 401);
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        return c.json({ success: false, message: 'Unauthorized: Invalid token' }, 401);
    }

    c.set('user', {
        id: user.id,
        email: user.email || '',
    });

    await next();
};