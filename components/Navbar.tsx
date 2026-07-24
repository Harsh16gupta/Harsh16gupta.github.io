"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/containers";
import { ThemeToggleButton } from "@/components/ui/skiper-ui/skiper26";
import { CommandMenu } from "@/components/command-menu";
import { Code, FileText, Search, Activity } from "lucide-react";

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const navItems: { title: string; href: string; icon: React.ComponentType<{ size?: number; className?: string }>; external?: boolean }[] = [
    { title: "Projects", href: "/projects", icon: Code },
    { title: "Proof of Work", href: "/proof-of-work", icon: Activity },
    { title: "Resume", href: "/resume", icon: FileText },
    { title: "Blog", href: "/blog", icon: FileText },
  ];

  const triggerCommandMenu = () => {
    window.dispatchEvent(new CustomEvent("toggle-command-menu"));
  };

  if (!isMounted) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="sticky top-0 z-50 w-full bg-neutral-50/60 dark:bg-neutral-950/60 backdrop-blur-md"
      >
        <Container className="py-3 sm:py-4 flex items-center justify-between border-b border-dashed border-neutral-300 dark:border-neutral-800 bg-transparent dark:bg-transparent px-4 sm:px-6 md:px-12 lg:px-20">
          {/* Left: Avatar & Brand */}
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center justify-center">
              <Image
                className="w-7 h-7 rounded-full border border-neutral-300/80 dark:border-neutral-700/80 shadow-sm"
                src="/Avatar12.jpg"
                width={56}
                height={56}
                alt="Avatar"
                priority
              />
            </Link>
          </div>

          {/* Center: Nav Items */}
          <div className="flex items-center gap-1 sm:gap-3 md:gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-2.5 py-2 sm:py-1.5 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40 transition-all duration-200"
                  title={item.title}
                >
                  <Icon size={16} className="sm:w-3.5 sm:h-3.5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="hidden sm:inline text-xs md:text-sm font-medium">{item.title}</span>
                </Link>
              );
            })}
          </div>

          {/* Right: Utilities */}
          <div className="flex items-center gap-1">
            {/* Search Button */}
            <button
              onClick={triggerCommandMenu}
              className="flex items-center justify-center w-8 h-8 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40 transition-all cursor-pointer"
              aria-label="Search (⌘K)"
            >
              <Search size={15} />
            </button>

            {/* Theme Toggle */}
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40 transition-all">
              <ThemeToggleButton variant="circle" start="top-right" />
            </div>
          </div>
        </Container>

        {/* Hidden mounting placeholder for Cmd+K palette registration */}
        <div className="hidden">
          <CommandMenu />
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
