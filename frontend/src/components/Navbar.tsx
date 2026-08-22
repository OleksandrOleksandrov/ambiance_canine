import React from 'react';

export default function Navbar(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
          <span className="text-2xl">🐾</span>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-neutral-900 leading-none">
              Ambiance Canine
            </h1>
            <p className="text-xs text-amber-600 font-medium tracking-wide">PARADISE DES ANIMAUX</p>
          </div>
        </a>

        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#services" className="hover:text-amber-600 transition-colors">Services</a>
          <a href="#gallery" className="hover:text-amber-600 transition-colors">Gallery</a>
          <a href="#booking" className="hover:text-amber-600 transition-colors">Book Visit</a>
          <a href="#contact" className="hover:text-amber-600 transition-colors">Contact</a>
        </nav>

        <a
          href="#booking"
          className="bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-amber-700 transition"
        >
          Book a Visit
        </a>
      </div>
    </header>
  );
}
