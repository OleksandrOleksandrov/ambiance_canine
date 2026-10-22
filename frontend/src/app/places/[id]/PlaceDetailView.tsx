"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import lightGallery from 'lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import { Place } from "../../../types/index";
import { useTheme } from "../../../contexts/ThemeContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import LanguageSwitcher from "../../../components/LanguageSwitcher";
import { fetchApi } from "../../../lib/api";

function formatPhoneNumber(phone: string): string {
  return phone.replace(
    /^(\+33)(\d)(\d{2})(\d{2})(\d{2})(\d{2})$/,
    "$1 $2 $3 $4 $5 $6",
  );
}

interface PlaceDetailViewProps {
  place: Place;
}

export default function PlaceDetailView({
  place,
}: PlaceDetailViewProps) {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const [displayedPlace, setDisplayedPlace] = React.useState(place);
  const [contentError, setContentError] = React.useState<string | null>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    let active = true;
    const loadLocalizedPlace = async () => {
      try {
        const localizedPlace = await fetchApi<Place>(
          `/api/places/${encodeURIComponent(place.id)}?lang=${language}`
        );
        if (active) {
          setDisplayedPlace(localizedPlace);
          setContentError(null);
        }
      } catch (error) {
        if (active) {
          setContentError(
            error instanceof Error ? error.message : "Unable to load this location."
          );
        }
      }
    };
    loadLocalizedPlace();
    return () => {
      active = false;
    };
  }, [place.id, language]);

  const localizedPlace = displayedPlace;
  const pageBg = isDark
    ? "bg-gradient-to-b from-[#1f2937] to-[#111827] text-white"
    : "bg-gradient-to-b from-amber-50 to-white text-neutral-900";
  const cardBg = isDark
    ? "bg-[#18181b] border-neutral-800"
    : "bg-white border-neutral-200";
  const cardBgSoft = isDark ? "bg-[#1f2937]" : "bg-neutral-50";
  const heading = isDark ? "text-white" : "text-neutral-900";
  const textMuted = isDark ? "text-[#6b7280]" : "text-neutral-500";
  const backLink = isDark ? "text-[#fbbf24] hover:text-amber-300" : "text-amber-700 hover:text-amber-800";
  const buttonBg = isDark
    ? "bg-[#f59e0b] hover:bg-[#fbbf24] text-black"
    : "bg-amber-600 hover:bg-amber-700 text-white";

  const availableGroomers = localizedPlace.groomers;
  const photos = localizedPlace.photos ?? [];
  const phoneNumbers = localizedPlace.phone_number ?? [];

  const galleryRef = useRef<HTMLDivElement>(null);
  const lightGalleryInstance = useRef<ReturnType<typeof lightGallery> | null>(null);

  useEffect(() => {
    const galleryElement = galleryRef.current;

    if (galleryElement && !lightGalleryInstance.current) {
      const gallery = lightGallery(galleryElement, {
        plugins: [lgZoom],
        speed: 500,
        download: false,
        zoomFromOrigin: false,
        addClass: "place-gallery",
      });
      lightGalleryInstance.current = gallery;

      return () => {
        gallery.destroy();
        lightGalleryInstance.current = null;
      };
    }
  }, []);

  return (
    <main className={`min-h-screen ${pageBg}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 text-sm font-medium ${backLink} transition`}
          >
            <span aria-hidden>←</span>
            <span>{t("common.back")}</span>
          </Link>
          <LanguageSwitcher />
        </div>

        <div className="text-center mb-8">
          <h1 className={`text-5xl font-serif font-bold mb-4 ${heading}`}>
            {localizedPlace.title}
          </h1>
        </div>
        {contentError && (
          <p role="alert" className="mb-4 text-center text-red-600">
            {contentError}
          </p>
        )}

        {/* Header image */}
        <div className="relative h-100 rounded-3xl overflow-hidden shadow-xl mb-12">
          {photos.length > 0 && (
            <img
              src={photos[0]}
              alt={localizedPlace.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div
              className={`flex items-start space-x-4 p-4 rounded-xl shadow-sm border ${cardBg}`}
            >
              <span className="text-2xl">📍</span>
              <div className="w-full">
                <div>
                  <p className={`text-sm font-medium ${textMuted}`}>{t("common.address")}</p>
                  <p className={heading}>{localizedPlace.address}</p>
                </div>
                {localizedPlace.addressLink && (
                  <a
                    href={localizedPlace.addressLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-3 ml-auto flex w-fit items-center justify-center gap-2 px-4 py-2 ${buttonBg} rounded-lg text-sm font-medium transition`}
                  >
                    <span>🗺️</span>
                    <span>{t("common.viewMaps")}</span>
                  </a>
                )}
              </div>
            </div>

            <div
              className={`flex items-start space-x-4 p-4 rounded-xl shadow-sm border ${cardBg}`}
            >
              <span className="text-2xl">📞</span>
              <div className="w-full">
                <p className={`text-sm font-medium ${textMuted}`}>{t("common.contact")}</p>
                <div className="mt-1 space-y-1">
                  {phoneNumbers.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone}`}
                      className={`block ${heading} hover:underline`}
                    >
                      {formatPhoneNumber(phone)}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {localizedPlace.placesCalled && (
              <div
                className={`flex items-start space-x-4 p-4 rounded-xl shadow-sm border ${cardBg}`}
              >
                <span className="text-2xl">🌟</span>
                <div>
                  <p className={`text-sm font-medium ${textMuted}`}>{t("common.knownFor")}</p>
                  <p className={`italic ${heading}`}>
                    &quot;{localizedPlace.placesCalled}&quot;
                  </p>
                </div>
              </div>
            )}
            {/* Available groomers */}
            <div
              className={`rounded-3xl p-8 shadow-sm border ${cardBg}`}
            >
              <h2
                className={`text-3xl font-serif font-bold text-center mb-8 ${heading}`}
              >
                {t("common.groomers")}
              </h2>
              {availableGroomers.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {availableGroomers.map((groomer) => (
                    <div
                      key={groomer.id}
                      className={`flex items-center space-x-4 p-4 rounded-xl ${cardBgSoft}`}
                    >
                      {groomer.photo && (
                        <img
                          src={groomer.photo}
                          alt={groomer.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-amber-300"
                        />
                      )}
                      <div>
                        <h3 className={`font-semibold ${heading}`}>{groomer.name}</h3>
                        <p className={`text-xs mt-1 ${textMuted}`}>
                          {t("common.worksAt")} {groomer.placesIds.length}{" "}
                          {groomer.placesIds.length === 1 ? t("common.location_one") : t("common.location_many")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={`text-center ${textMuted}`}>
                  {t("common.noGroomers")}
                </p>
              )}
            </div>
          </div>

          {/* Gallery */}
          <div
            className={`p-4 rounded-xl shadow-sm border ${cardBg}`}
          >
            <h3
              className={`text-sm font-semibold uppercase mb-4 ${textMuted}`}
            >
              {t("gallery.title")}
            </h3>
            <div ref={galleryRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {photos.map((photo) => (
                <a
                  key={photo}
                  href={photo}
                  className="block overflow-hidden rounded-lg aspect-square"
                >
                  <img
                    src={photo}
                    alt={place.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
