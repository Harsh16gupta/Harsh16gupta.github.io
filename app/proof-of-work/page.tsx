"use client";

import Container from "@/components/containers";
import GithubGraph from "@/components/githubgraph";

export default function ProofOfWorkPage() {
  return (
    <Container className="min-h-screen px-4 pt-20 sm:px-6 sm:pt-24 md:px-12 lg:px-20 pb-12 sm:pb-16 mx-auto">



      <div className="w-full mt-4">
        <GithubGraph showPRs={true} />
      </div>

    </Container>
  );
}
