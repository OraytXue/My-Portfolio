"use client";

import Image from "next/image";
import { projects } from "@/lib/profile";
import { useActiveSection } from "./ActiveSectionProvider";

export default function Projects({ className = "" }: { className?: string }) {
  const isActive = useActiveSection() === "projects";

  return (
    <section
      id="projects"
      className={`border rounded-2xl p-6 md:p-8 scroll-mt-24 transition-colors duration-300 ${
        isActive ? "border-foreground" : "border-card-border"
      } ${className}`}
    >
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
            04 — Work
          </p>
          <h2 className="font-mono text-2xl md:text-3xl">Projects</h2>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            className="group rounded-xl border border-card-border overflow-hidden flex flex-col hover:border-foreground transition-colors"
          >
            {project.image && (
              <div className="relative w-full aspect-video bg-very-light-gray overflow-hidden border-b border-card-border">
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-mono text-base mb-2 group-hover:underline">
                  {project.title}
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </a>
        ))}

        <div className="rounded-xl border border-dashed border-card-border p-5 flex flex-col items-start justify-center gap-2 text-muted min-h-[220px]">
          <p className="font-mono text-sm">More on the way</p>
          <p className="text-xs leading-relaxed">
            New projects are currently in progress — check back soon.
          </p>
        </div>
      </div>
    </section>
  );
}