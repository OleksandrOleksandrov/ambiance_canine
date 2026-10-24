"use client";

import { PlaceCardSkeleton } from "../../../components/Skeleton";
import { useTheme } from "../../../contexts/ThemeContext";

export default function PlaceDetailLoading() {
  const { theme } = useTheme();

  return (
    <main
      className={
        theme === "dark"
          ? "min-h-screen bg-[#0a0a0a]"
          : "min-h-screen bg-neutral-50"
      }
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="h-5 w-24 animate-pulse mb-8" />
        <PlaceCardSkeleton />
      </div>
    </main>
  );
}
