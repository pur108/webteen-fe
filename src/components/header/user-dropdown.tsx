"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Settings, LogOut, Palette, Shield } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuthSync } from "@/hooks/use-auth-sync";
import Image from "next/image";

interface UserDropdownProps {
  user: {
    id: string;
    username: string;
    email: string;
    image: string;
    role: "user" | "creator" | "admin";
  };
}

export function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter();
  const { signOut } = useAuthSync();
  const t = useTranslations("Header");

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="h-9 w-9 overflow-hidden rounded-full border border-zinc-200 hover:opacity-80 transition-opacity">
          <Image
            src={user.image}
            alt={user.username}
            width={36}
            height={36}
            className="h-full w-full object-cover"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="px-2 py-2 text-sm font-medium">
          {user.username || user.email}
        </div>

        <DropdownMenuSeparator />

        {user.role === "creator" && (
          <DropdownMenuItem onClick={() => router.push("/creator/dashboard")}>
            <Palette className="mr-2 h-4 w-4" />
            {t("creatorDashboard")}
          </DropdownMenuItem>
        )}

        {user.role === "admin" && (
          <DropdownMenuItem onClick={() => router.push("/admin/dashboard")}>
            <Shield className="mr-2 h-4 w-4" />
            {t("adminDashboard")}
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={() => router.push("/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          {t("settings")}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
