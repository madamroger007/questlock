import { Hono } from 'hono';
import { AppEnv } from '../../shared/types/context.type.js';
import { authMiddleware } from '../../core/middleware/auth.middleware.js';
import { MissionsService } from './missions.service.js';

export const missionsRoutes = new Hono<AppEnv>();

// missionsRoutes.use('*', authMiddleware);

missionsRoutes.get('/', async (c) => {
    const user = c.get('user');
    const missions = await MissionsService.getUserMissions(user.id);
    return c.json({ success: true, data: missions });
});

missionsRoutes.patch('/:id/complete', async (c) => {
    const user = c.get('user');
    const missionId = c.req.param('id');
    const result = await MissionsService.completeMission(user.id, missionId);
    return c.json({ success: true, data: result });
});