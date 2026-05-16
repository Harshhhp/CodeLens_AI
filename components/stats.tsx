export default function Stats() {
  const stats = [
    {
      value: "50K+",
      label: "Repositories Analyzed",
      description:
        "AI-powered analysis across thousands of active GitHub projects.",
    },
    {
      value: "98%",
      label: "Detection Accuracy",
      description:
        "Advanced AI models trained on modern development best practices.",
    },
    {
      value: "24/7",
      label: "Real-Time Monitoring",
      description:
        "Continuous repository scanning and live GitHub activity analysis.",
    },
    {
      value: "8",
      label: "Health Dimensions",
      description:
        "Comprehensive scoring for security, quality, performance, and more.",
    },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/5 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-20">

          <p className="text-blue-400 uppercase tracking-[0.3em] text-sm font-semibold mb-4">
            PLATFORM STATS
          </p>

          <h2 className="text-5xl md:text-6xl font-black tracking-tight">

            <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
              Trusted By Developers
            </span>

            <br />

            <span className="text-blue-500">
              Building Better Software
            </span>
          </h2>

          <p className="text-zinc-400 text-lg max-w-3xl mx-auto mt-6 leading-relaxed">
            CODELENS AI helps teams identify vulnerabilities,
            improve maintainability, and ship cleaner,
            production-ready code faster.
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-zinc-900/50 border border-zinc-800 rounded-[32px] p-8 backdrop-blur-xl hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1"
            >

              {/* HOVER GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-blue-500/5 rounded-[32px]" />

              {/* VALUE */}
              <h3 className="text-5xl font-black text-white">
                {stat.value}
              </h3>

              {/* LABEL */}
              <p className="text-xl font-bold text-white mt-5">
                {stat.label}
              </p>

              {/* DESCRIPTION */}
              <p className="text-zinc-400 leading-7 text-sm mt-4">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}