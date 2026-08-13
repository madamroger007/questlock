import { createMiddleware } from 'hono/factory';
import { supabase } from '@/config';


export const requireRole = (allowedRoles: string[]) => {
    return createMiddleware(async (c, next) => {
        const user = c.get('user'); // Didapat dari supabaseAuth middleware

        // Cek role user di tabel 'profiles' (sesuaikan dengan nama tabel Anda)
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (!profile || !allowedRoles.includes(profile.role)) {
            return c.json({
                success: false,
                message: `Akses ditolak: Membutuhkan role ${allowedRoles.join(' atau ')}`
            }, 403);
        }

        // Lanjut jika role cocok
        await next();
    });
};