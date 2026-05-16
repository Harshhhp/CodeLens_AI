export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Connect Repository",
      description:
        "Paste any public GitHub repository URL and instantly begin AI-powered analysis.",
    },
    {
      number: "02",
      title: "Fetch Live Data",
      description:
        "We analyze commits, pull requests, issues, contributors, and repository activity in real-time.",
    },
    {
      number: "03",
      title: "AI Repository Scan",
      description:
        "Advanced AI models evaluate security, performance, maintainability, and code quality.",
    },
    {
      number: "04",
      title: "Generate Insights",
      description:
        "Receive a complete repository health report with actionable recommendations.",
    },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/5 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-24">

          <p className="text-blue-400 uppercase tracking-[0.3em] text-sm font-semibold mb-4">
            HOW IT WORKS
          </p>

          <h2 className="text-5xl md:text-6xl font-black tracking-tight">

            <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
              Analyze Repositories
            </span>

            <br />

            <span className="text-blue-500">
              In Four Simple Steps
            </span>
          </h2>

          <p className="text-zinc-400 text-lg max-w-3xl mx-auto mt-6 leading-relaxed">
            CODELENS AI combines GitHub data with advanced
            artificial intelligence to generate comprehensive
            repository health insights instantly.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative">

          {/* CENTER LINE */}
          <div className="hidden lg:block absolute top-24 left-0 w-full h-[1px] bg-zinc-800" />

          {/* STEPS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {steps.map((step, index) => (
              <div
                key={index}
                className="relative"
              >

                {/* STEP NUMBER */}
                <div className="relative z-10 w-20 h-20 mx-auto rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.15)]">

                  <span className="text-2xl font-black text-blue-400">
                    {step.number}
                  </span>
                </div>

                {/* CARD */}
                <div className="mt-8 bg-zinc-900/50 border border-zinc-800 rounded-[28px] p-8 backdrop-blur-xl text-center hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1">

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {step.title}
                  </h3>

                  <p className="text-zinc-400 leading-7">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}