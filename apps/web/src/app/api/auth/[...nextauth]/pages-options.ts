import type { PagesOptions } from 'next-auth';

export const pagesOptions: Partial<PagesOptions> = {
  signIn: '/dashboard',
  error: '/signin',
};
