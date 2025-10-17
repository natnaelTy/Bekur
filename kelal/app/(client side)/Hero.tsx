

export default function Hero() {
  return (
    <div
      className="relative flex items-center justify-center gap-2 min-h-screen p-6 flex-col text-center bg-gradient-to-br from-indigo-900 via-blue-700 to-pink-600"
      style={{
        background: "radial-gradient(ellipse at top left, var(--tw-gradient-stops))",
      }}
    >
      <div className="relative z-10 flex flex-col items-center gap-4">
        <h3 className="px-5 py-1 rounded-full bg-gray-100">Powered by <span className="font-medium">mistral</span> & <span className="font-medium">langflow</span></h3>
        <h1 className="text-4xl text-slate-800 md:text-6xl lg:text-7xl font-bold max-w-4xl">
          Study and work abroad with the power of <span className="text-blue-600">AI</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl"></p>
      </div>
    </div>
  )
}
