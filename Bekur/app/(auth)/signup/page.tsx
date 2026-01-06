"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Loader2, Phone } from "lucide-react";
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
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner"
import { handleGoogleSignIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
// Zod validation schema
const signupSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters long")
    .max(50, "Full name is too long"),
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password too long"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "" },
  });
  const router = useRouter();

  async function onSubmit(data: SignupFormValues) {
    setLoading(true);
    try {
      const { data: res, error } = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.fullName
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created successfully!");
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="flex w-full min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-950 p-6 md:p-20 w-full max-w-[610px] relative"
        >
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold text-left mb-2 dark:text-white">
            Create Your Account
          </h1>
          <p className="text-left text-gray-600 dark:text-gray-400 mb-8 ">
            Start your journey toward studying abroad today.
          </p>

          {/* shadcn + zod form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2 w-5 h-5 text-gray-400" />
                        <Input
                          placeholder="Enter your full name"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
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
                          placeholder="your.email@gmail.com"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="primaryBtn w-full mt-10 flex items-center justify-center"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </Form>

          {/* Google Signup */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Or sign up with
            </p>
            <Button
              variant="outline"
              onClick={() => (handleGoogleSignIn())}
              className="w-full flex items-center justify-center gap-2"
            >
              <FcGoogle className="w-8 h-8 inline-block" />
              Continue with Google
            </Button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </motion.div>

        {/* Decorative Background Blurs */}
        <div className="bg-gradient-to-br from-blue-700 via-blue-400 to-sky-300 relative w-full hidden md:block overflow-hidden">
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
