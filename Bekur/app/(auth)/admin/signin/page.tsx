"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { authClient, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminSignin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, isPending, error } = authClient.useSession();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    
    setLoading(true);
    try {
      const { error } = await signIn.email({
        email: data.email,
        password: data.password,
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Admin login successful!");
        form.reset();
        router.replace("/admin/overview");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="flex w-full min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-950 p-8 md:p-20 w-full max-w-[610px] relative"
        >
          <h1 className="text-2xl text-slate-800 font-bold text-left mb-2 dark:text-white">
            Welcome to Bekur Admin Panel
          </h1>
          <p className="text-left text-gray-600 dark:text-gray-400 mb-8">
            Sign in to manage users, applications, and settings
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2 w-5 h-5 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="admin@example.com"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2 w-5 h-5 text-gray-400" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          {...field}
                          className="pl-10 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2 text-gray-400"
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-right mt-2">
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="primaryBtn w-full flex items-center justify-center"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </Form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Not an admin?{" "}
            <Link href="/signin" className="text-blue-600 hover:underline">
              Go to user sign in
            </Link>
          </p>
        </motion.div>

        <div className="bg-gradient-to-br from-blue-800 via-blue-400 to-sky-300 relative w-full hidden md:block overflow-hidden">
          <div
            style={{
              background:
                "radial-gradient(ellipse at center,rgba(255, 0, 123, 0.14),rgba(255, 0, 157, 0.16),rgba(255, 255, 255, 1))",
            }}
            className="absolute top-0 left-90 w-[500px] h-[400px] rounded-full blur-3xl opacity-80 skew-x-32"
          ></div>
          <div
            style={{
              background:
                "radial-gradient(ellipse at center,rgba(255, 0, 191, 0.38),rgba(255, 0, 123, 0.39),rgba(255, 255, 255, 1))",
            }}
            className="absolute bottom-0 left-0 w-[300px] h-[400px] rounded-full blur-3xl opacity-80 skew-x-32"
          ></div>
          <div
            style={{
              background:
                "radial-gradient(ellipse at center,rgba(0, 174, 255, 0.22),rgba(0, 238, 255, 0.2),rgba(255, 255, 255, 1))",
            }}
            className="absolute bottom-0 left-0 w-[400px] h-[450px] rounded-full blur-3xl opacity-80 skew-x-32"
          ></div>
        </div>
      </div>
    </div>
  );
}
