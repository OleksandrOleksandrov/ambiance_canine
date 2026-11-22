import React from 'react';
import './globals.css';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import { BRAND_NAME } from '../constants/strings';
import Script from 'next/script';
import GoogleAnalyticsPageView from '../components/GoogleAnalyticsPageView';

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
      <Script id="google-analytics-data-layer" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-M2DQWMXWKT', { send_page_view: false });`}
      </Script>
      <Script
        id="google-tag-manager"
        src="https://www.googletagmanager.com/gtm.js?id=GTM-WFMR2MVQ"
        strategy="beforeInteractive"
      />
      <body className="font-sans" suppressHydrationWarning>
        <React.Suspense fallback={null}>
          <GoogleAnalyticsPageView />
        </React.Suspense>
        <LanguageProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
