import { PUBLIC_TAURI_URL, PUBLIC_API_URL } from "$env/static/public";
import type { UserProfile } from "$lib/stores/authStore";

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${PUBLIC_API_URL}${endpoint}`, {
    headers: {
      credentials: 'include',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || json.error || 'Terjadi kesalahan pada server');
  }
  return json;
}

export const authApi = {
  register: (data: { email: string; password: string; confirmPassword: string; name?: string }) =>
    request<{ success: boolean; data: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    request<{ success: boolean; data: { requiresOtp: boolean; email: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  me: () =>
    request<{
      success: boolean;
      data: {
        user: {
          id: string;
          email: string;
          role?: string;
        };
      };
    }>('/auth/me', {
      method: 'GET',
    }),

  verifyEmail: (data: { email: string | undefined; token: string; type: 'signup' | 'recovery' | 'email' }) =>
    request<{ success: boolean; data: any }>('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  forgotPassword: (data: { email: string }) =>
    request<{ success: boolean; data: any }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({
        ...data
      }),
    }),

  resetPassword: (accessToken: string, data: { newPassword: string }) =>
    request<{ success: boolean; data: any }>('/auth/reset-password', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }),
  refresh: (refreshToken: string) =>
    request<{
      success: boolean;

      data: {
        accessToken: string
        refreshToken?: string;
        user: any;
      };
    }>("/auth/refresh", {
      method: "POST",

      body: JSON.stringify({
        refreshToken,
      }),
    }),
  exchangeCode: (code: string) =>
    request<{
      success: boolean;
      data: {
        user: UserProfile;
      };
    }>('/auth/callback', {
      method: 'POST',
      body: JSON.stringify({ code }),
    }),

  logout: (id: string) =>
    request<{
      success: boolean;
      message?: string;
    }>('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ id }),
    }),
};