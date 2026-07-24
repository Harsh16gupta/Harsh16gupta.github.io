import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import { Instrument_Serif, Instrument_Sans } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider";
import FractalTree from "@/components/ui/fractal-tree";
import { Toaster } from "sonner";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const instrumentSans = Instrument_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});




export const metadata: Metadata = {
  metadataBase: new URL("https://harsh16gupta.github.io"),
  title: {
    default: "Harsh Gupta (harsh16gupta) | AI Engineer & Developer Portfolio",
    template: "%s | Harsh Gupta (harsh16gupta)",
  },
  description:
    "Official portfolio of Harsh Gupta (harsh16gupta) — AI Engineer, GSoC contributor at Joplin, Machine Learning practitioner, and Full-Stack Developer building intelligent applications.",
  keywords: [
    "Harsh Gupta",
    "harshgupta",
    "harsh16gupta",
    "Harsh Gupta Portfolio",
    "Harsh Gupta AI",
    "Harsh Gupta AI Engineer",
    "Harsh Gupta Developer",
    "Harsh Gupta GitHub",
    "harsh16gupta github",
    "Harsh Gupta Resume",
    "Harsh Gupta Joplin",
    "AI Engineer Portfolio",
    "Machine Learning Engineer",
    "Full Stack Developer"
  ],
  authors: [{ name: "Harsh Gupta", url: "https://harsh16gupta.github.io" }],
  creator: "Harsh Gupta",
  publisher: "Harsh Gupta",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Harsh Gupta (harsh16gupta) | AI Engineer & Developer Portfolio",
    description:
      "Official portfolio of Harsh Gupta (harsh16gupta) — AI Engineer, GSoC contributor at Joplin, and Full-Stack Developer.",
    url: "https://harsh16gupta.github.io",
    siteName: "Harsh Gupta Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Avatar12.jpg",
        width: 800,
        height: 800,
        alt: "Harsh Gupta (harsh16gupta) - AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Gupta (harsh16gupta) | AI Engineer & Developer",
    description:
      "AI Engineer — Building, breaking, and shipping intelligent applications.",
    creator: "@Harsh16Gupta",
    images: ["/Avatar12.jpg"],
  },
  verification: {
    google: "H-BsxHgTeIIBVZnVZ8jAZBBEdFq4ZLQwwOxZTSHIi6E",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Harsh Gupta",
  alternateName: ["harshgupta", "harsh16gupta", "Harsh16Gupta"],
  url: "https://harsh16gupta.github.io",
  image: "https://harsh16gupta.github.io/Avatar12.jpg",
  jobTitle: "AI Engineer",
  description:
    "Harsh Gupta (harsh16gupta) is an AI Engineer, GSoC contributor at Joplin, and Full-Stack Developer building intelligent applications.",
  sameAs: [
    "https://github.com/Harsh16gupta",
    "https://x.com/Harsh16Gupta",
    "https://www.linkedin.com/in/harsh-gupta---/",
    "https://cal.com/harsh16gupta/30min",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Agentic Workflows",
    "Full-Stack Web Development",
    "React",
    "Next.js",
    "Python",
    "Open Source Software",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Harsh Gupta (harsh16gupta) Portfolio",
  alternateName: ["harshgupta", "harsh16gupta", "Harsh Gupta AI"],
  url: "https://harsh16gupta.github.io",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>{/* 🛠 Important for dark mode */}
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${instrumentSans.variable} ${instrumentSerif.variable} font-custom2 antialiased bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300 [--pattern-fg:var(--color-neutral-200)]`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Analytics />
          <SpeedInsights />
          <FractalTree />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
