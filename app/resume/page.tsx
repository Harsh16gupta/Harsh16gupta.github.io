import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/containers";
import ResumeViewer from "@/components/resume-viewer";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Official Resume of Harsh Gupta (harsh16gupta) — AI Engineer & Full-Stack Developer.",
  alternates: {
    canonical: "/resume",
  },
  openGraph: {
    title: "Resume | Harsh Gupta (harsh16gupta)",
    description:
      "Official Resume of Harsh Gupta (harsh16gupta) — AI Engineer & Full-Stack Developer.",
    url: "https://harsh16gupta.github.io/resume",
  },
};

export default function ResumePage() {
  return (
    <div className="relative flex min-h-screen justify-center font-sans overflow-hidden">
      <Container className="min-h-screen px-4 pt-16 sm:pt-20 md:px-12 lg:px-20 pb-12 sm:pb-16 mx-auto w-full">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-dashed border-neutral-300 dark:border-neutral-800">
          
          {/* Left: Back button & Title */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <button className="flex items-center justify-center p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 shadow-xs">
                <ArrowLeft size={18} />
              </button>
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-bold font-custom tracking-tight text-neutral-950 dark:text-neutral-50 flex items-center gap-2">
                <FileText className="w-4 h-4 text-neutral-500" />
                Resume
              </h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-custom2 hidden sm:block">
                Harsh Gupta · Software Engineer & AI ML
              </p>
            </div>
          </div>

        </div>

        {/* Resume Viewer Container */}
        <ResumeViewer />

      </Container>
    </div>
  );
}

