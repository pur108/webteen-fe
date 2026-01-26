"use client";

import {
  useSession,
  signIn,
  signOut as nextAuthSignOut,
} from "next-auth/react";
import { useEffect, useCallback } from "react";

const AUTH_TOKEN_KEY = "auth_token";

export function useAuthSync() {
  const { data: session, status } = useSession();

  const backendToken = session?.backendToken;
  const sessionError = session?.error;

  useEffect(() => {
    if (status === "loading") return;

    if (backendToken) {
      localStorage.setItem(AUTH_TOKEN_KEY, backendToken);
      window.dispatchEvent(new Event("storage"));
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      window.dispatchEvent(new Event("storage"));
    }
  }, [backendToken, status]);

  useEffect(() => {
    if (sessionError === "RefreshTokenError") {
      nextAuthSignOut({ callbackUrl: "/" });
    }
  }, [sessionError]);

  const signOut = useCallback(async () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    window.dispatchEvent(new Event("storage"));
    await nextAuthSignOut({ callbackUrl: "/" });
  }, []);

  const signInWithGoogle = useCallback((callbackUrl?: string) => {
    signIn("google", { callbackUrl: callbackUrl ?? window.location.href });
  }, []);

  return {
    session,
    status,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    signOut,
    signInWithGoogle,
  };
}
