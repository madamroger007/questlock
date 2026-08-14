import { writable } from 'svelte/store';

export interface UserProfile {
    id: string;
    email: string;
    role?: string;
}

export interface AuthSession {
    accessToken: string | null;
    refreshToken: string | null;
    user: UserProfile | null;
    pendingEmail: string;
}

const isBrowser = typeof localStorage !== 'undefined';

const initialEmail = isBrowser ? localStorage.getItem('pending_email') || '' : '';

let initialUser = null;
if (isBrowser) {
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) {
        try {
            initialUser = JSON.parse(storedUser);
        } catch (e) {
            console.error("Gagal parsing data user dari localStorage");
        }
    }
}

export const authStore = writable<AuthSession>({
    accessToken: isBrowser ? localStorage.getItem('access_token') : null,
    refreshToken: isBrowser ? localStorage.getItem('refresh_token') : null,
    user: initialUser,
    pendingEmail: initialEmail,
});

export const setPendingEmail = (email: string) => {
    if (isBrowser) localStorage.setItem('pending_email', email);
    authStore.update(state => ({ ...state, pendingEmail: email }));
};

export const setAuthSession = (accessToken: string, refreshToken: string, user: UserProfile) => {

    if (isBrowser) {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        localStorage.setItem('user_data', JSON.stringify(user));
        localStorage.removeItem('pending_email');
    }

    authStore.set({
        accessToken,
        refreshToken,
        user,
        pendingEmail: '',
    });
};

// Perbarui helper untuk logout agar menghapus semua data terkait
export const clearAuthSession = () => {
    if (isBrowser) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_data');
    }

    authStore.set({
        accessToken: null,
        refreshToken: null,
        user: null,
        pendingEmail: '',
    });
};