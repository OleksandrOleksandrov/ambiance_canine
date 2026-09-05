'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Accessibility from 'embla-carousel-accessibility';
import type { EmblaCarouselType } from 'embla-carousel';
import { useTheme } from '../contexts/ThemeContext';

type Certificate = {
  src: string;
  alt: string;
};

const certificates: Certificate[] = [
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

const useDotButton = (
  emblaApi: EmblaCarouselType | undefined
): {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
} => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.goTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.snapList());
  }, []);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reinit', onInit);
    emblaApi.on('reinit', onSelect);
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('reinit', onInit);
      emblaApi.off('reinit', onSelect);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
} => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    emblaApi?.goToPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    emblaApi?.goToNext();
  }, [emblaApi]);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setPrevBtnDisabled(!api.canGoToPrev());
    setNextBtnDisabled(!api.canGoToNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect(emblaApi);
    emblaApi.on('reinit', onSelect);
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('reinit', onSelect);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

const useAccessibility = (emblaApi: EmblaCarouselType | undefined): void => {
  useEffect(() => {
    if (!emblaApi) return;

    const setupAccessibility = (api: EmblaCarouselType) => {
      const accessibility = api.plugins().accessibility;
      if (!accessibility) return;

      accessibility.setupLiveRegion('.embla__live-region');
      accessibility.setupDotButtons('.embla__dots');
      accessibility.setupPrevAndNextButtons(
        '.embla__button--prev',
        '.embla__button--next'
      );
    };

    setupAccessibility(emblaApi);
    emblaApi.on('reinit', setupAccessibility);
    return () => {
      emblaApi.off('reinit', setupAccessibility);
    };
  }, [emblaApi]);
};

export default function Certificates(): React.JSX.Element {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: 'center',
      containScroll: 'trimSnaps',
      breakpoints: {
        '(prefers-reduced-motion: reduce)': { duration: 0 },
      },
    },
    [
      Accessibility({
        announceChanges: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      }),
    ]
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  useAccessibility(emblaApi);

  return (
    <section
      id="certificates"
      aria-labelledby="certificates-heading"
      className={`py-10 md:py-14 ${isDark ? 'bg-[#111827]' : 'bg-neutral-100'}`}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h2
            id="certificates-heading"
            className={`text-3xl md:text-4xl font-serif font-bold ${isDark ? 'text-[#f3f4f6]' : 'text-neutral-900'}`}
          >
            Gift Certificates
          </h2>
          <p
            className={`mt-2 text-lg ${isDark ? 'text-[#9ca3af]' : 'text-neutral-500'}`}
          >
            Give a moment of care and relaxation.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {certificates.map((certificate, index) => (
              <div
                key={certificate.src}
                className={`embla__slide relative shrink-0 basis-[80%] md:basis-[55%] px-2 md:px-3 ${index === 0 ? 'ml-[10%] md:ml-[22.5%]' : ''} ${index === certificates.length - 1 ? 'mr-[10%] md:mr-[22.5%]' : ''}`}
              >
                <div className="relative bg-neutral-200 rounded-xl overflow-hidden">
                  <Image
                    src={certificate.src}
                    alt={certificate.alt}
                    width={1024}
                    height={1024}
                    sizes="(max-width: 768px) 80vw, 55vw"
                    className="w-full h-auto"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={`embla__button embla__button--prev absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full shadow-md transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:opacity-40 disabled:cursor-not-allowed ${isDark ? 'bg-black/65 text-white hover:bg-black/80' : 'bg-white/90 text-neutral-800 hover:bg-white'}`}
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-none stroke-current stroke-2"
          >
            <path
              d="m15 18-6-6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className={`embla__button embla__button--next absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full shadow-md transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:opacity-40 disabled:cursor-not-allowed ${isDark ? 'bg-black/65 text-white hover:bg-black/80' : 'bg-white/90 text-neutral-800 hover:bg-white'}`}
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-none stroke-current stroke-2"
          >
            <path
              d="m9 18 6-6-6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="embla__controls mt-4 flex flex-col items-center gap-2">
        <div
          className="embla__dots flex justify-center gap-2"
          aria-label="Certificate slides"
        >
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onDotButtonClick(index)}
              className={`embla__dot h-2.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${index === selectedIndex ? 'w-7 bg-amber-500' : isDark ? 'w-2.5 bg-[#4b5563] hover:bg-[#6b7280]' : 'w-2.5 bg-neutral-300 hover:bg-neutral-400'}`}
            />
          ))}
        </div>
        <div className="embla__live-region sr-only" aria-live="polite" />
      </div>
    </section>
  );
}