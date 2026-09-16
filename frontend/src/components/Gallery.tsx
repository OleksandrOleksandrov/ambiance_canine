"use client";

import React, { useEffect, useRef, useState } from "react";
import lightGallery from "lightgallery";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import { useTheme } from "../contexts/ThemeContext";
import { fetchApi } from "../lib/api";
import { GalleryData } from "../types";

export default function Gallery(): React.JSX.Element {
  const { theme } = useTheme();
  const galleryRef = useRef<HTMLDivElement>(null);
  const lightGalleryInstance = useRef<ReturnType<typeof lightGallery> | null>(
    null
  );
  const [images, setImages] = useState<GalleryData["images"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadImages = async () => {
      try {
        const data = await fetchApi<GalleryData>("/api/gallery");
        if (active) setImages(data.images);
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Unable to load gallery.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    loadImages();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!galleryRef.current) return;

    const gallery = lightGallery(galleryRef.current, {
      plugins: [lgThumbnail, lgZoom],
      speed: 500,
      download: false,
      animateThumb: false,
      zoomFromOrigin: false,
      allowMediaOverlap: true,
      toggleThumb: true,
    });
    lightGalleryInstance.current = gallery;

    return () => {
      gallery.destroy();
      lightGalleryInstance.current = null;
    };
  }, [images.length]);

  const bgClass = theme === "dark" ? "bg-[#111827]" : "bg-neutral-100";
  const titleColor = theme === "dark" ? "text-[#f3f4f6]" : "text-neutral-900";
  const subColor = theme === "dark" ? "text-[#9ca3af]" : "text-neutral-500";

  return (
    <section id="gallery" className={`py-10 ${bgClass}`}>
      <div className="w-full px-4">
        <div className="text-center mb-6">
          <h2 className={`text-3xl font-serif font-bold ${titleColor}`}>
            Salon Gallery
          </h2>
          <p className={`${subColor} mt-2`}>
            Moments of care, grooming, and styling
          </p>
        </div>
        {loading && <p className={`text-center ${subColor}`}>Loading gallery...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
        {!loading && !error && (
          <div ref={galleryRef} className="grid grid-cols-5 gap-1">
            {images.map((image) => (
              <a
                key={image.id}
                href={image.url}
                className="block overflow-hidden rounded-xl shadow-sm aspect-square"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
