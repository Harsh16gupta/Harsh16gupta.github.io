"use client";

import React from "react";
import {
    SiReact,
    SiJavascript,
    SiTypescript,
    SiNodedotjs,
    SiNextdotjs,
    SiPrisma,
    SiPostgresql,
    SiPython,
    SiDocker,
    SiKubernetes,
    SiGit,
    SiExpress,
    SiLangchain,
    SiGooglegemini,
    SiOpenai,
    SiClaude,
    SiMeta,
    SiFastapi,
    SiPytorch,
    SiHuggingface,
    SiRedis,
    SiChartdotjs,
} from "react-icons/si";
import { FaDatabase, FaAws, FaCode, FaSlidersH, FaTerminal } from "react-icons/fa";
import { Network, Search } from "lucide-react";

const skillCategories = [
    {
        title: "Applied AI & Agents",
        skills: [
            { name: "LangChain", icon: SiLangchain },
            { name: "LangGraph", icon: Network },
            { name: "RAG Pipelines", icon: Search },
            { name: "Agentic Workflows", icon: Network },
            { name: "Fine-Tuning & LoRA", icon: FaSlidersH },
            { name: "LLM Evaluation (Ragas)", icon: SiChartdotjs },
            { name: "Vector Search & pgvector", icon: FaDatabase },
            { name: "DSPy", icon: FaCode },
            { name: "Semantic Caching", icon: SiRedis },
            { name: "Structured Outputs", icon: FaTerminal },
            { name: "Gemini", icon: SiGooglegemini },
            { name: "Claude", icon: SiClaude },
            { name: "OpenAI", icon: SiOpenai },
            { name: "LLaMA", icon: SiMeta },
            { name: "Hugging Face", icon: SiHuggingface },
            { name: "PyTorch", icon: SiPytorch },
        ]
    },
    {
        title: "Core Development",
        skills: [
            { name: "Python", icon: SiPython },
            { name: "FastAPI", icon: SiFastapi },
            { name: "TypeScript", icon: SiTypescript },
            { name: "JavaScript", icon: SiJavascript },
            { name: "React", icon: SiReact },
            { name: "Next.js", icon: SiNextdotjs },
            { name: "Node.js", icon: SiNodedotjs },
            { name: "Express", icon: SiExpress },
        ]
    },
    {
        title: "DevOps & Infrastructure",
        skills: [
            { name: "PostgreSQL", icon: SiPostgresql },
            { name: "Prisma", icon: SiPrisma },
            { name: "Docker", icon: SiDocker },
            { name: "Kubernetes", icon: SiKubernetes },
            { name: "AWS", icon: FaAws },
            { name: "Git", icon: SiGit },
            { name: "C", icon: FaCode },
        ]
    }
];

export default function Skills() {
    return (
        <div className="w-full mt-4 relative">
            <div className="w-auto border-t border-dashed border-neutral-300 dark:border-neutral-800 mb-2 -mx-8 md:-mx-20"></div>
            <div className="flex flex-col items-start space-y-3">
                <h1 className="text-3xl md:text-3xl font-bold font-custom tracking-tight text-neutral-900 dark:text-neutral-50 py-2">
                    <span className="link--elara">Skills</span>
                </h1>
            </div>
            <div className="w-auto border-t border-dashed border-neutral-300 dark:border-neutral-800 mb-4 -mx-8 md:-mx-20"></div>

            <div className="flex flex-col items-start space-y-3">
                <p className="font-custom2 text-neutral-700 dark:text-neutral-300 mt-3 px-2 py-[7px] text-sm inline-block bg-neutral-100 dark:bg-neutral-900 border-dashed border-neutral-300 dark:border-neutral-700 border mb-6">
                    I love working with these technologies to build beautiful, functional, and intelligent applications.
                </p>

                <div className="w-full space-y-6">
                    {skillCategories.map((category) => (
                        <div key={category.title} className="space-y-2.5">
                            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-custom">
                                {category.title}
                            </h2>
                            <div className="flex flex-wrap items-center gap-2">
                                {category.skills.map((skill) => (
                                    <div
                                        key={skill.name}
                                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/50 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors cursor-default"
                                    >
                                        <skill.icon className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                                        <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
