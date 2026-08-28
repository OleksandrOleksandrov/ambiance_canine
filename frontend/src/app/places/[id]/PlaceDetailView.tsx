"use client";

import React from "react";
import Link from "next/link";
import { Place, Groomer } from "../../../types/index";
import { useTheme } from "../../../contexts/ThemeContext";

interface PlaceDetailViewProps {
  place: Place;
  groomers: Groomer[];
}

export default function PlaceDetailView({
  place,
  groomers,
}: PlaceDetailViewProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const pageBg = isDark
    ? "bg-gradient-to-b from-[#1f2937] to-[#111827] text-white"
    : "bg-gradient-to-b from-amber-50 to-white text-neutral-900";
  const cardBg = isDark
    ? "bg-[#18181b] border-neutral-800"
    : "bg-white border-neutral-200";
  const cardBgSoft = isDark ? "bg-[#1f2937]" : "bg-neutral-50";
  const heading = isDark ? "text-white" : "text-neutral-900";
  const textMuted = isDark ? "text-[#6b7280]" : "text-neutral-500";
  const badgeBg = isDark ? "bg-[#374151] text-[#fbbf24]" : "bg-amber-100 text-amber-800";
  const backLink = isDark ? "text-[#fbbf24] hover:text-amber-300" : "text-amber-700 hover:text-amber-800";
  const buttonBg = isDark
    ? "bg-[#f59e0b] hover:bg-[#fbbf24] text-black"
    : "bg-amber-600 hover:bg-amber-700 text-white";

  const availableGroomers = place.groomers
    .map((g) => groomers.find((full) => full.id === g.id))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <main className={`min-h-screen ${pageBg}`}>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <Link
          href="/"
          className={`inline-flex items-center gap-2 text-sm font-medium ${backLink} transition mb-8`}
        >
          <span aria-hidden>←</span>
          <span>Back</span>
        </Link>

        <div className="text-center mb-12">
          <h1 className={`text-5xl font-serif font-bold mb-4 ${heading}`}>
            {place.title}
          </h1>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badgeBg}`}
          >
            {place.place === "Main Salon" ? "Salon" : "Mobile Service"}
          </span>
        </div>

        {/* Header image */}
        <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl mb-12">
          {place.photos.length > 0 && (
            <img
              src={place.photos[0]}
              alt={place.title}
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
              <div>
                <p className={`text-sm font-medium ${textMuted}`}>Address</p>
                <p className={heading}>{place.address}</p>
              </div>
            </div>

            <div
              className={`flex items-start space-x-4 p-4 rounded-xl shadow-sm border ${cardBg}`}
            >
              <span className="text-2xl">📞</span>
              <div className="w-full">
                <p className={`text-sm font-medium ${textMuted}`}>Contact</p>
                <div className="mt-1 space-y-1">
                  {place.phone_number.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone}`}
                      className={`block ${heading} hover:underline`}
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {place.placesCalled && (
              <div
                className={`flex items-start space-x-4 p-4 rounded-xl shadow-sm border ${cardBg}`}
              >
                <span className="text-2xl">🌟</span>
                <div>
                  <p className={`text-sm font-medium ${textMuted}`}>Known for</p>
                  <p className={`italic ${heading}`}>
                    &quot;{place.placesCalled}&quot;
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Gallery */}
          <div
            className={`p-4 rounded-xl shadow-sm border ${cardBg}`}
          >
            <h3
              className={`text-sm font-semibold uppercase mb-4 ${textMuted}`}
            >
              Gallery
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {place.photos.slice(0, 4).map((photo) => (
                <img
                  key={photo}
                  src={photo}
                  alt={place.title}
                  className="w-full h-32 object-cover rounded-lg hover:opacity-90 transition cursor-pointer"
                  loading="lazy"
                />
              ))}
            </div>
            <a
              href={place.addressLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center w-full gap-2 px-6 py-3 mt-6 ${buttonBg} rounded-lg font-medium transition`}
            >
              <span>🗺️</span>
              <span>View on Google Maps</span>
            </a>
          </div>
        </div>

        {/* Available groomers */}
        <div
          className={`rounded-3xl p-8 shadow-sm border ${cardBg}`}
        >
          <h2
            className={`text-3xl font-serif font-bold text-center mb-8 ${heading}`}
          >
            Available Groomers
          </h2>
          {availableGroomers.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
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
                      Works at {groomer.placesIds.length}{" "}
                      {groomer.placesIds.length === 1 ? "location" : "locations"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={`text-center ${textMuted}`}>
              No groomers are currently assigned to this location.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
