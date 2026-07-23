"use client";

import React, { useState, useEffect } from "react";

export default function FightClub() {
    const rule7 = "Rule 7: Fights will go on as long as they have to.";
    const rule1 = "Rule 1: You do not talk about Fight Club.";
    const [text, setText] = useState(rule7);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let count = 0;
        const target = isHovered ? rule1 : rule7;
        
        // Matrix scramble effect
        const interval = setInterval(() => {
            setText(() => {
                return target
                    .split("")
                    .map((char, index) => {
                        if (index < count) return target[index];
                        if (char === " ") return " ";
                        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&-_+*";
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("");
            });
            count += 2;
            if (count >= target.length + 2) {
                clearInterval(interval);
                setText(target);
            }
        }, 25);

        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <div 
            className="w-full flex justify-center py-6 mt-4 select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className={`font-mono text-[8px] sm:text-[10px] md:text-[11px] tracking-wider sm:tracking-widest transition-all duration-300 cursor-default uppercase
                ${isHovered 
                    ? "text-pink-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)] font-semibold" 
                    : "text-neutral-400 dark:text-neutral-600 hover:text-neutral-600 dark:hover:text-neutral-400"
                }
            `}>
                {text}
            </span>
        </div>
    );
}
