import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/containers";
import { ArrowLeft, Download, FileText } from "lucide-react";

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

          {/* Right: Download Action */}
          <div className="flex items-center gap-2">
            <a href="/resume.pdf" download="Harsh_Gupta_Resume.pdf">
              <button className="group relative flex items-center gap-2 overflow-hidden rounded-lg bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 text-xs sm:text-sm font-medium px-4 py-2 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer border border-transparent">
                <Download className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                <span>Download PDF</span>
              </button>
            </a>
          </div>

        </div>

        {/* Embedded PDF Viewer Container */}
        <div className="relative w-full h-[78vh] sm:h-[82vh] rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
          <object
            data="/resume.pdf#toolbar=1&navpanes=0&zoom=60"
            type="application/pdf"
            className="w-full h-full"
          >
            <div className="flex flex-col items-center justify-center h-full gap-4 p-6 text-center">
              <FileText className="w-12 h-12 text-neutral-400" />
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Direct preview unavailable on this device.
              </p>
              <a
                href="/resume.pdf"
                download="Harsh_Gupta_Resume.pdf"
                className="px-4 py-2 text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800"
              >
                Download Resume PDF
              </a>
            </div>
          </object>
        </div>

      </Container>
    </div>
  );
}
