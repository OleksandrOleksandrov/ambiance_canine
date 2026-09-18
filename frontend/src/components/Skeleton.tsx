"use client";

import React from "react";
import { useTheme } from "../contexts/ThemeContext";

export function Skeleton({ className = "" }: { className?: string }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const base = isDark
    ? "rgba(55, 65, 81, 0.65)"
    : "rgba(226, 232, 240, 0.6)";
  const highlight = isDark
    ? "rgba(107, 114, 128, 0.9)"
    : "rgba(148, 163, 180, 0.85)";

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${highlight} 50%, transparent 100%)`,
          animation: "shimmer-sweep 1.8s ease-in-out infinite",
        }}
      />
      <div
        className="h-full w-full"
        style={{ backgroundColor: base }}
      />
    </div>
  );
}

export function SkeletonText({
  lines = 1,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? "w-3/4" : "w-full"}`}
        />
      ))}
    </div>
  );
}

export function PlaceCardSkeleton() {
  return (
    <div className="group relative w-full rounded-3xl overflow-hidden shadow-xl border border-transparent animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[300px]">
        <div className="md:col-span-5 min-h-[240px] md:min-h-full">
          <Skeleton className="h-full w-full min-h-[240px] md:rounded-none md:rounded-l-3xl rounded-t-3xl" />
        </div>
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <Skeleton className="h-10 w-48 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="w-full">
      <div className="space-y-4">
        <Skeleton className="h-9 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-64 w-full md:rounded-xl" />
      </div>
    </div>
  );
}

export function GalleryCardSkeleton() {
  return (
    <div className="block overflow-hidden rounded-xl shadow-sm aspect-square">
      <Skeleton className="h-full w-full rounded-xl" />
    </div>
  );
}

export function CertificateListSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <CertificateCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CertificateCardSkeleton() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 p-4 md:p-6 rounded-2xl shadow-sm">
      <div className="relative w-full md:w-2/5 shrink-0 aspect-[3/2] rounded-xl overflow-hidden">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
      <div className="w-full md:w-3/5 space-y-3">
        <Skeleton className="h-7 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

export function CertificateSlideSkeleton() {
  return (
    <div className="relative rounded-xl overflow-hidden aspect-[3/2] flex items-center justify-center">
      <Skeleton className="h-full w-full rounded-xl" />
    </div>
  );
}
