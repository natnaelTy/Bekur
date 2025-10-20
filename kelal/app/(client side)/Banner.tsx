import React from "react";

export default function Banner() {
  return (
    <div className=" bg-gradient-to-br from-blue-700 via-blue-800 to-sky-700 text-white flex flex-col items-center justify-center px-6 h-96 text-center relative overflow-hidden">
      <div className="relative z-1 gap-6 flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-semibold">
          Ready to Find Your Next Scholarship?
        </h1>
        <p className="text-gray-200 text-base md:text-lg max-w-xl">
          Join thousands of students discovering global opportunities for study,
          travel, and research — all personalized by our AI engine.
        </p>
        <button className="bg-white px-5 py-2 rounded-full text-black font-medium hover:bg-white/20 hover:text-white">
          Get Started
        </button>
      </div>

      {/* Decorative Background Blurs */}
      <div
        style={{
          background:
            "radial-gradient(ellipse at center,rgba(255, 0, 123, 0.34),rgba(255, 0, 157, 0.32),rgba(255, 255, 255, 1))",
        }}
        className="absolute top-0 left-70 w-[200px] h-[450px] rounded-full blur-3xl opacity-80 skew-x-32"
      ></div>
      <div
        style={{
          background:
            "radial-gradient(ellipse at center,rgba(0, 166, 255, 0.31),rgba(0, 174, 255, 0.42),rgba(255, 255, 255, 1))",
        }}
        className="absolute top-10 left-90 w-[200px] h-[300px] rounded-full blur-3xl opacity-80 skew-x-32"
      ></div>
      <div
        style={{
          background:
            "radial-gradient(ellipse at center,rgba(0, 213, 255, 0.32),rgba(0, 221, 255, 0.35),rgba(255, 255, 255, 1))",
        }}
        className="absolute top-0 right-90 w-[250px] h-[500px] rounded-full blur-3xl opacity-80 skew-y-18"
      ></div>
    </div>
  );
}
