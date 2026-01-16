"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Globe, Lightbulb, Users } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      title: "Empowerment",
      description:
        "We believe every student deserves a fair chance to study or attend global events, regardless of their background.",
      icon: <Heart className="w-8 h-8 text-pink-500" />,
    },
    {
      title: "Innovation",
      description:
        "Using AI and automation, we simplify the complex application process — making global opportunities accessible and efficient.",
      icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
    },
    {
      title: "Connection",
      description:
        "We bridge the gap between students and universities or organizations, helping both sides find the perfect match effortlessly.",
      icon: <Globe className="w-8 h-8 text-indigo-400" />,
    },
    {
      title: "Community",
      description:
        "We’re building a network of learners and explorers who help each other reach their dreams of studying or attending abroad.",
      icon: <Users className="w-8 h-8 text-blue-400" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6 mt-12"
        >
          About Our Platform
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg md:text-xl leading-relaxed"
        >
          We’re on a mission to make studying, attending events, and exploring
          opportunities abroad simpler, faster, and accessible to everyone —
          powered by AI and automation.
        </motion.p>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-6 max-w-5xl text-center md:text-left">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-6 text-center"
        >
          Our Story
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-lg leading-relaxed mb-8"
        >
          It all began with a simple idea — helping students find scholarships
          and global opportunities without the frustration of endless searches
          and confusing forms. We saw how many talented people missed out
          because of complicated processes, slow communication, and hidden
          information.
          <br />
          <br />
          Our platform was built to fix that. Using AI, we automatically match
          students with scholarships, universities, and events that fit them
          best. We help manage every step — from submitting documents to
          scheduling visa appointments — so students can focus on preparing for
          their future.
        </motion.p>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-6 w-full max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-10 text-center"
        >
          Our Core Values
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="backdrop-blur-xl rounded-2xl h-full hover:shadow-lg transition-all">
                <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                  {value.icon}
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-20 px-6 bg-gray-50 dark:bg-black/8 text-center rounded-t-3xl mt-16 relative overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Join Our Global Student Community
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-8"
        >
          Start your journey today and let AI help you find the scholarship or
          conference that changes your life.
        </motion.p>
        <button className="secondaryBtn">
          Get Started
        </button>
      </section>
    </div>
  );
}
