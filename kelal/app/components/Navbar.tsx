"use client";
import Link from "next/link";
import { TextAlignJustify } from 'lucide-react';
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";


export default function Navbar() {
  return (
    <div className="flex items-center justify-between w-full py-4 md:py-12 absolute top-0 left-0 z-1 h-16 px-2">
      <div className="max-w-7xl w-full flex items-center justify-between mx-auto">
         <Link href="/" className="font-bold text-blue-500 text-2xl pr-6">
            <Image src="/logo.png" alt="Logo" width={170} height={100} />
          </Link>
        <ul className="flex items-center gap-4">
          <Link href="/about" className="hidden md:flex liHover">Learn</Link>
          <Link href="/pricing" className="hidden md:flex liHover"> About</Link>
          <Link href="/resources" className="hidden md:flex liHover">Pricing</Link>
          <Link href="/resources" className="hidden md:flex liHover">Refer & Earn</Link>
        </ul>

        <div className="space-x-6 hidden md:block">
        
          <button className="px-4 py-2 bg-transparent rounded-full hover:bg-gray-100 transition cursor-pointer font-medium text-sm dark:hover:bg-slate-800 dark:text-white">
            Sign in
          </button>
          <button className="primaryBtn">
            Start applying
          </button>
        </div>
        <TextAlignJustify className="block md:hidden"/>
      </div>
      <div className="absolute right-12 top-4 md:top-8 md:right-8">
        <ThemeToggle />
      </div>
    </div>
  );
}
