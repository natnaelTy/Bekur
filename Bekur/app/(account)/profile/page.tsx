"use client";

import { motion } from "framer-motion";
import { authClient, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { LogOut, ArrowLeft, Check  } from "lucide-react";
import { handleGoogleSignIn } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";
import SkeletonProfile from "./SkeletonProfile";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
  const { data: session, isPending, error } = authClient.useSession();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  if (isPending)
    return (
      <SkeletonProfile />
    );
  if (error)
    return toast.error(error.message || "An unexpected error occurred");

  const user = session?.user;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-lg mb-6">You are not signed in</p>
        <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 ">
      <div className="relative max-w-7xl h-full mx-auto w-full mx-auto flex flex-col items-center">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => router.back()}
          className="absolute top-0 left-0 md:left-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-400/10 "
        >
          <ArrowLeft className="size-10" />
        </button>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="p-6 rounded-2xl">
            <CardHeader className="text-center">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-24 h-24 border-2">
                  {user.image ? (
                    <AvatarImage
                      src={user.image}
                      alt={user.name || "User"}
                      className="object-cover"
                    />
                  ) : (
                    <AvatarFallback className="text-2xl">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  )}
                </Avatar>

                <CardTitle className="text-2xl md:text-3xl font-bold">
                  {user.name || "Unnamed User"}
                </CardTitle>

                <p className="text-sm md:text-base">
                  {user.email || "No email available"}
                </p>
              </div>
              <Link href="/settings/edit-profile    ">
                <Button variant="secondary" className="mt-4">
                  Edit Profile
                </Button>
              </Link>
            </CardHeader>

            <CardContent className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Account Type</span>
                <span>Google Account</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Member Since</span>
                <span>
                  {new Date(user.createdAt || Date.now()).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Email Verified</span>
                <span>{user.emailVerified ? <Check className="text-green-500"/> : "❌ No"}</span>
              </div>

              <div className="flex justify-center pt-6">
                <Button
                  onClick={() => signOut()}
                  className="flex items-center gap-2"
                  disabled={isPending}
                >
                  <LogOut size={18} />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
