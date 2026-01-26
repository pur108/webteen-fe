"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronUp, ChevronDown } from "lucide-react";

const USFlag = (
  <svg className="h-4 w-5" viewBox="0 0 20 14">
    <rect width="20" height="14" fill="#B22234" />
    <rect y="1.08" width="20" height="1.08" fill="white" />
    <rect y="3.23" width="20" height="1.08" fill="white" />
    <rect y="5.38" width="20" height="1.08" fill="white" />
    <rect y="7.54" width="20" height="1.08" fill="white" />
    <rect y="9.69" width="20" height="1.08" fill="white" />
    <rect y="11.85" width="20" height="1.08" fill="white" />
    <rect width="8" height="7.54" fill="#3C3B6E" />
  </svg>
);

const ThaiFlag = (
  <svg className="h-4 w-5" viewBox="0 0 20 14">
    <rect width="20" height="14" fill="white" />
    <rect width="20" height="2.33" fill="#A51931" />
    <rect y="11.67" width="20" height="2.33" fill="#A51931" />
    <rect y="4.67" width="20" height="4.67" fill="#2D2A4A" />
  </svg>
);

const languages = [
  { code: "en", label: "English", flag: USFlag },
  { code: "th", label: "ภาษาไทย", flag: ThaiFlag },
];

function setCookie(name: string, value: string) {
  if (typeof document !== "undefined") {
    document.cookie = `${name}=${value}; path=/; max-age=31536000`;
  }
}

export default function LanguageSwitcher() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const switchLanguage = (newLocale: string) => {
    setCookie("locale", newLocale);
    window.location.reload();
  };

  return (
    <DropdownMenu modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1.5">
          {locale.toUpperCase()}
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-2 min-w-0 w-auto">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={`gap-2 ${locale === lang.code ? "bg-zinc-100" : ""}`}
          >
            {lang.flag}
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
