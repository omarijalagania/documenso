'use client';

import React from 'react';

import { I18nProviderClient } from '~/locales/client';

export type MarketingLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function MarketingLayout({ children, params }: MarketingLayoutProps) {
  const { locale } = params;

  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
}
