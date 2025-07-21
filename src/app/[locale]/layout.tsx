import { ReactNode } from 'react';
import '../globals.css'; // adjust path if needed

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>; // Mark params as a Promise
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
