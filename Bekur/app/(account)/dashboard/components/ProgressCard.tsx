"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProgressCard({ status, progress }: { status: string; progress: number }) {
  return (
    <Card className="bg-white dark:bg-gray-950">
      <CardHeader>
        <CardTitle>Application Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-900 dark:text-gray-400">Current status: <b className="text-gray-900 dark:text-gray-100">{status}</b></p>
        <div className="w-full bg-gray-200 h-2 mt-3 rounded-full">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              status === "Applied"
                ? "w-1/4 bg-blue-400"
                : status === "Under Review"
                ? "w-1/2 bg-orange-400"
                : status === "Accepted"
                ? "w-3/4 bg-yellow-400"
                : status === "Interview" ? "w-full bg-purple-500"
                : "w-full bg-green-500"
            }`}
          />
        </div>
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-400 mt-2">Progress: <span className="text-gray-900 dark:text-white font-semibold">{progress}% </span> / <span className="text-gray-500 dark:text-gray-600 font-semibold">100%</span></p>
      </CardContent>
    </Card>
  );
}
