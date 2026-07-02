"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface Snowflake {
    x: number;
    y: number;
    radius: number;
    opacity: number;
    phase: number;
    swaySpeed: number;
    fallSpeed: number;
}

export default function FractalTree() {
    const el = useRef<HTMLCanvasElement>(null);
    const { resolvedTheme } = useTheme();
    const [size, setSize] = useState({ width: 0, height: 0 });
    const mouseRef = useRef({ x: -1000, y: -1000, tx: -1000, ty: -1000, active: false });

    // Track window resize
    useEffect(() => {
        const updateSize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    // Track mouse coordinates
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.tx = e.clientX;
            mouseRef.current.ty = e.clientY;
            mouseRef.current.active = true;
        };
        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        };
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    useEffect(() => {
        const canvas = el.current;
        if (!canvas || size.width === 0 || size.height === 0) return;

        const ctx = canvas.getContext("2d")!;
        const dpr = window.devicePixelRatio || 1;
        // @ts-expect-error - vendor prefixes are not in the types
        const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
        const dpi = dpr / bsr;

        canvas.style.width = `${size.width}px`;
        canvas.style.height = `${size.height}px`;
        canvas.width = dpi * size.width;
        canvas.height = dpi * size.height;
        ctx.scale(dpi, dpi);

        // Adjust particle density based on screen size (subtle and calm)
        const snowflakeCount = size.width < 768 ? 40 : 80;
        
        const snowflakes: Snowflake[] = [];
        for (let i = 0; i < snowflakeCount; i++) {
            snowflakes.push({
                x: Math.random() * size.width,
                // Distribute vertically on initial load
                y: Math.random() * size.height,
                // Small subtle radii for background depth
                radius: 0.6 + Math.random() * 1.4,
                // Very faint opacities (8% to 22%)
                opacity: 0.08 + Math.random() * 0.14,
                // Unique sway phases and speeds
                phase: Math.random() * Math.PI * 2,
                swaySpeed: 0.0008 + Math.random() * 0.0012,
                // Slow vertical fall (0.15px to 0.4px per frame)
                fallSpeed: 0.15 + Math.random() * 0.25,
            });
        }

        let animationId: number;

        const render = () => {
            const time = performance.now();
            ctx.clearRect(0, 0, size.width, size.height);

            // Interpolate mouse coordinates smoothly (lerp)
            const mouse = mouseRef.current;
            if (mouse.active) {
                mouse.x += (mouse.tx - mouse.x) * 0.08;
                mouse.y += (mouse.ty - mouse.y) * 0.08;
            } else {
                mouse.x += (-1000 - mouse.x) * 0.08;
                mouse.y += (-1000 - mouse.y) * 0.08;
            }

            // Colors based on theme
            const isDark = resolvedTheme === "dark";
            const colorBase = isDark ? "245, 245, 245" : "130, 130, 130";

            snowflakes.forEach((p) => {
                // 1. Move vertically
                p.y += p.fallSpeed;

                // 2. Oscillating sway (horizontal)
                const sway = Math.sin(time * p.swaySpeed + p.phase) * 0.15;
                p.x += sway;

                // 3. Subtle mouse breeze displacement
                if (mouse.active) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const distSq = dx * dx + dy * dy;
                    const maxDist = 120;

                    if (distSq < maxDist * maxDist) {
                        const dist = Math.sqrt(distSq);
                        // Fades with distance, gently pushing particles horizontally
                        const force = (maxDist - dist) / maxDist * 0.35;
                        p.x += (dx > 0 ? 1 : -1) * force;
                    }
                }

                // 4. Wrap horizontally
                if (p.x < -10) {
                    p.x = size.width + 10;
                } else if (p.x > size.width + 10) {
                    p.x = -10;
                }

                // 5. Reset at bottom
                if (p.y > size.height + 10) {
                    p.y = -10;
                    p.x = Math.random() * size.width;
                }

                // 6. Draw snowflake
                ctx.fillStyle = `rgba(${colorBase}, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            animationId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [size, resolvedTheme]);

    const mask = "radial-gradient(circle, transparent, black)";

    return (
        <div
            className="fixed top-0 bottom-0 left-0 right-0 pointer-events-none print:hidden z-[-1]"
            style={{
                maskImage: mask,
                WebkitMaskImage: mask,
            }}
        >
            <canvas ref={el} />
        </div>
    );
}
