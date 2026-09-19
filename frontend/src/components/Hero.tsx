'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { BRAND_NAME } from '../constants/strings';

export default function Hero(): React.JSX.Element {
  const { theme } = useTheme();

  const badgeClasses = theme === 'dark'
    ? 'shrink-0 px-3 py-1 rounded-full text-xs font-semibold bg-[#2e2e2e] text-[#fbbf24] whitespace-nowrap'
    : 'shrink-0 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 whitespace-nowrap';

  const h1Color = theme === 'dark' ? 'text-[#f3f4f6]' : 'text-neutral-900';
  const pColor = theme === 'dark' ? 'text-[#d1d5db]' : 'text-neutral-600';

  const ctaButton1Color = theme === 'dark'
    ? 'bg-neutral-800 text-white hover:bg-neutral-700'
    : 'bg-neutral-900 text-white hover:bg-neutral-800';

  const ctaButton2Color = theme === 'dark'
    ? 'bg-[#1f2937] border border-[#4b5563] text-[#d1d5db] hover:bg-[#2e2e2e] hover:border-[#59658a]'
    : 'bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-100';

  return (
    <section className={`bg-gradient-to-b ${theme === 'dark' ? 'from-[#171717] to-[#0a0a0a]' : 'from-amber-50 to-neutral-50'} py-6 md:py-16`}>
      <div className="max-w-1xl mx-auto px-8 pl-8 md:ml-[4%] md:grid md:grid-cols-[0.3fr_1.7fr] md:gap-8 md:text-left">
        <div className="mb-8 flex flex-col items-center justify-center md:mb-0 md:items-start md:justify-center">
          <img
            src="https://ambiance-dev.s3.us-east-1.amazonaws.com/logo/photo_ambiance_logo.jpg"
            alt="Ambiance Canine Logo"
            className="h-32 w-32 md:h-40 md:w-40 rounded-full object-cover border-4 border-amber-400 shadow-lg"
          />
          <span className={`${badgeClasses} mt-4`}>
            Personal Stylist for Dogs
          </span>
        </div>
        <div className="flex flex-col justify-center">
          {/* <h1 className={`text-2xl md:text-3xl font-serif font-extrabold tracking-tight leading-tight mb-6 ${h1Color} text-center md:text-left`}>
            {BRAND_NAME}
          </h1> */}
          <p className={`text-lg md:text-xl max-w-2xl mx-auto md:mx-0 mb-4 ${pColor} text-center md:text-left`}>
            Professional grooming, specialized teeth brushing, and relaxing ozone spa therapy crafted for your beloved pet in Cagnes-sur-Mer.
          </p>

        </div>

      </div>
      <div className="flex flex-col items-center gap-4 md:justify-center">
        <a
          href="#locations"
          className={`${ctaButton1Color} px-6 py-3 rounded-lg font-medium transition`}
        >
          Book a Stylist Visit
        </a>
      </div>
    </section>
  );
}
