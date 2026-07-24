import type { Metadata } from "next";
import Container from "@/components/containers";
import GithubGraph from "@/components/githubgraph";

export const metadata: Metadata = {
  title: "Proof of Work",
  description:
    "Open-source contributions, GitHub activity calendar, and pull requests by Harsh Gupta (harsh16gupta).",
  alternates: {
    canonical: "/proof-of-work",
  },
  openGraph: {
    title: "Proof of Work | Harsh Gupta (harsh16gupta)",
    description:
      "Open-source contributions, GitHub activity calendar, and pull requests by Harsh Gupta (harsh16gupta).",
    url: "https://harsh16gupta.github.io/proof-of-work",
  },
};

export default function ProofOfWorkPage() {
  return (
    <Container className="min-h-screen px-4 pt-20 sm:px-6 sm:pt-24 md:px-12 lg:px-20 pb-12 sm:pb-16 mx-auto">
      <div className="w-full mt-4">
        <GithubGraph showPRs={true} />
      </div>
    </Container>
  );
}
