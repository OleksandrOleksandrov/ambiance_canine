"use client";

import React from "react";
import Link from "next/link";
import { Place, Groomer } from "../types";
import { places as mockPlaces } from "../data/mockPlaces";
import { useTheme } from "../contexts/ThemeContext";

interface PlaceItemProps {
  place: Place;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Theme-aware Tailwind styles
  const cardBg = isDark
    ? "bg-[#18181b] border-neutral-800"
    : "bg-white border-neutral-200";
  const iconBg = isDark ? "bg-[#27272a]" : "bg-amber-50";
  const iconText = isDark ? "text-[#d1d5db]" : "text-amber-600";
  const labelStrong = isDark
    ? "text-[#d1d5db] font-semibold"
    : "text-neutral-900 font-semibold";
  const cardTitle = isDark ? "text-[#f3f4f6]" : "text-neutral-900";
  const buttonBg = isDark
    ? "bg-[#f59e0b] hover:bg-[#fbbf24] text-black"
    : "bg-neutral-900 hover:bg-amber-600 text-white";
  const placeholderBg = isDark
    ? "bg-[#1f2937] border-neutral-700 text-white"
    : "bg-neutral-800 border-neutral-600 text-neutral-400";
  const placeholderText = isDark
    ? "text-[#6b7280] text-xs"
    : "text-neutral-400 text-5xl";
  const textPrimary = isDark ? "text-[#d1d5db]" : "text-neutral-600";

  return (
    <div
      className={`group relative w-full ${cardBg} rounded-3xl overflow-hidden shadow-xl border transition-all duration-500 hover:shadow-2xl`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[300px]">
        {/* Photo Section */}
        <div className="relative md:col-span-5 min-h-[240px] md:min-h-full overflow-hidden">
          {place.photos && place.photos.length > 0 ? (
            <img
              src={place.photos[0]}
              alt={place.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 absolute inset-0"
              loading="lazy"
            />
          ) : (
            <div
              className={`${placeholderBg} flex items-center justify-center min-h-[240px] h-full`}
            >
              <span className={placeholderText}>📸</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">
              <span className={cardTitle}>{place.title}</span>
            </h3>

            <div className="space-y-3 text-sm">
              {/* Address */}
              <div className="flex items-center gap-3">
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${iconBg} ${iconText} text-sm shrink-0`}
                >
                  📍
                </span>
                <span className={textPrimary}>{place.address}</span>
              </div>

              {/* Team */}
              {place.groomers && place.groomers.length > 0 && (
                <div className={`flex items-center gap-3 ${textPrimary}`}>
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${iconBg} text-sm shrink-0`}
                  >
                    👨‍🔧
                  </span>
                  <span>
                    <strong className={labelStrong}>Team:</strong>{" "}
                    {place.groomers.map((g: Groomer) => g.name).join(", ")}
                  </span>
                </div>
              )}

              {/* Places Called */}
              {place.placesCalled && (
                <div className={`flex items-center gap-3 ${textPrimary}`}>
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${iconBg} ${iconText} text-sm shrink-0`}
                  >
                    🌟
                  </span>
                  <span className={labelStrong}>
                    &quot;{place.placesCalled}&quot;
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div
            className={`flex flex-wrap items-center gap-3 ${
              isDark ? "mt-8" : "mt-6"
            }`}
          >
            <Link
              href={`/places/${place.id}`}
              className={`inline-flex items-center gap-2 px-5 py-2.5 ${buttonBg} transition-colors text-xs font-semibold rounded-xl`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span>View Details</span>
            </Link>

            <a
              href={place.addressLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2.5 ${buttonBg} transition-colors text-xs font-semibold rounded-xl`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>View Location</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PlaceSelect() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <section
      id="locations"
      className={
        isDark
          ? "py-20 md:py-32 bg-gradient-to-b from-[#1f2937] to-[#111827] min-h-screen text-white"
          : "py-20 md:py-32 bg-gradient-to-b from-white to-neutral-50 min-h-screen text-neutral-900"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2
            className={`text-4xl md:text-5xl font-serif font-bold tracking-tight ${
              isDark ? "text-white" : "text-neutral-900"
            }`}
          >
            Our Locations
          </h2>
          <p
            className={`mt-4 text-lg md:text-xl ${
              isDark ? "text-neutral-400" : "text-neutral-500"
            }`}
          >
            Find your preferred salon
          </p>
        </div>

        <div className="flex flex-col gap-8 md:gap-10">
          {mockPlaces.map((place) => (
            <PlaceItem key={place.id} place={place} />
          ))}
        </div>
      </div>
    </section>
  );
}
