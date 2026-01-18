"use client";
import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000/api/auth",
  plugins: [adminClient()],
});

const GOOGLE_CALLBACK_PATH = "/google-complete";

export const handleGoogleSignIn = async (callbackURL?: string) => {
  const resolvedCallback =
    callbackURL ||
    (typeof window !== "undefined"
      ? `${window.location.origin}${GOOGLE_CALLBACK_PATH}`
      : GOOGLE_CALLBACK_PATH);

  return authClient.signIn.social({
    provider: "google",
    callbackURL: resolvedCallback,
  });
};

export const { signUp, signIn, signOut, useSession } = authClient;
