"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Accessibility from "embla-carousel-accessibility";
import type { EmblaCarouselType } from "embla-carousel";
import { useTheme } from "../contexts/ThemeContext";
import { fetchApi } from "../lib/api";
import type { CertificatesData, Certificate } from "../types";
import { CertificateSlideSkeleton } from "./Skeleton";

const useAccessibility = (emblaApi: EmblaCarouselType | undefined): void => {
  useEffect(() => {
    if (!emblaApi) return;

    const setupAccessibility = (api: EmblaCarouselType) => {
      const accessibility = api.plugins().accessibility;
      if (!accessibility) return;

      accessibility.setupLiveRegion(".embla__live-region");
      accessibility.setupDotButtons(".embla__dots");
      accessibility.setupPrevAndNextButtons(
        ".embla__button--prev",
        ".embla__button--next"
      );
    };

    setupAccessibility(emblaApi);
    emblaApi.on("reinit", setupAccessibility);
    return () => {
      emblaApi.off("reinit", setupAccessibility);
    };
  }, [emblaApi]);
};

export default function Certificates(): React.JSX.Element {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: "center",
      containScroll: false,
      breakpoints: {
        "(prefers-reduced-motion: reduce)": { duration: 0 },
      },
    },
    [
      Accessibility({
        announceChanges: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      }),
    ]
  );

  useEffect(() => {
    let active = true;
    const loadCertificates = async () => {
      try {
        const data = await fetchApi<CertificatesData>("/api/certificates");
        if (active) setCertificates(data.certificates);
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Unable to load certificates."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    loadCertificates();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const updateSelection = () => {
      setSelectedIndex(emblaApi.selectedSnap());
    };
    emblaApi.on("select", updateSelection);
    emblaApi.on("reinit", updateSelection);
    return () => {
      emblaApi.off("select", updateSelection);
      emblaApi.off("reinit", updateSelection);
    };
  }, [emblaApi]);

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, certificates.length]);

  useAccessibility(emblaApi);

  useEffect(() => {
    if (!emblaApi) return;
    const containerNode = emblaApi.containerNode();
    if (!containerNode) return;

    const timer = window.setTimeout(() => emblaApi.reInit(), 50);
    const resizeObserver = new ResizeObserver(() => emblaApi.reInit());
    resizeObserver.observe(containerNode);

    return () => {
      window.clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [emblaApi]);

  const scrollSnaps = emblaApi?.snapList() ?? [];
  const prevBtnDisabled = emblaApi ? !emblaApi.canGoToPrev() : true;
  const nextBtnDisabled = emblaApi ? !emblaApi.canGoToNext() : true;

  return (
    <section
      id="certificates"
      aria-labelledby="certificates-heading"
      className={`py-10 md:py-14 ${isDark ? "bg-[#111827]" : "bg-neutral-100"
        }`}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h2
            id="certificates-heading"
            className={`text-3xl md:text-4xl font-serif font-bold ${isDark ? "text-[#f3f4f6]" : "text-neutral-900"
              }`}
          >
            Gift Certificates
          </h2>
          <p
            className={`mt-2 text-lg ${isDark ? "text-[#9ca3af]" : "text-neutral-500"
              }`}
          >
            Give a moment of care and relaxation.
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex gap-2 px-2 md:px-3">
          <div className="relative shrink-0 basis-[80%] md:basis-[55%]">
            <CertificateSlideSkeleton />
          </div>
          <div className="relative shrink-0 basis-[80%] md:basis-[55%]">
            <CertificateSlideSkeleton />
          </div>
        </div>
      )}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && !error && (
        <>
          <div className="relative">
            <div className="embla overflow-hidden" ref={emblaRef}>
              <div className="embla__container flex items-center">
                {certificates.map((certificate) => (
                  <div
                    key={certificate.id}
                    className="embla__slide relative shrink-0 basis-[80%] md:basis-[55%] px-2 md:px-3"
                  >
                    <Link
                      href="/certificates"
                      className="group block rounded-xl overflow-hidden"
                      aria-label="View all gift certificates"
                    >
                      <div className="relative bg-neutral-200 rounded-xl overflow-hidden aspect-[3/2] flex items-center justify-center">
                        <Image
                          src={certificate.src}
                          alt={certificate.alt}
                          width={1280}
                          height={853}
                          sizes="(max-width: 853px, max-height: 1280px) 80vw, 55vw"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          draggable={false}
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className={`embla__button embla__button--prev absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full shadow-md transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:opacity-40 disabled:cursor-not-allowed z-10 ${isDark
                  ? "bg-black/65 text-white hover:bg-black/80"
                  : "bg-white/90 text-neutral-800 hover:bg-white"
                }`}
              onClick={() => emblaApi?.goToPrev()}
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
              className={`embla__button embla__button--next absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full shadow-md transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:opacity-40 disabled:cursor-not-allowed z-10 ${isDark
                  ? "bg-black/65 text-white hover:bg-black/80"
                  : "bg-white/90 text-neutral-800 hover:bg-white"
                }`}
              onClick={() => emblaApi?.goToNext()}
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
                  onClick={() => emblaApi?.goTo(index)}
                  className={`embla__dot h-2.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${index === selectedIndex
                      ? "w-7 bg-amber-500"
                      : isDark
                        ? "w-2.5 bg-[#4b5563] hover:bg-[#6b7280]"
                        : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
                    }`}
                />
              ))}
            </div>
            <div className="embla__live-region sr-only" aria-live="polite" />
          </div>
        </>
      )}
    </section>
  );
}
