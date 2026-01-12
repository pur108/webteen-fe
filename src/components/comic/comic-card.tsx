"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import type { Comic } from "@/schemas/comic";

function getLocalizedTitle(comic: Comic, locale: string): string {
  if (!comic.translations?.length) return "Untitled";
  const translation = comic.translations.find(
    (t) => t.language_code === locale
  );
  return translation?.title || comic.translations[0]?.title || "Untitled";
}

function getLocalizedSynopsis(comic: Comic, locale: string): string | null {
  if (!comic.translations?.length) return null;
  const translation = comic.translations.find(
    (t) => t.language_code === locale
  );
  return translation?.synopsis || comic.translations[0]?.synopsis || null;
}

type ComicCardProps = {
  comic: Comic;
};

export function ComicCard({ comic }: ComicCardProps) {
  const locale = useLocale();
  const title = getLocalizedTitle(comic, locale);

  return (
    <Link href={`/comics/${comic.id}`} className="group">
      <div className="overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <div className="relative aspect-3/4">
          <Image
            src={comic.cover_image_url}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        </div>
      </div>
      <div className="mt-2 space-y-1">
        <h3 className="line-clamp-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {comic.author}
        </p>
      </div>
    </Link>
  );
}

export function ComicCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-3/4 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
      <div className="mt-2 space-y-2">
        <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-3 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </div>
  );
}
