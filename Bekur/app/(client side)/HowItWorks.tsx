"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  IconFileCheck,
  IconSearch,
  IconFileSymlink,
  IconPasswordFingerprint,
} from "@tabler/icons-react";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <IconFileSymlink size={40} />,
      title: "1. Submit Your Application",
      description:
        "Begin by filling out your profile and uploading all necessary documents — such as transcripts, certificates, and recommendation letters — to help our system understand your background.",
    },
    {
      icon: <IconSearch size={40} />,
      title: "2. AI Finds Scholarships & Events",
      description:
        "Our AI scans verified global databases to find scholarships, exchange programs, and conferences that perfectly match your academic and career goals.",
    },
    {
      icon: <IconFileCheck size={40}/>,
      title: "3. Apply & Get Connected",
      description:
        "Easily apply to the best-matched opportunities and connect directly with universities or event organizers through our integrated platform.",
    },
    {
      icon: <IconPasswordFingerprint size={40} />,
      title: "4. Visa Guidance & Support",
      description:
        "Once you’re accepted, we’ll guide you through the visa process — from appointment scheduling to documentation support — making your study abroad journey smooth and stress-free.",
    },
  ];

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-700 via-blue-800 to-sky-600 text-white  flex flex-col items-center py-20 px-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-8 text-center"
      >
        How It Works
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-lg md:text-xl mb-16 max-w-2xl text-center"
      >
        Discover how our AI platform connects students, universities, and
        scholarships in just a few clicks.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl gap-7 w-full">
        {steps.map((step, index) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            key={index}
            className="bg-white/10 backdrop-blur-lg p-4 rounded-xl shadow-lg hover:shadow-xl transition-all border border-white/20"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl size-8">{step.icon}</span>
              <h2 className="text-xl font-semibold">{step.title}</h2>
            </div>
            <p className="mt-5 text-sm md:text-base text-gray-300">{step.description}</p>
          </motion.div>
        ))}
      </div>

      <div></div>
    </div>
  );
}
