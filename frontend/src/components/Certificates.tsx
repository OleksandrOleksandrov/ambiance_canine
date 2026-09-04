'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '../contexts/ThemeContext';

const certificates = [
  {
    src: 'https://ambiance-s3.s3.us-east-1.amazonaws.com/certificates/untitled+folder/image_certificate_spa_ozon_rf.jpg',
    alt: 'Ozone spa gift certificate',
  },
  {
    src: 'https://ambiance-s3.s3.us-east-1.amazonaws.com/certificates/untitled+folder/image_certificate_50_euro_gift_fr.jpg',
    alt: '50 euro gift certificate',
  },
  {
    src: 'https://ambiance-s3.s3.us-east-1.amazonaws.com/certificates/untitled+folder/image_certificate_spa_ozon.jpg',
    alt: 'Ozone spa gift certificate',
  },
  {
    src: 'https://ambiance-s3.s3.us-east-1.amazonaws.com/certificates/untitled+folder/image_certificate_50_euro_gift.jpg',
    alt: '50 euro gift certificate',
  },
];

export default function Certificates(): React.JSX.Element {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const isDark = theme === 'dark';

  const showPrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + certificates.length) % certificates.length);
  };

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % certificates.length);
  };

  return (
    <section
      id="certificates"
      aria-labelledby="certificates-heading"
      className={`py-10 md:py-14 ${isDark ? 'bg-[#111827]' : 'bg-neutral-100'}`}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h2 id="certificates-heading" className={`text-3xl md:text-4xl font-serif font-bold ${isDark ? 'text-[#f3f4f6]' : 'text-neutral-900'}`}>
            Gift Certificates
          </h2>
          <p className={`mt-2 text-lg ${isDark ? 'text-[#9ca3af]' : 'text-neutral-500'}`}>
            Give a moment of care and relaxation.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {certificates.map((certificate) => (
                <div key={certificate.src} className="relative w-full shrink-0 bg-neutral-200">
                  <Image
                    src={certificate.src}
                    alt={certificate.alt}
                    width={1024}
                    height={1024}
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={showPrevious}
            aria-label="Show previous certificate"
            className={`absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full shadow-md transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${isDark ? 'bg-black/65 text-white hover:bg-black/80' : 'bg-white/90 text-neutral-800 hover:bg-white'}`}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
              <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Show next certificate"
            className={`absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full shadow-md transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${isDark ? 'bg-black/65 text-white hover:bg-black/80' : 'bg-white/90 text-neutral-800 hover:bg-white'}`}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
              <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-2" aria-label="Certificate slides">
          {certificates.map((certificate, index) => (
            <button
              key={certificate.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show certificate ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              className={`h-2.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${index === activeIndex ? 'w-7 bg-amber-500' : isDark ? 'w-2.5 bg-[#4b5563] hover:bg-[#6b7280]' : 'w-2.5 bg-neutral-300 hover:bg-neutral-400'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
