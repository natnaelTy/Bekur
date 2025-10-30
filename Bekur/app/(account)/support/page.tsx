"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Send } from "lucide-react";
import { useState } from "react";

export default function SupportPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto w-full py-26 lg:py-30 px-3 md:px-6 ">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          Support Center
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="bg-white dark:bg-gray-950 shadow-md">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                Need help? Fill out the form below and we’ll get back to you
                soon.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {submitted ? (
                <div className="text-center text-green-500 font-semibold">
                  Your message has been submitted successfully!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="email"
                    placeholder="Email Address"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="subject"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                  <Textarea
                    name="message"
                    placeholder="Type your message..."
                    value={form.message}
                    onChange={handleChange}
                    className="min-h-[120px]"
                    required
                  />
                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Request
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-white dark:bg-gray-950 shadow-md">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find quick answers to common student inquiries.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="q1">
                  <AccordionTrigger>
                    How can I check my application status?
                  </AccordionTrigger>
                  <AccordionContent>
                    You can track your progress in the “Dashboard → Application
                    Details” section. Each stage (submitted, reviewed, accepted,
                    rejected) will be displayed there.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q2">
                  <AccordionTrigger>How do I make a payment?</AccordionTrigger>
                  <AccordionContent>
                    Go to “Payment Details” under your dashboard, choose a
                    payment method (Telebirr, Bank, or Chapa Pay), and upload
                    your payment proof.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q3">
                  <AccordionTrigger>
                    What if my application is rejected?
                  </AccordionTrigger>
                  <AccordionContent>
                    You can reapply using the “Reapply” button on your
                    Application Details page or contact support for personalized
                    guidance.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="q4">
                  <AccordionTrigger>
                    When will I receive my acceptance letter?
                  </AccordionTrigger>
                  <AccordionContent>
                    Once your payment is verified and all documents are
                    complete, your acceptance letter will be available for
                    download within 3–5 business days.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Previous Support Requests */}
        <div className="mt-10">
          <Card className="bg-white dark:bg-gray-950 shadow-md">
            <CardHeader>
              <CardTitle>Previous Requests</CardTitle>
              <CardDescription>
                Track your past support messages and their status.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3">
                  <div>
                    <p className="font-semibold">Issue with Visa Appointment</p>
                    <p className="text-sm text-gray-500">
                      Submitted: Oct 23, 2025
                    </p>
                  </div>
                  <span className="text-xs bg-yellow-600 text-white px-3 py-1 rounded-full">
                    In Progress
                  </span>
                </div>

                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3">
                  <div>
                    <p className="font-semibold">Payment not reflecting</p>
                    <p className="text-sm text-gray-500">
                      Submitted: Oct 19, 2025
                    </p>
                  </div>
                  <span className="text-xs bg-green-600 text-white px-3 py-1 rounded-full">
                    Resolved
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
