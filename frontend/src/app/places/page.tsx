import React from 'react';
import type { PlacesData, Place, Groomer } from '../../types/index';
import { placesData } from '../../data/mockPlaces';

export default function PlacesPage() {
  const places: Place[] = placesData.places;
  const groomers: Groomer[] = placesData.groomers;

  return (
    <main className="min-h-screen">
      <div className="bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-serif font-bold text-neutral-900 mb-4">
              Our Locations
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Visit us at one of our beautiful locations or we'll come to you with our mobile services.
              Each location offers the same luxurious experience tailored to your needs.
            </p>
          </div>
        </div>

        {places.length > 0 && (
          <div className="max-w-6xl mx-auto px-4 pb-16">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {places.map((place) => (
                <div key={place.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
                  {/* Header with main image */}
                  <div className="relative h-64 bg-gradient-to-r from-amber-500 to-orange-500">
                    {place.photos.length > 0 && (
                      <img
                        src={place.photos[0]}
                        alt={place.title}
                        className="w-full h-full object-cover opacity-90"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-orange-900/80 flex items-center px-8">
                      <div>
                        <h2 className="text-3xl font-serif font-bold text-white mb-2">{place.title}</h2>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                          {place.place === 'Main Salon' ? 'Salon' : 'Mobile Service'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Location details */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start space-x-4 p-4 bg-neutral-50 rounded-lg">
                        <span className="text-2xl">📍</span>
                        <div>
                          <p className="text-sm font-medium text-neutral-500">Address</p>
                          <p className="text-neutral-900">{place.address}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 p-4 bg-neutral-50 rounded-lg">
                        <span className="text-2xl">📞</span>
                        <div>
                          <p className="text-sm font-medium text-neutral-500">Contact</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {place.phone_number.map((phone) => (
                              <span key={phone} className="text-neutral-700">{phone}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Groomers */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                        <span className="text-xl">👨‍🔧</span>
                        <span>Our Team</span>
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {place.groomers.map((groomer) => {
                          const groomerData = groomers.find(g => g.id === groomer.id);
                          return (
                            <div key={groomer.id} className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                              {groomerData?.photo && (
                                <img
                                  src={groomerData.photo}
                                  alt={groomerData.name}
                                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-300"
                                />
                              )}
                              <span className="text-sm font-medium text-neutral-900">{groomerData?.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Google Maps */}
                    <a
                      href={place.addressLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition"
                    >
                      <span>🗺️</span>
                      <span>View on Google Maps</span>
                    </a>

                    {/* Gallery */}
                    <div className="mt-8">
                      <h3 className="text-sm font-semibold text-neutral-600 uppercase mb-4">Gallery</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {place.photos.slice(0, 6).map((photo) => (
                          <img
                            key={photo}
                            src={photo}
                            alt={place.title}
                            className="w-full h-24 object-cover rounded-lg hover:opacity-90 transition cursor-pointer"
                            loading="lazy"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="bg-white border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-serif font-bold text-neutral-900 text-center mb-8">
            Our Specialists
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {groomers.map((groomer) => (
              <div key={groomer.id} className="text-center">
                {groomer.photo && (
                  <img
                    src={groomer.photo}
                    alt={groomer.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-amber-200 mx-auto mb-4"
                  />
                )}
                <h3 className="font-semibold text-neutral-900">{groomer.name}</h3>
                {groomer.placesIds.length > 0 && (
                  <p className="text-xs text-neutral-500 mt-2">
                    Works at: {groomer.placesIds.slice(0, 2).join(', ')}{groomer.placesIds.length > 2 ? ' and ' + (groomer.placesIds.length - 2) + ' more' : ''}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
