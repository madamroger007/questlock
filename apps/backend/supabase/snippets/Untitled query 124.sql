CREATE EXTENSION IF NOT EXISTS "pgcrypto";

INSERT INTO auth.users (
  id, instance_id, aud, role, email, encrypted_password, 
  email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data
)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated',
  'demo@questlock.app',
  crypt('password123', gen_salt('bf', 10)),
  NOW(), NOW(), NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Demo User"}'
)
ON CONFLICT (id) DO NOTHING;