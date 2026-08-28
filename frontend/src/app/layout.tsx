import React from 'react';
import './globals.css';
import { ThemeProvider } from '../contexts/ThemeContext';
import { BRAND_NAME } from '../constants/strings';

export const metadata = {
  title: BRAND_NAME,
  description: 'Dog Stylist and Spa Services in Cagnes-sur-Mer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="light">
      <body className="font-sans" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
