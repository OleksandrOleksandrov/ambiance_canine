"use client";

import React, { useEffect, useRef, useState } from "react";
import lightGallery from "lightgallery";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { fetchApi } from "../lib/api";
import { GalleryData } from "../types";
import { GalleryCardSkeleton } from "./Skeleton";

export default function Gallery(): React.JSX.Element {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
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
        const data = await fetchApi<GalleryData>(`/api/gallery?lang=${language}`);
        if (active) setImages(data.images);
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : t("common.loadingGallery"));
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    loadImages();
    return () => {
      active = false;
    };
  }, [language, t]);

  useEffect(() => {
    if (!galleryRef.current) return;

    const gallery = lightGallery(galleryRef.current, {
      plugins: [lgZoom],
      speed: 500,
      download: false,
      zoomFromOrigin: false,
    });
    lightGalleryInstance.current = gallery;

    return () => {
      gallery.destroy();
      lightGalleryInstance.current = null;
    };
  }, [images]);

  const bgClass = theme === "dark" ? "bg-[#111827]" : "bg-neutral-100";
  const titleColor = theme === "dark" ? "text-[#f3f4f6]" : "text-neutral-900";
  const subColor = theme === "dark" ? "text-[#9ca3af]" : "text-neutral-500";

  return (
    <section id="gallery" className={`py-10 ${bgClass}`}>
      <div className="w-full px-4">
        <div className="text-center mb-6">
          <h2 className={`text-3xl font-serif font-bold ${titleColor}`}>
            {t("gallery.title")}
          </h2>
          <p className={`${subColor} mt-2`}>
            {t("gallery.subtitle")}
          </p>
        </div>
        {loading && (
          <div className="grid grid-cols-5 gap-1">
            <GalleryCardSkeleton />
            <GalleryCardSkeleton />
            <GalleryCardSkeleton />
            <GalleryCardSkeleton />
            <GalleryCardSkeleton />
          </div>
        )}
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
