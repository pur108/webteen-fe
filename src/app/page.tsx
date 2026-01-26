"use client";

import { ComicGrid } from "@/components/comic";

export default function Home() {
  return (
    <div className="container py-6">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900">
        Comics
      </h1>
      <ComicGrid />
    </div>
  );
}
