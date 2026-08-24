'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function Footer(): React.JSX.Element {
  const { theme } = useTheme();
  return (
    <footer className={`${theme === 'dark' ? 'bg-[#f3f4f6] text-[#d1d5db] border-t border-[#374151]' : 'bg-neutral-900 text-neutral-400 border-t border-neutral-800'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <p className={theme === 'dark' ? 'text-[#9ca3af]' : 'text-neutral-400'}>© {new Date().getFullYear()} Ambiance Canine and Paradise des Animaux. All rights reserved.</p>
        <p className={theme === 'dark' ? 'text-[#6b7280] text-xs mt-1' : 'text-xs text-neutral-500 mt-1'}>16 Avenue de Verdun, Cagnes-sur-Mer, France</p>
      </div>
    </footer>
  );
}
