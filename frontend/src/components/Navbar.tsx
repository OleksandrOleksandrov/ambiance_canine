'use client';

import React from 'react';
import { Lottie } from 'lottie-react';
import dogPawAnimation from '../assets/dog-paw-walk.json';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { BRAND_NAME } from '../constants/strings';
import SocialLinks from './SocialLinks';
import LanguageSwitcher from './LanguageSwitcher';

function ThemeToggle(): React.JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
        isDark ? 'bg-slate-800' : 'bg-amber-100'
      }`}
      aria-label={isDark ? t('navbar.lightMode') : t('navbar.darkMode')}
    >
      {/* Background Track Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        {/* Sun Icon */}
        <svg
          className={`h-4 w-4 transition-opacity duration-300 ${
            isDark ? 'opacity-30 text-slate-400' : 'opacity-100 text-amber-500'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>

        {/* Moon Icon (Updated path) */}
        <svg
          className={`h-4 w-4 transition-opacity duration-300 ${
            isDark ? 'opacity-100 text-amber-400' : 'opacity-30 text-neutral-400'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          />
        </svg>
      </div>

      {/* Sliding Thumb */}
      <span
        className={`pointer-events-none flex h-5 w-5 transform items-center justify-center rounded-full shadow-md transition-transform duration-300 ease-in-out ${
          isDark ? 'translate-x-7 bg-slate-900' : 'translate-x-0 bg-white'
        }`}
      >
        {isDark ? (
          <svg className="h-3.5 w-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg className="h-3.5 w-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </span>
    </button>
  );
}

export default function Navbar(): React.JSX.Element {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const baseClasses = theme === 'dark' 
    ? 'sticky top-0 z-50 bg-[#1f2937]/95 backdrop-blur-md border-b border-[#4b5563] text-white' 
    : 'sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200';

  return (
    <header className={baseClasses}>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center space-x-2">
            <Lottie src={dogPawAnimation} loop={true} autoplay={true} style={{ width: 24, height: 24, filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'brightness(0)' }} />
            <div>
              <h1 className={`${theme === 'dark' ? 'text-[#f3f4f6]' : 'text-neutral-900'} text-lg font-bold tracking-tight leading-none`}>
                {BRAND_NAME}
              </h1>
              <p className={`${theme === 'dark' ? 'text-[#f59e0b]' : 'text-amber-600'} font-medium tracking-wide text-xs mt-0.5`}>
                {t('navbar.paradise')}
              </p>
            </div>
          </a>

          <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
            <nav className="hidden md:flex md:space-x-6 lg:space-x-8 text-sm font-medium">
              <a href="#services" className={`${theme === 'dark' ? 'hover:text-[#fbbf24] text-[#d1d5db]' : 'hover:text-amber-600 text-neutral-600'} transition-colors`}>
                {t('navbar.services')}
              </a>
              <a href="#gallery" className={`${theme === 'dark' ? 'hover:text-[#fbbf24] text-[#d1d5db]' : 'hover:text-amber-600 text-neutral-600'} transition-colors`}>
                {t('navbar.gallery')}
              </a>
              <a href="#locations" className={`${theme === 'dark' ? 'hover:text-[#fbbf24] text-[#f59e0b]' : 'hover:text-amber-600 text-neutral-800'} transition-colors font-bold`}>
                {t('navbar.bookVisit')}
              </a>
            </nav>

            <div className="hidden md:block">
              <SocialLinks />
            </div>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
        <div className="mt-4 flex justify-center md:hidden">
          <SocialLinks />
        </div>
      </div>
    </header>
  );
}
