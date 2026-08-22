import React from 'react';
import './globals.css';

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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-neutral-50 text-neutral-800 font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}
