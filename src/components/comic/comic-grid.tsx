"use client";

import { useComics } from "@/hooks/use-comics";
import { ComicCard, ComicCardSkeleton } from "./comic-card";

type ComicGridProps = {
  tags?: string;
};

export function ComicGrid({ tags }: ComicGridProps) {
  const { data: comics, isLoading, error } = useComics(tags);

  if (isLoading) {
    return <ComicGridSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        Failed to load comics. Please try again later.
      </div>
    );
  }

  if (!comics || comics.length === 0) {
    return (
      <div className="text-center text-zinc-500">No comics available yet.</div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {comics.map((comic) => (
        <ComicCard key={comic.id} comic={comic} />
      ))}
    </div>
  );
}

export function ComicGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <ComicCardSkeleton key={i} />
      ))}
    </div>
  );
}
