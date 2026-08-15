import { Hono } from 'hono';
import { AuthController } from './auth.controller.js';
import { validateBody } from '../../core/validation/zod-validator.js';
import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  resendVerificationSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  refreshTokenSchema,
} from './auth.schema.js';
import { authMiddleware } from '@/core/middleware/auth.middleware.js';
import { AppEnv } from '@/shared/types/context.type.js';
import { rateLimiter } from '@/core/permissions/rate-limiter.js';

export const authRoutes = new Hono<AppEnv>();
const loginRateLimiter = rateLimiter(5, 15); // Limit to 5 requests per 15 minutes

// Auth Endpoints
authRoutes.post('/register', validateBody(registerSchema), AuthController.register);
authRoutes.post('/login', loginRateLimiter, validateBody(loginSchema), AuthController.login);
authRoutes.get(
  '/me',
  authMiddleware,
  AuthController.me
);
authRoutes.post('/verify-email', validateBody(verifyEmailSchema), AuthController.verifyEmail);
authRoutes.post('/resend-verification', validateBody(resendVerificationSchema), AuthController.resendVerification);
authRoutes.post('/forgot-password', validateBody(forgotPasswordSchema), AuthController.forgotPassword);
authRoutes.post('/reset-password', authMiddleware, validateBody(resetPasswordSchema), AuthController.resetPassword);
authRoutes.post('/refresh-token', validateBody(refreshTokenSchema), AuthController.refreshToken);
authRoutes.post('/logout', AuthController.logout);