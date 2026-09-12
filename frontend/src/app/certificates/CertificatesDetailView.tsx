'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../../contexts/ThemeContext';
import { certificates } from '../../data/certificates';

export default function CertificatesDetailView(): React.JSX.Element {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const pageBg = isDark ? 'bg-[#0a0a0a] text-[#ededed]' : 'bg-neutral-50 text-neutral-800';
  const sectionBg = isDark ? 'bg-[#111827]' : 'bg-neutral-100';
  const heading = isDark ? 'text-[#f3f4f6]' : 'text-neutral-900';
  const textMuted = isDark ? 'text-[#9ca3af]' : 'text-neutral-500';
  const cardBg = isDark ? 'bg-[#18181b] border-neutral-800' : 'bg-white border-neutral-200';
  const backLink = isDark
    ? 'text-[#fbbf24] hover:text-amber-300'
    : 'text-amber-700 hover:text-amber-800';

  return (
    <main className={`min-h-screen ${pageBg}`}>
      <section className={`py-10 md:py-14 ${sectionBg}`}>
        <div className="max-w-5xl mx-auto px-4">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 text-sm font-medium ${backLink} transition mb-4 md:mb-6`}
          >
            <span aria-hidden>←</span>
            <span>Back</span>
          </Link>

          <div className="text-center mb-8 md:mb-10">
            <h1 className={`text-4xl md:text-5xl font-serif font-bold ${heading}`}>
              Gift Certificates
            </h1>
            <p className={`mt-3 text-lg ${textMuted}`}>
              Give a moment of care and relaxation.
            </p>
          </div>

          <div className="grid gap-6 md:gap-8">
            {certificates.map((certificate) => (
              <div
                key={certificate.id}
                className={`flex flex-col md:flex-row items-center gap-6 md:gap-8 p-4 md:p-6 rounded-2xl shadow-sm border ${cardBg}`}
              >
                <div className="relative w-full md:w-2/5 shrink-0 aspect-[3/2] rounded-xl overflow-hidden bg-neutral-200">
                  <Image
                    src={certificate.src}
                    alt={certificate.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                    draggable={false}
                  />
                </div>
                <div className="w-full md:w-3/5">
                  <h2 className={`text-2xl font-semibold ${heading}`}>
                    {certificate.alt}
                  </h2>
                  <p className={`mt-2 leading-relaxed ${textMuted}`}>
                    {certificate.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
