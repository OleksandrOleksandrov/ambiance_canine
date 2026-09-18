import { PlaceCardSkeleton } from "../../../components/Skeleton";

export default function PlaceDetailLoading() {
  return (
    <main className="bg-neutral-50 dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="h-5 w-24 animate-pulse mb-8" />
        <PlaceCardSkeleton />
      </div>
    </main>
  );
}
