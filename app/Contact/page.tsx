import type { Metadata } from "next";
import ContactClient from "@/components/contact-client";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Harsh Gupta (harsh16gupta) — AI Engineer and Full-Stack Developer open for collaborations and opportunities.",
  alternates: {
    canonical: "/Contact",
  },
  openGraph: {
    title: "Contact | Harsh Gupta (harsh16gupta)",
    description:
      "Get in touch with Harsh Gupta (harsh16gupta) — AI Engineer and Full-Stack Developer.",
    url: "https://harsh16gupta.github.io/Contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
