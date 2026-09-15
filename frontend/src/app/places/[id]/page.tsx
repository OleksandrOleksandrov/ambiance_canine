import { notFound } from "next/navigation";
import type { Place } from "../../../types/index";
import { ApiError, fetchApi } from "../../../lib/api";
import PlaceDetailView from "./PlaceDetailView";

export async function generateStaticParams() {
  const data = await fetchApi<{ places: Place[] }>("/api/places");
  if (data.places.length === 0) {
    throw new Error("The places API returned no active places.");
  }
  return data.places.map((place) => ({ id: place.id }));
}

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let place: Place;
  try {
    place = await fetchApi<Place>(`/api/places/${encodeURIComponent(id)}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  return <PlaceDetailView place={place} />;
}
