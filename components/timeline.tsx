import React, { useState, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import Image from 'next/image';
import { useTheme } from 'next-themes';

type TechKey =
  | "next"
  | "ts"
  | "react"
  | "three"
  | "prisma"
  | "cloud"
  | "langchain"
  | "node"
  | "transformers"
  | "onnx"
  | "python";



const techNames: Record<TechKey, string> = {
  next: "Next.js",
  ts: "TypeScript",
  react: "React",
  three: "Three.js",
  prisma: "Prisma",
  cloud: "Cloudflare",
  langchain: "LangChain",
  node: "Node.js",
  transformers: "Transformers.js",
  onnx: "ONNX Runtime",
  python: "Python",
};

type Data = {
  title: string;
  href?: string;
  content: {
    title: string;
    subtitle?: string;
    description: string;
    src: string;
    darkSrc?: string;
    href: string;
    tech?: TechKey[];
    type?: string;
    dates?: string;
    location?: string;
    imageFit?: "contain" | "cover";
    imageZoom?: number;
  }[];
};

export const Timeline = () => {
  // Track which experience is open (by index)
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // TODO: Replace these with your own professional experience. You can modify the company names, descriptions, dates, and technology tags below.
  const data: Data[] = [
    {
      title: "Google Summer of Code 2026",
      href: "https://summerofcode.withgoogle.com/",
      content: [
        {
          title: "Google Summer of Code 2026",
          subtitle: "Joplin",
          description: `
            Building an on-device note-categorization plugin using Transformers.js/ONNX, keeping all embedding computation local.
            Designed a chunk-embed-average pipeline with cosine-similarity-based title weighting, selecting the BGE-small-en-v1.5 embedding model after benchmarking clustering accuracy, memory footprint, and inference speed.
            Implemented semantic clustering with UMAP dimensionality reduction and multiple strategies (HDBSCAN, K-Medoids, K-Means), achieving a top clustering score of 0.94 across 7 auto-detected topic clusters.
            Built a tag-suggestion pipeline combining TF-IDF keyword extraction with centroid cosine-similarity re-ranking to generate descriptive multi-word tags for each cluster.
          `,
          src: "/Experience-image/Google_Summer_of_Code_sun_logo_2022.svg%20(1).png",
          href: "https://summerofcode.withgoogle.com/",
          tech: ["transformers", "onnx", "python", "langchain"],
          dates: "May 2026 - Present",
          location: "Remote",
          imageFit: "contain",
          imageZoom: 0.9,
        },
      ],
    },
    {
      title: "Open Source Contributor",
      href: "https://github.com/",
      content: [
        {
          title: "Open Source Contributor",
          subtitle: "Joplin, AsyncApi & more",
          description: `
            Joplin: Authored 12 pull requests, with 11 merged, resolving long-standing issues across the Desktop application, Markdown editor, rendering engine, exports, and localization.
            Joplin: Fixed the Custom Dictionary storage implementation by redesigning how Custom Dictionary.txt is located and persisted across platforms, resolving a long-standing issue after evaluating multiple implementation approaches.
            Joplin: Improved the Markdown editor by fixing whitespace formatting edge cases, fenced code block completion, and clipboard rendering from the Markdown preview, making editing behavior more consistent.
            Joplin: Enhanced the desktop experience by implementing auto-scroll from Go to Anything, improving ABC Sheet Music rendering, enriching Markdown exports, and adding customization for internal note link icons.
            AsyncAPI Generator: Authored 18 merged pull requests, substantially expanding automated test coverage for the JavaScript WebSocket Generator and improving project reliability.
            AsyncAPI Generator: Improved developer tooling through deterministic Turborepo caching, AsyncAPI v3 documentation updates, WebSocket error handling improvements, and CI consistency.
          `,
          src: "/Experience-image/pngegg%20(1).png",
          href: "https://github.com/",
          tech: ["react", "node", "ts"],
          dates: "Dec 2025 - Jun 2026",
          location: "Remote",
          imageFit: "contain",
          imageZoom: 1.5,
        },
      ],
    },
    {
      title: "Full Stack Engineer",
      href: "https://grsworker.com/",
      content: [
        {
          title: "Full Stack Engineer",
          subtitle: "Intern, GRS Worker",
          description: `
            Architected full-stack app with Next.js 15, Prisma, NextAuth; secured sessions and complex DB relations.
            Integrated Twilio SMS, QR codes, Zod validation; cut data errors by 40%.
            Built UI with Radix UI, Framer Motion; optimized API with Turbopack and Server Actions.
          `,
          src: "/Experience-image/grs-blue-g.png",
          href: "https://grsworker.com/",
          tech: ["next", "prisma", "ts", "react", "node"],
          dates: "Sep 2025 - Nov 2025",
          location: "Delhi, India · Remote",
          imageFit: "contain",
          imageZoom: 1.1,
        },
      ],
    }
  ];
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold font-custom tracking-tight text-neutral-950 dark:text-neutral-50 pb-2 mt-2">
        <span className="link--elara">Experiences</span>
      </h1>
      <div className="w-auto border-t border-dashed border-neutral-300 dark:border-neutral-800 mb-4 -mx-4 sm:-mx-6 md:-mx-12 lg:-mx-20"></div>
      <div className="flex flex-col gap-4">
        {data.map((year, idx) => (
          <div key={year.title} className="relative pb-2 -mx-4 sm:-mx-6 md:-mx-12 lg:-mx-20 px-4 sm:px-6 md:px-12 lg:px-20">
            {year.content.map((item, cidx) => {
              const isOpen = openIdx === idx * 100 + cidx;
              const logoSrc = mounted && theme === 'dark' && item.darkSrc ? item.darkSrc : item.src;
              return (
                <React.Fragment key={item.title}>
                  <div
                    className="flex items-start gap-3 sm:gap-4 group py-3 cursor-pointer"
                    onClick={() => setOpenIdx(isOpen ? null : idx * 100 + cidx)}
                  >
                    {/* Logo */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-neutral-200/80 dark:border-neutral-700 p-[2px] bg-neutral-50 dark:bg-neutral-900 shrink-0">
                      <div
                        className={`w-full h-full rounded-md border border-neutral-200/60 dark:border-neutral-700/70 overflow-hidden ${item.imageFit === 'contain' ? 'bg-neutral-50 dark:bg-neutral-50' : 'bg-neutral-50 dark:bg-neutral-900'}`}
                      >
                        <Image
                          src={logoSrc}
                          alt={item.title}
                          width={48}
                          height={48}
                          style={item.imageZoom ? { transform: `scale(${item.imageZoom})` } : undefined}
                          className={`${item.imageFit === 'contain' ? 'object-contain' : 'object-cover'} w-full h-full`}
                        />
                      </div>
                    </div>

                    {/* Title + Dates — stacked on mobile, side-by-side on sm+ */}
                    <div className="flex-1 min-w-0">
                      {/* Top line: Title + Date */}
                      <div className="flex items-start sm:items-center justify-between gap-2">
                        <div className="min-w-0">
                          <span className="font-semibold text-sm sm:text-base md:text-lg text-neutral-950 dark:text-neutral-50 line-clamp-1">
                            {item.title}
                          </span>
                          {item.type && (
                            <span className="ml-2 px-2 py-0.5 rounded bg-neutral-700 text-xs text-neutral-100 font-medium border border-neutral-600">
                              {item.type}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <div className="text-right">
                            <div className="text-[10px] sm:text-xs md:text-sm font-semibold text-neutral-950 dark:text-neutral-50 whitespace-nowrap">
                              {item.dates || item.title}
                            </div>
                            <div className="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                              {item.location || "Remote"}
                            </div>
                          </div>
                          <FiChevronDown
                            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 stroke-[2.2] shrink-0 ${isOpen ? 'rotate-180 text-neutral-950 dark:text-neutral-50' : 'text-neutral-500 dark:text-neutral-500 group-hover:text-neutral-950 dark:group-hover:text-neutral-50'}`}
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                      {/* Subtitle */}
                      {item.subtitle && (
                        <div className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Details section with smooth accordion animation */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      {/* Inner container for padding control */}
                      <div className={`${isOpen ? 'py-4 opacity-100 translate-y-0' : 'py-0 opacity-0 -translate-y-2'} transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]`}>
                        <ul className="mb-4 list-disc list-inside pl-0 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm space-y-1.5 sm:space-y-2">
                          {item.description
                            .toString()
                            .split("\n")
                            .filter((line) => line.trim() !== "")
                            .map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                        </ul>
                        {/* Tech icons */}
                        {item.tech && (
                          <div className="flex flex-wrap gap-2">
                            {item.tech.map((key) => {
                              const name = techNames[key];
                              return (
                                <div
                                  key={key}
                                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-950 dark:text-neutral-200 shadow-sm"
                                >
                                  {name}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            {idx !== data.length - 1 && (
              <div
                className="absolute bottom-0 left-0 w-full h-[1px] opacity-100 dark:opacity-15"
                style={{
                  backgroundImage: "linear-gradient(to right, var(--pattern-fg) 50%, transparent 50%)",
                  backgroundSize: "15px 1px",
                  backgroundRepeat: "repeat-x"
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
