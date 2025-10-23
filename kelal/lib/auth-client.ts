"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000/api/auth",
});

export const handleGoogleSignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google"
  });
  return data;
};

export const { signUp, signIn, signOut, useSession } = authClient;
