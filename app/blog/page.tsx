"use client";

import Container from "@/components/containers";
import DisplacementText from "@/components/ui/displacement-text";

export default function BlogIndex() {
  return (
    <div className="relative flex min-h-screen justify-center font-sans overflow-hidden">
      <Container className="min-h-screen px-8 pt-24 md:px-20 pb-16 mx-auto flex flex-col justify-center items-center w-full">
        <div className="w-full h-96 relative overflow-hidden flex items-center justify-center -mt-20">
          <DisplacementText
            text="COMING SOON"
            fontSize={140}
            className="h-full w-full"
            lightColor="#171717"
            darkColor="#e5e5e5"
          />
        </div>
      </Container>
    </div>
  );
}
