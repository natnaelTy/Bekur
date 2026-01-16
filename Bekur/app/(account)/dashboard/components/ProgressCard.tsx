"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProgressCard({ status, progress }: { status: string; progress: number }) {
  return (
    <Card >
      <CardHeader>
        <CardTitle>Application Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Current status: <b className="">{status}</b></p>
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
        <p className="text-sm md:text-base mt-2">Progress: <span className="font-semibold">{progress}% </span> / <span className=" font-semibold">100%</span></p>
      </CardContent>
    </Card>
  );
}
