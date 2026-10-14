// Single source of truth for Marc Justine Agra's portfolio content.
// Shared by the UI components and the about-me chatbot API route so
// answers always stay in sync with what's displayed on the page.

export const profile = {
  name: "Marc Justine Agra",
  firstName: "Marc",
  role: "Web Developer",
  location: "Taguig City, Philippines",
  educationLocation: "Pangasinan, Philippines",
  email: "01marcjustine@gmail.com",
  graduationStatus: "BSIT graduate (2025)",
  availability: "Open to full-time, entry-level web development opportunities",
  summary:
    "I'm a Bachelor of Science in Information Technology graduate from Pangasinan, Philippines, now based in Taguig City. I have hands-on experience as a Technical and Administrative Intern at CP Garcia Insurance Agency, Inc., where I supported both technical and clerical operations. I enjoy building clean, functional, and user-friendly web applications, and I'm currently expanding my skills in frontend and backend development. I'm also NC II certified in Computer Systems Servicing (CSS), with a solid foundation in both hardware and software fundamentals. I'm actively looking for full-time opportunities to grow as a developer, collaborate with teams, and contribute to meaningful, real-world projects.",
  education: "Bachelor of Science in Information Technology (BSIT) graduate.",
  stats: [
    { label: "Internship", value: "1+" },
    { label: "Project", value: "1+" },
    { label: "Certification", value: "1" },
  ],
};

export const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "PHP",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "MySQL",
  "Git",
  "GitHub",
  "Figma",
  "Vercel",
];

export const experience = [
  {
    role: "Technical and Administrative Intern",
    company: "CP Garcia Insurance Agency, Inc.",
    description:
      "Provided technical support and assisted with administrative and clerical operations, gaining hands-on experience in a professional office environment.",
    year: "2025",
  },
  {
    role: "Web-Based SDG Awareness System",
    company: "Capstone / School Project",
    description:
      "Developed a web-based system to promote awareness of the United Nations Sustainable Development Goals (SDGs) among students.",
    year: "2025",
  },
  {
    role: "NC II — Computer Systems Servicing (CSS)",
    company: "TESDA Certification",
    description:
      "Earned a National Certificate II in Computer Systems Servicing, covering hardware installation, configuration, and troubleshooting.",
    year: "2024",
  },
];

export const projects = [
  {
    title: "SDGPhilCST",
    description: "Campus sustainability awareness.",
    image: "/images/sdg.png",
    link: "https://sdgphilcst.great-site.net/",
  },
];

export const certifications = [
  {
    title: "NC II — Computer Systems Servicing (CSS)",
    issuer: "TESDA",
    year: "2024",
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/OraytXue" },
  { label: "LinkedIn", href: "https://linkedin.com/in/marc-justine-agra" },
  { label: "Facebook", href: "https://facebook.com/" },
];

export const goals = [
  "Grow as a developer through continuous learning and hands-on experience.",
  "Collaborate with teams and contribute to meaningful, real-world projects.",
  "Strengthen full-stack skills across both frontend and backend development.",
];