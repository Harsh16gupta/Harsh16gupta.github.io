"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/containers";
import { ThemeToggleButton } from "@/components/ui/skiper-ui/skiper26";
import { CommandMenu } from "@/components/command-menu";
import { Code, FileText, Search, Activity, Menu, X, ArrowRight } from "lucide-react";

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems: { title: string; href: string; icon: React.ComponentType<{ size?: number; className?: string }>; external?: boolean }[] = [
    { title: "Projects", href: "/projects", icon: Code },
    { title: "Proof of Work", href: "/proof-of-work", icon: Activity },
    { title: "Resume", href: "/resume", icon: FileText },
  ];

  const triggerCommandMenu = () => {
    setMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent("toggle-command-menu"));
  };

  if (!isMounted) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="sticky top-0 z-50 w-full bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-md"
      >
        <Container className="py-3 sm:py-4 flex items-center justify-between border-b border-dashed border-neutral-300 dark:border-neutral-800 bg-transparent px-4 sm:px-6 md:px-12 lg:px-20">
          {/* Left: Avatar & Brand */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center justify-center"
            >
              <Image
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-neutral-300/80 dark:border-neutral-700/80 shadow-sm"
                src="/Avatar12.jpg"
                width={56}
                height={56}
                alt="Avatar"
                priority
              />
            </Link>
          </div>

          {/* Center: Desktop Nav Items (hidden on mobile, visible on sm and up) */}
          <div className="hidden sm:flex items-center gap-2 md:gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-neutral-950 dark:text-neutral-50 bg-neutral-200/80 dark:bg-neutral-800/80 shadow-xs"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40"
                  }`}
                  title={item.title}
                >
                  <Icon size={15} className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>

          {/* Right: Utilities */}
          <div className="flex items-center gap-1.5">
            {/* Search Button */}
            <button
              onClick={triggerCommandMenu}
              className="flex items-center justify-center w-8 h-8 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40 transition-all cursor-pointer"
              aria-label="Search (⌘K)"
            >
              <Search size={16} />
            </button>

            {/* Theme Toggle */}
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40 transition-all">
              <ThemeToggleButton variant="circle" start="top-right" />
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex sm:hidden items-center justify-center w-8 h-8 rounded-full text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-neutral-50 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 active:scale-95 transition-all cursor-pointer ml-1"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </Container>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="sm:hidden overflow-hidden border-b border-neutral-300/80 dark:border-neutral-800 bg-neutral-50/95 dark:bg-neutral-950/95 backdrop-blur-xl"
            >
              <div className="px-4 py-3 flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-neutral-200/80 dark:bg-neutral-800/80 text-neutral-950 dark:text-neutral-50 shadow-xs"
                          : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40 hover:text-neutral-950 dark:hover:text-neutral-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg ${isActive ? "bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-950" : "bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-500 dark:text-neutral-400"}`}>
                          <Icon size={15} />
                        </div>
                        <span>{item.title}</span>
                      </div>
                      <ArrowRight size={14} className="text-neutral-400 opacity-60" />
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden mounting placeholder for Cmd+K palette registration */}
        <div className="hidden">
          <CommandMenu />
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
