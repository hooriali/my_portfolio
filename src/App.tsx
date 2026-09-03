import { useCallback, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import ContentTOC from "./components/ContentTOC";
import Projects from "./components/Projects";
import ProjectModal from "./components/ProjectModal";
import AdminPanel from "./components/AdminPanel";
import Footer from "./components/Footer";
import { ContentProvider, useContent } from "./context/ContentContext";
import { AuthProvider } from "./context/AuthContext";

function Marquee() {
  const items = ["UI / UX Design", "Interaction Design", "Graphic Design", "Design Research", "Prototyping", "Visual Systems"];
  const row = [...items, ...items];
  return (
    <div className="relative -rotate-1 overflow-hidden border-y-2 border-ink bg-sand py-3">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-ink">
            {t}
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 0l1.6 4.4L12 6 7.6 7.6 6 12 4.4 7.6 0 6l4.4-1.6z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

function Page() {
  const { projects } = useContent();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);

  const open = useCallback((id: number) => {
    setSelectedId(id);
  }, []);

  const next = useCallback(() => {
    setSelectedId((cur) => {
      if (cur === null || projects.length === 0) return projects[0]?.id ?? null;
      const idx = projects.findIndex((p) => p.id === cur);
      return projects[(idx + 1) % projects.length].id;
    });
  }, [projects]);

  const selected = projects.find((p) => p.id === selectedId) ?? null;
  const selectedIndex = projects.findIndex((p) => p.id === selectedId);

  return (
    <div className="relative">
      <Nav onOpenAdmin={() => setAdminOpen(true)} />
      <main>
        <Hero />
        <About />
        <Marquee />
        <ContentTOC onOpen={open} />
        <Projects onOpen={open} />
      </main>
      <Footer />
      {selected && <ProjectModal project={selected} index={selectedIndex} total={projects.length} onClose={...} onNext={next} />}
      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <AuthProvider>
        <Page />
      </AuthProvider>
    </ContentProvider>
  );
}
