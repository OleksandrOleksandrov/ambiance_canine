'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function Hero(): React.JSX.Element {
  const { theme } = useTheme();

  const badgeClasses = theme === 'dark'
    ? 'px-3 py-1 rounded-full text-xs font-semibold bg-[#2e2e2e] text-[#fbbf24]'
    : 'px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800';

  const h1Color = theme === 'dark' ? 'text-[#f3f4f6]' : 'text-neutral-900';
  const pColor = theme === 'dark' ? 'text-[#d1d5db]' : 'text-neutral-600';

  const ctaButton1Color = theme === 'dark'
    ? 'bg-neutral-800 text-white hover:bg-neutral-700'
    : 'bg-neutral-900 text-white hover:bg-neutral-800';

  const ctaButton2Color = theme === 'dark'
    ? 'bg-[#1f2937] border border-[#4b5563] text-[#d1d5db] hover:bg-[#2e2e2e] hover:border-[#59658a]'
    : 'bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-100';

  return (
    <section className={`bg-gradient-to-b ${theme === 'dark' ? 'from-[#171717] to-[#0a0a0a]' : 'from-amber-50 to-neutral-50'} py-20 md:py-32`}>
      <div className="max-w-4xl mx-auto text-center px-4">
        <span className={`${badgeClasses} mb-4 inline-block`}>
          Personal Stylist for Dogs
        </span>
        <h1 className={`text-4xl md:text-6xl font-serif font-extrabold tracking-tight leading-tight mb-6 ${h1Color}`}>
          Ambiance Canine &amp; Paradise des Animaux
        </h1>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 ${pColor}`}>
          Professional grooming, specialized teeth brushing, and relaxing ozone spa therapy crafted for your beloved pet in Cagnes-sur-Mer.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#booking"
            className={`${ctaButton1Color} px-6 py-3 rounded-lg font-medium transition`}
          >
            Book a Stylist Visit
          </a>
          <a
            href="#services"
            className={`${ctaButton2Color} px-6 py-3 rounded-lg font-medium transition`}
          >
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
}
