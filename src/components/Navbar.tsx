"use client";

import ThemeToggle from "./ThemeToggle";
import { useActiveSection, useSetActiveSection } from "./ActiveSectionProvider";

const links = [
  { href: "#about", label: "About", id: "about" },
  { href: "#skills", label: "Tools", id: "skills" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#certifications", label: "Certs", id: "certifications" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export default function Navbar() {
  const activeSection = useActiveSection();
  const setActiveSection = useSetActiveSection();

  return (
    <nav className="fixed top-0 w-full z-40 border-b border-card-border bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">
        <a href="#top" className="font-mono text-sm tracking-tight text-foreground">
          Marc Justine Agra
        </a>

        <div className="flex items-center gap-6 md:gap-8">
          <ul className="hidden md:flex gap-7 font-mono text-xs uppercase tracking-widest text-muted">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setActiveSection(link.id)}
                  className={`transition-colors ${
                    activeSection === link.id
                      ? "text-foreground font-medium"
                      : "hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}