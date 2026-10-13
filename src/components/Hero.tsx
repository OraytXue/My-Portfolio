export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-background text-foreground px-6">
      <div className="max-w-6xl mx-auto w-full pt-24">

        <div className="flex items-center gap-2 mb-8 font-mono text-xs uppercase tracking-widest text-muted">
          <span className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
          Available for work
        </div>

        <h1 className="font-mono text-5xl md:text-7xl font-medium leading-tight mb-6">
          Marc Justine
          <br />
          <span className="text-muted">Agra</span>
        </h1>

        <p className="font-mono text-sm uppercase tracking-widest text-muted mb-6">
          Web Developer — Taguig City, PH
        </p>

        <p className="text-foreground/80 max-w-xl leading-relaxed mb-10">
          I'm a fresh IT graduate and aspiring web developer passionate about
          building clean, functional, and user-friendly web applications.
          Currently seeking opportunities to grow my skills and contribute
          to meaningful projects.
        </p>

        <div className="flex flex-wrap gap-4 mb-16">
          <a
            href="#projects"
            className="px-6 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-card-border text-foreground font-mono text-xs uppercase tracking-widest hover:border-foreground transition-colors"
          >
            Get in Touch
          </a>
        </div>

        <div className="flex gap-12 font-mono">
          <div>
            <p className="text-3xl mb-1">1+</p>
            <p className="text-xs uppercase tracking-widest text-muted">Internship</p>
          </div>
          <div>
            <p className="text-3xl mb-1">1+</p>
            <p className="text-xs uppercase tracking-widest text-muted">Project</p>
          </div>
          <div>
            <p className="text-3xl mb-1">1</p>
            <p className="text-xs uppercase tracking-widest text-muted">Certification</p>
          </div>
        </div>

      </div>
    </section>
  );
}