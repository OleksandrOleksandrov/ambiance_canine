'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage, type Language } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const languageOptions: { value: Language; label: string; flag: string }[] = [
  { value: 'en', label: 'ENGLISH', flag: '🇬🇧' },
  { value: 'fr', label: 'FRANÇAIS', flag: '🇫🇷' },
  { value: 'uk', label: 'УКРАЇНСЬКА', flag: '🇺🇦' },
  { value: 'ru', label: 'РУССКИЙ', flag: '🇷🇺' },
];

export default function LanguageSwitcher(): React.JSX.Element {
  const { language, setLanguage, t } = useLanguage();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);
  const selectedLanguage = languageOptions.find(
    (option) => option.value === language
  ) ?? languageOptions[0];

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !switcherRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const dark = theme === 'dark';

  return (
    <div ref={switcherRef} className="relative z-[60]">
      <button
        type="button"
        aria-label={t('language.label')}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={`flex h-11 min-w-20 items-center justify-center gap-3 rounded-full px-4 shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
          dark
            ? 'bg-slate-800 text-white'
            : 'bg-white text-slate-800'
        }`}
      >
        <span aria-hidden="true" className="text-2xl leading-none">
          {selectedLanguage.flag}
        </span>
        <svg
          aria-hidden="true"
          className={`h-4 w-4 text-indigo-900 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M4.5 7.25a.75.75 0 0 1 1.06 0L10 11.69l4.44-4.44a.75.75 0 1 1 1.06 1.06l-4.97 4.97a.75.75 0 0 1-1.06 0L4.5 8.31a.75.75 0 0 1 0-1.06Z" />
        </svg>
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={t('language.label')}
          className={`absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl p-2 shadow-xl ${
            dark
              ? 'bg-slate-800 text-slate-100'
              : 'bg-white text-slate-800'
          }`}
        >
          {languageOptions.map((option) => {
            const selected = option.value === language;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  setLanguage(option.value);
                  setIsOpen(false);
                }}
                className={`flex min-h-16 w-full items-center gap-4 rounded-xl px-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-500 ${
                  dark ? 'hover:bg-slate-700' : 'hover:bg-slate-50'
                }`}
              >
                <span aria-hidden="true" className="text-3xl leading-none">
                  {option.flag}
                </span>
                <span className="flex-1 text-sm font-semibold tracking-wide">
                  {option.label}
                </span>
                {selected && (
                  <svg
                    aria-hidden="true"
                    className="h-7 w-7 shrink-0 text-emerald-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      d="m5 12 4 4L19 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
