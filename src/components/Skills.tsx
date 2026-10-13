"use client";

import { skills } from "@/lib/profile";
import { skillIcons } from "@/lib/Skillcons";
import { useActiveSection } from "./ActiveSectionProvider";

export default function Skills({ className = "" }: { className?: string }) {
  const isActive = useActiveSection() === "skills";

  // Duplicate the list so the marquee can loop seamlessly.
  const marqueeSkills = [...skills, ...skills];

  return (
    <section
      id="skills"
      className={`border rounded-2xl p-6 md:p-8 scroll-mt-24 transition-colors duration-300 overflow-hidden ${
        isActive ? "border-foreground" : "border-card-border"
      } ${className}`}
    >
      <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
        02 — Toolkit
      </p>
      <h2 className="font-mono text-2xl md:text-3xl mb-6">Tools &amp; Technologies</h2>

      <div className="relative overflow-hidden">
        <div className="flex w-max gap-4 animate-marquee">
          {marqueeSkills.map((skill, i) => {
            const Icon = skillIcons[skill];
            return (
              <div
                key={`${skill}-${i}`}
                className="flex flex-col items-center justify-center gap-2 rounded-xl border border-card-border px-6 py-5 min-w-[110px] shrink-0 text-foreground/80 hover:border-foreground hover:text-foreground transition-colors"
              >
                {Icon && <Icon size={28} />}
                <span className="font-mono text-[10px] md:text-xs text-center whitespace-nowrap">
                  {skill}
                </span>
              </div>
            );
          })}
        </div>

        {/* fade edges so the scroll looks seamless against the card */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}