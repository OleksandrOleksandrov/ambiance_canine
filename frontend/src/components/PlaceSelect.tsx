'use client';

import React from 'react';
import { Place } from '../types';
import { places as mockPlaces } from '../data/mockPlaces';

interface PlaceItemProps {
  place: Place;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place }) => {
  return (
    <div className="group relative w-full bg-white rounded-3xl overflow-hidden shadow-xl border border-neutral-100 transition-all duration-500 hover:shadow-2xl">
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
            <div className="w-full h-full bg-neutral-100 flex items-center justify-center min-h-[240px]">
              <span className="text-5xl text-neutral-300">📸</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900">
              {place.title}
            </h3>

            <div className="space-y-3 text-sm">
              {/* Address */}
              <div className="flex items-center gap-3 text-neutral-600">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 text-amber-600 text-sm shrink-0">
                  📍
                </span>
                <span className="text-neutral-700 font-medium">{place.address}</span>
              </div>

              {/* Team */}
              {place.groomers && place.groomers.length > 0 && (
                <div className="flex items-center gap-3 text-neutral-600">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 text-amber-600 text-sm shrink-0">
                    👨‍🔧
                  </span>
                  <span className="text-neutral-700">
                    <strong className="font-semibold text-neutral-900">Team:</strong>{' '}
                    {place.groomers.map((g) => g.name).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* View Location Button */}
          <div>
            <a
              href={place.addressLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-amber-600 text-white transition-colors text-xs font-semibold rounded-xl"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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
  return (
    <section id="locations" className="py-20 md:py-32 bg-gradient-to-b from-white to-neutral-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 tracking-tight">
            Our Locations
          </h2>
          <p className="text-neutral-500 mt-4 text-lg md:text-xl">
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
