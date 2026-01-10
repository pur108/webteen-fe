"use client";

import { useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { User, LogIn, UserPlus, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import SettingsDialog from "./settings-dialog";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("auth_token");
}

function getServerSnapshot() {
  return false;
}

export default function UserMenu() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const isAuthenticated = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const t = useTranslations("Header");

  const handleLogin = () => {
    console.log("Login clicked - not implemented yet");
    // TODO: Navigate to login page or open modal
  };

  const handleSignup = () => {
    console.log("Sign up clicked - not implemented yet");
    // TODO: Navigate to signup page or open modal
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900 transition-colors">
            <User className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!isAuthenticated && (
            <>
              <DropdownMenuItem onClick={handleLogin}>
                <LogIn className="mr-2 h-4 w-4" />
                {t("login")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignup}>
                <UserPlus className="mr-2 h-4 w-4" />
                {t("signup")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
            <Settings className="mr-2 h-4 w-4" />
            {t("settings")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
