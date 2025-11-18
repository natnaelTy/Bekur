import WaveLine from "../components/WaveLine";

export default function Hero() {
  return (
    <div className="relative flex items-center justify-center gap-2 min-h-screen p-2 flex-col text-center bg-gray-50 dark:bg-gray-950">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(191,219,254,0.4),transparent_70%)] dark:bg-[radial-gradient(circle_at_bottom_right,rgba(30,64,175,0.3),transparent_70%)]"></div>

      <div className="relative z-1 flex flex-col items-center justify-center gap-5">
        <h3 className="px-5 py-1 text-sm md:text-base rounded-full bg-gray-100 dark:bg-slate-800">
          Powered by <span className="font-medium">Ollama</span> and{" "}
          <span className="font-medium">GPT-OSS</span>
        </h3>
        <h1 className="text-4xl text-slate-900 md:text-6xl lg:text-7xl font-bold w-full md:max-w-4xl dark:text-white">
          Study and work abroad with the{" "}
          <span className="relative">
            <WaveLine />
            <span className="text-blue-600">power of AI</span>
          </span>
        </h1>
        <p className="mt-4 text-sm md:text-lg text-muted-foreground max-w-2xl dark:text-gray-400">
          Our smart AI matches your profile with the best opportunities abroad —
          while our team helps you every step of the way, from application to
          approval.
        </p>
      </div>
      <button className="mt-2 z-1 primaryBtn px-5">Apply Now</button>
    </div>
  );
}
