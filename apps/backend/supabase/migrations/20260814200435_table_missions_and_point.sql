CREATE TYPE mission_status AS ENUM (
  'PENDING', 'SUBMITTED', 'APPROVED', 'REJECTED', 'FAILED'
);

CREATE TYPE transaction_type AS ENUM (
  'EARNED', 'PENALTY', 'SPENT', 'MANUAL_ADJUSTMENT'
);

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';


-- ===========================================================================
-- 2. TABEL MISSIONS (Kontrak Kerja / Tugas)
-- ===========================================================================
CREATE TABLE IF NOT EXISTS mission_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE, -- Contoh: 'Tugas Sekolah', 'Pekerjaan Rumah'
    
    -- Aturan Koin yang ditetapkan Admin untuk kategori ini
    min_reward INTEGER NOT NULL DEFAULT 0,
    max_reward INTEGER NOT NULL DEFAULT 100,
    
    icon_name VARCHAR(50), -- Opsional: Untuk menampilkan icon di Svelte/Frontend
    is_active BOOLEAN DEFAULT TRUE, -- Admin bisa mematikan kategori tanpa menghapus datanya
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_categories_modtime
    BEFORE UPDATE ON mission_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();


CREATE TABLE IF NOT EXISTS missions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category_id UUID REFERENCES mission_categories(id) ON DELETE SET NULL,
    -- Nilai Koin (Harga Tugas)
    reward_points INTEGER NOT NULL DEFAULT 0,
    penalty_points INTEGER NOT NULL DEFAULT 0,
    
    -- Relasi ke tabel public.users (atau auth.users jika Anda menembak langsung)
    assigner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- Orang Tua/Admin
    assignee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- Anak
    
    status mission_status DEFAULT 'PENDING',
    proof_note TEXT,
    
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER update_missions_modtime
    BEFORE UPDATE ON missions
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();


-- ===========================================================================
-- 3. TABEL USER WALLETS (Dompet Total Koin Anak)
-- ===========================================================================
CREATE TABLE IF NOT EXISTS user_wallets (
    -- user_id menjadi Primary Key karena 1 user hanya punya 1 dompet
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    balance INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pasang Trigger 'updated_at' ke tabel dompet
CREATE TRIGGER update_wallets_modtime
    BEFORE UPDATE ON user_wallets
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();


-- ===========================================================================
-- 4. TABEL POINT HISTORIES (Ledger / Buku Tabungan Anti-Nakal)
-- ===========================================================================
CREATE TABLE IF NOT EXISTS point_histories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Boleh kosong (NULL) jika koin ditambahkan manual oleh orang tua tanpa lewat misi
    mission_id UUID REFERENCES missions(id) ON DELETE SET NULL, 
    
    amount INTEGER NOT NULL, -- Contoh: 50 atau -20
    type transaction_type NOT NULL,
    description TEXT, -- Contoh: "Reward: PR Matematika selesai"
    
    created_at TIMESTAMPTZ DEFAULT NOW()
    -- Tidak butuh updated_at karena riwayat transaksi TIDAK BOLEH diedit (Immutable)
);

-- ===========================================================================
-- 5. INDEXES (Untuk Mempercepat Performa Pencarian di Backend)
-- ===========================================================================
CREATE INDEX idx_missions_assignee ON missions(assignee_id);
CREATE INDEX idx_missions_status ON missions(status);
CREATE INDEX idx_missions_category ON missions(category_id);
CREATE INDEX idx_point_histories_user ON point_histories(user_id);