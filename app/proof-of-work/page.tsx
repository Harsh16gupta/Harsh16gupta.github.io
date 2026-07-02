"use client";

import Container from "@/components/containers";
import GithubGraph from "@/components/githubgraph";

export default function ProofOfWorkPage() {
  return (
    <Container className="min-h-screen px-8 pt-24 md:px-20 pb-16 mx-auto">



      <div className="w-full mt-4">
        <GithubGraph showPRs={true} />
      </div>

    </Container>
  );
}
