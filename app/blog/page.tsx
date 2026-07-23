"use client";

import { useState, useEffect } from "react";
import Container from "@/components/containers";
import DisplacementText from "@/components/ui/displacement-text";

export default function BlogIndex() {
  const [fontSize, setFontSize] = useState(140);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 480) setFontSize(50);
      else if (window.innerWidth < 640) setFontSize(70);
      else if (window.innerWidth < 768) setFontSize(100);
      else setFontSize(140);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="relative flex min-h-screen justify-center font-sans overflow-hidden">
      <Container className="min-h-screen px-4 pt-20 sm:px-6 sm:pt-24 md:px-12 lg:px-20 pb-12 sm:pb-16 mx-auto flex flex-col justify-center items-center w-full">
        <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 relative overflow-hidden flex items-center justify-center -mt-10 sm:-mt-16 md:-mt-20">
          <DisplacementText
            text="COMING SOON"
            fontSize={fontSize}
            className="h-full w-full"
            lightColor="#171717"
            darkColor="#e5e5e5"
          />
        </div>
      </Container>
    </div>
  );
}
