"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";

export default function KeyFeatures() {
  const features = [
    {
      title: "AI Matching",
      description:
        "Our intelligent AI scans verified scholarship databases and university listings to match you with opportunities that perfectly fit your profile, skills, and goals.",
      icon: "/robot.png",
    },
    {
      title: "Auto Application",
      description:
        "Save time and effort — our system automatically prepares and sends your forms or emails directly to universities and programs you qualify for.",
      icon: "/email.png",
    },
    {
      title: "Easy Document Upload",
      description:
        "Upload your documents once, and we’ll securely handle the rest. Track your applications and updates in one easy-to-use dashboard.",
      icon: "/upload.png",
    },
    {
      title: "Refer & Earn",
      description:
        "Invite friends to join the platform and earn rewards when they get accepted to scholarships or programs — helping others while growing your impact.",
      icon: "/money.png",
    },
  ];

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center px-3 py-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-6 text-center dark:text-white text-slate-900"
      >
        Key Features
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-lg max-w-2xl text-center mb-12 text-gray-600 dark:text-gray-400"
      >
        Discover what makes our platform your trusted companion in finding global
        scholarships and opportunities abroad.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="bg-gray-50 dark:bg-gray-950 border-gray-100 dark:border-gray-900 backdrop-blur-2xl hover:shadow-md transition-all rounded-2xl">
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Image src={feature.icon} alt={feature.title} width={32} height={32} />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
