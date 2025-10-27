"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

export default function ApplicationPage() {
  const [applicationStatus, setApplicationStatus] = useState("Rejected"); 
  const [hasPassport] = useState(true);


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-white lg:px-8 px-3 py-26">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Application Details</h1>
        <div className="flex gap-3">
          {applicationStatus === "Rejected" ? (
            <>
              <Button
                variant="secondary"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Reapply
              </Button>
              <Button
              >
                Edit Application
              </Button>
            </>
          ) : (
            <Button
              disabled={applicationStatus === "Accepted"}
              className={applicationStatus === "Accepted" ? "disabled:opacity-50 disabled:cursor-not-allowed border-gray-600 hover:bg-gray-800 text-gray-300" : "bg-blue-600 hover:bg-blue-700 text-white"}
            >
              Edit Application
            </Button>
          )}
        </div>
      </div>

      {/* Application Details Card */}
      <Card className="bg-white dark:bg-gray-950 border-gray-100 shadow-md dark:border-gray-800 w-full mx-auto mb-10">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
            Your Application Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Full Name</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">Natnael Taye</p>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">natitaye316@gmail.com</p>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-400">Phone Number</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">+251 911 234 567</p>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-400">Date of Birth</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">May 22, 2001</p>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-400">Country Applying To</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">South Korea</p>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-400">Program</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">Computer Science (BSc)</p>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-400">University</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">Seoul National University</p>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-400">Status</p>
              <p
                className={`font-medium ${
                  applicationStatus === "Accepted"
                    ? "text-green-400"
                    : applicationStatus === "Rejected"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {applicationStatus}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-gray-600 dark:text-gray-400">Purpose of Applying</p>
              <p className="text-gray-900 dark:text-gray-100">
                 School
              </p>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-400">Do you have a Passport?</p>
              <p
                className={`font-medium ${
                  hasPassport ? "text-green-500" : "text-red-500"
                }`}
              >
                {hasPassport ? "Yes" : "No"}
              </p>
            </div>

            <div>
              <p className="text-gray-600 dark:text-gray-400">Submitted On</p>
              <p className="font-medium text-gray-900 dark:text-gray-100">Oct 15, 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Scholarships & Events */}
      <div className="w-full">
        <h2 className="text-gray-900 dark:text-gray-100 text-2xl font-semibold mb-4">Related Scholarships & Events</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-900 hover:border-blue-300  dark:hover:border-gray-700 transition">
            <CardHeader>
              <CardTitle className="text-lg text-blue-600">
                Korean Global Scholarship
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                A fully funded scholarship for international students pursuing
                undergraduate and postgraduate programs in South Korea.
              </p>
              <Link href="/scholarships/kgs">
                <Button
                  variant="secondary"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                >
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-900 hover:border-blue-300 dark:hover:border-gray-700 transition">
            <CardHeader>
              <CardTitle className="text-lg text-blue-600">
                Seoul Tech Innovation Summit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Annual event connecting tech students and professionals across
                Asia. Network, learn, and showcase your research.
              </p>
              <Link href="/events/seoul-tech">
                <Button
                  variant="secondary"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                >
                  Join Event
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
