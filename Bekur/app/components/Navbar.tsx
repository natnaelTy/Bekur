"use client";
import Link from "next/link";
import { TextAlignJustify } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import { GetUser } from "./GetUser";
import { ChevronRight } from "lucide-react";

function NavbarLink({
  setShowDropdown,
  showDropdown,
  isAuthenticated,
}: {
  setShowDropdown: (show: boolean) => void;
  showDropdown: boolean;
  isAuthenticated: boolean;
}) {
  return (
    <div className="flex flex-col items-start gap-4 w-full px-2 py-8">
      <ul
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-start flex-col gap-6 w-full md:hidden"
      >
        <Link
          href="/"
          className="border-b-1 border-gray-200 dark:border-gray-800 w-full pb-2"
        >
          <ChevronRight className="inline-block mr-2 size-5" />
          Home
        </Link>
        <Link
          href="/learn"
          className="border-b-1 border-gray-200 dark:border-gray-800 w-full pb-2"
        >
          <ChevronRight className="inline-block mr-2 size-5" />
          Learn
        </Link>
        <Link
          href="/about"
          className="border-b-1 border-gray-200 dark:border-gray-800 w-full pb-2"
        >
          <ChevronRight className="inline-block mr-2 size-5" />
          About
        </Link>
        <Link
          href="/pricing"
          className="border-b-1 border-gray-200 dark:border-gray-800 w-full pb-2"
        >
          <ChevronRight className="inline-block mr-2 size-5" />
          Pricing
        </Link>
        <Link
          href="/referAndEarn"
          className="border-b border-gray-200 dark:border-gray-800 w-full pb-2"
        >
          <ChevronRight className="inline-block mr-2 size-5" />
          Refer & Earn
        </Link>
      </ul>
      <ThemeToggle />
      <hr className="border-b-0.5 w-full dark:border-gray-800 mt-5" />

      {!isAuthenticated && (
        <Link href={"/signin"} className="primaryBtn">
          Sign In
        </Link>
      )}
    </div>
  );
}

export default function Navbar() {
  const [showNavBar, setShowNavBar] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const isAuthenticated = !!session;
  const user = session?.user;

  useEffect(() => {
    function handleHeaderChange() {
      if (window.scrollY >= 60) {
        setShowNavBar(true);
      } else {
        setShowNavBar(false);
      }
    }

    window.addEventListener("scroll", handleHeaderChange);
    return () => {
      window.removeEventListener("scroll", handleHeaderChange);
    };
  }, []);

  return (
    <div
      className={
        showNavBar
          ? "flex items-center justify-between w-full py-4 md:py-10 fixed bg-white shadow-sm dark:bg-gray-950 dark:border-b-1 dark:border-gray-900 top-0 left-0 z-10 h-16 px-2"
          : "bg-transparent flex items-center justify-between w-full py-4 md:py-10 fixed dark:bg-transparent top-0 left-0 z-10 h-16 px-2"
      }
    >
      <div className="max-w-7xl w-full flex items-center justify-between mx-auto">
        <Link href="/" className="font-bold text-blue-500 text-2xl pr-6">
          <Image src="/bekur.png" alt="Logo" width={150} height={110} />
        </Link>
        <ul className="flex items-center gap-2">
          <Link href="/" className="hidden md:flex liHover">
            Home
          </Link>
          <Link href="/learn" className="hidden md:flex liHover">
            Learn
          </Link>
          <Link href="/about" className="hidden md:flex liHover">
            {" "}
            About
          </Link>
          <Link href="/pricing" className="hidden md:flex liHover">
            Pricing
          </Link>
          <Link href="/referAndEarn" className="hidden md:flex liHover">
            Refer & Earn
          </Link>
        </ul>

        <div
          className={`md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-950 border-b-1 border-gray-200 dark:border-gray-900 transition-all duration-300 ease-in-out overflow-hidden ${
            showDropdown ? "max-h-screen" : "max-h-0"
          }`}
        >
          <NavbarLink
            setShowDropdown={setShowDropdown}
            showDropdown={showDropdown}
            isAuthenticated={isAuthenticated}
          />
        </div>

        {isAuthenticated ? (
          <GetUser />
        ) : (
          <div className="space-x-6 hidden md:block">
            <button className="px-4 py-2 bg-transparent rounded-full hover:bg-gray-100 transition cursor-pointer font-medium text-sm dark:hover:bg-slate-800 dark:text-white">
              Sign in
            </button>
            <button className="primaryBtn">Start applying</button>
          </div>
        )}
        <TextAlignJustify
          onClick={() => setShowDropdown(!showDropdown)}
          className="block md:hidden"
        />
      </div>
      <div className="absolute right-12 top-4 md:top-6 md:right-8 hidden md:block">
        <ThemeToggle />
      </div>
    </div>
  );
}
