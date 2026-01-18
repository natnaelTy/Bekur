"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function GoogleCompletePage() {
  const { data: session, isPending } = authClient.useSession();
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifyAccountState = async () => {
      if (isPending) return;

      if (!session?.user) {
        router.replace("/signin");
        return;
      }

      try {
        const { data, error } = await authClient.$fetch("/list-accounts", {
          method: "GET",
          fetchOptions: { cache: "no-store" },
        });

        if (error) {
          toast.error(error.message || "Unable to check linked accounts");
          return;
        }

        const accounts = Array.isArray(data) ? data : [];
        const hasPassword = accounts.some(
          (account) => account?.providerId === "credential"
        );

        if (hasPassword) {
          router.replace("/");
          return;
        }
      } catch (err) {
        toast.error("Failed to verify your account state");
      } finally {
        setChecking(false);
      }
    };

    verifyAccountState();
  }, [isPending, router, session?.user]);

  const handleSetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setSaving(true);
    try {
      const { error } = await authClient.$fetch("/set-password", {
        method: "POST",
        body: { newPassword: password },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Password added to your account");
      router.replace("/");
    } catch (err) {
      toast.error("Something went wrong while saving your password");
    } finally {
      setSaving(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Secure your account</CardTitle>
          <p className="text-sm text-muted-foreground">
            You signed in with Google. Add a password so you can also log in
            with email and keep your credentials linked.
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSetPassword}>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a strong password"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm password</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </span>
              ) : (
                "Add password"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
