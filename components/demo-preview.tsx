export default function DemoPreview() {
  return (
    <section
      id="demo"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* SECTION HEADING */}
        <div className="text-center mb-16">

          <p className="text-blue-400 uppercase tracking-[0.3em] text-sm font-semibold mb-4">
            LIVE DEMO
          </p>

          <h2 className="text-5xl md:text-6xl font-black tracking-tight">

            <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
              Powerful Repository
            </span>

            <br />

            <span className="text-blue-500">
              Insights Instantly
            </span>
          </h2>

          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            Analyze repositories with AI-powered health scoring,
            security detection, performance metrics, and
            actionable recommendations in seconds.
          </p>
        </div>

        {/* MAIN DEMO CARD */}
        <div className="relative">

          {/* OUTER GLOW */}
          <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full" />

          {/* CONTAINER */}
          <div className="relative bg-zinc-900/70 border border-zinc-800 rounded-[32px] overflow-hidden backdrop-blur-xl shadow-2xl">

            {/* TOP BAR */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/80">

              <div className="flex items-center gap-2">

                <div className="w-3 h-3 rounded-full bg-red-500" />

                <div className="w-3 h-3 rounded-full bg-yellow-500" />

                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              <div className="text-sm text-zinc-500">
                github.com/facebook/react
              </div>

              <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold">
                LIVE
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-8">

              {/* SCORE CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                <div className="bg-black/40 border border-zinc-800 rounded-3xl p-6">

                  <p className="text-zinc-500 uppercase text-xs tracking-[0.2em] mb-4">
                    Security
                  </p>

                  <h3 className="text-5xl font-black text-green-400">
                    92
                  </h3>

                  <p className="text-zinc-500 mt-2">
                    Excellent
                  </p>
                </div>

                <div className="bg-black/40 border border-zinc-800 rounded-3xl p-6">

                  <p className="text-zinc-500 uppercase text-xs tracking-[0.2em] mb-4">
                    Performance
                  </p>

                  <h3 className="text-5xl font-black text-yellow-400">
                    81
                  </h3>

                  <p className="text-zinc-500 mt-2">
                    Optimized
                  </p>
                </div>

                <div className="bg-black/40 border border-zinc-800 rounded-3xl p-6">

                  <p className="text-zinc-500 uppercase text-xs tracking-[0.2em] mb-4">
                    Quality
                  </p>

                  <h3 className="text-5xl font-black text-blue-400">
                    95
                  </h3>

                  <p className="text-zinc-500 mt-2">
                    Clean Code
                  </p>
                </div>

                <div className="bg-black/40 border border-zinc-800 rounded-3xl p-6">

                  <p className="text-zinc-500 uppercase text-xs tracking-[0.2em] mb-4">
                    Overall
                  </p>

                  <h3 className="text-5xl font-black text-purple-400">
                    A+
                  </h3>

                  <p className="text-zinc-500 mt-2">
                    Healthy Repo
                  </p>
                </div>
              </div>

              {/* ISSUES SECTION */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* ISSUE CARD */}
                <div className="bg-black/30 border border-zinc-800 rounded-3xl p-6 text-left">

                  <div className="flex items-start justify-between">

                    <div>

                      <h4 className="font-bold text-xl">
                        SQL Injection Risk
                      </h4>

                      <p className="text-zinc-500 text-sm mt-1">
                        backend/auth/login.ts
                      </p>
                    </div>

                    <div className="px-4 py-2 rounded-full bg-red-500/20 border border-red-500/20 text-red-400 text-sm font-bold">
                      High
                    </div>
                  </div>

                  <p className="text-zinc-400 mt-5 leading-7">
                    User input is directly injected into SQL query
                    without sanitization, potentially allowing
                    malicious database access.
                  </p>
                </div>

                {/* AI RECOMMENDATION */}
                <div className="bg-black/30 border border-zinc-800 rounded-3xl p-6 text-left">

                  <div className="flex items-start justify-between">

                    <div>

                      <h4 className="font-bold text-xl">
                        AI Recommendation
                      </h4>

                      <p className="text-zinc-500 text-sm mt-1">
                        Suggested Improvement
                      </p>
                    </div>

                    <div className="px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/20 text-blue-400 text-sm font-bold">
                      AI
                    </div>
                  </div>

                  <p className="text-zinc-400 mt-5 leading-7">
                    Replace raw SQL queries with parameterized
                    statements or ORM methods to prevent injection
                    vulnerabilities and improve maintainability.
                  </p>
                </div>
              </div>

              {/* BOTTOM STATS */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-5">

                <div className="bg-black/20 border border-zinc-800 rounded-2xl p-5">

                  <p className="text-3xl font-black text-white">
                    1.2k
                  </p>

                  <p className="text-zinc-500 mt-2 text-sm">
                    Commits Analyzed
                  </p>
                </div>

                <div className="bg-black/20 border border-zinc-800 rounded-2xl p-5">

                  <p className="text-3xl font-black text-white">
                    87
                  </p>

                  <p className="text-zinc-500 mt-2 text-sm">
                    Pull Requests
                  </p>
                </div>

                <div className="bg-black/20 border border-zinc-800 rounded-2xl p-5">

                  <p className="text-3xl font-black text-white">
                    14
                  </p>

                  <p className="text-zinc-500 mt-2 text-sm">
                    Issues Detected
                  </p>
                </div>

                <div className="bg-black/20 border border-zinc-800 rounded-2xl p-5">

                  <p className="text-3xl font-black text-white">
                    99.9%
                  </p>

                  <p className="text-zinc-500 mt-2 text-sm">
                    AI Accuracy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}