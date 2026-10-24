'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import SocialLinks from './SocialLinks';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer(): React.JSX.Element {
  const { theme } = useTheme();
  const { t } = useLanguage();
  return (
    <footer className={`${theme === 'dark' ? 'bg-neutral-900 text-neutral-300 border-t border-neutral-700' : 'bg-neutral-900 text-neutral-400 border-t border-neutral-800'}`}>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className={theme === 'dark' ? 'text-neutral-300' : 'text-neutral-400'}>© {new Date().getFullYear()} {t('footer.copyright')}</p>
            <p className={theme === 'dark' ? 'text-neutral-400 text-xs mt-1' : 'text-xs text-neutral-500 mt-1'}>16 Avenue de Verdun, Cagnes-sur-Mer, France</p>
          </div>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
