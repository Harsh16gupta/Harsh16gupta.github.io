"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, ArrowRight, Phone } from "lucide-react";
import { useTheme } from "next-themes";
import AnimatedButton from "@/components/ui/AnimatedButton";

// Particle class for canvas physics
class CanvasParticle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  radius: number;
  springStrength: number;
  friction: number;

  constructor(x: number, y: number, targetX: number, targetY: number) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.vx = 0;
    this.vy = 0;
    this.radius = 1.05;
    this.springStrength = 0.05 + Math.random() * 0.03;
    this.friction = 0.82;
  }

  update(mouseX: number, mouseY: number, mouseActive: boolean) {
    const dxTarget = this.targetX - this.x;
    const dyTarget = this.targetY - this.y;

    this.vx += dxTarget * this.springStrength;
    this.vy += dyTarget * this.springStrength;

    if (mouseActive) {
      const dxMouse = this.x - mouseX;
      const dyMouse = this.y - mouseY;
      const distSq = dxMouse * dxMouse + dyMouse * dyMouse;
      const interactionRadius = 40;
      const radiusSq = interactionRadius * interactionRadius;

      if (distSq < radiusSq) {
        const dist = Math.sqrt(distSq);
        const force = (interactionRadius - dist) / interactionRadius;
        const angle = Math.atan2(dyMouse, dxMouse);

        this.vx += Math.cos(angle) * force * 3.8;
        this.vy += Math.sin(angle) * force * 3.8;
      }
    }

    this.vx *= this.friction;
    this.vy *= this.friction;
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const [dimensions, setDimensions] = useState({ width: 0, height: 48 });

  // Handle Resize of name canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const parent = canvasRef.current.parentElement;
        const width = parent?.clientWidth || 150;
        const height = window.innerWidth < 768 ? 48 : 60;
        setDimensions({ width, height });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Particle Canvas Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    ctx.fillStyle = "#ffffff";
    
    const fontSize = dimensions.height === 48 ? 38 : 52;
    ctx.font = `bold ${fontSize}px 'Instrument Serif', serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("HARSH GUPTA", 2, dimensions.height / 2);

    const imgData = ctx.getImageData(0, 0, dimensions.width * dpr, dimensions.height * dpr);
    const pixels = imgData.data;
    const targets: { x: number; y: number }[] = [];

    const step = 2.5;
    for (let y = 0; y < dimensions.height * dpr; y += step) {
      for (let x = 0; x < dimensions.width * dpr; x += step) {
        const index = (Math.floor(y) * Math.floor(dimensions.width * dpr) + Math.floor(x)) * 4;
        const alpha = pixels[index + 3];
        if (alpha > 128) {
          targets.push({
            x: x / dpr,
            y: y / dpr,
          });
        }
      }
    }

    const particles = targets.map((target) => {
      const startX = Math.random() * dimensions.width;
      const startY = Math.random() * dimensions.height;
      return new CanvasParticle(startX, startY, target.x, target.y);
    });

    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    let animationId: number;
    const particleColor = resolvedTheme === "dark" ? "rgba(250, 250, 250, 0.95)" : "rgba(23, 23, 23, 0.95)";

    const tick = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      const mouse = mouseRef.current;

      particles.forEach((p) => {
        p.update(mouse.x, mouse.y, mouse.active);
        p.draw(ctx, particleColor);
      });

      animationId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [dimensions, resolvedTheme]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    mouseRef.current.active = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 6 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
      },
    },
  };

  const socials = [
    {
      name: "GitHub",
      icon: Github,
      action: () => window.open("https://github.com/Harsh16gupta", "_blank"),
    },
    {
      name: "Twitter",
      icon: Twitter,
      action: () => window.open("https://x.com/your-handle", "_blank"),
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      action: () => window.open("https://linkedin.com/in/your-linkedin", "_blank"),
    },
    {
      name: "Email",
      icon: Mail,
      action: () => (window.location.href = "mailto:harsh16official@gmail.com"),
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative pt-2 w-full select-none pb-8"
    >
      {/* 1. Integrated Banner Box (Matches Project Card style) */}
      <motion.div
        variants={itemVariants}
        className="group flex items-center gap-4 md:gap-6 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 p-5 md:p-6 bg-white dark:bg-black hover:shadow-2xl hover:shadow-neutral-500/5"
      >
        {/* Left Side: Photo */}
        <div className="shrink-0 relative w-[72px] h-[72px] md:w-[88px] md:h-[88px] overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
          <Image
            src="/Avatar11.jpg"
            alt="Harsh"
            width={88}
            height={88}
            className="w-full h-full object-cover scale-120 origin-center"
            priority
          />
        </div>

        {/* Right Side: Name Block with Particle Canvas */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Top Row: Name and Socials */}
          <div className="flex items-center justify-between gap-4 w-full">
            {/* Interactive Particle Name Box */}
            <div className="relative flex-1 max-w-[200px] md:max-w-[320px] h-[48px] md:h-[60px] overflow-hidden cursor-crosshair">
              <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="absolute inset-0 w-full h-full z-10"
              />
            </div>
            
            {/* Social Icons only */}
            <div className="hidden sm:flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <button
                    key={social.name}
                    onClick={social.action}
                    className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors duration-150 cursor-pointer select-none"
                    title={social.name}
                  >
                    <Icon size={18} />
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Thin Horizontal Line */}
          <div className="w-full h-px bg-[var(--pattern-fg)] opacity-30" />

          {/* Meta Info */}
          <div className="font-custom2 text-xs text-neutral-500 dark:text-neutral-400">
             21 · AI Engineer
          </div>
        </div>
      </motion.div>

      {/* 2. Dashed Divider (Matches layout borders elsewhere in the project) */}
      <motion.div
        variants={itemVariants}
        className="w-auto border-t border-dashed border-neutral-300 dark:border-neutral-800 my-4 -mx-8 md:-mx-20"
      />

      {/* 3. Tagline */}
      <motion.p
        variants={itemVariants}
        className="font-custom2 text-sm text-neutral-700 dark:text-neutral-300 font-normal leading-relaxed"
      >
        I love building, breaking, and shipping things. Always open to chat, collaborate, or just geek out over cool tech stuff.
      </motion.p>

      {/* 4. Bullets List */}
      <motion.ul
        variants={itemVariants}
        className="list-none mt-3 space-y-1.5"
      >
        <li className="flex items-start gap-2 text-sm font-custom2 text-neutral-600 dark:text-neutral-400">
          <span className="text-neutral-400 mt-0.5 shrink-0">•</span>
          <span>
            <strong className="text-neutral-900 dark:text-neutral-100 font-semibold">GSoC-26</strong> contributor @{" "}
            <strong className="text-neutral-900 dark:text-neutral-100 font-semibold">Joplin</strong> & open source builder.
          </span>
        </li>
        <li className="flex items-start gap-2 text-sm font-custom2 text-neutral-600 dark:text-neutral-400">
          <span className="text-neutral-400 mt-0.5 shrink-0">•</span>
          <span>Currently expanding my knowledge in Artificial Intelligence & Machine Learning.</span>
        </li>
        <li className="flex items-start gap-2 text-sm font-custom2 text-neutral-600 dark:text-neutral-400">
          <span className="text-neutral-400 mt-0.5 shrink-0">•</span>
          <span>Cinephile & music lover</span>
        </li>
      </motion.ul>

      {/* 5. Contact / Booking Buttons (Send Enquiry & Book Call) */}
      <motion.div
        variants={itemVariants}
        className="mt-6 flex flex-wrap gap-4"
      >
        <Link href="/Contact">
          <button
            className="group relative overflow-hidden rounded-lg 
            bg-linear-to-b from-white to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 
            border border-neutral-200 dark:border-neutral-800 
            text-neutral-800 dark:text-neutral-200 text-sm font-medium px-6 py-2.5 
            transition-all duration-300 
            hover:from-neutral-50 hover:to-neutral-100 dark:hover:from-neutral-800 dark:hover:to-neutral-800
            shadow-[0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] 
            dark:shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              Send Enquiry
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 opacity-70 group-hover:opacity-100" />
            </span>
          </button>
        </Link>

        <Link href="https://cal.com/your-username/30min" target="_blank">
          <AnimatedButton className="group relative overflow-hidden rounded-lg 
            bg-linear-to-b from-white to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 
            border border-neutral-200 dark:border-neutral-800 
            text-neutral-800 dark:text-neutral-200 text-sm font-medium px-6 py-2.5 
            transition-all duration-300 
            hover:from-neutral-50 hover:to-neutral-100 dark:hover:from-neutral-800 dark:hover:to-neutral-800
            shadow-[0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)] 
            dark:shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] cursor-pointer">
            <span className="relative z-10 flex items-center gap-2">
              Book a call
              <Phone className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 opacity-70 group-hover:opacity-100" />
            </span>
          </AnimatedButton>
        </Link>
      </motion.div>
    </motion.div>
  );
}
