export interface ContactInfo {
  email: string;
  phone: string;
  githubUrl: string;
  githubHandle: string;
  linkedinUrl: string;
  linkedinHandle: string;
  websiteUrl: string;
  websiteLabel: string;
  location: string;
}

export interface ExperienceItem {
  role: string;
  org: string;
  date: string;
  bullets: string[];
}

export interface EducationInfo {
  school: string;
  program: string;
  degree: string;
  expected: string;
  cgpa: string;
}

export interface CertificationItem {
  name: string;
  /** Link to the certificate (Coursera/Cisco/etc). Leave "" to hide the button. */
  url: string;
}

export interface SiteContent {
  name: string;
  role: string;
  bio: string;
  contact: ContactInfo;
  skills: Record<string, string[]>;
  experience: ExperienceItem[];
  certifications: CertificationItem[];
  education: EducationInfo[];
  /** Supabase Storage public URL. Falls back to the bundled avatar.jpg if unset. */
  avatarUrl?: string;
  /** Supabase Storage public URL. Falls back to the bundled badge-photo.jpg if unset. */
  badgePhotoUrl?: string;
}

// NOTE (post-Supabase-migration): this is now FALLBACK-ONLY data — it's used
// if the Supabase fetch fails or Supabase isn't configured yet (e.g. local
// dev without a .env file), and it's the reference the SQL seed file
// (supabase/seed.sql) was generated from. In production, the live portfolio
// content comes from the database, not this file — editing this file will
// NOT change what's live once Supabase is wired up. See README.md.
export const defaultSiteContent: SiteContent = {
  name: "Hooria Ali",
  role: "Software Developer",
  bio: "Computer Science undergraduate with hands-on experience across full-stack development, applied AI, and mobile/UI testing — including retrieval-augmented generation systems, machine learning pipelines, and production-style web applications. I'm comfortable owning a project end-to-end: from ideation and prototyping to iterative testing and deployment, and I'm open to opportunities across software engineering — web, mobile, backend, or AI-driven work.",
  contact: {
    email: "alihooria6@gmail.com",
    phone: "",
    githubUrl: "https://github.com/Hooriaali",
    githubHandle: "github.com/hooriaali",
    linkedinUrl: "https://www.linkedin.com/in/hooria-ali7",
    linkedinHandle: "linkedin.com/in/hooria-ali7",
    websiteUrl: "#",
    websiteLabel: "yourportfolio.dev",
    location: "Karachi, Pakistan",
  },
  skills: {
    Languages: ["Python", "JavaScript", "C++", "SQL", "HTML5", "CSS3", "ChromaDB", "Java"],
    "AI / ML": ["RAG (Retrieval-Augmented Generation)", "LLM Integration", "WhatsApp Chatbots", "API Handling"],
    Frameworks: ["Flask", "React", "Streamlit", "Bootstrap", "REST APIs"],
    Tools: ["Git / GitHub", "SQLite", "Supabase", "UI / UX Testing", "Debugging"],
  },
  experience: [
    {
      role: "Backend AI Engineer Intern",
      org: "Flyrank.ai",
      date: "2026 — Present",
      bullets: [
        "Developed backend AI features using Python & LLM APIs",
        "Built scalable workflows for data processing and automation",
        "Collaborated on API integration and feature implementation",
      ],
    },
    {
      role: "Mobile App UI/UX Testing Intern",
      org: "Imagination Apps",
      date: "2025 — Present",
      bullets: [
        "Evaluate mobile apps across devices and OS versions",
        "Identify usability and interface-consistency issues",
        "Validate responsiveness and interaction design against product specs",
      ],
    },
    {
      role: "Front-End Developer Intern",
      org: "CodeAlpha",
      date: "2025",
      bullets: [
        "Built responsive cross-browser web interfaces in React",
        "Worked with distributed teams using Git-based version control",
        "Contributed to debugging and UI implementation",
      ],
    },
  ],
  certifications: [
    { name: "Python Essentials (Cisco Networking Academy)", url: "" },
    { name: "JavaScript Developer (freeCodeCamp)", url: "" },
    { name: "Freelancing (Digiskills)", url: "" },
    { name: "Graphic Design (Digiskills)", url: "" },
  ],
  education: [
    {
      school: "FAST National University of Computer and Emerging Sciences (NUCES)",
      program: "Karachi",
      degree: "BS Computer Science",
      expected: "Expected Aug 2029",
      cgpa: "3.195 / 4.00",
    },
  ],
};
