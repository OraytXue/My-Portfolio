import {
  profile,
  skills,
  experience,
  projects,
  certifications,
  socials,
  goals,
} from "@/lib/profile";

// A lightweight, dependency-free "about me" assistant. It matches the
// visitor's message against a set of intents built from the same data
// shown on the page, so the chatbot works instantly without any external
// AI API key while still feeling conversational.

type Intent = {
  name: string;
  keywords: string[];
  respond: () => string;
};

function list(items: string[]) {
  return items.join(", ");
}

const intents: Intent[] = [
  {
    name: "greeting",
    keywords: ["hello", "hi", "hey", "kumusta", "kamusta", "good morning", "good afternoon", "good evening"],
    respond: () =>
      `Hi there! I'm ${profile.firstName}'s portfolio assistant. Ask me about his background, skills, experience, projects, certifications, or how to get in touch.`,
  },
  {
    name: "about",
    keywords: ["who are you", "about you", "about marc", "about yourself", "yourself", "introduce", "background", "who is marc", "who is he", "summary"],
    respond: () => profile.summary,
  },
  {
    name: "education",
    keywords: ["education", "school", "college", "degree", "study", "studied", "course", "university", "where did you study", "saan ka nag aral"],
    respond: () =>
      `${profile.education} He studied in ${profile.educationLocation} and is now based in ${profile.location}. He's also NC II certified in Computer Systems Servicing (CSS) from TESDA.`,
  },
  {
    name: "graduation",
    keywords: ["graduated", "graduate na", "when did you graduate", "finished school", "tapos na", "bsit", "already graduated", "done studying"],
    respond: () =>
      `Yes, Marc has already graduated — he's a ${profile.graduationStatus}. He's now looking for full-time, entry-level web development roles.`,
  },
  {
    name: "skills",
    keywords: ["skill", "tech stack", "technologies", "tools", "stack", "programming language", "what can you do", "what does he know", "expertise"],
    respond: () =>
      `${profile.firstName}'s toolkit includes ${list(skills)}. He's a frontend-focused web developer currently expanding into backend development.`,
  },
  {
    name: "experience",
    keywords: ["experience", "work history", "internship", "job", "worked", "career", "cp garcia", "insurance"],
    respond: () =>
      experience
        .map((item) => `• ${item.role} — ${item.company} (${item.year}): ${item.description}`)
        .join("\n"),
  },
  {
    name: "projects",
    keywords: [
      "project",
      "built",
      "portfolio piece",
      "work you've done",
      "sdg",
      "h&m",
      "hm",
      "steel",
      "glass",
      "inventory",
      "what have you made",
      "show me your work",
    ],
    respond: () =>
      projects.length
        ? projects.map((p) => `• ${p.title}: ${p.description}`).join("\n")
        : "He's currently working on new projects — check back soon!",
  },
  {
    name: "certifications",
    keywords: ["certificate", "certification", "certified", "tesda", "nc ii", "credential"],
    respond: () =>
      certifications
        .map((c) => `• ${c.title} — issued by ${c.issuer} (${c.year})`)
        .join("\n"),
  },
  {
    name: "contact",
    keywords: ["contact", "email", "reach", "get in touch", "hire", "connect", "message him", "phone", "number"],
    respond: () =>
      `You can reach ${profile.firstName} at ${profile.email}. He's based in ${profile.location} and ${profile.availability.toLowerCase()}.`,
  },
  {
    name: "socials",
    keywords: ["github", "linkedin", "facebook", "social", "social media", "link"],
    respond: () =>
      socials.map((s) => `• ${s.label}: ${s.href}`).join("\n"),
  },
  {
    name: "availability",
    keywords: ["available", "hiring", "open to work", "freelance", "looking for a job", "job hunting", "applying"],
    respond: () => `Yes — ${profile.availability.toLowerCase()}. Feel free to reach out at ${profile.email}.`,
  },
  {
    name: "goals",
    keywords: ["goal", "plan", "future", "aspiration", "aim"],
    respond: () => goals.map((g) => `• ${g}`).join("\n"),
  },
  {
    name: "location",
    keywords: ["where", "location", "based", "live", "city"],
    respond: () => `${profile.firstName} is based in ${profile.location}.`,
  },
  {
    name: "thanks",
    keywords: ["thank", "thanks", "salamat", "appreciate"],
    respond: () => "You're welcome! Let me know if there's anything else you'd like to know about Marc.",
  },
  {
    name: "bye",
    keywords: ["bye", "goodbye", "see you", "later"],
    respond: () => "Thanks for stopping by! Feel free to reach out anytime via the contact section.",
  },
];

const FALLBACK =
  "I'm not totally sure about that one. You can ask me about Marc's background, skills, experience, projects, certifications, availability, or how to contact him.";

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchesKeyword(message: string, keyword: string) {
  // Short, single-word keywords (e.g. "hi") need boundaries on both sides
  // so they don't accidentally match inside unrelated words ("this").
  // Longer keywords only need a left boundary so plurals/variants like
  // "skills" or "certified" still match "skill" / "certif...".
  const isShortSingleWord = !keyword.includes(" ") && keyword.length <= 4;
  const pattern = isShortSingleWord
    ? new RegExp(`\\b${escapeRegExp(keyword)}\\b`, "i")
    : new RegExp(`\\b${escapeRegExp(keyword)}`, "i");
  return pattern.test(message);
}

export function getChatReply(rawMessage: string): string {
  const message = rawMessage.toLowerCase().trim();

  if (!message) {
    return "Ask me anything about Marc — his skills, experience, projects, or how to get in touch!";
  }

  let bestIntent: Intent | null = null;
  let bestScore = 0;

  for (const intent of intents) {
    let score = 0;
    for (const keyword of intent.keywords) {
      if (matchesKeyword(message, keyword)) {
        score += keyword.split(" ").length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  if (bestIntent && bestScore > 0) {
    return bestIntent.respond();
  }

  return FALLBACK;
}