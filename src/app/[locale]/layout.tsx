import { ReactNode } from 'react';
import './globals.css';
interface LayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export default function LocaleLayout({ children, params }: LayoutProps) {
  // Your layout logic here
  return (
    <html lang={params.locale}>
      <body>{children}</body>
    </html>
  );
}
