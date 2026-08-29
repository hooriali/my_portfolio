import { useState } from "react";
import { ArrowUp, Check, Copy } from "lucide-react";
import Reveal from "./Reveal";
import { useContent } from "@/context/ContentContext";
import { DotDoodle, PlusDoodle, SparkDoodle } from "./Doodle";

export default function Footer() {
  const { content } = useContent();
  const { contact, name } = content;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(#fdfcf8 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
      {/* doodles */}
      <SparkDoodle className="pointer-events-none absolute right-[8%] top-[8%] h-5 w-5 text-sand/50" style={{ animation: "float 4.2s ease-in-out infinite" }} />
      <PlusDoodle className="pointer-events-none absolute left-[6%] bottom-[14%] hidden h-4 w-4 text-sand/30 sm:block" />
      <DotDoodle className="pointer-events-none absolute right-[16%] bottom-[10%] hidden h-2 w-2 bg-sand/50 lg:block" style={{ animation: "bob 2.5s ease-in-out infinite" }} />
      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:py-28">
        <Reveal>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-sand">Excited about engineering together?</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-extrabold leading-[1.02] sm:text-6xl">
            Let's build something{" "}
            <span className="relative inline-block text-sand">
              impactful
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                <path d="M3 8 C 50 2, 150 2, 197 7" stroke="#c6b189" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h2>
          <p className="mt-4 max-w-lg text-sm text-paper/60 leading-relaxed">
            Based in {contact.location} • BS CS at FAST NUCES (Class of '29)
            <br />Open to software engineering opportunities — web, mobile, backend, or AI
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={copy}
            className="group inline-flex items-center gap-2.5 rounded-full bg-paper px-6 py-3.5 text-sm font-extrabold text-ink transition-all hover:-translate-y-0.5 hover:bg-sand"
          >
            {copied ? <Check size={16} className="text-sand-deep" /> : <Copy size={15} />}
            {copied ? "Copied!" : contact.email}
          </button>
          <div className="flex gap-3">
            {[
              { icon: "fa-brands fa-github", href: contact.githubUrl, label: "GitHub" },
              { icon: "fa-brands fa-linkedin-in", href: contact.linkedinUrl, label: "LinkedIn" },
              { icon: "fa-solid fa-envelope", href: `mailto:${contact.email}`, label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/25 text-sm transition-all hover:-translate-y-1 hover:border-sand hover:bg-sand hover:text-ink"
              >
                <i className={s.icon} />
              </a>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-6 text-[11px] font-semibold text-paper/45">
          <p>© 2026 {name} — Built with Python ☕ & JavaScript ⚡</p>
          <a href="#top" className="group inline-flex items-center gap-2 uppercase tracking-[0.25em] transition-colors hover:text-sand">
            Back to top
            <ArrowUp size={13} className="transition-transform group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </footer>
  );
}
