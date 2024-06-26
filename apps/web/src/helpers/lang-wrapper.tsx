'use client';

import React from 'react';

import { I18nProviderClient } from '~/locales/client';

function LangWrapper({ locale, children }: { locale: string; children: React.ReactNode }) {
  return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
}

export default LangWrapper;
