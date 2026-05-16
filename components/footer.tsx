"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-zinc-800 bg-zinc-950 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* BRAND */}
          <div className="lg:col-span-2">

            <p className="text-blue-400 uppercase tracking-[0.3em] text-sm font-semibold mb-4">
              CODELENS AI
            </p>

            <h2 className="text-4xl font-black tracking-tight">

              <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                Analyze Better.
              </span>

              <br />

              <span className="text-blue-500">
                Ship Faster.
              </span>
            </h2>

            <p className="text-zinc-400 leading-7 mt-6 max-w-md">
              AI-powered repository analysis platform built
              for developers who want cleaner architecture,
              better security, and production-ready code.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                href="/dashboard"
                className="px-6 py-3 rounded-2xl bg-white text-black font-bold hover:scale-105 transition-all duration-300"
              >
                Open Dashboard
              </Link>

              <button
                onClick={() => {
                  document
                    .getElementById("demo")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 rounded-2xl border border-zinc-700 bg-zinc-900/70 text-white font-bold hover:bg-zinc-800 transition-all duration-300"
              >
                View Demo
              </button>
            </div>
          </div>

  {/* NAVIGATION */}
<div>

  <h3 className="text-white font-bold mb-6">
    Navigation
  </h3>

  <div className="space-y-4 text-zinc-400">

    <button
      onClick={() => {
        document
          .getElementById("demo")
          ?.scrollIntoView({ behavior: "smooth" });
      }}
      className="block hover:text-white transition"
    >
      Demo
    </button>

    <button
      onClick={() => {
        document
          .getElementById("faq")
          ?.scrollIntoView({ behavior: "smooth" });
      }}
      className="block hover:text-white transition"
    >
      FAQ
    </button>

    <Link
      href="/dashboard"
      className="block hover:text-white transition"
    >
      Dashboard
    </Link>
  </div>
</div>

{/* TECH STACK */}
<div>

  <h3 className="text-white font-bold mb-6">
    Built With
  </h3>

  <div className="space-y-4 text-zinc-400">

    <p>Next.js</p>

    <p>Tailwind CSS</p>

    <p>GitHub API</p>

    <p>AI Analysis</p>
  </div>
</div>

{/* SOCIALS */}
<div>

  <h3 className="text-white font-bold mb-6">
    Socials
  </h3>

  <div className="space-y-4 text-zinc-400">

    <a
      href="https://github.com/Harshhhp"
      target="_blank"
      rel="noopener noreferrer"
      className="block hover:text-white transition"
    >
      GitHub
    </a>

    <a
      href="https://www.linkedin.com/in/harsh-pandey-891261354/"
      target="_blank"
      rel="noopener noreferrer"
      className="block hover:text-white transition"
    >
      LinkedIn
    </a>

    <a
      href="https://harshpandey.tech"
      target="_blank"
      rel="noopener noreferrer"
      className="block hover:text-white transition"
    >
      Portfolio
    </a>
  </div>
</div>
</div>
        {/* BOTTOM */}
        <div className="mt-20 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-zinc-500 text-sm">
            © 2026 CODELENS AI. All rights reserved.
          </p>

          <p className="text-zinc-500 text-sm">
            Built with Next.js, AI, and GitHub API
          </p>
        </div>
      </div>
    </footer>
  );
}