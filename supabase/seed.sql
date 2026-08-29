-- ============================================================================
-- Seed data — migrates the content that already existed in
-- src/data/siteContent.ts and src/data/projects.ts into the database, so you
-- don't have to re-type your bio, experience, projects, etc. by hand.
--
-- Run this ONCE, after schema.sql, in the Supabase SQL Editor.
-- Re-running it will duplicate rows (except `profile`, which is a singleton
-- and uses upsert) — if you need to start over, truncate the tables first.
-- ============================================================================

insert into profile (id, name, role, bio, email, phone, github_url, github_handle, linkedin_url, linkedin_handle, website_url, website_label, location)
values (
  1,
  'Hooria Ali',
  'Software Developer',
  'Computer Science undergraduate with hands-on experience across full-stack development, applied AI, and mobile/UI testing — including retrieval-augmented generation systems, machine learning pipelines, and production-style web applications. I''m comfortable owning a project end-to-end: from ideation and prototyping to iterative testing and deployment, and I''m open to opportunities across software engineering — web, mobile, backend, or AI-driven work.',
  'alihooria6@gmail.com',
  '',
  'https://github.com/Hooriaali',
  'github.com/hooriaali',
  'https://www.linkedin.com/in/hooria-ali7',
  'linkedin.com/in/hooria-ali7',
  '#',
  'yourportfolio.dev',
  'Karachi, Pakistan'
)
on conflict (id) do update set
  name = excluded.name, role = excluded.role, bio = excluded.bio,
  email = excluded.email, phone = excluded.phone,
  github_url = excluded.github_url, github_handle = excluded.github_handle,
  linkedin_url = excluded.linkedin_url, linkedin_handle = excluded.linkedin_handle,
  website_url = excluded.website_url, website_label = excluded.website_label,
  location = excluded.location;

insert into skill_categories (category, items, sort_order) values
  ('Languages', array['Python','JavaScript','C++','SQL','HTML5','CSS3','ChromaDB','Java'], 0),
  ('AI / ML', array['RAG (Retrieval-Augmented Generation)','LLM Integration','WhatsApp Chatbots','API Handling'], 1),
  ('Frameworks', array['Flask','React','Streamlit','Bootstrap','REST APIs'], 2),
  ('Tools', array['Git / GitHub','SQLite','Supabase','UI / UX Testing','Debugging'], 3);

insert into experience (role, org, date, bullets, sort_order) values
  ('Backend AI Engineer Intern', 'Flyrank.ai', '2026 — Present',
   array['Developed backend AI features using Python & LLM APIs','Built scalable workflows for data processing and automation','Collaborated on API integration and feature implementation'], 0),
  ('Mobile App UI/UX Testing Intern', 'Imagination Apps', '2025 — Present',
   array['Evaluate mobile apps across devices and OS versions','Identify usability and interface-consistency issues','Validate responsiveness and interaction design against product specs'], 1),
  ('Front-End Developer Intern', 'CodeAlpha', '2025',
   array['Built responsive cross-browser web interfaces in React','Worked with distributed teams using Git-based version control','Contributed to debugging and UI implementation'], 2);

insert into education (school, program, degree, expected, cgpa, sort_order) values
  ('FAST National University of Computer and Emerging Sciences (NUCES)', 'Karachi', 'BS Computer Science', 'Expected Aug 2029', '3.195 / 4.00', 0);

insert into certifications (name, url, sort_order) values
  ('Python Essentials (Cisco Networking Academy)', '', 0),
  ('JavaScript Developer (freeCodeCamp)', '', 1),
  ('Freelancing (Digiskills)', '', 2),
  ('Graphic Design (Digiskills)', '', 3);

insert into projects (name, tag, color, deep, on_dark, devices, year, role, timeline, tools, overview, highlights, github, demo, featured, sort_order) values
  ('OppsNavigator', 'AI-powered scholarship matching platform', '#5b7cd9', '#3f5fc0', false, 'phones', '2025-2026', 'Full-Stack Developer & AI Engineer', 'Independent Project',
   array['Python','Flask','SQLAlchemy','JavaScript','Bootstrap'],
   'Built and independently deployed a full-stack platform matching students to scholarships via an AI-assisted eligibility checker and a 0–100 match-scoring algorithm. Complete with an admin dashboard, search, filtering, and deadline tracking.',
   array['AI eligibility checker with 0-100 match scoring algorithm','Admin dashboard with search, filter, and deadline management','Deployed end-to-end with Flask + SQLAlchemy backend'],
   'https://github.com/Hooriaali', '', true, 0),

  ('RAG Document Chatbot', 'Retrieval-augmented generation system', '#d8cfb8', '#b9ab8a', true, 'phone-tablet', '2026', 'AI Engineer', 'Project',
   array['Python','ChromaDB','Streamlit'],
   'Engineered a retrieval-augmented generation chatbot implementing three chunking strategies and two retrieval methods — dense vector search via ChromaDB plus sparse keyword search (BM25) — to benchmark retrieval quality at every step.',
   array['Three chunking strategies + BM25 + ChromaDB retrieval','Six retrieval configurations compared side-by-side in Streamlit UI','End-to-end pipeline: ingestion → chunking → embedding → indexing → querying'],
   'https://github.com/Hooriaali', '', true, 1),

  ('AI Study Pattern Analyzer', 'Predictive analytics for student behavior', '#9cba71', '#7d9c52', true, 'phones-alt', '2026', 'ML / Full-Stack Developer', 'Project',
   array['Python','Flask','SQLite','pandas','scikit-learn'],
   'Built a full-stack analytics platform that models student study behavior with a Random Forest classifier, turning historical performance data into predictive, actionable insights. Designed SQLite schema and Flask backend powering data ingestion and on-demand chart generation.',
   array['Random Forest classifier predicting study patterns from historical data','On-demand chart generation powered by Flask + SQLite schema design','End-to-end data pipeline: ingestion → processing → visualization'],
   'https://github.com/Hooriaali', '', true, 2),

  ('WhatsApp Chatbot Suite', 'Automated API-driven messaging assistant', '#e15a50', '#c23f36', false, 'laptop', '2026', 'Backend & Integration Developer', 'Concept & Prototype',
   array['Python','Baileys','LangChain','REST APIs'],
   'WhatsApp bot built with Baileys and LangChain, using retrieval-augmented generation and conversational memory to handle natural-language queries through a modular handler architecture.',
   array['Modular handler architecture for scalable conversation flows','RAG + conversational memory for context-aware replies','Built on Baileys (WhatsApp Web API) + LangChain'],
   'https://github.com/Hooriaali', '', false, 3),

  ('Responsive Web Portfolio', 'Modern front-end development showcase', '#7e97de', '#5f7ac9', false, 'phones', '2025', 'Frontend Developer Intern @ CodeAlpha', 'CodeAlpha Internship',
   array['HTML','CSS','JavaScript','React','Git'],
   'Built responsive cross-browser web interfaces in HTML, CSS, JavaScript, and React while interning at CodeAlpha. Translated design requirements into functional components, worked with distributed teams using Git-based version control, and contributed to debugging and UI implementation across sprint cycles.',
   array['Responsive cross-browser interfaces built from design specs','Distributed team collaboration via Git-based version control','Debugging and iterative UI implementation across sprints'],
   'https://github.com/Hooriaali', '', false, 4);
