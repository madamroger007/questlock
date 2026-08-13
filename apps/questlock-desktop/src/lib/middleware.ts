import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { initAuth, authStore } from '$lib/stores/authStore';

export const load = async ({ url }) => {
    // 1. Inisialisasi token dari Tauri Plugin Store (Rust)
    await initAuth();

    // 2. Baca isi state authStore
    const store = get(authStore);
    const isAuthenticated = !!store.accessToken;

    // 3. Tentukan rute saat ini
    const currentPath = url.pathname;
    const isPublicRoute = currentPath.startsWith('/login')
        || currentPath.startsWith('/register') || currentPath.startsWith('/forgot-password') || currentPath.startsWith('/reset-password') || currentPath.startsWith('/verify-email');

    // 4. Logika Middleware (Redirect)
    if (!isAuthenticated && !isPublicRoute) {
        // Jika belum login dan mencoba masuk ke halaman rahasia (seperti dashboard), lempar ke login
        throw redirect(302, '/login');
    }

    if (isAuthenticated && isPublicRoute) {
        // Jika sudah login tapi mencoba buka halaman login, lempar ke dashboard
        throw redirect(302, '/dashboard');
    }

    // 5. Kembalikan data yang mungkin dibutuhkan oleh semua halaman
    return {
        user: store.user
    };
};