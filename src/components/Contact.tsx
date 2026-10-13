"use client";

import { Code2, Briefcase, Users, Mail } from "lucide-react";
import { profile, socials, goals } from "@/lib/profile";
import { useActiveSection } from "./ActiveSectionProvider";

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  GitHub: Code2,
  LinkedIn: Briefcase,
  Facebook: Users,
};

export default function Contact({ className = "" }: { className?: string }) {
  const isActive = useActiveSection() === "contact";

  return (
    <section
      id="contact"
      className={`border rounded-2xl p-6 md:p-8 scroll-mt-24 transition-colors duration-300 ${
        isActive ? "border-foreground" : "border-card-border"
      } ${className}`}
    >
      <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
        06 — Contact
      </p>
      <h2 className="font-mono text-2xl md:text-3xl mb-8">Get in Touch</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="rounded-xl border border-card-border p-6 flex flex-col gap-4">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Social Links
          </p>
          <div className="flex flex-col gap-3">
            {socials.map((social) => {
              const Icon = socialIcons[social.label] ?? Mail;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors"
                >
                  <Icon size={14} />
                  {social.label}
                </a>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border border-card-border p-6 flex flex-col gap-4">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Contacts
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors break-all"
          >
            <Mail size={14} className="shrink-0" />
            {profile.email}
          </a>
        </div>

        <div className="rounded-xl border border-card-border p-6 flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Goals
          </p>
          <ul className="space-y-2">
            {goals.map((goal) => (
              <li key={goal} className="text-xs text-foreground/80 leading-relaxed">
                {goal}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}