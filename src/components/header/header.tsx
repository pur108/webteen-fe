"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import UserMenu from "./user-menu";

export default function Header() {
  const t = useTranslations("Header");

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "h-16 border-b border-zinc-200 dark:border-zinc-800",
        "bg-white/80 backdrop-blur-md dark:bg-zinc-950/80"
      )}
    >
      <div className="container flex h-full items-center justify-between">
        {/* Logo/Title */}
        <div className="font-bold text-xl">{t("title")}</div>

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  );
}
