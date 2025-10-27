"use client";

import ProgressCard from "./components/ProgressCard";
import ApplicationDetails from "./components/ApplicationDetails";
import Scholarships from "./components/Scholarships";
import InterviewPrepCard from "./components/InterviewPrepCard";
import PaymentDetails from "./components/PaymentDetails";
import { useState } from "react";
import { useSession } from "@/lib/auth-client";

export default function DashboardPage() {
  const {data: session} = useSession();
  const user = session?.user;
  
  const [hasApplied] = useState(true);
  const [status] = useState("Accepted");
  const [progress] = useState(20);

  return (
    <div className="w-full py-24 px-3 md:px-10 bg-gray-50 dark:bg-gray-950">
      <div className="space-y-2 mb-6">
      <h1 className="text-3xl md:text-4xl font-bold">Selam, {user?.name} 👋🏽</h1>
      <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-xl">Welcome to your dashboard. Here you can find all the information related to your application.</p>
      </div>
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
