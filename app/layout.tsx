import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. Import your provider (Make sure the path matches where you created it)
import { NextAuthProvider } from "@/providers/NextAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CodeLens AI - GitHub Repository Analyzer",
  description:
    "AI-powered tool to analyze GitHub repositories, understand codebases, architecture, and generate smart insights instantly.",
  keywords: [
    "CodeLens AI",
    "GitHub analyzer",
    "AI code review",
    "repository analysis",
    "codebase explainer",
  ],
  openGraph: {
    title: "CodeLens AI",
    description: "Analyze GitHub repositories using AI instantly",
    url: "https://code-lens-ai-iota.vercel.app",
    siteName: "CodeLens AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* 2. Wrap the children here */}
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}