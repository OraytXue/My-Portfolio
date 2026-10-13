"use client";

import { profile } from "@/lib/profile";
import { useActiveSection } from "./ActiveSectionProvider";

export default function About({ className = "" }: { className?: string }) {
  const isActive = useActiveSection() === "about";

  return (
    <section
      id="about"
      className={`border rounded-2xl p-6 md:p-8 scroll-mt-24 transition-colors duration-300 ${
        isActive ? "border-foreground" : "border-card-border"
      } ${className}`}
    >
      <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
        01 — Introduction
      </p>
      <h2 className="font-mono text-2xl md:text-3xl mb-5">About Me</h2>

      <div className="space-y-4">
        <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
          I&apos;m <span className="text-foreground font-medium">{profile.name}</span>, a
          Bachelor of Science in Information Technology graduate from {profile.educationLocation},
          now based in {profile.location}. I have hands-on experience as a Technical and
          Administrative Intern at CP Garcia Insurance Agency, Inc., where I supported both
          technical and clerical operations.
        </p>
        <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
          I enjoy building clean, functional, and user-friendly web applications, and
          I&apos;m currently expanding my skills in frontend and backend development.
          I&apos;m also NC II certified in Computer Systems Servicing (CSS), with a
          solid foundation in both hardware and software fundamentals.
        </p>
        <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
          I&apos;m actively looking for opportunities to grow as a developer,
          collaborate with teams, and contribute to meaningful, real-world projects.
        </p>
      </div>
    </section>
  );
}