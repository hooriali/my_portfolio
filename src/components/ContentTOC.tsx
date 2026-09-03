import Reveal from "./Reveal";
import { useContent } from "@/context/ContentContext";
import { DotDoodle, LoopDoodle, PlusDoodle } from "./Doodle";

const spots = [
  "left-[10%] top-[14%]",
  "left-[27%] bottom-[6%]",
  "left-[45%] top-0",
  "left-[60%] bottom-[10%]",
  "right-[6%] top-[8%]",
];

export default function ContentTOC({ onOpen }: { onOpen: (id: number) => void }) {
  const { projects } = useContent();
  const featured = projects.filter((p) => p.featured !== false);

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-16 sm:py-24">
      {/* doodles */}
      <PlusDoodle className="pointer-events-none absolute left-[2%] top-[6%] hidden h-4 w-4 text-sand-deep/30 sm:block" />
      <DotDoodle className="pointer-events-none absolute right-[4%] bottom-[4%] h-2 w-2 bg-sand-deep/50" style={{ animation: "bob 2.2s ease-in-out infinite" }} />
      <LoopDoodle className="pointer-events-none absolute right-[10%] top-[2%] hidden h-8 w-8 text-sand/60 lg:block" />
      <Reveal>
        <div className="relative h-[240px] sm:h-[320px]">
          <h2 className="text-outline absolute inset-0 flex items-center justify-center font-display text-[19vw] font-extrabold leading-none tracking-tight sm:text-[13rem]">
            CONTENT
          </h2>
          {featured.map((p, i) => (
            <button
              key={p.id}
              onClick={() => onOpen(p.id)}
              title={`Open ${p.name}`}
              className={`group absolute z-10 font-display text-2xl font-bold text-sand transition-all duration-300 hover:scale-125 hover:text-sand-deep sm:text-4xl ${spots[i % spots.length]}`}
            >
              <span className="drop-shadow-sm">0{i + 1}</span>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-paper opacity-0 transition-opacity group-hover:opacity-100">
                {p.name}
              </span>
            </button>
          ))}
        </div>
      </Reveal>
      <p className="mt-2 text-center text-[11px] font-bold uppercase tracking-[0.3em] text-ink/40">
        tap a number to peek inside
      </p>
    </section>
  );
}
