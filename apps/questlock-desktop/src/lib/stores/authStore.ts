import { authApi } from '$lib/api/auth';
import { writable } from 'svelte/store';

export interface UserProfile {
    id: string;
    email: string;
    role?: string;
}

export interface AuthSession {
    user: UserProfile | null;
    pendingEmail: string;
    isAuthenticated: boolean;
}

const isBrowser = typeof localStorage !== 'undefined';
let initialUser: UserProfile | null = null;

if (isBrowser) {
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) {
        try {
            initialUser = JSON.parse(storedUser);
        } catch (e) {
            localStorage.removeItem("user_data");
        }
    }
}

export const authStore = writable<AuthSession>({
    user: initialUser,
    pendingEmail: isBrowser ? localStorage.getItem('pending_email') || '' : '',
    isAuthenticated: !!initialUser,
});

export const setPendingEmail = (email: string) => {
    if (isBrowser) localStorage.setItem('pending_email', email);
    authStore.update(state => ({ ...state, pendingEmail: email }));
};

export const setAuthSession = (user: UserProfile) => {
    if (isBrowser) {
        localStorage.setItem('user_data', JSON.stringify(user));
        localStorage.removeItem('pending_email');
    }

    authStore.set({
        user,
        pendingEmail: '',
        isAuthenticated: true,
    });
};

export async function restoreAuthSession() {
    authStore.update((state) => ({
        ...state,
        isLoading: true,
    }));

    try {
        const response =
            await authApi.me();

        if (
            response.success &&
            response.data?.user
        ) {
            setAuthSession(
                response.data.user
            );

            return true;
        }
        clearAuthSession();
        return false
    } catch {
        clearAuthSession();

        return false;
    }
}

// Perbarui helper untuk logout agar menghapus semua data terkait
export const clearAuthSession = () => {
    if (isBrowser) {
        localStorage.removeItem('user_data');
        localStorage.removeItem("pending_email");
    }

    authStore.set({
        user: null,
        pendingEmail: '',
        isAuthenticated: false,
    });
};