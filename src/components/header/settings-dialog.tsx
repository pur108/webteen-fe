"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", label: "English" },
  { code: "th", label: "ไทย" },
];

function setCookie(name: string, value: string) {
  if (typeof document !== "undefined") {
    document.cookie = `${name}=${value}; path=/; max-age=31536000`;
  }
}

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SettingsDialog({
  open,
  onOpenChange,
}: SettingsDialogProps) {
  const locale = useLocale();
  const t = useTranslations("Header");

  const switchLanguage = (newLocale: string) => {
    setCookie("locale", newLocale);
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("settings")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="language-select" className="text-sm font-medium">
              {t("language")}
            </label>
            <select
              id="language-select"
              value={locale}
              onChange={(e) => switchLanguage(e.target.value)}
              className={cn(
                `px-3 py-2 rounded-lg 
                border border-zinc-200 
                bg-white transition-colors`
              )}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
