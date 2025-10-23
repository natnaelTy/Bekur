"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  UserPlus,
  Upload,
  Search,
  FileText,
  CheckCircle,
  Plane,
  CreditCard,
} from "lucide-react";

export default function LearnPage() {
  const steps = [
    {
      title: "1. Create an Account (if you haven't already)",
      description:
        "Sign up for free to get started. You’ll have your personal dashboard where you can track applications, receive scholarship updates, and manage all your information securely.",
      icon: <UserPlus className="w-10 h-10 text-indigo-500" />,
    },
    {
      title: "2. Submit Your Application",
      description:
        "Go to the Apply page to fill in your details and upload your documents. You’ll need your transcript, a photo of yourself, and for events or conferences, a bank statement. Submit once and you’re ready to get matched.",
      icon: <Upload className="w-10 h-10 text-purple-500" />,
    },
    {
      title: "3. AI Finds Scholarships & Events",
      description:
        "Our AI scans thousands of global opportunities to match you with the best scholarships, events, or conferences that fit your academic and financial background.",
      icon: <Search className="w-10 h-10 text-blue-500" />,
    },
    {
      title: "4. Apply with One Click",
      description:
        "Once matches are found, our system automatically fills forms and communicates with universities or event organizers on your behalf — saving you hours of work.",
      icon: <FileText className="w-10 h-10 text-teal-500" />,
    },
    {
      title: "5. Track Your Progress",
      description:
        "Easily track every stage — from verification to acceptance — right in your dashboard. Get real-time updates and notifications when your status changes.",
      icon: <CheckCircle className="w-10 h-10 text-green-500" />,
    },
    {
      title: "6. Get Accepted & Visa Preparation",
      description:
        "Once you’re accepted, we’ll guide you step-by-step through visa preparation. You’ll receive personalized assistance, mock interviews, and embassy appointment scheduling.",
      icon: <Plane className="w-10 h-10 text-orange-500" />,
    },
    {
      title: "7. Payment & Visa Scheduling",
      description:
        "When you get accepted, you’ll pay 5,000 ETB for visa appointment scheduling. After passing your interview, you complete your remaining payment. If your visa is rejected, we’ll reschedule and prepare you for the next interview — no extra charge.",
      icon: <CreditCard className="w-10 h-10 text-yellow-500" />,
    },
  ];

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center px-2 py-20 dark:bg-gray-950">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-6 mt-10 px-2 text-center dark:text-white text-slate-900"
      >
        Learn How Our Platform Works
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl text-center mb-12"
      >
        Our goal is to make studying or attending events abroad simple and stress-free.
        Here’s how you move from signing up to boarding your flight — step by step.
      </motion.p>

      <div className="flex flex-col items-start gap-6 w-full max-w-6xl">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <div className="p-3 md:p-5 h-full border-b-1 border-gray-300 dark:border-gray-800 hover:bg-gray-50 transition-all hover:rounded-lg dark:hover:bg-gray-900">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  {step.icon}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {step.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 text-center max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white"
        >
          Start Your Journey Today
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-600 dark:text-gray-400 mb-8"
        >
          Join thousands of students who are finding global opportunities through AI.
          Your dream scholarship or conference could be one click away.
        </motion.p>
        <button className="primaryBtn">
          Get Started
        </button>
      </div>
    </div>
  );
}
