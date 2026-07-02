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
  title: "Harsh",
  description: "AI Engineer — I love building and breaking stuff",
  openGraph: {
    title: "Harsh",
    description: "AI Engineer — I love building and breaking stuff",
    url: "https://github.com/Harsh16gupta", // TODO: Update to your actual domain URL when deployed
    siteName: "Harsh",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh",
    description: "AI Engineer — I love building and breaking stuff",
  },
};

export default function RootLayout({
  children,
}: { 
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>{/* 🛠 Important for dark mode */}
      <body
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
