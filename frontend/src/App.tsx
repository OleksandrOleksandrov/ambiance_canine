import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

export default function App(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans">
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <Footer />
    </div>
  );
}
