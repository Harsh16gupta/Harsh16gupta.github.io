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
      <Container className="min-h-[200vh] px-8 pt-24 md:pt-28 md:px-20 md:pb-10 mx-auto ">


        {/* Hero Section */}
        <Hero />

        <div className="w-auto border-t border-dashed border-neutral-300 dark:border-neutral-800 my-4 -mx-8 md:-mx-20"></div>

        <Timeline />

        <div className="w-auto border-t border-dashed border-neutral-300 dark:border-neutral-800 my-4 -mx-8 md:-mx-20"></div>

        {/* Projects Section */}
        <div id="projects" className="w-full">
          <Projects />
        </div>

        <Skills />

        <div className="w-auto border-t border-dashed border-neutral-300 dark:border-neutral-800 my-4 -mx-8 md:-mx-20"></div>

        <FightClub />

      </Container>
    </div>
  );
}