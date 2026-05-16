"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 pt-32 pb-24">

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

      {/* TOP GLOW */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />

      {/* BOTTOM GLOW */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />

      {/* CENTER GLOW */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/10 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto text-center">

        {/* BADGE */}
        <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-sm font-medium tracking-wide text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-xl">

          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />

          Powered by AI
        </div>

        {/* SMALL TITLE */}
        <p className="text-zinc-500 uppercase tracking-[0.4em] text-sm mb-6 font-semibold">
          CODELENS AI
        </p>

        {/* MAIN HEADING */}
        <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-none">

          <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Analyze Code.
          </span>

          <br />

          <span className="text-blue-500">
            Ship Faster.
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mt-10">
          AI-powered repository analysis platform that scans
          GitHub projects for security vulnerabilities,
          performance bottlenecks, bad practices,
          and technical debt in seconds.
        </p>

        {/* FEATURE PILLS */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">

          <div className="px-5 py-3 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl text-sm font-medium text-zinc-300 hover:border-zinc-700 transition">
            AI Security Scan
          </div>

          <div className="px-5 py-3 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl text-sm font-medium text-zinc-300 hover:border-zinc-700 transition">
            GitHub Integration
          </div>

          <div className="px-5 py-3 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl text-sm font-medium text-zinc-300 hover:border-zinc-700 transition">
            Performance Analysis
          </div>

          <div className="px-5 py-3 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl text-sm font-medium text-zinc-300 hover:border-zinc-700 transition">
            Code Quality Score
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-14 flex flex-col sm:flex-row gap-5 justify-center">

          <Link
            href="/dashboard"
            className="group relative px-10 py-5 bg-white text-black rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.35)]"
          >
            <span className="relative z-10">
              Open Dashboard
            </span>
          </Link>

          <button
            onClick={() => {
              document
                .getElementById("demo")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-10 py-5 bg-zinc-900/80 text-white border border-zinc-800 rounded-2xl font-bold text-lg hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300 backdrop-blur-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
          >
            View Demo
          </button>
        </div>

        {/* STATS */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto">

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl">

            <h3 className="text-4xl font-black text-white">
              8
            </h3>

            <p className="text-zinc-500 mt-2">
              Health Dimensions
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl">

            <h3 className="text-4xl font-black text-blue-400">
              AI
            </h3>

            <p className="text-zinc-500 mt-2">
              Powered Insights
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl">

            <h3 className="text-4xl font-black text-green-400">
              Live
            </h3>

            <p className="text-zinc-500 mt-2">
              GitHub Analysis
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl">

            <h3 className="text-4xl font-black text-purple-400">
              Fast
            </h3>

            <p className="text-zinc-500 mt-2">
              Instant Reports
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}