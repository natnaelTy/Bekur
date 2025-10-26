"use client";

import ProgressCard from "./components/ProgressCard";
import ApplicationDetails from "./components/ApplicationDetails";
import Scholarships from "./components/Scholarships";
import InterviewPrepCard from "./components/InterviewPrepCard";
import PaymentDetails from "./components/PaymentDetails";
import { useState } from "react";

export default function DashboardPage() {
  const [hasApplied] = useState(true);
  const [status] = useState("Accepted");
  const [progress] = useState(20);

  return (
    <div className="w-full py-24 px-2 md:px-10 bg-gray-50 dark:bg-gray-950">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Selam, Nati Taye 👋 </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressCard status={status} progress={progress} />
        <ApplicationDetails />
        <PaymentDetails />
        <InterviewPrepCard />
        <Scholarships hasApplied={hasApplied} />
      </div>
    </div>
  );
}
