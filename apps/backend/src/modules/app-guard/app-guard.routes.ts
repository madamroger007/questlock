import { Hono } from 'hono';
import { AppEnv } from '../../shared/types/context.type.js';
import { authMiddleware } from '../../core/middleware/auth.middleware.js';
import { AppGuardService } from './app-guard.service.js';

export const appGuardRoutes = new Hono<AppEnv>();

appGuardRoutes.use('*', authMiddleware);

appGuardRoutes.post('/check-access', async (c) => {
    const user = c.get('user');
    const { processName } = await c.req.json<{ processName: string }>();

    if (!processName) {
        return c.json({ success: false, message: 'processName is required' }, 400);
    }

    const access = await AppGuardService.checkAppAccess(user.id, processName);
    return c.json({ success: true, data: access });
});