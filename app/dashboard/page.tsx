

// "use client";

// import { useState, useEffect, useCallback } from "react";
// import Image from "next/image";
// import { Card, CardContent } from "@/components/ui/card";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// import {
//   analyzeRepository,
//   getUserAnalyses,
//   getAnalysisById,
// } from "@/actions/analyze";

// import type {
//   FileIssue,
//   AnalysisResult,
// } from "@/actions/analyze";

// // ─────────────────────────────────────────────────────────────
// // TYPES
// // ─────────────────────────────────────────────────────────────

// interface HistoryItem {
//   id: string;
//   repoUrl: string;
//   summary: string;
//   security: number;
//   performance: number;
//   quality: number;
//   overall: number;
//   createdAt: string;
// }

// // ─────────────────────────────────────────────────────────────
// // HELPERS
// // ─────────────────────────────────────────────────────────────

// const SEVERITY_STYLES: Record<string, string> = {
//   High: "bg-red-500/15 text-red-400 border-red-500/30",
//   Medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
//   Low: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
// };

// const SEVERITY_DOT: Record<string, string> = {
//   High: "bg-red-400",
//   Medium: "bg-yellow-400",
//   Low: "bg-emerald-400",
// };

// function getSeverityStyle(s: string) {
//   return SEVERITY_STYLES[s] ?? SEVERITY_STYLES["Low"];
// }

// function scoreColor(n: number) {
//   if (n >= 80) return "text-emerald-400";
//   if (n >= 60) return "text-yellow-400";
//   return "text-red-400";
// }

// function scoreLabel(n: number) {
//   if (n >= 90) return "Excellent";
//   if (n >= 75) return "Good";
//   if (n >= 60) return "Fair";
//   if (n >= 40) return "Poor";
//   return "Critical";
// }

// // ─────────────────────────────────────────────────────────────
// // SCORE RING
// // ─────────────────────────────────────────────────────────────

// function ScoreRing({
//   value,
//   color,
// }: {
//   value: number;
//   color: string;
// }) {
//   const r = 30;
//   const circ = 2 * Math.PI * r;
//   const dash = (value / 100) * circ;

//   return (
//     <svg width="80" height="80" className="rotate-[-90deg]">
//       <circle
//         cx="40"
//         cy="40"
//         r={r}
//         strokeWidth="6"
//         className="stroke-zinc-800 fill-none"
//       />

//       <circle
//         cx="40"
//         cy="40"
//         r={r}
//         strokeWidth="6"
//         strokeLinecap="round"
//         strokeDasharray={`${dash} ${circ}`}
//         className={`fill-none transition-all duration-700 ${color.replace(
//           "text-",
//           "stroke-"
//         )}`}
//       />
//     </svg>
//   );
// }

// // ─────────────────────────────────────────────────────────────
// // STAT CARD
// // ─────────────────────────────────────────────────────────────

// function StatCard({
//   label,
//   value,
//   sub,
// }: {
//   label: string;
//   value: number | null;
//   sub: string;
// }) {
//   const display = value ?? 0;
//   const color = value !== null ? scoreColor(display) : "text-zinc-600";

//   return (
//     <Card className="bg-zinc-900/60 border-zinc-800 backdrop-blur-xl rounded-3xl overflow-hidden">
//       <CardContent className="p-6 flex items-center gap-5">
//         <div className="relative">
//           <ScoreRing value={display} color={color} />

//           <span
//             className={`absolute inset-0 flex items-center justify-center text-sm font-black ${color}`}
//           >
//             {value !== null ? display : "--"}
//           </span>
//         </div>

//         <div>
//           <p className="text-zinc-500 text-xs uppercase tracking-[0.25em] font-bold">
//             {label}
//           </p>

//           <h3 className={`text-2xl font-black mt-1 ${color}`}>
//             {value !== null ? scoreLabel(display) : "--"}
//           </h3>

//           <p className="text-zinc-600 text-sm mt-1">
//             {sub}
//           </p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// // ─────────────────────────────────────────────────────────────
// // ISSUE CARD
// // ─────────────────────────────────────────────────────────────

// function IssueCard({ issue }: { issue: FileIssue }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <Card className="bg-zinc-900/60 border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-700 transition-all duration-300">
//       <CardContent className="p-0">

//         <button
//           onClick={() => setOpen(!open)}
//           className="w-full text-left p-6 flex items-start justify-between gap-5"
//         >
//           <div className="flex items-start gap-4 min-w-0">

//             <span
//               className={`w-3 h-3 rounded-full mt-2 ${
//                 SEVERITY_DOT[issue.severity]
//               }`}
//             />

//             <div className="min-w-0">
//               <h3 className="font-black text-lg truncate">
//                 {issue.type}
//               </h3>

//               <p className="text-zinc-500 text-sm mt-1 font-mono truncate">
//                 {issue.file}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3 flex-shrink-0">

//             <div
//               className={`px-4 py-2 rounded-full border text-xs font-black ${getSeverityStyle(
//                 issue.severity
//               )}`}
//             >
//               {issue.severity}
//             </div>

//             <div
//               className={`transition-transform duration-300 ${
//                 open ? "rotate-180" : ""
//               }`}
//             >
//               ▼
//             </div>
//           </div>
//         </button>

//         {open && (
//           <div className="border-t border-zinc-800 px-6 pb-6 pt-5 space-y-5">

//             <div>
//               <p className="text-red-400 text-xs font-black uppercase tracking-[0.25em] mb-3">
//                 Problem
//               </p>

//               <p className="text-zinc-300 leading-7">
//                 {issue.issue}
//               </p>
//             </div>

//             <div>
//               <p className="text-emerald-400 text-xs font-black uppercase tracking-[0.25em] mb-3">
//                 Recommended Fix
//               </p>

//               <p className="text-zinc-300 leading-7">
//                 {issue.fix}
//               </p>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// // ─────────────────────────────────────────────────────────────
// // MAIN PAGE
// // ─────────────────────────────────────────────────────────────

// export default function DashboardPage() {
//   const { data: session, status } = useSession() as any;

//   const [repoUrl, setRepoUrl] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [analysis, setAnalysis] =
//     useState<AnalysisResult | null>(null);

//   const [analyzedFiles, setAnalyzedFiles] = useState<string[]>([]);

//   const [history, setHistory] = useState<HistoryItem[]>([]);

//   const [error, setError] = useState<string | null>(null);

//   const [activeTab, setActiveTab] = useState<
//     "issues" | "files"
//   >("issues");

//   // ─────────────────────────────────────────
//   // LOAD HISTORY
//   // ─────────────────────────────────────────

//   const loadHistory = useCallback(async () => {
//     if (!session) return;

//     try {
//       const res = await getUserAnalyses();

//       if (res.success) {
//         setHistory(res.analyses);
//       }
//     } catch {}
//   }, [session]);

//   useEffect(() => {
//     loadHistory();
//   }, [loadHistory]);

//   // ─────────────────────────────────────────
//   // ANALYZE
//   // ─────────────────────────────────────────

//   const handleAnalyze = async () => {
//     if (!repoUrl.trim()) {
//       setError("Please enter a GitHub repository URL.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const result = await analyzeRepository(repoUrl);

//       if (result.success) {
//         setAnalysis(result.data);
//         setAnalyzedFiles(result.analyzedFiles);
//         loadHistory();
//       } else {
//         setError(result.error);
//       }
//     } catch {
//       setError("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ─────────────────────────────────────────
//   // LOAD HISTORY ITEM
//   // ─────────────────────────────────────────

//   const handleLoadHistory = async (id: string) => {
//     const res = await getAnalysisById(id);

//     if (res.success) {
//       setAnalysis({
//         summary: res.data.summary,
//         issues: res.data.issues,
//         repositoryScore: res.data.repositoryScore,
//       });

//       setRepoUrl(res.data.repoUrl);
//     }
//   };

//   // ─────────────────────────────────────────
//   // DOWNLOAD REPORT
//   // ─────────────────────────────────────────

//   const downloadReport = () => {
//     if (!analysis) return;

//     const report = `
// CODELENS AI REPORT

// Repository:
// ${repoUrl}

// SUMMARY:
// ${analysis.summary}

// SECURITY SCORE:
// ${analysis.repositoryScore.security}

// PERFORMANCE SCORE:
// ${analysis.repositoryScore.performance}

// QUALITY SCORE:
// ${analysis.repositoryScore.quality}

// OVERALL SCORE:
// ${analysis.repositoryScore.overall}

// ISSUES:
// ${analysis.issues
//   .map(
//     (i) => `
// TYPE: ${i.type}
// FILE: ${i.file}
// SEVERITY: ${i.severity}

// ISSUE:
// ${i.issue}

// FIX:
// ${i.fix}

// ──────────────────────
// `
//   )
//   .join("\n")}
// `;

//     const blob = new Blob([report], {
//       type: "text/plain",
//     });

//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");

//     a.href = url;
//     a.download = "codelens-report.txt";

//     a.click();

//     URL.revokeObjectURL(url);
//   };

//   // ─────────────────────────────────────────

//   const scores = analysis?.repositoryScore;

//   const issues = analysis?.issues ?? [];

//   // ─────────────────────────────────────────
//   // UI
//   // ─────────────────────────────────────────

//   return (
//     <main className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">

//       {/* GRID */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

//       {/* GLOW */}
//       <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />

//       <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />

//       {/* NAVBAR */}
//       <nav className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl">

//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

//           <div className="flex items-center gap-3">

//             <Image
//               src="/logo.png"
//               alt="CodeLens Logo"
//               width={42}
//               height={42}
//               className="rounded-xl"
//             />

//             <div>
//               <h1 className="font-black text-2xl tracking-tight">
//                 CodeLens
//               </h1>

//               <p className="text-zinc-500 text-xs uppercase tracking-[0.25em]">
//                 AI Repository Analyzer
//               </p>
//             </div>
//           </div>

//           <div>
//             {status === "loading" ? (
//               <div className="w-24 h-10 bg-zinc-800 rounded-full animate-pulse" />
//             ) : session ? (
//               <div className="flex items-center gap-4">

//                 <div className="text-right hidden sm:block">
//                   <p className="font-semibold">
//                     {session.user?.name}
//                   </p>

//                   <button
//                     onClick={() => signOut()}
//                     className="text-zinc-500 hover:text-red-400 text-sm transition"
//                   >
//                     Sign Out
//                   </button>
//                 </div>

//                 <img
//                   src={session.user?.image ?? ""}
//                   alt="avatar"
//                   className="w-11 h-11 rounded-full border border-zinc-700"
//                 />
//               </div>
//             ) : (
//               <Button
//                 onClick={() => signIn("github")}
//                 className="rounded-2xl bg-white text-black hover:bg-zinc-200 font-black px-6"
//               >
//                 Login with GitHub
//               </Button>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* CONTENT */}
//       <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex gap-8">

//         {/* SIDEBAR */}
//         {session && (
//           <aside className="hidden lg:block w-72 flex-shrink-0">

//             <div className="sticky top-28">

//               <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl">

//                 <h2 className="font-black text-lg mb-5">
//                   Recent Reports
//                 </h2>

//                 <div className="space-y-3">

//                   {history.length === 0 ? (
//                     <p className="text-zinc-500 text-sm">
//                       No reports yet.
//                     </p>
//                   ) : (
//                     history.map((item) => (
//                       <button
//                         key={item.id}
//                         onClick={() => handleLoadHistory(item.id)}
//                         className="w-full text-left p-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-all"
//                       >
//                         <p className="font-semibold truncate">
//                           {item.repoUrl.replace(
//                             "https://github.com/",
//                             ""
//                           )}
//                         </p>

//                         <p className="text-zinc-500 text-xs mt-1">
//                           Overall Score: {item.overall}
//                         </p>
//                       </button>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </div>
//           </aside>
//         )}

//         {/* MAIN */}
//         <div className="flex-1 min-w-0">

//           {/* HERO */}
//           <div className="text-center max-w-4xl mx-auto">

//             <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-sm font-medium tracking-wide text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-xl">
//               <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
//               AI Powered Analysis
//             </div>

//             <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">

//               Analyze Repositories.

//               <br />

//               <span className="text-blue-500">
//                 Detect Problems Faster.
//               </span>
//             </h1>

//             <p className="text-zinc-400 text-lg leading-8 mt-8 max-w-3xl mx-auto">
//               Scan public GitHub repositories for security vulnerabilities,
//               performance bottlenecks, technical debt, and dangerous coding patterns.
//             </p>
//           </div>

//           {/* INPUT */}
//           <div className="mt-12 max-w-4xl mx-auto">

//             <div className="p-3 rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl flex flex-col md:flex-row gap-4">

//               <Input
//                 value={repoUrl}
//                 onChange={(e) => setRepoUrl(e.target.value)}
//                 onKeyDown={(e) =>
//                   e.key === "Enter" && handleAnalyze()
//                 }
//                 placeholder="facebook/react or github.com/vercel/next.js"
//                 disabled={loading}
//                 className="h-14 bg-transparent border-0 focus-visible:ring-0 text-lg"
//               />

//               <Button
//                 onClick={handleAnalyze}
//                 disabled={loading}
//                 className="h-14 px-8 rounded-2xl bg-blue-500 hover:bg-blue-400 font-black text-lg"
//               >
//                 {loading ? "Analyzing..." : "Analyze Repository"}
//               </Button>
//             </div>
//           </div>

//           {/* ERROR */}
//           {error && (
//             <div className="mt-6 max-w-4xl mx-auto p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
//               {error}
//             </div>
//           )}

//           {/* SCORES */}
//           {scores && (
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-14">

//               <StatCard
//                 label="Security"
//                 value={scores.security}
//                 sub="Vulnerability Score"
//               />

//               <StatCard
//                 label="Performance"
//                 value={scores.performance}
//                 sub="Optimization Score"
//               />

//               <StatCard
//                 label="Quality"
//                 value={scores.quality}
//                 sub="Code Quality"
//               />

//               <StatCard
//                 label="Overall"
//                 value={scores.overall}
//                 sub="Repository Rating"
//               />
//             </div>
//           )}

//           {/* SUMMARY */}
//           {analysis && (
//             <div className="mt-10">

//               <Card className="bg-zinc-900/60 border-zinc-800 rounded-3xl">
//                 <CardContent className="p-8">

//                   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

//                     <div>
//                       <p className="text-zinc-500 uppercase tracking-[0.25em] text-xs font-black">
//                         Repository Summary
//                       </p>

//                       <h2 className="text-3xl font-black mt-3">
//                         AI Analysis Report
//                       </h2>
//                     </div>

//                     <Button
//                       onClick={downloadReport}
//                       className="rounded-2xl bg-white text-black hover:bg-zinc-200 font-black"
//                     >
//                       Download Report
//                     </Button>
//                   </div>

//                   <p className="text-zinc-300 leading-8 mt-8 text-lg">
//                     {analysis.summary}
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>
//           )}

//           {/* TABS */}
//           {analysis && (
//             <div className="mt-10">

//               <div className="flex gap-3">

//                 <button
//                   onClick={() => setActiveTab("issues")}
//                   className={`px-6 py-3 rounded-2xl font-bold transition-all ${
//                     activeTab === "issues"
//                       ? "bg-white text-black"
//                       : "bg-zinc-900 border border-zinc-800 text-zinc-400"
//                   }`}
//                 >
//                   Issues ({issues.length})
//                 </button>

//                 <button
//                   onClick={() => setActiveTab("files")}
//                   className={`px-6 py-3 rounded-2xl font-bold transition-all ${
//                     activeTab === "files"
//                       ? "bg-white text-black"
//                       : "bg-zinc-900 border border-zinc-800 text-zinc-400"
//                   }`}
//                 >
//                   Files ({analyzedFiles.length})
//                 </button>
//               </div>

//               {/* ISSUES */}
//               {activeTab === "issues" && (
//                 <div className="space-y-5 mt-8">

//                   {issues.length === 0 ? (
//                     <Card className="bg-zinc-900/60 border-zinc-800 rounded-3xl">
//                       <CardContent className="p-12 text-center">

//                         <div className="text-6xl mb-5">
//                           ✅
//                         </div>

//                         <h3 className="text-3xl font-black text-emerald-400">
//                           No Critical Issues Found
//                         </h3>

//                         <p className="text-zinc-500 mt-4">
//                           This repository looks clean and production-ready.
//                         </p>
//                       </CardContent>
//                     </Card>
//                   ) : (
//                     issues.map((issue, index) => (
//                       <IssueCard
//                         key={index}
//                         issue={issue}
//                       />
//                     ))
//                   )}
//                 </div>
//               )}

//               {/* FILES */}
//               {activeTab === "files" && (
//                 <div className="grid md:grid-cols-2 gap-4 mt-8">

//                   {analyzedFiles.map((file, index) => (
//                     <div
//                       key={index}
//                       className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800"
//                     >
//                       <p className="font-mono text-zinc-300 truncate">
//                         {file}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  analyzeRepository,
  getUserAnalyses,
  getAnalysisById,
} from "@/actions/analyze";

import type {
  FileIssue,
  AnalysisResult,
} from "@/actions/analyze";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface HistoryItem {
  id: string;
  repoUrl: string;
  summary: string;
  security: number;
  performance: number;
  quality: number;
  overall: number;
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

const SEVERITY_STYLES: Record<string, string> = {
  High: "bg-red-500/15 text-red-400 border-red-500/30",
  Medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Low: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

const SEVERITY_DOT: Record<string, string> = {
  High: "bg-red-400",
  Medium: "bg-yellow-400",
  Low: "bg-emerald-400",
};

function getSeverityStyle(s: string) {
  return SEVERITY_STYLES[s] ?? SEVERITY_STYLES["Low"];
}

function scoreColor(n: number) {
  if (n >= 80) return "text-emerald-400";
  if (n >= 60) return "text-yellow-400";
  return "text-red-400";
}

function scoreLabel(n: number) {
  if (n >= 90) return "Excellent";
  if (n >= 75) return "Good";
  if (n >= 60) return "Fair";
  if (n >= 40) return "Poor";
  return "Critical";
}

// ─────────────────────────────────────────────────────────────
// SCORE RING
// ─────────────────────────────────────────────────────────────

function ScoreRing({
  value,
  color,
}: {
  value: number;
  color: string;
}) {
  const r = 30;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;

  return (
    <svg width="80" height="80" className="rotate-[-90deg]">
      <circle
        cx="40"
        cy="40"
        r={r}
        strokeWidth="6"
        className="stroke-zinc-800 fill-none"
      />

      <circle
        cx="40"
        cy="40"
        r={r}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        className={`fill-none transition-all duration-700 ${color.replace(
          "text-",
          "stroke-"
        )}`}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// STAT CARD (UPDATED PREMIUM FUTURISTIC UI)
// ─────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: number | null;
  sub: string;
}) {
  const display = value ?? 0;
  const color = value !== null ? scoreColor(display) : "text-zinc-600";

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-zinc-700/80 bg-black/60 backdrop-blur-2xl group transition-all duration-300 hover:border-zinc-500 hover:-translate-y-1 min-h-[260px]">

      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/40 via-transparent to-zinc-800/20 opacity-80" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:22px_22px]" />

     <div className="relative z-10 h-full p-7 flex flex-col items-center text-center gap-6">

        {/* Ring */}
        <div className="relative flex-shrink-0">

          <div className="absolute inset-0 rounded-full blur-xl opacity-30 bg-blue-500" />

          <ScoreRing value={display} color={color} />

          <span
            className={`absolute inset-0 flex items-center justify-center text-lg font-black ${color}`}
          >
            {value !== null ? display : "--"}
          </span>
        </div>

        {/* Text */}
        <div className="flex-1 w-full text-center xl:text-left pr-3">

          <p className="text-[11px] uppercase tracking-[0.45em] text-zinc-500 font-bold mb-3">
            {label}
          </p>

<h3
  className={`text-lg sm:text-xl xl:text-2xl font-bold leading-relaxed ${color}`}
>
  {value !== null ? scoreLabel(display) : "--"}
</h3>

          <p className="text-zinc-400 text-sm sm:text-base mt-4 leading-relaxed break-words">
            {sub}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ISSUE CARD
// ─────────────────────────────────────────────────────────────

function IssueCard({ issue }: { issue: FileIssue }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="bg-zinc-900/60 border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-700 transition-all duration-300">
      <CardContent className="p-0">

        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left p-6 flex items-start justify-between gap-5"
        >
          <div className="flex items-start gap-4 min-w-0">

            <span
              className={`w-3 h-3 rounded-full mt-2 ${
                SEVERITY_DOT[issue.severity]
              }`}
            />

            <div className="min-w-0">
              <h3 className="font-black text-lg truncate">
                {issue.type}
              </h3>

              <p className="text-zinc-500 text-sm mt-1 font-mono truncate">
                {issue.file}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">

            <div
              className={`px-4 py-2 rounded-full border text-xs font-black ${getSeverityStyle(
                issue.severity
              )}`}
            >
              {issue.severity}
            </div>

            <div
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            >
              ▼
            </div>
          </div>
        </button>

        {open && (
          <div className="border-t border-zinc-800 px-6 pb-6 pt-5 space-y-5">

            <div>
              <p className="text-red-400 text-xs font-black uppercase tracking-[0.25em] mb-3">
                Problem
              </p>

              <p className="text-zinc-300 leading-7">
                {issue.issue}
              </p>
            </div>

            <div>
              <p className="text-emerald-400 text-xs font-black uppercase tracking-[0.25em] mb-3">
                Recommended Fix
              </p>

              <p className="text-zinc-300 leading-7">
                {issue.fix}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { data: session, status } = useSession() as any;
  const [guestScanUsed, setGuestScanUsed] = useState(false);
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [analysis, setAnalysis] =
    useState<AnalysisResult | null>(null);

  const [analyzedFiles, setAnalyzedFiles] = useState<string[]>([]);

  const [history, setHistory] = useState<HistoryItem[]>([]);

  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<
    "issues" | "files"
  >("issues");

  // ─────────────────────────────────────────
  // LOAD HISTORY
  // ─────────────────────────────────────────

  const loadHistory = useCallback(async () => {
    if (!session) return;

    try {
      const res = await getUserAnalyses();

      if (res.success) {
        setHistory(res.analyses);
      }
    } catch {}
  }, [session]);

useEffect(() => {
  loadHistory();
}, [loadHistory]);

// ─────────────────────────────────────────
// CHECK GUEST FREE SCAN
// ─────────────────────────────────────────

useEffect(() => {
  const used = localStorage.getItem("guest_scan_used");

  if (used === "true") {
    setGuestScanUsed(true);
  }
}, []);

  // ─────────────────────────────────────────
  // ANALYZE
  // ─────────────────────────────────────────

 // ─────────────────────────────────────────
// ANALYZE
// ─────────────────────────────────────────

const handleAnalyze = async () => {
  if (!repoUrl.trim()) {
    setError("Please enter a GitHub repository URL.");
    return;
  }

  // Guest users only get 1 free scan
  if (!session && guestScanUsed) {
    setError(
      "Free limit reached. Please login with GitHub to continue scanning repositories."
    );

    return;
  }

  setLoading(true);
  setError(null);

  try {
    const result = await analyzeRepository(repoUrl);

    if (result.success) {
      setAnalysis(result.data);

      setAnalyzedFiles(result.analyzedFiles);

      // Save guest scan usage
      if (!session) {
        localStorage.setItem("guest_scan_used", "true");
        setGuestScanUsed(true);
      }

      loadHistory();
    } else {
      setError(result.error);
    }
  } catch {
    setError("Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  // ─────────────────────────────────────────
  // LOAD HISTORY ITEM
  // ─────────────────────────────────────────

  const handleLoadHistory = async (id: string) => {
    const res = await getAnalysisById(id);

    if (res.success) {
      setAnalysis({
        summary: res.data.summary,
        issues: res.data.issues,
        repositoryScore: res.data.repositoryScore,
      });

      setRepoUrl(res.data.repoUrl);
    }
  };

  // ─────────────────────────────────────────
  // DOWNLOAD REPORT
  // ─────────────────────────────────────────

  const downloadReport = () => {
    if (!analysis) return;

    const report = `
CODELENS AI REPORT

Repository:
${repoUrl}

SUMMARY:
${analysis.summary}

SECURITY SCORE:
${analysis.repositoryScore.security}

PERFORMANCE SCORE:
${analysis.repositoryScore.performance}

QUALITY SCORE:
${analysis.repositoryScore.quality}

OVERALL SCORE:
${analysis.repositoryScore.overall}

ISSUES:
${analysis.issues
  .map(
    (i) => `
TYPE: ${i.type}
FILE: ${i.file}
SEVERITY: ${i.severity}

ISSUE:
${i.issue}

FIX:
${i.fix}

──────────────────────
`
  )
  .join("\n")}
`;

    const blob = new Blob([report], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "codelens-report.txt";

    a.click();

    URL.revokeObjectURL(url);
  };

  // ─────────────────────────────────────────

  const scores = analysis?.repositoryScore;

  const issues = analysis?.issues ?? [];

  // ─────────────────────────────────────────
  // UI
  // ─────────────────────────────────────────

  return (
    <main className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

      {/* GLOW */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Image
              src="/logo.png"
              alt="CodeLens Logo"
              width={42}
              height={42}
              className="rounded-xl"
            />

            <div>
              <h1 className="font-black text-2xl tracking-tight">
                CodeLens
              </h1>

              <p className="text-zinc-500 text-xs uppercase tracking-[0.25em]">
                AI Repository Analyzer
              </p>
            </div>
          </div>

          <div>
            {status === "loading" ? (
              <div className="w-24 h-10 bg-zinc-800 rounded-full animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-4">

                <div className="text-right hidden sm:block">
                  <p className="font-semibold">
                    {session.user?.name}
                  </p>

                  <button
                    onClick={() => signOut()}
                    className="text-zinc-500 hover:text-red-400 text-sm transition"
                  >
                    Sign Out
                  </button>
                </div>

                <img
                  src={session.user?.image ?? ""}
                  alt="avatar"
                  className="w-11 h-11 rounded-full border border-zinc-700"
                />
              </div>
            ) : (
              <Button
                onClick={() => signIn("github")}
                className="rounded-2xl bg-white text-black hover:bg-zinc-200 font-black px-6"
              >
                Login with GitHub
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* CONTENT (UPDATED MAX-WIDTH & PADDING) */}
      <div className="relative z-10 w-full max-w-[1700px] mx-auto px-4 md:px-8 py-12 flex gap-8">

        {/* SIDEBAR */}
        {session && (
          <aside className="hidden lg:block w-72 flex-shrink-0">

            <div className="sticky top-28">

              <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 backdrop-blur-xl">

                <h2 className="font-black text-lg mb-5">
                  Recent Reports
                </h2>

                <div className="space-y-3">

                  {history.length === 0 ? (
                    <p className="text-zinc-500 text-sm">
                      No reports yet.
                    </p>
                  ) : (
                    history.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleLoadHistory(item.id)}
                        className="w-full text-left p-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-all"
                      >
                        <p className="font-semibold truncate">
                          {item.repoUrl.replace(
                            "https://github.com/",
                            ""
                          )}
                        </p>

                        <p className="text-zinc-500 text-xs mt-1">
                          Overall Score: {item.overall}
                        </p>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* MAIN */}
        <div className="flex-1 min-w-0">

          {/* HERO */}
          <div className="text-center max-w-4xl mx-auto">

            <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-sm font-medium tracking-wide text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-xl">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              AI Powered Analysis
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">

              Analyze Repositories.

              <br />

              <span className="text-blue-500">
                Detect Problems Faster.
              </span>
            </h1>

            <p className="text-zinc-400 text-lg leading-8 mt-8 max-w-3xl mx-auto">
              Scan public GitHub repositories for security vulnerabilities,
              performance bottlenecks, technical debt, and dangerous coding patterns.
            </p>
          </div>

          {/* INPUT */}
         {/* INPUT */}
<div className="mt-12 max-w-4xl mx-auto">

  <div className="p-3 rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl flex flex-col md:flex-row gap-4">

    <Input
      value={repoUrl}
      onChange={(e) => setRepoUrl(e.target.value)}
      onKeyDown={(e) =>
        e.key === "Enter" && handleAnalyze()
      }
      placeholder="Enter GitHub repository URL..."
      disabled={loading}
      className="h-14 bg-transparent border-0 focus-visible:ring-0 text-lg"
    />

    <Button
      onClick={handleAnalyze}
      disabled={loading}
      className="h-14 px-8 rounded-2xl bg-blue-500 hover:bg-blue-400 font-black text-lg"
    >
      {loading ? "Analyzing..." : "Analyze Repository"}
    </Button>
  </div>

  {/* FREE SCAN INFO */}
  {!session && !guestScanUsed && (
    <p className="text-zinc-500 text-sm mt-4 text-center">
      Guest users get 1 free repository scan.
    </p>
  )}

  {/* LOGIN CTA */}
  {!session && guestScanUsed && (
    <div className="mt-6 text-center">

      <p className="text-red-400 mb-4 font-medium">
        Free scan limit reached.
      </p>

      <Button
        onClick={() => signIn("github")}
        className="rounded-2xl bg-white text-black hover:bg-zinc-200 font-black px-8 h-12"
      >
        Continue with GitHub
      </Button>
    </div>
  )}
</div>
          {/* ERROR */}
          {error && (
            <div className="mt-6 max-w-4xl mx-auto p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
              {error}
            </div>
          )}

          {/* SCORES (UPDATED GRID WRAPPER FOR IMPROVED RESPONSE AND WIDTH) */}
          {scores && (
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-6 mt-14">

              <StatCard
                label="Security"
                value={scores.security}
                sub="Vulnerability Score"
              />

              <StatCard
                label="Performance"
                value={scores.performance}
                sub="Optimization Score"
              />

              <StatCard
                label="Quality"
                value={scores.quality}
                sub="Code Quality"
              />

              <StatCard
                label="Overall"
                value={scores.overall}
                sub="Repository Rating"
              />
            </div>
          )}

          {/* SUMMARY */}
          {analysis && (
            <div className="mt-10">

              <Card className="bg-zinc-900/60 border-zinc-800 rounded-3xl">
                <CardContent className="p-8">

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                    <div>
                      <p className="text-zinc-500 uppercase tracking-[0.25em] text-xs font-black">
                        Repository Summary
                      </p>

                      <h2 className="text-3xl font-black mt-3">
                        AI Analysis Report
                      </h2>
                    </div>

                    <Button
                      onClick={downloadReport}
                      className="rounded-2xl bg-white text-black hover:bg-zinc-200 font-black"
                    >
                      Download Report
                    </Button>
                  </div>

                  <p className="text-zinc-300 leading-8 mt-8 text-lg">
                    {analysis.summary}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* TABS */}
          {analysis && (
            <div className="mt-10">

              <div className="flex gap-3">

                <button
                  onClick={() => setActiveTab("issues")}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                    activeTab === "issues"
                      ? "bg-white text-black"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-400"
                  }`}
                >
                  Issues ({issues.length})
                </button>

                <button
                  onClick={() => setActiveTab("files")}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                    activeTab === "files"
                      ? "bg-white text-black"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-400"
                  }`}
                >
                  Files ({analyzedFiles.length})
                </button>
              </div>

              {/* ISSUES */}
              {activeTab === "issues" && (
                <div className="space-y-5 mt-8">

                  {issues.length === 0 ? (
                    <Card className="bg-zinc-900/60 border-zinc-800 rounded-3xl">
                      <CardContent className="p-12 text-center">

                        <div className="text-6xl mb-5">
                          ✅
                        </div>

                        <h3 className="text-3xl font-black text-emerald-400">
                          No Critical Issues Found
                        </h3>

                        <p className="text-zinc-500 mt-4">
                          This repository looks clean and production-ready.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    issues.map((issue, index) => (
                      <IssueCard
                        key={index}
                        issue={issue}
                      />
                    ))
                  )}
                </div>
              )}

              {/* FILES */}
              {activeTab === "files" && (
                <div className="grid md:grid-cols-2 gap-4 mt-8">

                  {analyzedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800"
                    >
                      <p className="font-mono text-zinc-300 truncate">
                        {file}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}