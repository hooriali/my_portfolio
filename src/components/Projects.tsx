import Reveal from "./Reveal";
import ProjectDevices from "./Mockups";
import { useContent } from "@/context/ContentContext";
import { DotDoodle, RingDoodle, SquiggleDoodle } from "./Doodle";

export default function Projects({ onOpen }: { onOpen: (id: number) => void }) {
  const { projects } = useContent();
  const featured = projects.filter((p) => p.featured !== false);
  const secondary = projects.filter((p) => p.featured === false);

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-5 pb-28 pt-4">
      {/* doodles */}
      <RingDoodle className="pointer-events-none absolute left-[1%] top-[2%] hidden h-10 w-10 text-sand-deep/25 lg:block" />
      <DotDoodle className="pointer-events-none absolute right-[2%] top-[6%] h-2.5 w-2.5 bg-sand" style={{ animation: "bob 2.8s ease-in-out infinite" }} />
      <SquiggleDoodle className="pointer-events-none absolute right-[6%] bottom-[4%] hidden h-6 w-12 text-sand-deep/30 sm:block" />
      <Reveal className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-sand-deep">Selected work</p>
          <h2 className="mt-1 font-display text-3xl font-extrabold sm:text-4xl">
            {featured.length} thing{featured.length === 1 ? "" : "s"} I’m proud of
          </h2>
        </div>
        <p className="hidden text-[11px] font-bold uppercase tracking-[0.25em] text-ink/40 sm:block">2023 — 2026</p>
      </Reveal>

      <div
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 lg:grid lg:overflow-visible lg:pb-0"
        style={{ gridTemplateColumns: `repeat(${Math.min(featured.length, 3) || 1}, minmax(0, 1fr))` }}
      >
        {featured.map((p, i) => (
          <Reveal key={p.id} delay={i * 90} className="min-w-[230px] snap-center lg:min-w-0">
            <button onClick={() => onOpen(p.id)} className="group block w-full text-left" aria-label={`Open ${p.name} case study`}>
              <div
                className="relative flex aspect-[3/4.15] flex-col justify-between overflow-hidden rounded-md p-4 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_28px_45px_-18px_rgba(23,21,15,0.4)]"
                style={{ background: p.color }}
              >
                {/* soft inner glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/15 blur-2xl transition-opacity duration-500 group-hover:opacity-80" />

                <div className="relative flex flex-1 items-center justify-center pt-3">
                  <ProjectDevices project={p} />
                </div>

                <span
                  className="relative font-display text-[5.5rem] font-extrabold leading-[0.8] text-white drop-shadow-sm"
                >
                  {i + 1}
                </span>

                <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                </span>
              </div>

              <div className="mt-3 pr-2">
                <p className="font-display text-[13px] font-extrabold uppercase tracking-[0.14em]">{p.name}</p>
                <p className="mt-0.5 text-[11px] font-semibold leading-snug text-ink/50">{p.tag}</p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {featured.length > 0 && (
        <p className="mt-6 text-center text-[11px] font-bold uppercase tracking-[0.28em] text-ink/40 lg:hidden">
          swipe to browse →
        </p>
      )}

      {secondary.length > 0 && (
        <Reveal delay={featured.length * 90 + 80} className="mt-14">
          <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.28em] text-ink/40">Also built</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {secondary.map((p) => (
              <button
                key={p.id}
                onClick={() => onOpen(p.id)}
                className="group flex items-center justify-between gap-3 rounded-lg border border-line bg-cream/40 px-4 py-3.5 text-left transition-colors hover:border-sand-deep hover:bg-cream"
              >
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-extrabold uppercase tracking-wide text-ink">{p.name}</p>
                  <p className="mt-0.5 truncate text-[11px] font-semibold text-ink/50">{p.tag}</p>
                </div>
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink/40 transition-all group-hover:translate-x-0.5 group-hover:text-ink"
                  style={{ background: `${p.color}22` }}
                >
                  <i className="fa-solid fa-arrow-right text-[11px]" />
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      )}
    </section>
  );
}

