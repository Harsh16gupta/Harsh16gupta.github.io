import type { Metadata } from "next";
import BlogClient from "@/components/blog-client";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tech articles, AI research notes, and engineering insights by Harsh Gupta (harsh16gupta).",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Harsh Gupta (harsh16gupta)",
    description:
      "Tech articles, AI research notes, and engineering insights by Harsh Gupta (harsh16gupta).",
    url: "https://harsh16gupta.github.io/blog",
  },
};

export default function BlogIndex() {
  return <BlogClient />;
}
