"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

const SECTION_IDS = [
  "about",
  "skills",
  "experience",
  "projects",
  "certifications",
  "contact",
];

type ActiveSectionContextValue = {
  activeSection: string;
  setActiveSection: (id: string) => void;
};

const ActiveSectionContext = createContext<ActiveSectionContextValue>({
  activeSection: "",
  setActiveSection: () => {},
});

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSectionState] = useState("");
  const ratios = useRef<Record<string, number>>({});
  const overrideUntil = useRef<number>(0);

  // Called when the user clicks a nav link — takes priority over scroll detection
  const setActiveSection = useCallback((id: string) => {
    overrideUntil.current = Date.now() + 1000; // lock for 1s while smooth-scroll happens
    setActiveSectionState(id);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.current[entry.target.id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        });

        // Skip scroll-based updates while a manual click is still "in control"
        if (Date.now() < overrideUntil.current) return;

        let bestId = "";
        let bestRatio = 0;

        for (const id of SECTION_IDS) {
          const ratio = ratios.current[id] || 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId) setActiveSectionState(bestId);
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i / 20),
        rootMargin: "-80px 0px 0px 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  return useContext(ActiveSectionContext).activeSection;
}

export function useSetActiveSection() {
  return useContext(ActiveSectionContext).setActiveSection;
}