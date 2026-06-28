"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggleButton } from "@/components/ui/skiper-ui/skiper26";
import { CommandMenu } from "@/components/command-menu";
import { Menu, X, Code, FileText, Mail, Search } from "lucide-react";

const Navbar = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems = [
    { title: "Projects", href: "/projects", icon: Code },
    // { title: "Blog", href: "/blog", icon: FileText },
    { title: "Contact", href: "/Contact", icon: Mail },
  ];

  const triggerCommandMenu = () => {
    window.dispatchEvent(new CustomEvent("toggle-command-menu"));
  };

  if (!isMounted) return null;

  return (
    <>
      {/* ---------------------------------------------------- */}
      {/* DESKTOP: SLEEK SIDE-FLOATING MENU (Left Side) */}
      {/* ---------------------------------------------------- */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-5 px-3 py-6 
        bg-neutral-50/75 dark:bg-neutral-950/80 backdrop-blur-xl border border-neutral-200/60 dark:border-neutral-800/80 
        rounded-full shadow-[5px_0_30px_rgba(0,0,0,0.06)] dark:shadow-[5px_0_30px_rgba(0,0,0,0.4)]
        transition-colors duration-300 w-14"
      >
        {/* Avatar / Home Link */}
        <div className="relative group">
          <Link href="/" className="hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center justify-center">
            <Image
              className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 shadow-sm"
              src="/Avatar11.jpg"
              width={64}
              height={64}
              alt="Avatar"
            />
          </Link>
          <span className="absolute left-14 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all origin-left px-2 py-1 text-xs font-mono bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 rounded shadow-md pointer-events-none whitespace-nowrap z-50">
            Home
          </span>
        </div>

        <div className="h-[1px] w-6 bg-neutral-300/40 dark:bg-neutral-700/50" />

        {/* Navigation Icons */}
        <div className="flex flex-col items-center gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center justify-center w-9 h-9 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40 transition-all"
                  onMouseEnter={() => setHovered(item.title)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Icon size={18} />
                </Link>
                {/* Custom Tooltip */}
                <span className="absolute left-14 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all origin-left px-2 py-1 text-xs font-mono bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 rounded shadow-md pointer-events-none whitespace-nowrap z-50">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>

        <div className="h-[1px] w-6 bg-neutral-300/40 dark:bg-neutral-700/50" />

        {/* Utilities */}
        <div className="flex flex-col items-center gap-4">
          {/* Search Button */}
          <div className="relative group">
            <button
              onClick={triggerCommandMenu}
              className="flex items-center justify-center w-9 h-9 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40 transition-all cursor-pointer"
            >
              <Search size={18} />
            </button>
            <span className="absolute left-14 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all origin-left px-2 py-1 text-xs font-mono bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 rounded shadow-md pointer-events-none whitespace-nowrap z-50">
              Search (⌘K)
            </span>
          </div>

          {/* Theme Toggle */}
          <div className="relative group flex items-center justify-center w-9 h-9 rounded-full hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40 transition-all">
            <ThemeToggleButton variant="circle" start="top-right" />
            <span className="absolute left-14 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all origin-left px-2 py-1 text-xs font-mono bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 rounded shadow-md pointer-events-none whitespace-nowrap z-50">
              Toggle Theme
            </span>
          </div>
        </div>

        {/* Hidden mounting placeholder for Cmd+K palette registration */}
        <div className="hidden">
          <CommandMenu />
        </div>
      </motion.nav>

      {/* ---------------------------------------------------- */}
      {/* MOBILE: FLOATING MINIMALIST MENU TRIGGER (Bottom Right) */}
      {/* ---------------------------------------------------- */}
      <div className="md:hidden">
        {/* Floating Menu Toggle Button */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full 
          bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-xl border border-neutral-200/60 dark:border-neutral-800/80 
          shadow-lg text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer"
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>

        {/* Fullscreen Mobile Overlay Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-neutral-950/98 backdrop-blur-md z-45 flex flex-col justify-center px-10"
            >
              {/* Animated Menu Items */}
              <div className="flex flex-col gap-6 text-left">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-custom text-4xl text-neutral-400 hover:text-neutral-50 tracking-wider transition-colors duration-200"
                  >
                    Home
                  </Link>
                </motion.div>

                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + idx * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-custom text-4xl text-neutral-400 hover:text-neutral-50 tracking-wider transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="h-px bg-neutral-800 w-24 my-2"
                />

                {/* Mobile Utilities */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="flex items-center gap-6"
                >
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      triggerCommandMenu();
                    }}
                    className="flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-neutral-50 cursor-pointer"
                  >
                    <Search size={16} /> Search
                  </button>

                  <div className="flex items-center gap-2 text-sm font-mono text-neutral-400 hover:text-neutral-50">
                    <ThemeToggleButton variant="circle" start="top-right" /> Mode
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;
