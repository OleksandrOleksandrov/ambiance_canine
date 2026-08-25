'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import PlaceSelect from '../components/PlaceSelect';
import Gallery from '../components/Gallery';
import ContactBooking from '../components/ContactBooking';
import Footer from '../components/Footer';
import { useTheme } from '../contexts/ThemeContext';

export default function Home() {
  const { theme } = useTheme();

  return (
    <main className={`min-h-screen ${theme === 'dark' ? 'bg-[#0a0a0a] text-[#ededed]' : 'bg-neutral-50 text-neutral-800'}`}>
      <div className="relative z-50">
        <Navbar />
        {/* Theme switcher is now available in the Navbar */}
      </div>
      <div className="mt-16">
        <Hero />
      </div>
      <Services />
      <PlaceSelect />
      <Gallery />
      <ContactBooking />
      <Footer />
    </main>
  );
}
