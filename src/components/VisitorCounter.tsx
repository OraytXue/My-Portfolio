"use client";

import { useEffect, useRef, useState } from "react";
import { Eye } from "lucide-react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch("/api/visit", { method: "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.uniqueVisitors != null) setCount(data.uniqueVisitors);
      })
      .catch(() => {
        // Fail silently — the counter is a nice-to-have, not critical.
      });
  }, []);

  if (count === null) return null;

  return (
    <p className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
      <Eye size={12} />
      {count.toLocaleString()} {count === 1 ? "visitor" : "visitors"}
    </p>
  );
}