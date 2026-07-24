"use client";

import Container from "@/components/containers";
import { Github, Linkedin, Twitter } from "lucide-react";
import DisplacementText from "@/components/ui/displacement-text";
import { toast } from "sonner";
import { FlightButton } from "@/components/ui/flight-button";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";

export default function ContactClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [displacementFontSize, setDisplacementFontSize] = useState(300);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 480) setDisplacementFontSize(100);
      else if (window.innerWidth < 640) setDisplacementFontSize(140);
      else if (window.innerWidth < 768) setDisplacementFontSize(200);
      else setDisplacementFontSize(300);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const isFormValid = formData.name.trim() !== "" && formData.email.trim() !== "" && formData.message.trim() !== "";

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/harsh16official@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _captcha: "false",
          _subject: "New Enquiry from Portfolio",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success === "false") {
          toast.error(data.message || "Form submission failed. Please ensure the form is activated.");
        } else {
          toast.success("Message sent! I'll get back to you soon.");
          setFormData({ name: "", email: "", message: "" });
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen justify-center font-sans overflow-hidden">
      <Container className="min-h-screen px-4 pt-20 sm:px-6 sm:pt-24 md:px-12 lg:px-20 pb-12 sm:pb-16 mx-auto">

        <h1 className="text-neutral-900 dark:text-neutral-50 font-custom font-semibold text-2xl sm:text-3xl tracking-tight">
          <span className="link--elara">Contact</span>
        </h1>
        <p className="tracking-tight font-custom2 text-neutral-600 dark:text-neutral-400 max-w-lg text-xs sm:text-sm md:text-base mt-2 mb-8 sm:mb-12">
          Hi there — I’m currently open to meaningful work.
        </p>

        <div className="w-full max-w-2xl p-0 md:p-0 relative z-10">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* FormSubmit Configuration */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_subject" value="New Submission from Portfolio" />
            <input type="text" name="_honey" style={{ display: 'none' }} />

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 font-custom2">
                Full name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Tyler Durden"
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 focus:border-transparent outline-none transition-all font-custom2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 font-custom2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="tyler@projectmayhem.com"
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 focus:border-transparent outline-none transition-all font-custom2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 font-custom2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="You're crazy good, never change."
                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 focus:border-transparent outline-none transition-all font-custom2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 resize-none"
              />
            </div>

            <div className="flex justify-center w-full">
              <FlightButton type="submit" className="w-32" disabled={isSubmitting || !isFormValid} />
            </div>
          </form>

          <div className="mt-6 sm:mt-10 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs text-neutral-500 dark:text-neutral-400 font-custom2">
            <div className="flex items-center gap-2">
              <p>Harsh Gupta</p>
            </div>

            <div className="flex items-center gap-4">
              <a href="https://x.com/Harsh16Gupta" target="_blank" rel="noopener noreferrer">
                <Twitter size={14} className="hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/harsh-gupta---/" target="_blank" rel="noopener noreferrer">
                <Linkedin size={14} className="hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer transition-colors" />
              </a>
              <a href="https://github.com/Harsh16gupta" target="_blank" rel="noopener noreferrer">
                <Github size={14} className="hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 relative overflow-hidden flex items-center justify-center -mt-10 sm:-mt-16 md:-mt-20">
          <DisplacementText
            text="HARSH"
            fontSize={displacementFontSize}
            className="h-full w-full"
            lightColor="#171717"
            darkColor="#e5e5e5"
          />
        </div>

      </Container>
    </div>
  );
}
