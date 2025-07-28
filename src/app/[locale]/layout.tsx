// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import Navbar from '@/components/Header';
import './globals.css';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${params.locale}.json`)).default;
  } catch {
    messages = (await import(`../../messages/en.json`)).default;
  }

  return (
    <html lang={params.locale}>
      <body>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
