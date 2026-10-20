"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  if (!mounted) {
    return <div className="w-[88px] h-8" />;
  }

  const options = [
    { value: "light", icon: Sun },
    { value: "system", icon: Monitor },
    { value: "dark", icon: Moon },
  ];

  return (
    <div className="flex items-center gap-1 border border-card-border rounded-full p-1">
      {options.map(({ value, icon: Icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`p-1.5 rounded-full transition-colors ${
            theme === value
              ? "bg-foreground text-background"
              : "text-muted hover:text-foreground"
          }`}
          aria-label={`${value} mode`}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  );
}
