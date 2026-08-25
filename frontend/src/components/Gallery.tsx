'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { GalleryImage } from '../types';

export default function Gallery(): React.JSX.Element {
  const { theme } = useTheme();
  
  const bgClass = theme === 'dark' ? 'bg-[#111827]' : 'bg-neutral-100';
  const titleColor = theme === 'dark' ? 'text-[#f3f4f6]' : 'text-neutral-900';
  const subColor = theme === 'dark' ? 'text-[#9ca3af]' : 'text-neutral-500';

  const images: GalleryImage[] = Array.from({ length: 15 }).map((_, i) => ({
    id: i + 1,
    name: `Image ${i + 1}`,
    alt: `Salon Image ${i + 1}`,
    url: `https://ambiance-dev.s3.us-east-1.amazonaws.com/gallery/photo_gallery_${i + 1}.jpg`,
  }));

  return (
    <section id="gallery" className={`py-20 ${bgClass}`}>
      <div className="w-full px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-serif font-bold ${titleColor}`}>Salon Gallery</h2>
          <p className={`${subColor} mt-2`}>Moments of care, grooming, and styling</p>
        </div>

        <div className="grid grid-cols-5 gap-1">
          {images.map((img) => (
            <div key={img.id} className="overflow-hidden rounded-xl shadow-sm aspect-square">
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
