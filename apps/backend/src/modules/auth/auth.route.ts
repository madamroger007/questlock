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
} from './auth.validation.js';

export const authRoutes = new Hono();

// Auth Endpoints
authRoutes.post('/register', validateBody(registerSchema), AuthController.register);
authRoutes.post('/login', validateBody(loginSchema), AuthController.login);
authRoutes.post('/login-step-one', validateBody(loginSchema), AuthController.loginStepOne);
authRoutes.post('/verify-email', validateBody(verifyEmailSchema), AuthController.verifyEmail);
authRoutes.post('/resend-verification', validateBody(resendVerificationSchema), AuthController.resendVerification);
authRoutes.post('/forgot-password', validateBody(forgotPasswordSchema), AuthController.forgotPassword);
authRoutes.post('/reset-password', validateBody(resetPasswordSchema), AuthController.resetPassword);
authRoutes.post('/refresh-token', validateBody(refreshTokenSchema), AuthController.refreshToken);
authRoutes.post('/logout', AuthController.logout);