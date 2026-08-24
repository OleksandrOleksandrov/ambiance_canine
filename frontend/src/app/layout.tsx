import React from 'react';
import './globals.css';
import { ThemeProvider } from '../contexts/ThemeContext';

export const metadata = {
  title: 'Ambiance Canine & Paradise des Animaux',
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
