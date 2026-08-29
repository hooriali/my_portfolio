import { Plus, Sparkles, Star } from "lucide-react";
import defaultAvatar from "@/assets/avatar.jpg";
import { useContent } from "@/context/ContentContext";
import { RingDoodle, SparkDoodle, SquiggleDoodle } from "./Doodle";

const letters: { ch: string; r: number; y: number }[] = [
  { ch: "P", r: -8, y: 6 },
  { ch: "O", r: 7, y: 26 },
  { ch: "R", r: -4, y: 0 },
  { ch: "T", r: 9, y: -8 },
  { ch: "F", r: -7, y: 12 },
  { ch: "O", r: 6, y: -4 },
  { ch: "L", r: -10, y: 20 },
  { ch: "I", r: 8, y: -2 },
  { ch: "O", r: -6, y: 10 },
];

export default function Hero() {
  const { content } = useContent();

  return (
    <section id="top" className="relative flex min-h-svh flex-col items-center justify-center px-4 pt-20 pb-16">
      {/* ambient glows — allowed to bleed past the section edge so the fade
          into About is soft instead of getting clipped into a hard line.
          Hero deliberately has no overflow-x/-y of its own: html already
          owns overflow-x:hidden site-wide (see index.css), and giving Hero
          its own overflow-x rule is what previously turned it into an
          independently-scrollable box — see git history / past bug. */}
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-sand/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-cream blur-3xl" />

      {/* doodles */}
      <Sparkles className="absolute left-[12%] top-[22%] h-5 w-5 text-sand-deep/70 animate-spin-slow" strokeWidth={2.5} />
      <SquiggleDoodle className="absolute right-[14%] top-[55%] hidden h-8 w-16 text-sand-deep/60 sm:block" />
      <div className="absolute bottom-[24%] left-[16%] h-3 w-3 rotate-12 rounded-sm bg-sand" />

      {/* extra doodles */}
      <Star
        className="absolute right-[10%] bottom-[20%] hidden h-4 w-4 text-sand-deep/50 sm:block"
        strokeWidth={2.5}
        style={{ animation: "float 4.5s ease-in-out 0.3s infinite" }}
      />
      <Plus className="absolute left-[8%] bottom-[14%] hidden h-4 w-4 text-sand-deep/40 sm:block" strokeWidth={3} />
      <div
        className="absolute right-[22%] top-[16%] h-2 w-2 rounded-full bg-sand-deep/50"
        style={{ animation: "bob 2.4s ease-in-out infinite" }}
      />
      <RingDoodle className="absolute left-[20%] top-[62%] hidden h-10 w-10 text-sand-deep/40 sm:block" />
      <SparkDoodle className="absolute right-[6%] top-[58%] hidden h-6 w-6 text-sand/70 sm:block" />

      <div className="relative w-full max-w-5xl">
        {/* scattered title */}
        <h1 className="relative z-10 select-none text-center font-display font-extrabold leading-[0.82] tracking-tight text-ink">
          <span className="absolute -top-2 right-2 font-display text-3xl font-bold text-sand sm:right-8 sm:text-5xl md:-top-6">
            &#39;26
          </span>
          <span className="block whitespace-nowrap text-[clamp(2rem,11vw,10.5rem)]">
            {letters.map((l, i) => (
              <span
                key={i}
                className="hero-letter"
                style={{ transform: `rotate(${l.r}deg) translateY(${l.y}px)` }}
              >
                <span className="inline-block" style={{ animation: `float 5s ease-in-out ${i * 0.28}s infinite` }}>
                  {l.ch}
                </span>
              </span>
            ))}
          </span>
        </h1>

        <p className="relative z-30 mt-4 text-center font-display text-sm font-bold uppercase tracking-[0.35em] text-sand-deep sm:mt-4 sm:text-base">
          {content.name}
        </p>

        {/* avatar overlapping the title — circular frame.
            This sits in normal document flow (not absolutely positioned),
            below the name label, with a small positive margin instead of an
            overlap — so it never covers the title text at any viewport. */}
        <div
          className="relative z-20 mx-auto mt-3 aspect-square w-[40vw] max-w-[280px] sm:mt-5"
          style={{ animation: "float 6s ease-in-out 0.6s infinite" }}
        >
          {/* soft glow behind */}
          <div className="pointer-events-none absolute inset-[-8%] rounded-full bg-sand/30 blur-2xl" />
          {/* dashed spinning ring */}
          <div className="pointer-events-none absolute inset-[2%] rounded-full border-2 border-dashed border-sand-deep/40 animate-spin-slow" />
          {/* framed circular photo */}
          <div className="badge-shadow absolute inset-[9%] overflow-hidden rounded-full bg-cream ring-4 ring-paper">
            <img
              src={content.avatarUrl || defaultAvatar}
              alt={`Illustration of ${content.name}`}
              className="h-full w-full object-cover scale-[1.05]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
