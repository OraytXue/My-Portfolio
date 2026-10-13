"use client";

import { useState } from "react";
import { BadgeCheck, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/lib/profile";
import ContactModal from "./ContactModal";
import AnimatedProfileImage from "./AnimatedProfileImage";

export default function ProfileHeader() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <section id="top" className="pt-28 md:pt-32 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="border border-card-border rounded-3xl p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
            <div className="flex items-center gap-5 md:gap-6">
              <AnimatedProfileImage />

              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h1 className="font-mono text-xl md:text-3xl font-medium">
                    {profile.name}
                  </h1>
                  <BadgeCheck size={18} className="text-foreground shrink-0" />
                </div>
                <p className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-muted mb-2">
                  <MapPin size={12} />
                  {profile.location}
                </p>
                <p className="text-sm text-foreground/80 mb-3">{profile.role}</p>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-card-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted hover:border-foreground hover:text-foreground transition-colors">
                  <Sparkles size={12} />
                  Vibe Coder
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-4 md:items-end">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
                <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
                Available for work
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <a
                  href="/resume/Marc_Justine_Agra_Resume.pdf"
                  download="Marc_Justine_Agra_Resume.pdf"
                  className="px-5 py-2.5 rounded-full bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
                >
                  Resume
                </a>
                <button
                  onClick={() => setContactOpen(true)}
                  className="px-5 py-2.5 rounded-full border border-card-border font-mono text-xs uppercase tracking-widest hover:border-foreground transition-colors"
                >
                  Send Email
                </button>
                <a
                  href="#contact"
                  className="px-5 py-2.5 rounded-full border border-card-border font-mono text-xs uppercase tracking-widest hover:border-foreground transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}