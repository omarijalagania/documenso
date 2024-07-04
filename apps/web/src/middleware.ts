import type { NextRequest } from 'next/server';

import { createI18nMiddleware } from 'next-international/middleware';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'ka'],
  defaultLocale: 'en',
});

export default async function middleware(req: NextRequest) {
  return await I18nMiddleware(req);
}

export const config = {
  matcher: ['/'],
};
