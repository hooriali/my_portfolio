import { useEffect } from "react";
import { ArrowRight, CheckCircle2, ExternalLink, X } from "lucide-react";
import type { Project } from "@/data/projects";

interface Props {
  project: Project;
  index: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
}

export default function ProjectModal({ project, total, onClose, onNext }: Props) {
  // (add index to the destructure)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="max-h-[86vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-paper shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "fadeUp 0.35s cubic-bezier(0.22,1,0.36,1)" }}
      >
        {/* header */}
        <div className="relative overflow-hidden p-6 text-white sm:p-8" style={{ background: project.color }}>
          <span className="pointer-events-none absolute -right-2 -top-10 font-display text-[150px] font-extrabold leading-none text-white/15">
            {index + 1}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/30"
          >
            <X size={16} />
          </button>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80">
            Case 0{index + 1} — {project.year}
          </p>
          <h3 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">{project.name}</h3>
          <p className="mt-1 max-w-md text-sm font-semibold text-white/85">{project.tag}</p>

          {(project.github || project.demo) && (
            <div className="relative mt-4 flex flex-wrap gap-2.5">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/25"
                >
                  <i className="fa-brands fa-github text-[13px]" />
                  Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-ink transition-colors hover:bg-white/85"
                >
                  <ExternalLink size={13} />
                  Live demo
                </a>
              )}
            </div>
          )}
        </div>

        {/* body */}
        <div className="p-6 sm:p-8">
          <p className="text-[13.5px] leading-relaxed text-ink/70">{project.overview}</p>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              ["Role", project.role],
              ["Timeline", project.timeline],
              ["Tools", project.tools.join(" · ")],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-cream/70 p-3">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-sand-deep">{k}</p>
                <p className="mt-1 text-[12px] font-bold leading-snug">{v}</p>
              </div>
            ))}
          </div>

          <h4 className="mt-7 text-[11px] font-extrabold uppercase tracking-[0.28em]">Highlights</h4>
          <ul className="mt-3 space-y-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-[13px] font-semibold text-ink/75">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: project.deep }} />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
            <p className="text-[11px] font-semibold text-ink/40">0{index + 1} / 0{total}</p>
            <button
              onClick={onNext}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-paper transition-colors hover:bg-sand-deep"
            >
              Next project
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
