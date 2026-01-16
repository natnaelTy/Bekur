"use client";

import { motion } from "framer-motion";
import { Gift, Users, Share2, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReferAndEarnPage() {
  const steps = [
    {
      icon: <Share2 className="w-8 h-8 text-blue-500" />,
      title: "Share Your Referral Link",
      description:
        "Invite your friends to apply for scholarships or events abroad by sharing your unique referral link via WhatsApp, Telegram, or email.",
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-500" />,
      title: "They Apply Successfully",
      description:
        "When your friends sign up and complete their application, your referral is automatically tracked — no need for manual confirmation!",
    },
    {
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      title: "They Get Accepted",
      description:
        "Once your referred student’s application is accepted, you’ll be notified instantly — and your reward will be unlocked.",
    },
    {
      icon: <Gift className="w-8 h-8 text-green-500" />,
      title: "Earn Rewards or Discounts",
      description:
        "Receive 10,000 ETB for every successful referral, or choose to get a discount on your own visa support and application process.",
    },
  ];

  return (
    <div className="min-h-screen text-gray-900 dark:text-white flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6 mt-12"
        >
          Refer & Earn Rewards 🎁
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
        >
          Help your friends achieve their dreams — and get rewarded when they do!
          It’s simple, transparent, and rewarding.
        </motion.p>
      </section>

      {/* Steps Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 max-w-7xl mb-20">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <Card className="rounded-2xl h-full hover:shadow-xl transition-all flex flex-col text-center">
              <CardHeader className="flex flex-col items-center">
                <div className="mb-4">{step.icon}</div>
                <CardTitle className="text-xl font-bold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-6 bg-gray-50 dark:bg-black/8 text-center rounded-t-3xl mt-16">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Start Referring Today 🚀
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-8 text-gray-200"
        >
          Copy your referral link and share it with friends. For each person who
          joins and gets accepted, you’ll earn exciting rewards or discounts.
        </motion.p>
        <div className="flex justify-center gap-4">
          <button className="secondaryBtn">
            Copy Referral Link
          </button>
          <button className="bg-transparent border border-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition-all">
            Invite Friends
          </button>
        </div>
      </section>
    </div>
  );
}
