export type DeviceKind = "phones" | "phone-tablet" | "laptop" | "phones-alt";

export interface Project {
  id: number;
  name: string;
  tag: string;
  color: string;
  deep: string;
  onDark: boolean;
  devices: DeviceKind;
  year: string;
  role: string;
  timeline: string;
  tools: string[];
  overview: string;
  highlights: string[];
  /** Link to the GitHub repo. Leave as "" to hide the button. */
  github?: string;
  /** Link to a live demo / deployed site. Leave as "" to hide the button. */
  demo?: string;
  /** Featured projects get the full case-study card; non-featured show as a smaller secondary mention. */
  featured?: boolean;
}

// NOTE (post-Supabase-migration): FALLBACK-ONLY. Live project data comes
// from the `projects` table in Supabase — this array is only used if that
// fetch fails or Supabase isn't configured, and it's the reference the SQL
// seed file (supabase/seed.sql) was generated from. Editing this file will
// NOT change what's live once Supabase is wired up. See README.md.
export const projects: Project[] = [
  {
    id: 1,
    name: "OppsNavigator",
    tag: "AI-powered scholarship matching platform",
    color: "#5b7cd9",
    deep: "#3f5fc0",
    onDark: false,
    devices: "phones",
    year: "2025-2026",
    role: "Full-Stack Developer & AI Engineer",
    timeline: "Independent Project",
    tools: ["Python", "Flask", "SQLAlchemy", "JavaScript", "Bootstrap"],
    overview:
      "Built and independently deployed a full-stack platform matching students to scholarships via an AI-assisted eligibility checker and a 0–100 match-scoring algorithm. Complete with an admin dashboard, search, filtering, and deadline tracking.",
    highlights: [
      "AI eligibility checker with 0-100 match scoring algorithm",
      "Admin dashboard with search, filter, and deadline management",
      "Deployed end-to-end with Flask + SQLAlchemy backend",
    ],
    github: "https://github.com/Hooriaali",
    demo: "",
    featured: true,
  },
  {
    id: 2,
    name: "RAG Document Chatbot",
    tag: "Retrieval-augmented generation system",
    color: "#d8cfb8",
    deep: "#b9ab8a",
    onDark: true,
    devices: "phone-tablet",
    year: "2026",
    role: "AI Engineer",
    timeline: "Project",
    tools: ["Python", "ChromaDB", "Streamlit"],
    overview:
      "Engineered a retrieval-augmented generation chatbot implementing three chunking strategies and two retrieval methods — dense vector search via ChromaDB plus sparse keyword search (BM25) — to benchmark retrieval quality at every step.",
    highlights: [
      "Three chunking strategies + BM25 + ChromaDB retrieval",
      "Six retrieval configurations compared side-by-side in Streamlit UI",
      "End-to-end pipeline: ingestion → chunking → embedding → indexing → querying",
    ],
    github: "https://github.com/Hooriaali",
    demo: "",
    featured: true,
  },
  {
    id: 3,
    name: "AI Study Pattern Analyzer",
    tag: "Predictive analytics for student behavior",
    color: "#9cba71",
    deep: "#7d9c52",
    onDark: true,
    devices: "phones-alt",
    year: "2026",
    role: "ML / Full-Stack Developer",
    timeline: "Project",
    tools: ["Python", "Flask", "SQLite", "pandas", "scikit-learn"],
    overview:
      "Built a full-stack analytics platform that models student study behavior with a Random Forest classifier, turning historical performance data into predictive, actionable insights. Designed SQLite schema and Flask backend powering data ingestion and on-demand chart generation.",
    highlights: [
      "Random Forest classifier predicting study patterns from historical data",
      "On-demand chart generation powered by Flask + SQLite schema design",
      "End-to-end data pipeline: ingestion → processing → visualization",
    ],
    github: "https://github.com/Hooriaali",
    demo: "",
    featured: true,
  },
  {
    id: 4,
    name: "WhatsApp Chatbot Suite",
    tag: "Automated API-driven messaging assistant",
    color: "#e15a50",
    deep: "#c23f36",
    onDark: false,
    devices: "laptop",
    year: "2026",
    role: "Backend & Integration Developer",
    timeline: "Concept & Prototype",
    tools: ["Python", "Baileys", "LangChain", "REST APIs"],
    overview:
      "WhatsApp bot built with Baileys and LangChain, using retrieval-augmented generation and conversational memory to handle natural-language queries through a modular handler architecture.",
    highlights: [
      "Modular handler architecture for scalable conversation flows",
      "RAG + conversational memory for context-aware replies",
      "Built on Baileys (WhatsApp Web API) + LangChain",
    ],
    github: "https://github.com/Hooriaali",
    demo: "",
    featured: false,
  },
  {
    id: 5,
    name: "Responsive Web Portfolio",
    tag: "Modern front-end development showcase",
    color: "#7e97de",
    deep: "#5f7ac9",
    onDark: false,
    devices: "phones",
    year: "2025",
    role: "Frontend Developer Intern @ CodeAlpha",
    timeline: "CodeAlpha Internship",
    tools: ["HTML", "CSS", "JavaScript", "React", "Git"],
    overview:
      "Built responsive cross-browser web interfaces in HTML, CSS, JavaScript, and React while interning at CodeAlpha. Translated design requirements into functional components, worked with distributed teams using Git-based version control, and contributed to debugging and UI implementation across sprint cycles.",
    highlights: [
      "Responsive cross-browser interfaces built from design specs",
      "Distributed team collaboration via Git-based version control",
      "Debugging and iterative UI implementation across sprints",
    ],
    github: "https://github.com/Hooriaali",
    demo: "",
    featured: false,
  },
];
