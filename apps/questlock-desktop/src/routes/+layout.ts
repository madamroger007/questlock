import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

import {
  authStore,
} from '$lib/stores/authStore';

export const ssr = false;

export async function load({ url }) {
  const state = get(authStore);

  const pathname = url.pathname;
  const isAuthenticated = !!state.isAuthenticated && !!state.user;
  const publicRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/verify-email',
    '/auth/callback',
  ];

  const isPublicRoute =
    publicRoutes.some((route) =>
      pathname.startsWith(route)
    );

  if (!isAuthenticated && !isPublicRoute) {
    throw redirect(302, '/login');
  }

  if (isAuthenticated && isPublicRoute) {
    throw redirect(202, '/');
  }

  return {
    user: state.user,
  };
}