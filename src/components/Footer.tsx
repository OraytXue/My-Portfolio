import VisitorCounter from "./VisitorCounter";

export default function Footer() {
  return (
    <footer className="px-4 md:px-6 pb-10">
      <div className="max-w-6xl mx-auto border-t border-card-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} Marc Justine Agra. All rights reserved.
        </p>
        <VisitorCounter />
      </div>
    </footer>
  );
}