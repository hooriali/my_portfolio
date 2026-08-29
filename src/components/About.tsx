import Reveal from "./Reveal";
import { useContent } from "@/context/ContentContext";
import { DotDoodle, PlusDoodle, RingDoodle, SparkDoodle, SquiggleDoodle } from "./Doodle";
import defaultBadgePhoto from "@/assets/badge-photo.jpg";

const softwares = [
  { label: "Py", name: "Python", bg: "#306998", fg: "#FFD43B" },
  { label: "JS", name: "JavaScript", bg: "#f7df1e", fg: "#17150f" },
  { label: "Fg", name: "Figma", bg: "#ffffff", fg: "#17150f", figma: true },
  { label: "Fl", name: "Flask", bg: "#17150f", fg: "#ffffff" },
  { label: "Db", name: "ChromaDB", bg: "#d65b33", fg: "#ffffff" },
];

function FigmaIcon() {
  return <i className="fa-brands fa-figma text-[15px]" style={{ color: "#a259ff" }} />;
}

function ContactRow({ icon, label, href, chipClass }: { icon: string; label: string; href: string; chipClass: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-2.5">
      <span className={`flex h-6 w-6 items-center justify-center rounded-md text-[11px] text-white transition-transform group-hover:-translate-y-0.5 ${chipClass}`}>
        <i className={icon} />
      </span>
      <span className="text-[11px] font-semibold text-ink/70 transition-colors group-hover:text-ink group-hover:underline group-hover:decoration-sand-deep group-hover:underline-offset-2">
        {label}
      </span>
    </a>
  );
}

export default function About() {
  const { content } = useContent();
  const { name, role, bio, contact, skills, experience, certifications, education, badgePhotoUrl } = content;
  const firstName = name.split(" ")[0];

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      {/* doodles */}
      <SquiggleDoodle className="pointer-events-none absolute left-[4%] top-[4%] hidden h-8 w-16 text-sand-deep/40 sm:block" />
      <DotDoodle className="pointer-events-none absolute right-[8%] top-[10%] h-2.5 w-2.5 bg-sand" style={{ animation: "bob 2.6s ease-in-out infinite" }} />
      <PlusDoodle className="pointer-events-none absolute left-[2%] top-[55%] hidden h-4 w-4 text-sand-deep/35 lg:block" />
      <RingDoodle className="pointer-events-none absolute right-[3%] bottom-[8%] hidden h-12 w-12 text-sand-deep/25 lg:block" />
      <SparkDoodle
        className="pointer-events-none absolute right-[30%] top-[2%] h-4 w-4 text-sand/70"
        style={{ animation: "float 4s ease-in-out 0.4s infinite" }}
      />

      <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-10">
        {/* ---- ID badge ---- */}
        <Reveal className="order-2 mx-auto w-full max-w-[260px] lg:order-1 lg:sticky lg:top-28">
          <div className="relative flex flex-col items-center">
            {/* lanyard strap */}
            <svg viewBox="0 0 120 110" className="h-28 w-32 text-neutral-200" fill="none">
              <path d="M10 -10 C 18 40, 44 78, 58 100" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              <path d="M110 -10 C 102 40, 76 78, 62 100" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              <rect x="52" y="96" width="16" height="12" rx="3" fill="#b9ab8a" />
            </svg>

            {/* swinging card */}
            <div className="-mt-1 origin-top animate-swing">
              <div className="badge-shadow w-[196px] -rotate-2 rounded-2xl border border-line bg-white p-2.5">
                <div className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-neutral-200" />
                <div className="overflow-hidden rounded-xl">
                  <img src={badgePhotoUrl || defaultBadgePhoto} alt={name} className="aspect-[3/3.6] w-full object-cover" />
                </div>
                <div className="flex items-center justify-between px-1 pb-1 pt-2.5">
                  <div>
                    <p className="font-display text-[13px] font-extrabold leading-none uppercase">{name}</p>
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-sand-deep">{role}</p>
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    {[10, 14, 8, 12, 6].map((w, i) => (
                      <div key={i} className="h-[2px] bg-ink/70" style={{ width: w }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Location badge below card */}
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-[11px] font-semibold text-ink/60">
              <span className="rounded-full bg-cream px-3 py-1">📍 {contact.location}</span>
              <span className="rounded-full bg-cream px-3 py-1">🎓 NUCES</span>
            </div>
          </div>
        </Reveal>

        {/* ---- intro + columns ---- */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              HI, I'm <span className="text-sand-deep">{firstName}</span> 👋
            </h2>
            <p className="mt-4 max-w-xl text-[13.5px] leading-relaxed text-ink/65">{bio}</p>
          </Reveal>

          {/* Technical Skills Grid */}
          <Reveal delay={80}>
            <h3 className="mt-10 text-[11px] font-extrabold uppercase tracking-[0.28em] text-ink">Technical Skills</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {Object.entries(skills).map(([category, items]) => (
                <div
                  key={category}
                  className="group rounded-lg bg-cream/50 p-4 transition-all duration-300 hover:-translate-y-1.5 hover:bg-cream hover:shadow-[0_16px_30px_-14px_rgba(23,21,15,0.25)]"
                >
                  <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-sand-deep">{category}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="cursor-default rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-ink/75 shadow-sm ring-1 ring-line/60 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-sand-deep hover:text-white hover:shadow-md hover:ring-sand-deep"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <div id="experience" className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-2">
            <Reveal delay={120}>
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-ink">Experience</h3>
              <ul className="mt-5 space-y-5">
                {experience.map((e) => (
                  <li key={e.org} className="group border-l-2 border-line pl-3 transition-colors hover:border-sand-deep">
                    <p className="text-[13px] font-bold leading-snug">{e.role}</p>
                    <p className="text-[12px] font-semibold text-sand-deep">{e.org}</p>
                    <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink/40">{e.date}</p>
                    {e.bullets.length > 0 && (
                      <ul className="mt-2 space-y-1 ml-1 list-disc list-inside text-[11px] text-ink/55">
                        {e.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={200}>
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-ink">Certifications</h3>
              <ul className="mt-5 space-y-3">
                {certifications.map((c) => (
                  <li key={c.name} className="group flex items-center justify-between gap-2 border-l-2 border-line pl-3 transition-colors hover:border-sand-deep">
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sand-deep shrink-0" />
                      <p className="text-[12px] font-semibold text-ink/70">{c.name}</p>
                    </span>
                    {c.url && (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 rounded-full bg-cream px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sand-deep transition-colors hover:bg-sand hover:text-ink"
                      >
                        View Certificate
                      </a>
                    )}
                  </li>
                ))}
              </ul>

              <h3 className="mt-8 text-[11px] font-extrabold uppercase tracking-[0.28em] text-ink">Education</h3>
              <div className="mt-3 space-y-3">
                {education.map((ed, i) => (
                  <div key={i} className="rounded-lg bg-cream/60 p-4">
                    <p className="text-[13px] font-bold">{ed.school}</p>
                    <p className="text-[12px] font-semibold text-sand-deep">{ed.program}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-ink/70 ring-1 ring-line/60">{ed.degree}</span>
                      <span className="rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-ink/70 ring-1 ring-line/60">{ed.expected}</span>
                      <span className="rounded-md bg-sand/40 px-2.5 py-1 text-[11px] font-bold text-ink ring-1 ring-sand/40">{/[A-Za-z]/.test(ed.cgpa) ? `Grade ${ed.cgpa}` : `CGPA ${ed.cgpa}`}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <Reveal delay={260}>
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-ink">Contact</h3>
              <div className="mt-5 space-y-3">
                <ContactRow icon="fa-solid fa-envelope" label={contact.email} href={`mailto:${contact.email}`} chipClass="bg-[#ea4335]" />
                {contact.phone && (
                  <ContactRow icon="fa-solid fa-phone" label={contact.phone} href={`tel:${contact.phone.replace(/\s+/g, "")}`} chipClass="bg-ink" />
                )}
                <ContactRow icon="fa-brands fa-github" label={contact.githubHandle} href={contact.githubUrl} chipClass="bg-ink" />
                <ContactRow icon="fa-brands fa-linkedin-in" label={contact.linkedinHandle} href={contact.linkedinUrl} chipClass="bg-[#0a66c2]" />
                <ContactRow icon="fa-solid fa-globe" label={contact.websiteLabel} href={contact.websiteUrl} chipClass="bg-sand-deep" />
              </div>
            </Reveal>

            <Reveal delay={320}>
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-ink">Tech Stack</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {softwares.map((s) => (
                  <span
                    key={s.name}
                    title={s.name}
                    className="flex h-9 w-9 cursor-default items-center justify-center rounded-lg text-[11px] font-extrabold ring-1 ring-black/5 transition-all duration-200 hover:-translate-y-1 hover:rotate-3 hover:shadow-lg"
                    style={{ background: s.bg, color: s.fg }}
                  >
                    {s.figma ? <FigmaIcon /> : s.label}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[11px] font-semibold text-ink/45">
                ...and always learning more.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
