"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe2 } from "lucide-react";
import Flag from "@/app/components/Flag";
import { GiEarthAmerica } from "react-icons/gi";
import { GiEarthAsiaOceania } from "react-icons/gi";
import { FaGlobeEurope } from "react-icons/fa";


export default function PricingPage() {
  const plans = [
    {
      title: "Eastern Europe",
      price: "200,000 ETB",
      countries: [
        { name: "Romania", flag: "🇷🇴" },
        { name: "Greece", flag: "🇬🇷" },
        { name: "Turkey", flag: "🇹🇷" },
        { name: "Hungary", flag: "🇭🇺" },
        { name: "Czech Republic", flag: "🇨🇿" },
      ],
      description:
        "Study affordably in top universities across Eastern Europe. Our team handles applications, document submission, and visa assistance end-to-end.",
      icon: <FaGlobeEurope className="w-10 h-10 text-indigo-500" />,
      features: [
        "University matching & scholarship assistance",
        "Application review and submission",
        "Visa interview preparation",
        "Full guidance until arrival",
      ],
    },
    {
      title: "Western Europe",
      price: "250,000 ETB",
      countries: [
        { name: "France", flag: "🇫🇷" },
        { name: "Germany", flag: "🇩🇪" },
        { name: "United Kingdom", flag: "🇬🇧" },
        { name: "Netherlands", flag: "🇳🇱" },
        { name: "Italy", flag: "🇮🇹" },
      ],
      description:
        "Premium services for top-tier universities in popular study destinations across Western Europe.",
      icon: <FaGlobeEurope className="w-10 h-10 text-pink-500" />,
      features: [
        "Priority application support",
        "Document optimization for scholarships",
        "Dedicated visa & embassy support",
        "One-on-one mentor consultation",
      ],
    },
    {
      title: "Asia",
      price: "75,000 ETB",
      countries: [
        { name: "China", flag: "🇨🇳" },
        { name: "Japan", flag: "🇯🇵" },
        { name: "South Korea", flag: "🇰🇷" },
        { name: "Malaysia", flag: "🇲🇾" },
        { name: "India", flag: "🇮🇳" },
      ],
      description:
        "Affordable and fast-track applications for students aiming to study in top Asian universities with partial or full scholarships.",
      icon: <GiEarthAsiaOceania className="w-10 h-10 text-yellow-500" />,
      features: [
        "University selection & matching",
        "Application document assistance",
        "Basic visa support",
        "Follow-up with institutions",
      ],
    },
    {
      title: "Global Destinations",
      price: "300,000 ETB",
      countries: [
        { name: "Canada", flag: "🇨🇦" },
        { name: "Australia", flag: "🇦🇺" },
        { name: "United States", flag: "🇺🇸" },
      ],
      description:
        "Premium packages for students targeting top universities in leading global destinations. Includes advanced visa and settlement support.",
      icon: <GiEarthAmerica className="w-10 h-10 text-green-500" />,
      features: [
        "Comprehensive university application handling",
        "Personalized visa interview training",
        "Scholarship and funding assistance",
        "Post-arrival accommodation guidance",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-slate-900 dark:text-white flex flex-col items-center">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6 mt-12"
        >
          Choose Your Destination Plan
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
        >
          Our pricing is transparent and based on your preferred study region.
          Whether it’s Eastern Europe, Asia, or beyond — we make your study
          journey smooth and stress-free.
        </motion.p>
      </section>

      {/* Pricing Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-6 lg:px-10 max-w-10xl mb-20">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <Card className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-900 backdrop-blur-xl rounded-2xl h-full hover:shadow-xl transition-all flex flex-col">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">{plan.icon}</div>
                <CardTitle className="text-2xl font-bold">
                  {plan.title}
                </CardTitle>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {plan.countries.map((country) => (
                    <span
                      key={country.name}
                      className="bg-gray-50 dark:bg-gray-900 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      <Flag emoji={country.flag} /> {country.name}
                    </span>
                  ))}
                  <span className="text-xs text-gray-500 ml-2">+ more</span>
                </div>
                <p className="text-3xl font-extrabold mt-6 text-blue-600 dark:text-blue-700">
                  {plan.price}
                </p>
              </CardHeader>

              <CardContent className="flex flex-col flex-grow justify-between p-6 text-center">
                <p className="text-gray-700 dark:text-gray-400 mb-6">
                  {plan.description}
                </p>
                <ul className="text-left mb-6 space-y-2 text-gray-700 dark:text-gray-300">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="text-indigo-500">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="primaryBtn">Apply Now</button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-6 bg-gradient-to-r from-blue-800 to-sky-700 text-center text-white rounded-t-3xl mt-16">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Ready to Begin Your Journey?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-8 text-gray-200"
        >
          Select your region, complete your application, and let our team handle
          everything — from scholarship search to visa support.
        </motion.p>
        <button className="bg-white px-5 py-2 rounded-full text-black font-medium hover:bg-white/20 hover:text-white transition-all">
          Get Started
        </button>
      </section>
    </div>
  );
}
