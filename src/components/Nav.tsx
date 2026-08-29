import { useEffect, useState } from "react";
import { ArrowUpRight, Settings } from "lucide-react";
import { cn } from "@/utils/cn";
import { useContent } from "@/context/ContentContext";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
];

export default function Nav({ onOpenAdmin }: { onOpenAdmin: () => void }) {
  const { content } = useContent();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = content.name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .toLowerCase();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "border-b border-line bg-paper/85 py-3 backdrop-blur-md" : "py-5",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <a href="#top" className="font-display text-xl font-extrabold tracking-tight">
          {initials}
          <span className="text-sand-deep">.</span>
          <span className="ml-1 align-super font-body text-[10px] font-bold tracking-widest text-sand-deep">
            &#39;26
          </span>
        </a>
        <nav className="hidden items-center gap-7 sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-xs font-bold uppercase tracking-[0.18em] text-ink/70 transition-colors hover:text-ink"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-sand-deep transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAdmin}
            aria-label="Edit site content"
            title="Edit site content"
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink/35 transition-colors hover:bg-cream hover:text-ink"
          >
            <Settings size={15} />
          </button>
          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-bold uppercase tracking-widest text-paper transition-transform hover:-translate-y-0.5 hover:bg-sand-deep"
          >
            Say hi
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
