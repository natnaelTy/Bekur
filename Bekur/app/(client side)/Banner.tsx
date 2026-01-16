import React from "react";

export default function Banner() {
  return (
    <div className="bg-gray-50 dark:bg-black/8 flex flex-col items-center justify-center px-6 h-96 text-center relative overflow-hidden">
      <div className="relative z-1 gap-6 flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-semibold">
          Ready to Find Your Next Scholarship?
        </h1>
        <p className="text-base md:text-lg max-w-xl text-muted-foreground">
          Join thousands of students discovering global opportunities for study,
          travel, and research — all personalized by our AI engine.
        </p>
        <button className="secondaryBtn">
          Get Started
        </button>
      </div>
    </div>
  );
}
