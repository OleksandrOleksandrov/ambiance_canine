"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ServiceCategory } from "../types";
import { useTheme } from "../contexts/ThemeContext";
import { fetchApi } from "../lib/api";
import BeforeAfterComparison from "./BeforeAfterComparison";
import { ServiceCardSkeleton } from "./Skeleton";

interface ServiceBlock {
  title: string;
  subtitle: string;
  description: string;
  icon?: string | null;
  image: string;
  afterImage?: string;
  mediaType?: "image" | "video";
}

export default function Services(): React.JSX.Element {
  const { theme } = useTheme();
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [designImageIndex, setDesignImageIndex] = useState(0);
  const mobileMediaHeight = "100svh";
  const mediaWrapperClassName =
    "w-screen relative left-1/2 -translate-x-1/2 h-[var(--mobile-height)] md:static md:w-full md:translate-x-0 md:h-[512px] mt-4";

  useEffect(() => {
    let active = true;
    const loadCategories = async () => {
      try {
        const data = await fetchApi<ServiceCategory[]>("/api/services");
        if (active) setCategories(data);
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Unable to load services.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    loadCategories();
    return () => {
      active = false;
    };
  }, []);

  const designCategory = categories.find(
    (category) => category.slug === "creative-design"
  );
  const designImages =
    designCategory?.media.filter((media) => media.role === "primary") || [];

  useEffect(() => {
    if (designImages.length <= 1) return;
    const interval = window.setInterval(() => {
      setDesignImageIndex(
        (current) => (current + 1) % designImages.length
      );
    }, 3000);
    return () => window.clearInterval(interval);
  }, [designImages.length]);

  const serviceBlocks = useMemo<ServiceBlock[]>(
    () =>
      categories.map((category) => {
        const primaryMedia = category.media.filter(
          (media) => media.role === "primary"
        );
        const selectedMedia =
          primaryMedia[designImageIndex % Math.max(primaryMedia.length, 1)] ||
          category.media[0];
        const afterMedia = category.media.find(
          (media) => media.role === "after"
        );

        return {
          title: category.title,
          subtitle: category.subtitle,
          description: category.description,
          icon: category.icon,
          image: selectedMedia?.url || category.image || "",
          afterImage: afterMedia?.url || category.afterImage || undefined,
          mediaType: category.mediaType,
        };
      }),
    [categories, designImageIndex]
  );

  return (
    <section
      id="services"
      className={`py-8 ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#1f2937] to-[#111827]"
          : "bg-gradient-to-b from-white to-neutral-50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2
            className={`text-4xl font-serif font-bold ${
              theme === "dark" ? "text-[#f3f4f6]" : "text-neutral-900"
            }`}
          >
            Our Services
          </h2>
          <p
            className={`${
              theme === "dark" ? "text-[#9ca3af]" : "text-neutral-500"
            } mt-3 text-lg`}
          >
            Comprehensive care for your beloved dogs
          </p>
        </div>
        {loading && (
          <div className="flex flex-col md:flex-row gap-4">
            <ServiceCardSkeleton />
            <ServiceCardSkeleton />
            <ServiceCardSkeleton />
          </div>
        )}
        {error && <p className="text-center text-red-600">{error}</p>}
        {!loading && !error && (
          <div className="flex flex-col md:flex-row gap-4">
            {serviceBlocks.map((block) => (
              <div key={block.subtitle} className="w-full md:flex-1">
                <h3
                  className={`text-xl font-serif font-bold ${
                    theme === "dark" ? "text-[#f3f4f6]" : "text-neutral-900"
                  }`}
                >
                  {block.icon && <span className="mr-2">{block.icon}</span>}
                  {block.title}
                </h3>
                <p
                  className={`mt-2 text-sm ${
                    theme === "dark" ? "text-[#9ca3af]" : "text-neutral-500"
                  }`}
                >
                  {block.description}
                </p>
                <div
                  className={mediaWrapperClassName}
                  style={
                    { "--mobile-height": mobileMediaHeight } as React.CSSProperties
                  }
                >
                  {block.mediaType === "video" || block.image.endsWith(".mov") ? (
                    <video
                      src={block.image}
                      className="w-full h-full object-cover md:rounded-xl"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : block.afterImage ? (
                    <BeforeAfterComparison
                      beforeImage={block.image}
                      afterImage={block.afterImage}
                      beforeLabel="Before"
                      afterLabel="After"
                      className="w-full h-full !rounded-none md:!rounded-xl"
                      autoPlay
                      autoPlayInterval={6000}
                      fadeDuration={1500}
                    />
                  ) : (
                    <img
                      src={block.image}
                      alt={block.title}
                      className="w-full h-full object-cover md:rounded-xl"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
