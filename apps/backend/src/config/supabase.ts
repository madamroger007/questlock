import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

// Supabase client umum (Anon/Client level)
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

// Supabase admin client (Bypass RLS jika dibutuhkan di background jobs/admin task)
export const supabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
