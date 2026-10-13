import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiPhp,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiMysql,
  SiGit,
  SiGithub,
  SiFigma,
  SiVercel,
} from "react-icons/si";
import { Code2 } from "lucide-react";
import type { IconType } from "react-icons";

export const skillIcons: Record<string, IconType> = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  PHP: SiPhp,
  React: SiReact,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "Tailwind CSS": SiTailwindcss,
  MySQL: SiMysql,
  Git: SiGit,
  GitHub: SiGithub,
  "VS Code": Code2, // no official simple-icons export available
  Figma: SiFigma,
  Vercel: SiVercel,
};