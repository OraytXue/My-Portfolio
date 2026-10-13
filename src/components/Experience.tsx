"use client";

import { experience } from "@/lib/profile";
import { useActiveSection } from "./ActiveSectionProvider";

export default function Experience({ className = "" }: { className?: string }) {
  const isActive = useActiveSection() === "experience";

  return (
    <section
      id="experience"
      className={`border rounded-2xl p-6 md:p-8 scroll-mt-24 transition-colors duration-300 ${
        isActive ? "border-foreground" : "border-card-border"
      } ${className}`}
    >
      <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
        03 — Journey
      </p>
      <h2 className="font-mono text-2xl md:text-3xl mb-6">Experience</h2>

      <div className="relative border-l border-card-border pl-6 space-y-8">
        {experience.map((item, i) => (
          <div key={item.role} className="relative">
            <span
              className={`absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full ${
                i === 0 ? "bg-foreground" : "bg-background border border-foreground"
              }`}
            />
            <p className="font-mono text-[11px] text-muted mb-1">{item.year}</p>
            <h3 className="font-mono text-sm md:text-base mb-1">{item.role}</h3>
            <p className="text-xs md:text-sm text-muted mb-2">{item.company}</p>
            <p className="text-foreground/80 leading-relaxed text-xs md:text-sm">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}