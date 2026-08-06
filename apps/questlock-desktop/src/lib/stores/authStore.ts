import { writable } from 'svelte/store';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export interface AuthSession {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserProfile | null;
  pendingEmail: string;
}

const initialEmail = typeof localStorage !== 'undefined' ? localStorage.getItem('pending_email') || '' : '';

export const authStore = writable<AuthSession>({
  accessToken: typeof localStorage !== 'undefined' ? localStorage.getItem('access_token') : null,
  refreshToken: typeof localStorage !== 'undefined' ? localStorage.getItem('refresh_token') : null,
  user: null,
  pendingEmail: initialEmail,
});

export const setPendingEmail = (email: string) => {
  localStorage.setItem('pending_email', email);
  authStore.update(state => ({ ...state, pendingEmail: email }));
};

// Function helper untuk logout
export const clearAuthSession = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');

  authStore.set({
    accessToken: null,
    refreshToken: null,
    user: null,
    pendingEmail: '',
  });
};