"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, ArrowRight, Phone, FileDown } from "lucide-react";
import AnimatedButton from "@/components/ui/AnimatedButton";

export default function Hero() {
  const socials = [
    {
      name: "GitHub",
      icon: Github,
      action: () => window.open("https://github.com/Harsh16gupta", "_blank"),
    },
    {
      name: "Twitter",
      icon: Twitter,
      action: () => window.open("https://x.com/Harsh16Gupta", "_blank"),
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      action: () => window.open("https://www.linkedin.com/in/harsh-gupta---/", "_blank"),
    },
    {
      name: "Email",
      icon: Mail,
      action: () => (window.location.href = "mailto:harsh16official@gmail.com"),
    },
    {
      name: "Resume",
      icon: FileDown,
      action: () => (window.location.href = "/resume"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative pt-8 pb-6 sm:py-8 md:py-10 w-full select-none"
    >
      {/* MOBILE HERO (block md:hidden) */}
      <div className="block md:hidden pt-3 sm:pt-2">
        {/* Top row: Photo + Name (side by side on mobile) */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Profile Image */}
          <div className="shrink-0 relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-full border border-neutral-200/50 dark:border-neutral-800/30 ring-1 ring-neutral-200/30 dark:ring-white/5 shadow-md">
            <Image
              src="/Avatar12.jpg"
              alt="Harsh Gupta"
              width={112}
              height={112}
              className="w-full h-full object-cover scale-110 hover:scale-115 transition-transform duration-300"
              priority
            />
          </div>

          {/* Name + Subtitle + Social Icons (with top padding for space above Harsh Gupta on mobile) */}
          <div className="flex-1 min-w-0 pt-2.5 sm:pt-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
              <h1 className="font-custom text-2xl sm:text-3xl font-bold tracking-[-0.03em] leading-[1.1] text-neutral-900 dark:text-neutral-50 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors duration-200">
                Harsh Gupta
              </h1>
              <span className="font-custom2 text-[10px] sm:text-xs text-neutral-400 dark:text-neutral-500 font-medium">
                21 · AI Engineer
              </span>
            </div>

            {/* Social Icons — inline on mobile, below name area */}
            <div className="flex items-center gap-3 mt-2 sm:mt-2.5">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <button
                    key={social.name}
                    onClick={social.action}
                    className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-50 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer select-none"
                    title={social.name}
                  >
                    <Icon size={14} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bio + CTAs */}
        <div className="mt-4 sm:mt-5">
          <p className="font-custom2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-prose">
            I love building, breaking, and shipping intelligent, production-grade applications. Currently contributing to open source as a GSoC &apos;26 contributor at Joplin, and expanding my knowledge in Machine Learning & Agentic workflows. Always open to collaborate, chat, or geek out over cool tech stuff.
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
            <Link href="/Contact">
              <button className="group relative overflow-hidden rounded-lg bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 text-xs sm:text-sm font-medium px-4 sm:px-5 py-2 sm:py-2.5 shadow-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer border border-transparent">
                <span className="relative z-10 flex items-center gap-2">
                  Send Enquiry
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </Link>

            <Link href="https://cal.com/harsh16gupta/30min" target="_blank">
              <AnimatedButton className="group relative overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm font-medium px-4 sm:px-5 py-2 sm:py-2.5 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer">
                <span className="relative z-10 flex items-center gap-2">
                  Book a call
                  <Phone className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </div>

      {/* DESKTOP HERO (hidden md:flex) — Exact previous desktop layout */}
      <div className="hidden md:flex md:items-start gap-8">
        {/* Profile Image */}
        <div className="shrink-0 relative w-28 h-28 overflow-hidden rounded-full border border-neutral-200/50 dark:border-neutral-800/30 ring-1 ring-neutral-200/30 dark:ring-white/5 shadow-md">
          <Image
            src="/Avatar12.jpg"
            alt="Harsh Gupta"
            width={112}
            height={112}
            className="w-full h-full object-cover scale-110 hover:scale-115 transition-transform duration-300"
            priority
          />
        </div>

        {/* Content Details */}
        <div className="flex-1 flex flex-col gap-3.5">
          {/* Header & Role */}
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h1 className="font-custom text-5xl lg:text-6xl font-bold tracking-[-0.04em] leading-[1.05] text-neutral-900 dark:text-neutral-50 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors duration-200">
                Harsh Gupta
              </h1>
              <span className="font-custom2 text-sm text-neutral-400 dark:text-neutral-500 font-medium">
                21 · AI Engineer
              </span>
            </div>
          </div>

          {/* Bio Paragraph */}
          <p className="font-custom2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-prose">
            I love building, breaking, and shipping intelligent, production-grade applications. Currently contributing to open source as a GSoC &apos;26 contributor at Joplin, and expanding my knowledge in Machine Learning & Agentic workflows. Always open to collaborate, chat, or geek out over cool tech stuff.
          </p>

          {/* CTAs & Social Links on same row with divider */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <div className="flex flex-wrap gap-3">
              <Link href="/Contact">
                <button className="group relative overflow-hidden rounded-lg bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-950 text-sm font-medium px-5 py-2.5 shadow-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer border border-transparent">
                  <span className="relative z-10 flex items-center gap-2">
                    Send Enquiry
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>

              <Link href="https://cal.com/harsh16gupta/30min" target="_blank">
                <AnimatedButton className="group relative overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent text-neutral-600 dark:text-neutral-400 text-sm font-medium px-5 py-2.5 hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer">
                  <span className="relative z-10 flex items-center gap-2">
                    Book a call
                    <Phone className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </AnimatedButton>
              </Link>
            </div>

            {/* Vertical Divider */}
            <div className="w-px h-5 bg-neutral-200/50 dark:bg-neutral-800/40 mx-2" />

            {/* Social Icons row */}
            <div className="flex items-center gap-4">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <button
                    key={social.name}
                    onClick={social.action}
                    className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-50 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer select-none"
                    title={social.name}
                  >
                    <Icon size={16} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
