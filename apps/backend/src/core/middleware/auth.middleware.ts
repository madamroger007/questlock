import { MiddlewareHandler } from 'hono';
import { supabase } from '../../config';
import { AppEnv } from '@/shared/types/context.type.js';
import { reqAuthToken } from '../utils/authorizen.js';

export const authMiddleware: MiddlewareHandler<AppEnv> = async (c, next) => {
    const token = reqAuthToken(c);

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