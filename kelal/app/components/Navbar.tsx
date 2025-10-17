"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between w-full p-5 fixed top-0 left-0 z-10 h-16 bg-white/70 backdrop-blur-md border-b border-gray-200">
      <h1>Kelal</h1>
      <ul className="space-x-6">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/resources">Docs</Link>
      </ul>

      <div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition">
          Get Started
        </button>
      </div>
    </div>
  );
}
