'use client';

import React, { useRef, useEffect } from 'react';
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import { useTheme } from '../contexts/ThemeContext';
import { GalleryImage } from '../types';

export default function Gallery(): React.JSX.Element {
  const { theme } = useTheme();
  const galleryRef = useRef<HTMLDivElement>(null);
  const lightGalleryInstance = useRef<ReturnType<typeof lightGallery> | null>(null);

  const bgClass = theme === 'dark' ? 'bg-[#111827]' : 'bg-neutral-100';
  const titleColor = theme === 'dark' ? 'text-[#f3f4f6]' : 'text-neutral-900';
  const subColor = theme === 'dark' ? 'text-[#9ca3af]' : 'text-neutral-500';

  const images: GalleryImage[] = Array.from({ length: 15 }).map((_, i) => ({
    id: i + 1,
    name: `Image ${i + 1}`,
    alt: `Salon Image ${i + 1}`,
    url: `https://ambiance-dev.s3.us-east-1.amazonaws.com/gallery/photo_gallery_${i + 1}.jpg`,
  }));

  useEffect(() => {
    if (galleryRef.current && !lightGalleryInstance.current) {
      lightGalleryInstance.current = lightGallery(galleryRef.current, {
        plugins: [lgThumbnail, lgZoom],
        speed: 500,
        download: false,
        animateThumb: false,
        zoomFromOrigin: false,
        allowMediaOverlap: true,
        toggleThumb: true,
      });
    }

    return () => {
      if (lightGalleryInstance.current) {
        lightGalleryInstance.current.destroy();
        lightGalleryInstance.current = null;
      }
    };
  }, []);

  return (
    <section id="gallery" className={`py-10 ${bgClass}`}>
      <div className="w-full px-4">
         <div className="text-center mb-6">
          <h2 className={`text-3xl font-serif font-bold ${titleColor}`}>Salon Gallery</h2>
          <p className={`${subColor} mt-2`}>Moments of care, grooming, and styling</p>
        </div>

        <div ref={galleryRef} className="grid grid-cols-5 gap-1">
          {images.map((img) => (
            <a
              key={img.id}
              href={img.url}
              className="block overflow-hidden rounded-xl shadow-sm aspect-square"
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
