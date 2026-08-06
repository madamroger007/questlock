import { Env } from 'hono';

export interface AppEnv extends Env {
  Variables: {
    user: {
      id: string;
      email: string;
      role?: string;
    };
  };
}