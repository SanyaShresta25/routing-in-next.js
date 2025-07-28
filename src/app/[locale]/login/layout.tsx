import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

export default async function LoginLayout(props: { children: ReactNode, params: Promise<{ locale: string }> }) {
  const params = await props.params;

  const {
    children
  } = props;

  let messages;
  try {
    messages = (await import(`../../../messages/${params.locale}.json`)).default;
  } catch {
    messages = (await import(`../../../messages/en.json`)).default;
  }
  return (
    <NextIntlClientProvider locale={params.locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
} 