import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { cn } from "@/lib/utils";
import UserMenu from "./user-menu";
import LanguageSwitcher from "./language-switcher";

export default async function Header() {
  const t = await getTranslations("Header");

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "h-12 border-b border-zinc-200",
        "bg-white/80 backdrop-blur-md",
      )}
    >
      <div className="container flex h-full items-center justify-between">
        <div className="flex gap-8">
          <Link href="/" className="font-bold text-xl">
            Webteen
          </Link>
          <Link
            href="/browse"
            className="font-bold text-xl text-gray-800 hover:underline"
          >
            {t("browse")}
          </Link>
          <Link
            href="/library"
            className="font-bold text-xl text-gray-800 hover:underline"
          >
            {t("library")}
          </Link>

          <Link
            href="/creator/publish"
            className="font-bold text-xl text-gray-800 hover:underline"
          >
            {t("creator")}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <UserMenu />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
