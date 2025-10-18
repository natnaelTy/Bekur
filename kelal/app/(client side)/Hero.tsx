import WaveLine from "../components/WaveLine"

export default function Hero() {
  return (
    <div
      className="relative flex items-center justify-center gap-2 min-h-screen p-2 flex-col text-center"
    >
      {/* Background gradient */}
      <div style={{background:
          "radial-gradient(ellipse at center,rgba(0, 13, 255, 0.21),rgba(0, 13, 255, 0.2),rgba(255, 255, 255, 1))",}} className="absolute top-10 right-10 w-[200px] h-[200px] rounded-full blur-3xl opacity-80">
       
      </div>
      <div style={{background:
          "radial-gradient(ellipse at center,rgba(0, 13, 255, 0.2),rgba(0, 13, 255, 0.14),rgba(255, 255, 255, 1))",}} className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-80 hidden md:block dark:hidden">

      </div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-5">
        <h3 className="px-5 py-1 text-sm md:text-base rounded-full bg-gray-100 dark:bg-slate-800">Powered by <span className="font-medium">Mistral</span> and <span className="font-medium">Langflow</span></h3>
        <h1 className="text-4xl text-slate-900 md:text-6xl lg:text-7xl font-bold w-full md:max-w-4xl dark:text-white">
          Study and work abroad with the <span className="relative"><WaveLine /><span className="text-blue-600">power of AI</span></span>
      
        </h1>
        <p className="mt-4 text-sm md:text-lg text-muted-foreground max-w-2xl dark:text-gray-400">Our smart AI matches your profile with the best opportunities abroad — while our team helps you every step of the way, from application to approval.</p>
      </div>
      <button className="mt-1 primaryBtn">Start applying</button>

    </div>
  )
}
