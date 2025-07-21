import { ReactNode } from 'react';
import '@/app/[locale]/globals.css';

type tParams = Promise<{ locale: string }>;

export default async function LoginLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: tParams;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
