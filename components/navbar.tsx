"use client";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/70 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/80 shadow-[0_0_30px_rgba(59,130,246,0.15)]">

  <Image
    src="/logo.png"
    alt="CODELENS AI"
    fill
    className="object-cover scale-125"
    priority
  />
</div>


            <div>

              <p className="text-white font-black tracking-tight text-lg">
                CODELENS AI
              </p>

              <p className="text-zinc-500 text-xs uppercase tracking-[0.2em]">
                Repository Intelligence
              </p>
            </div>
          </Link>

          {/* NAV LINKS */}
          <nav className="hidden md:flex items-center gap-10">

            <button
              onClick={() => {
                document
                  .getElementById("demo")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-zinc-400 hover:text-white transition text-sm font-medium"
            >
              Demo
            </button>

            <button
              onClick={() => {
                document
                  .querySelector("section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-zinc-400 hover:text-white transition text-sm font-medium"
            >
              Features
            </button>

            <button
              onClick={() => {
                document
                  .querySelector("footer")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-zinc-400 hover:text-white transition text-sm font-medium"
            >
              Contact
            </button>

            <button
              onClick={() => {
                document
                  .querySelector("#faq")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-zinc-400 hover:text-white transition text-sm font-medium"
            >
              FAQ
            </button>
          </nav>

          {/* BUTTONS */}
          <div className="flex items-center gap-4">

            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-2xl bg-white text-black font-bold hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}