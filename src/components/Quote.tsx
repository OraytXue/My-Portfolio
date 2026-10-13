export default function Quote({ className = "" }: { className?: string }) {
  return (
    <section
      className={`relative overflow-hidden border border-card-border rounded-2xl px-6 py-12 md:py-16 text-center ${className}`}
    >
      {/* Decorative dot-grid background, faded toward the edges */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          maskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <p className="relative z-10 font-mono text-xl md:text-3xl leading-snug">
        Do It with <span className="text-muted">Passion</span>,
        <br className="hidden sm:block" /> Live it with <span className="text-muted">Purpose</span>.
      </p>
    </section>
  );
}