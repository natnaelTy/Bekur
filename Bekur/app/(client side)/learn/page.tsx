"use client";

import { motion } from "framer-motion";
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
      title: "Create an Account",
      description:
        "Sign up for free to get started. You’ll have your personal dashboard where you can track applications, receive scholarship updates, and manage all your information securely.",
    },
    {
      title: "Submit Your Application",
      description:
        "Go to the Apply page to fill in your details and upload your documents. You’ll need your transcript, a photo of yourself, and for events or conferences, a bank statement. Submit once and you’re ready to get matched.",
    },
    {
      title: "AI Finds Scholarships & Events",
      description:
        "Our AI scans thousands of global opportunities to match you with the best scholarships, events, or conferences that fit your academic and financial background.",
    },
    {
      title: "Apply with One Click",
      description:
        "Once matches are found, our system automatically fills forms and communicates with universities or event organizers on your behalf — saving you hours of work.",
    },
    {
      title: "Track Your Progress",
      description:
        "Easily track every stage — from verification to acceptance — right in your dashboard. Get real-time updates and notifications when your status changes.",
    },
    {
      title: "Get Accepted & Visa Preparation",
      description:
        "Once you’re accepted, we’ll guide you step-by-step through visa preparation. You’ll receive personalized assistance, mock interviews, and embassy appointment scheduling.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-white flex flex-col items-center justify-between py-16">
      <section className="text-center py-10 px-6 max-w-5xl">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold text-center text-gray-900 dark:text-white"
      >
        Learn How Our Platform Works
      </motion.h1>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-10 max-w-3xl mt-4 text-base md:text-lg">
        Our goal is to make studying or attending events abroad simple and
        stress-free. Here’s how you move from signing up to boarding your flight
        — step by step.
      </p>
      </section>

      {/* Progress Graph */}
      <div className="relative flex flex-col items-start justify-between w-full max-w-6xl">
        {/* Connecting Line */}
        <div className="absolute top-5 left-9 h-full w-[1.5px] bg-gray-200 dark:bg-gray-900" />

        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative flex flex-col items-start text-left p-4"
          >
            <span className="text-lg bg-gray-100 dark:bg-gray-900 p-3 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-gray-900 dark:text-blue-600">
              {index + 1}
            </span>

            <div className="ml-16 mt-[-2.5rem]">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="w-full py-20 px-6 bg-gradient-to-r from-blue-800 to-sky-600 text-center text-white rounded-t-3xl mt-16">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Start Your Journey Today
        </motion.h2>
        <p className="max-w-2xl mx-auto mb-8 text-gray-200">
          Join thousands of students finding scholarships through AI. Your dream
          opportunity could be one click away.
        </p>
        <button className="secondaryBtn">
          Get Started
        </button>
      </div>
    </div>
  );
}
