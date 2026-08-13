import { PUBLIC_TAURI_URL, PUBLIC_API_URL } from "$env/static/public";

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${PUBLIC_API_URL}${endpoint}`, {
    headers: {
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
    request<{ success: boolean; data: { accessToken: string; refreshToken: string; user: any } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  loginStepOne: (data: { email: string; password: string }) =>
    request<{ success: boolean; data: { requiresOtp: boolean; email: string } }>('/auth/login-step-one', {
      method: 'POST',
      body: JSON.stringify(data),
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
        ...data,
        redirectUrl: `${PUBLIC_TAURI_URL}/auth/callback?type=recovery`,
      }),
    }),

  resetPassword: (token: string, data: { newPassword: string }) =>
    request<{ success: boolean; data: any }>('/auth/reset-password', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
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

  logout: () =>
    request<{ success: boolean; data: any }>("/auth/logout", {
      method: "POST",
    }),
};