import React from "react";
import { notFound } from "next/navigation";
import type { Place } from "../../../types/index";
import { places, groomers } from "../../../data/mockPlaces";
import PlaceDetailView from "./PlaceDetailView";

export function generateStaticParams() {
  return places.map((place) => ({ id: place.id }));
}

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const place: Place | undefined = places.find((p) => p.id === id);

  if (!place) {
    notFound();
  }

  return <PlaceDetailView place={place} groomers={groomers} />;
}
