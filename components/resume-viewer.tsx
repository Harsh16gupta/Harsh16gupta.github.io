"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Download, ExternalLink, Eye, FileText, Smartphone } from "lucide-react";

export default function ResumeViewer() {
  const [viewMode, setViewMode] = useState<"image" | "pdf">("image");

  return (
    <div className="flex flex-col items-center w-full">
      {/* View Switcher & Action bar for mobile / desktop */}
      <div className="flex flex-wrap items-center justify-between gap-3 w-full mb-4 px-1">
        
        {/* Left: View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
          <button
            onClick={() => setViewMode("image")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === "image"
                ? "bg-white dark:bg-neutral-800 text-neutral-950 dark:text-neutral-50 shadow-xs"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Image</span>
          </button>

          <button
            onClick={() => setViewMode("pdf")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === "pdf"
                ? "bg-white dark:bg-neutral-800 text-neutral-950 dark:text-neutral-50 shadow-xs"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF Document</span>
          </button>
        </div>

        {/* Right: Direct Actions */}
        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open PDF</span>
          </a>

          <a
            href="/resume.pdf"
            download="Harsh_Gupta_Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-neutral-900 dark:bg-neutral-50 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-lg transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </a>
        </div>
      </div>

      {/* Main Container */}
      {viewMode === "image" ? (
        <div className="w-full flex flex-col items-center p-2 sm:p-4 bg-neutral-100/50 dark:bg-neutral-900/50 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl bg-white dark:bg-neutral-950">
          <div className="relative w-full max-w-4xl shadow-md rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white">
            <Image
              src="/resume-preview.png"
              alt="Harsh Gupta Resume Preview"
              width={1200}
              height={1550}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      ) : (
        <div className="relative w-full h-[78vh] sm:h-[82vh] rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
          <object
            data="/resume.pdf#toolbar=1&navpanes=0&zoom=60"
            type="application/pdf"
            className="w-full h-full"
          >
            {/* Fallback for mobile / browsers without native PDF plugin */}
            <div className="flex flex-col items-center justify-center h-full gap-4 p-6 text-center">
              <div className="p-4 rounded-full bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400">
                <Smartphone className="w-8 h-8" />
              </div>
              <div className="max-w-md">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                  Mobile PDF Preview
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                  Mobile browsers don&apos;t support inline PDF plugins. Use image preview or open PDF directly.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                <button
                  onClick={() => setViewMode("image")}
                  className="px-4 py-2 text-xs font-medium text-neutral-900 bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                >
                  Switch to Image Preview
                </button>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-medium text-white bg-neutral-900 dark:bg-neutral-50 dark:text-neutral-950 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >
                  Open PDF in Browser
                </a>
              </div>
            </div>
          </object>
        </div>
      )}
    </div>
  );
}
