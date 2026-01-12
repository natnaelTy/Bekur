"use client";

import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Navbar from "../components/Navbar";
import Loader from "@/components/kokonutui/loader";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = authClient.useSession();
  const isAuthenticated = !!session;

  if (isPending || !session) {
    return (
      <Loader size="md" className="flex items-center justify-center h-screen" />
    );
  }

  if (!isAuthenticated) {
    redirect("/signin");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
