import React from 'react';

export default function Hero(): React.JSX.Element {
  return (
    <section className="bg-gradient-to-b from-amber-50 to-neutral-50 py-20 md:py-32">
      <div className="max-w-4xl mx-auto text-center px-4">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 mb-4">
          Personal Stylist for Dogs
        </span>
        <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-neutral-900 tracking-tight leading-tight mb-6">
          Ambiance Canine &amp; Paradise des Animaux
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
          Professional grooming, specialized teeth brushing, and relaxing ozone spa therapy crafted for your beloved pet in Cagnes-sur-Mer.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#booking"
            className="bg-neutral-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-neutral-800 transition"
          >
            Book a Stylist Visit
          </a>
          <a
            href="#services"
            className="bg-white border border-neutral-300 text-neutral-800 px-6 py-3 rounded-lg font-medium hover:bg-neutral-100 transition"
          >
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
}
