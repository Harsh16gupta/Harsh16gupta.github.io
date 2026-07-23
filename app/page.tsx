"use client";

import Container from "@/components/containers";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Timeline from "@/components/timeline";
import Skills from "@/components/skills";
import FightClub from "@/components/fight-club";

export default function Home() {
  return (
    <div className="relative flex min-h-screen justify-center font-sans overflow-hidden">
      <Container className="min-h-screen px-4 pt-8 sm:pt-12 md:pt-20 md:px-12 lg:px-20 pb-12 sm:pb-16 mx-auto">


        {/* Hero Section */}
        <Hero />

        <div className="w-auto border-t border-dashed border-neutral-300 dark:border-neutral-800 my-3 sm:my-4 -mx-4 sm:-mx-6 md:-mx-12 lg:-mx-20"></div>

        <Timeline />

        <div className="w-auto border-t border-dashed border-neutral-300 dark:border-neutral-800 my-3 sm:my-4 -mx-4 sm:-mx-6 md:-mx-12 lg:-mx-20"></div>

        {/* Projects Section */}
        <div id="projects" className="w-full mt-4">
          <h1 className="text-2xl sm:text-3xl font-bold font-custom tracking-tight text-neutral-950 dark:text-neutral-50 pb-2 mt-2">
            <span className="link--elara">Projects</span>
          </h1>
          <div className="w-auto border-t border-dashed border-neutral-300 dark:border-neutral-800 my-3 sm:my-4 -mx-4 sm:-mx-6 md:-mx-12 lg:-mx-20"></div>
          <Projects />
        </div>

        <Skills />

        <div className="w-auto border-t border-dashed border-neutral-300 dark:border-neutral-800 my-3 sm:my-4 -mx-4 sm:-mx-6 md:-mx-12 lg:-mx-20"></div>

        <FightClub />

      </Container>
    </div>
  );
}