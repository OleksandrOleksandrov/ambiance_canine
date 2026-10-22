import React from 'react';
import './globals.css';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import { BRAND_NAME } from '../constants/strings';

export const metadata = {
  title: BRAND_NAME,
  description: 'Toilettage professionnel et soins pour chiens à Cagnes-sur-Mer et Nice.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning data-theme="light">
      <body className="font-sans" suppressHydrationWarning>
        <LanguageProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
