import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import './globals.css'; // Global CSS


export default async function LocaleLayout(
  props: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
  }
) {
  const { children, params } = props;
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    messages = (await import(`../messages/en.json`)).default;
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* Optional: <Header /> */}
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
