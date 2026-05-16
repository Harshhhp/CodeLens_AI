// "use server";

// interface FileIssue {
//   file: string;
//   type: string;
//   severity: "Low" | "Medium" | "High";
//   issue: string;
//   fix: string;
// }

// interface AnalysisResult {
//   summary: string;

//   issues: FileIssue[];

//   repositoryScore: {
//     security: number;
//     performance: number;
//     quality: number;
//     overall: number;
//   };
// }

// // ---------------------------------------------
// // Supported extensions
// // ---------------------------------------------
// const allowedExtensions = [
//   ".js",
//   ".ts",
//   ".tsx",
//   ".jsx",
//   ".py",
//   ".java",
//   ".cpp",
//   ".c",
// ];

// // ---------------------------------------------
// // Recursive repository fetch
// // ---------------------------------------------
// async function getRepositoryFiles(
//   owner: string,
//   repo: string,
//   path = ""
// ): Promise<any[]> {

//   const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

//   const response = await fetch(url, {
//     cache: "no-store",
//   });

//   if (!response.ok) {
//     throw new Error(`GitHub API Error: ${response.status}`);
//   }

//   const data = await response.json();

//   // IMPORTANT FIX
//   if (!Array.isArray(data)) {
//     return [];
//   }

//   let files: any[] = [];

//   for (const item of data) {

//     // Recursive directory scan
//     if (item.type === "dir") {

//       const nestedFiles = await getRepositoryFiles(
//         owner,
//         repo,
//         item.path
//       );

//       files.push(...nestedFiles);
//     }

//     // File scan
//     if (item.type === "file") {

//       const isAllowed = allowedExtensions.some((ext) =>
//         item.name.endsWith(ext)
//       );

//       if (isAllowed) {
//         files.push(item);
//       }
//     }
//   }

//   return files;
// }

// // ---------------------------------------------
// // Main analyzer
// // ---------------------------------------------
// export async function analyzeRepository(repoUrl: string) {

//   try {

//     // ---------------------------------------------
//     // Validate GitHub URL
//     // ---------------------------------------------
//     if (!repoUrl.includes("github.com")) {
//       throw new Error("Invalid GitHub URL");
//     }

//     // Remove trailing slash
//     const cleanUrl = repoUrl.replace(/\/$/, "");

//     // Extract owner/repo
//     const parts = cleanUrl.split("/");

//     const owner = parts[3];
//     const repo = parts[4];

//     if (!owner || !repo) {
//       throw new Error("Could not extract repository");
//     }

//     // ---------------------------------------------
//     // Fetch repository files
//     // ---------------------------------------------
//     const repoFiles = await getRepositoryFiles(owner, repo);

//     if (repoFiles.length === 0) {
//       throw new Error("No supported files found");
//     }

//     // ---------------------------------------------
//     // Limit free usage
//     // ---------------------------------------------
//     const selectedFiles = repoFiles.slice(0, 5);

//     // ---------------------------------------------
//     // Download file contents
//     // ---------------------------------------------
//     const downloadedFiles = [];

//     for (const file of selectedFiles) {

//       try {

//         const response = await fetch(file.download_url);

//         const content = await response.text();

//         downloadedFiles.push({
//           name: file.path,
//           content: content.substring(0, 3000),
//         });

//       } catch (err) {
//         console.log("Skipping file:", file.path);
//       }
//     }

//     if (downloadedFiles.length === 0) {
//       throw new Error("Could not download files");
//     }

//     // ---------------------------------------------
//     // Build AI prompt
//     // ---------------------------------------------
//     const repositoryCode = downloadedFiles
//       .map(
//         (file) => `
// FILE: ${file.name}

// ${file.content}

// ====================================
// `
//       )
//       .join("\n");

//     // ---------------------------------------------
//     // GROQ API KEY
//     // ---------------------------------------------
//     const apiKey = process.env.GROQ_API_KEY;

//     if (!apiKey) {
//       throw new Error("Missing GROQ_API_KEY");
//     }

//     // ---------------------------------------------
//     // AI REQUEST
//     // ---------------------------------------------
//     const aiResponse = await fetch(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${apiKey}`,
//         },

//         body: JSON.stringify({
//           model: "llama-3.3-70b-versatile",

//           messages: [
//             {
//               role: "system",
//               content: `
// You are a professional code security analyzer.

// Return ONLY valid JSON.

// No markdown.
// No explanations.
// No backticks.
// `,
//             },

//             {
//               role: "user",
//               content: `
// Analyze this repository code.

// Find:
// - Security vulnerabilities
// - Bad practices
// - Performance issues
// - Missing validation
// - Hardcoded secrets
// - SQL injection risks
// - XSS risks

// CODE:

// ${repositoryCode}

// RETURN THIS EXACT JSON:

// {
//   "summary": "",
//   "issues": [
//     {
//       "file": "",
//       "type": "",
//       "severity": "Low",
//       "issue": "",
//       "fix": ""
//     }
//   ],
//   "repositoryScore": {
//     "security": 0,
//     "performance": 0,
//     "quality": 0,
//     "overall": 0
//   }
// }
// `,
//             },
//           ],

//           temperature: 0.2,
//           max_tokens: 2000,
//         }),
//       }
//     );

//     // ---------------------------------------------
//     // GROQ ERROR
//     // ---------------------------------------------
//     if (!aiResponse.ok) {

//       const errorText = await aiResponse.text();

//       console.error(errorText);

//       throw new Error("Groq API request failed");
//     }

//     // ---------------------------------------------
//     // Parse AI result
//     // ---------------------------------------------
//     const aiData = await aiResponse.json();

//     const rawText =
//       aiData?.choices?.[0]?.message?.content || "";

//     if (!rawText) {
//       throw new Error("Empty AI response");
//     }

//     // Remove markdown
//     const cleanedText = rawText
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     let parsedData: AnalysisResult;

//     try {

//       parsedData = JSON.parse(cleanedText);

//     } catch (err) {

//       console.error(cleanedText);

//       throw new Error("AI returned invalid JSON");
//     }

//     // ---------------------------------------------
//     // Final return
//     // ---------------------------------------------
//     return {
//       success: true,

//       filesAnalyzed: downloadedFiles.length,

//       analyzedFiles: downloadedFiles.map(
//         (f) => f.name
//       ),

//       data: parsedData,
//     };

//   } catch (error: any) {

//     console.error(
//       "Repository Analysis Error:",
//       error
//     );

//     return {
//       success: false,
//       error:
//         error?.message ||
//         "Something went wrong",
//     };
//   }
// }
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FileIssue {
  file: string;
  type: string;
  severity: "Low" | "Medium" | "High";
  issue: string;
  fix: string;
}

export interface RepositoryScore {
  security: number;
  performance: number;
  quality: number;
  overall: number;
}

export interface AnalysisResult {
  summary: string;
  issues: FileIssue[];
  repositoryScore: RepositoryScore;
}

// ─── Supported extensions ────────────────────────────────────────────────────

const ALLOWED_EXTENSIONS = [
  ".js", ".ts", ".tsx", ".jsx",
  ".py", ".java", ".cpp", ".c",
  ".go", ".rs", ".rb", ".php",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseGithubUrl(repoUrl: string): { owner: string; repo: string } {
  try {
    const url = new URL(repoUrl.replace(/\/$/, ""));
    if (url.hostname !== "github.com") throw new Error();
    const [, owner, repo] = url.pathname.split("/");
    if (!owner || !repo) throw new Error();
    return { owner, repo: repo.replace(/\.git$/, "") };
  } catch {
    throw new Error(
      "Invalid GitHub URL. Expected format: https://github.com/owner/repo"
    );
  }
}

// ─── Recursive file fetcher (uses authenticated requests if token provided) ──

async function getRepositoryFiles(
  owner: string,
  repo: string,
  path = "",
  token?: string
): Promise<any[]> {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(url, { headers, cache: "no-store" });

  if (response.status === 404) {
    throw new Error(
      "Repository not found or is private. Make sure the URL is correct."
    );
  }
  if (response.status === 403) {
    throw new Error(
      "GitHub API rate limit exceeded. Please log in with GitHub for higher limits."
    );
  }
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data)) return [];

  let files: any[] = [];

  for (const item of data) {
    if (item.type === "dir") {
      // Skip common irrelevant directories
      if (
        ["node_modules", ".git", "dist", "build", ".next", "coverage"].includes(
          item.name
        )
      ) {
        continue;
      }
      const nested = await getRepositoryFiles(owner, repo, item.path, token);
      files.push(...nested);
    } else if (item.type === "file") {
      const isAllowed = ALLOWED_EXTENSIONS.some((ext) =>
        item.name.endsWith(ext)
      );
      if (isAllowed) files.push(item);
    }
  }

  return files;
}

// ─── Main action ─────────────────────────────────────────────────────────────

export async function analyzeRepository(repoUrl: string): Promise<
  | {
      success: true;
      filesAnalyzed: number;
      analyzedFiles: string[];
      data: AnalysisResult;
      savedId: string | null;
    }
  | { success: false; error: string }
> {
  try {
    // Validate URL
    const { owner, repo } = parseGithubUrl(repoUrl);

    // Get session — use access token if logged in (higher rate limits)
    const session = await getServerSession(authOptions) as any;
    const token: string | undefined = session?.accessToken;
    const githubId: string | undefined = session?.githubId;

    // Fetch file list
    const repoFiles = await getRepositoryFiles(owner, repo, "", token);

    if (repoFiles.length === 0) {
      throw new Error(
        "No supported source files found in this repository."
      );
    }

    // Limit to 8 files (free tier cap — increase as needed)
    const selectedFiles = repoFiles.slice(0, 8);

    // Download file contents in parallel
    const downloadResults = await Promise.allSettled(
      selectedFiles.map(async (file) => {
        const res = await fetch(file.download_url, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to fetch ${file.path}`);
        const content = await res.text();
        return { name: file.path, content: content.slice(0, 4000) };
      })
    );

    const downloadedFiles = downloadResults
      .filter(
        (r): r is PromiseFulfilledResult<{ name: string; content: string }> =>
          r.status === "fulfilled"
      )
      .map((r) => r.value);

    if (downloadedFiles.length === 0) {
      throw new Error("Could not download any files from this repository.");
    }

    // Build prompt
    const repositoryCode = downloadedFiles
      .map(
        (f) => `
===== FILE: ${f.name} =====
${f.content}
`
      )
      .join("\n");

    // Groq API key
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("Server misconfiguration: missing GROQ_API_KEY.");

    // AI request
    const aiResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          temperature: 0.15,
          max_tokens: 3000,
          messages: [
            {
              role: "system",
              content: `You are an expert code security and quality auditor.
You MUST return ONLY a single valid JSON object — no markdown, no backticks, no explanation.
Scores must be integers from 0–100. The "issues" array must have at least 1 item if problems exist.`,
            },
            {
              role: "user",
              content: `Analyze the repository code below for:
- Security vulnerabilities (SQL injection, XSS, hardcoded secrets, insecure dependencies)
- Bad practices (no input validation, missing error handling, over-permissive CORS)
- Performance issues (N+1 queries, memory leaks, blocking operations)
- Code quality issues (dead code, missing types, inconsistent patterns)

Repository: https://github.com/${owner}/${repo}

${repositoryCode}

Return EXACTLY this JSON schema (no extra fields):
{
  "summary": "2-3 sentence executive summary of the repository health",
  "issues": [
    {
      "file": "relative/path/to/file.ts",
      "type": "Issue category (e.g. SQL Injection, XSS, Hardcoded Secret)",
      "severity": "High",
      "issue": "Clear description of the problem",
      "fix": "Concrete actionable fix with code example if helpful"
    }
  ],
  "repositoryScore": {
    "security": 0,
    "performance": 0,
    "quality": 0,
    "overall": 0
  }
}`,
            },
          ],
        }),
      }
    );

    if (!aiResponse.ok) {
      const errorBody = await aiResponse.text();
      console.error("Groq error:", errorBody);
      throw new Error("AI analysis service is unavailable. Please try again.");
    }

    const aiData = await aiResponse.json();
    const rawText: string = aiData?.choices?.[0]?.message?.content ?? "";

    if (!rawText) throw new Error("Empty response from AI service.");

    // Strip any accidental markdown fences
    const cleanedText = rawText
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let parsedData: AnalysisResult;
    try {
      parsedData = JSON.parse(cleanedText);
    } catch {
      console.error("Bad JSON from AI:", cleanedText.slice(0, 500));
      throw new Error(
        "AI returned malformed data. Please try again."
      );
    }

    // Validate score ranges
    const score = parsedData.repositoryScore;
    (["security", "performance", "quality", "overall"] as const).forEach(
      (k) => {
        score[k] = Math.max(0, Math.min(100, Math.round(score[k] ?? 0)));
      }
    );

    // ── Save to Supabase via Prisma ────────────────────────────────────────
    let savedId: string | null = null;

    if (githubId) {
      try {
        const dbUser = await prisma.user.findUnique({
          where: { githubId },
          select: { id: true },
        });

        if (dbUser) {
          const saved = await prisma.repository.create({
            data: {
              repoUrl: `https://github.com/${owner}/${repo}`,
              summary: parsedData.summary,
              security: score.security,
              performance: score.performance,
              quality: score.quality,
              overall: score.overall,
              issues: parsedData.issues as any,
              userId: dbUser.id,
            },
          });
          savedId = saved.id;
        }
      } catch (dbErr) {
        // Non-fatal: log but don't fail the whole request
        console.error("Failed to save analysis to DB:", dbErr);
      }
    }

    return {
      success: true,
      filesAnalyzed: downloadedFiles.length,
      analyzedFiles: downloadedFiles.map((f) => f.name),
      data: parsedData,
      savedId,
    };
  } catch (error: any) {
    console.error("analyzeRepository error:", error);
    return {
      success: false,
      error: error?.message ?? "An unexpected error occurred.",
    };
  }
}

// ─── Fetch past analyses for the logged-in user ───────────────────────────────

export async function getUserAnalyses(): Promise<
  | {
      success: true;
      analyses: {
        id: string;
        repoUrl: string;
        summary: string;
        security: number;
        performance: number;
        quality: number;
        overall: number;
        createdAt: string;
      }[];
    }
  | { success: false; error: string }
> {
  try {
    const session = await getServerSession(authOptions) as any;
    if (!session?.githubId) {
      return { success: true, analyses: [] };
    }

    const dbUser = await prisma.user.findUnique({
      where: { githubId: session.githubId },
      select: { id: true },
    });

    if (!dbUser) return { success: true, analyses: [] };

    const rows = await prisma.repository.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        repoUrl: true,
        summary: true,
        security: true,
        performance: true,
        quality: true,
        overall: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      analyses: rows.map((r) => ({
        ...r,
        createdAt: r.createdAt.toISOString(),
      })),
    };
  } catch (error: any) {
    console.error("getUserAnalyses error:", error);
    return { success: false, error: error?.message ?? "Failed to fetch history." };
  }
}

// ─── Fetch a single saved analysis (for re-loading from history) ─────────────

export async function getAnalysisById(id: string): Promise<
  | {
      success: true;
      data: {
        repoUrl: string;
        summary: string;
        issues: FileIssue[];
        repositoryScore: RepositoryScore;
        createdAt: string;
      };
    }
  | { success: false; error: string }
> {
  try {
    const session = await getServerSession(authOptions) as any;
    if (!session?.githubId) throw new Error("Not authenticated.");

    const dbUser = await prisma.user.findUnique({
      where: { githubId: session.githubId },
      select: { id: true },
    });
    if (!dbUser) throw new Error("User not found.");

    const row = await prisma.repository.findFirst({
      where: { id, userId: dbUser.id },
    });
    if (!row) throw new Error("Analysis not found.");

    return {
      success: true,
      data: {
        repoUrl: row.repoUrl,
        summary: row.summary,
        issues: row.issues as FileIssue[],
        repositoryScore: {
          security: row.security,
          performance: row.performance,
          quality: row.quality,
          overall: row.overall,
        },
        createdAt: row.createdAt.toISOString(),
      },
    };
  } catch (error: any) {
    return { success: false, error: error?.message ?? "Failed to load analysis." };
  }
}