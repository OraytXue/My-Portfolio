"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  // React 19 warns about the inline no-flash <script> that next-themes
  // renders when it re-renders on the client. Server-side it still needs
  // a real executable script type to prevent theme flicker; on the client
  // we switch its type to a non-executable one so React treats it as a
  // harmless data block instead of warning.
  const scriptProps =
    typeof window === "undefined"
      ? undefined
      : ({ type: "application/json" } as const);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      scriptProps={scriptProps}
    >
      {children}
    </NextThemesProvider>
  );
}