"use client";

import { certifications } from "@/lib/profile";
import { useActiveSection } from "./ActiveSectionProvider";
import HorizontalScroller from "./HorizontalScroller";

export default function Certifications({ className = "" }: { className?: string }) {
  const isActive = useActiveSection() === "certifications";

  return (
    <section
      id="certifications"
      className={`border rounded-2xl p-6 md:p-8 scroll-mt-24 transition-colors duration-300 ${
        isActive ? "border-foreground" : "border-card-border"
      } ${className}`}
    >
      <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
        05 — Credentials
      </p>
      <h2 className="font-mono text-2xl md:text-3xl mb-6">Certifications</h2>

      <HorizontalScroller>
        {certifications.map((cert) => (
          <div
            key={cert.title}
            className="snap-start shrink-0 w-[260px] sm:w-[300px] flex flex-col justify-between gap-4 rounded-xl border border-card-border px-6 py-5 hover:border-foreground transition-colors"
          >
            <div>
              <h3 className="font-mono text-sm md:text-base mb-1">{cert.title}</h3>
              <p className="text-xs text-muted">{cert.issuer}</p>
            </div>
            <span className="font-mono text-xs text-muted">{cert.year}</span>
          </div>
        ))}
      </HorizontalScroller>
    </section>
  );
}