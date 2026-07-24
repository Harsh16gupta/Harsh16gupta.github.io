import type { Metadata } from "next";
import Container from "@/components/containers";
import Projects from "@/components/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore projects, AI tools, and open-source contributions by Harsh Gupta (harsh16gupta) — featuring botforweb, Chess, and nimicode.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Harsh Gupta (harsh16gupta)",
    description:
      "Explore projects, AI tools, and open-source contributions by Harsh Gupta (harsh16gupta).",
    url: "https://harsh16gupta.github.io/projects",
  },
};

export default function ProjectsPage() {
  return (
    <Container className="min-h-screen px-4 pt-20 sm:px-6 sm:pt-24 md:px-12 lg:px-20 pb-12 sm:pb-16 mx-auto">
      <h1 className="text-neutral-900 dark:text-neutral-50 font-custom font-semibold text-2xl sm:text-3xl tracking-tight">
        <span className="link--elara">Projects</span>
      </h1>

      <p className="tracking-tight font-custom2 text-neutral-600 dark:text-neutral-400 max-w-lg text-xs sm:text-sm md:text-base mt-3 sm:mt-4">
        Hi there! I love building stuff for people and am passionate about contributing to open source. Here are my projects and open source contributions—feel free to take a look.
      </p>

      <div className="hidden md:block absolute right-6 w-212 h-px bg-(--pattern-fg) my-3 opacity-90 dark:opacity-15"></div>

      <Projects showAll={true}></Projects>

    </Container>
  );
}