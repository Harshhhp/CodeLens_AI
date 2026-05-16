"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/5 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-16">

          <p className="text-blue-400 uppercase tracking-[0.3em] text-sm font-semibold mb-4">
            FAQ
          </p>

          <h2 className="text-5xl md:text-6xl font-black tracking-tight">

            <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
              Frequently Asked
            </span>

            <br />

            <span className="text-blue-500">
              Questions
            </span>
          </h2>

          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            Everything you need to know about AI-powered
            repository analysis and code health monitoring.
          </p>
        </div>

        {/* FAQ CONTAINER */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-[32px] p-4 backdrop-blur-xl">

          <Accordion
            type="single"
            collapsible
            className="w-full"
          >

            <AccordionItem
              value="item-1"
              className="border-b border-zinc-800 px-4"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6 text-white">
                How does repository analysis work?
              </AccordionTrigger>

              <AccordionContent className="text-zinc-400 leading-7 pb-6">
                Our AI engine scans repository commits, pull requests,
                issues, documentation, and code structure to generate
                detailed health reports and actionable insights.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border-b border-zinc-800 px-4"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6 text-white">
                Is GitHub data analyzed in real-time?
              </AccordionTrigger>

              <AccordionContent className="text-zinc-400 leading-7 pb-6">
                Yes. The platform fetches live GitHub repository data
                including commits, issues, pull requests, contributors,
                and repository activity instantly during analysis.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border-b border-zinc-800 px-4"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6 text-white">
                Can private repositories be analyzed?
              </AccordionTrigger>

              <AccordionContent className="text-zinc-400 leading-7 pb-6">
                Yes. Secure GitHub authentication allows access to
                authorized private repositories while maintaining
                strict security and privacy standards.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border-b border-zinc-800 px-4"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6 text-white">
                What metrics are included in the health score?
              </AccordionTrigger>

              <AccordionContent className="text-zinc-400 leading-7 pb-6">
                The platform evaluates security, code quality,
                documentation, community activity, performance,
                maintainability, reliability, and innovation metrics.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="px-4"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6 text-white">
                How accurate are AI recommendations?
              </AccordionTrigger>

              <AccordionContent className="text-zinc-400 leading-7 pb-6">
                AI recommendations are generated using advanced
                repository analysis models trained on modern
                development standards and best practices.
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>
      </div>
    </section>
  );
}