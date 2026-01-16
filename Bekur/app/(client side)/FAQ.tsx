"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "What is this platform about?",
      answer:
        "Our platform helps students discover scholarships, events, and conferences abroad using AI-powered matching. You simply submit your application, and we handle the rest — from matching to connecting you with universities.",
    },
    {
      question: "How does the AI find scholarships for me?",
      answer:
        "Our AI analyzes your profile, background, and academic interests to recommend the most relevant scholarships and global opportunities.",
    },
    {
      question: "Do I need to pay to use the service?",
      answer:
        "No. You can start exploring scholarships and opportunities completely free. Some advanced features may be added later for premium users.",
    },
    {
      question: "What happens after I submit my application?",
      answer:
        "Once your application is approved, we’ll guide you through the next steps, including document verification and visa appointment preparation.",
    },
  ];


  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-3 py-12 relative w-full overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-8 text-center"
      >
        Frequently Asked Questions
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mb-12 max-w-2xl text-center text-muted-foreground"
      >
        Got questions? We’ve got answers. Learn more about how our platform
        helps you reach global opportunities faster.
      </motion.p>

      <div className="w-full max-w-3xl space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Accordion type="single" collapsible>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="text-base md:text-lg">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
