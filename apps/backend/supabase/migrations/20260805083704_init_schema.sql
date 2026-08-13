-- Buat Tipe Enum
CREATE TYPE public.user_role AS ENUM ('USER', 'ADMIN', 'PARENT');
CREATE TYPE public.user_status AS ENUM ('ACTIVE', 'INACTIVE', 'BANNED');

-- ============================================================================
-- 1. TABEL USERS (PROFIL APLIKASI)
-- ============================================================================
CREATE TABLE public.users (
    -- ID harus berelasi dengan auth.users milik Supabase
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(100),
    avatar TEXT,
    role public.user_role DEFAULT 'USER',
    status public.user_status DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mengaktifkan RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User can view their own data" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "User can update their own data" ON public.users
    FOR UPDATE USING (auth.uid() = id);


-- ============================================================================
-- 2. DATABASE TRIGGER UNTUK OTOMATISASI SINKRONISASI
-- ============================================================================
-- Fungsi untuk menyalin data saat ada user register di Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role, status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    'USER',
    'ACTIVE'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();