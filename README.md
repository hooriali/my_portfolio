# Hooria Ali — Portfolio

A single-page developer portfolio built with React, TypeScript, and Tailwind
CSS — featuring a hand-drawn/scrapbook visual style, interactive case-study
modals for projects, and a built-in admin panel for editing content without
touching code.

**Live site:** _add your Vercel URL here once deployed_

---

## Tech stack

| Layer       | Tools                                              |
| ----------- | --------------------------------------------------- |
| Framework   | [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript |
| Styling     | [Tailwind CSS v4](https://tailwindcss.com)          |
| Content/CMS | [Supabase](https://supabase.com) — Postgres + Auth + Storage, with Row Level Security |
| Animation   | CSS keyframes + [Framer Motion](https://www.framer.com/motion/)-style scroll reveals via `IntersectionObserver` |
| Icons       | [lucide-react](https://lucide.dev) + [Font Awesome](https://fontawesome.com) (brand icons) |
| Build       | `vite-plugin-singlefile` — bundles the entire app (JS, CSS, and images) into one `dist/index.html` |
| Deployment  | [Vercel](https://vercel.com) |

## Features

- **Interactive hero** with a floating circular avatar and scattered,
  hover-reactive title lettering.
- **Scrapbook-style About section** — a swinging ID badge, skills grid,
  experience timeline, and certifications with optional "View Certificate"
  links.
- **Case-study project modals** — click any project to see role, timeline,
  tools, highlights, and (once added) GitHub/live-demo buttons.
- **Featured vs. secondary projects** — flagship work gets full case-study
  cards; smaller projects appear as a compact "Also built" list. Toggle this
  per project from the admin panel.
- **Built-in Admin Panel** — a Supabase Auth-gated dashboard (gear icon in
  the nav) for editing your bio, contact info, skills, experience,
  certifications, education, and projects — including image uploads — no
  code required, and no redeploy needed. See [Content](#content-supabase-backed-cms)
  below.
- **Single-file production build** — the entire site, including images,
  inlines into one HTML file, so deployment has zero moving parts.

## Getting started

First-time only: set up your Supabase project (database + auth + storage) —
see [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md). Takes about 10 minutes and
you only do it once.

```bash
cp .env.example .env    # then fill in your Supabase URL + anon key
npm install
npm run dev       # starts the dev server (usually at http://localhost:5173)
```

### Build for production

```bash
npm run build      # outputs a single dist/index.html
npm run preview     # preview the production build locally
```

## Project structure

```
├── index.html
├── vercel.json            # Vercel build/deploy config
├── src/
│   ├── main.tsx
│   ├── App.tsx             # top-level layout + ContentProvider wiring
│   ├── index.css           # Tailwind theme tokens, keyframes, base styles
│   ├── assets/              # avatar.png, badge-photo.jpg (your images)
│   ├── components/
│   │   ├── Nav.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── ContentTOC.tsx    # "tap a number" project index
│   │   ├── Projects.tsx      # featured + secondary project grid
│   │   ├── ProjectModal.tsx  # project case-study modal
│   │   ├── Mockups.tsx       # device illustrations per project
│   │   ├── AdminPanel.tsx    # the CMS-style editor
│   │   ├── Footer.tsx
│   │   └── Reveal.tsx        # scroll-reveal wrapper
│   ├── context/
│   │   └── ContentContext.tsx  # loads/saves editable content + projects
│   ├── data/
│   │   ├── siteContent.ts    # fallback content + types (Supabase is the real source of truth)
│   │   └── projects.ts       # fallback project list + Project type
│   ├── lib/
│   │   ├── supabaseClient.ts  # Supabase client (anon key only)
│   │   └── contentApi.ts      # fetch/save functions, DB rows ↔ SiteContent/Project
│   └── utils/
│       └── cn.ts              # className merge helper (clsx + tailwind-merge)
├── supabase/
│   ├── schema.sql             # tables, Row Level Security, storage bucket
│   └── seed.sql                # migrates the existing content into the DB
```

## Content: Supabase-backed CMS

Portfolio content (bio, skills, experience, education, certifications,
projects) lives in a Supabase Postgres database, not in the source code.
**First-time setup is one-time** — see [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md)
for the full walkthrough (create the project, run the SQL, create your admin
account, set env vars). After that, the day-to-day workflow is:

```
live site → gear icon → sign in → edit → Save changes → live immediately
```

No code changes, no git commit, no redeploy needed for normal content
updates — only for actual design/feature changes.

### Admin panel

- Real authentication via **Supabase Auth** (email/password) — there is no
  hardcoded password in the frontend bundle. Only your one admin account
  (created in the Supabase dashboard) can sign in; public sign-ups are
  disabled.
- Row Level Security enforces the split at the database level: **anyone**
  can read the content (that's how the public site works), but only an
  **authenticated** session can write. This holds even if someone tampers
  with the frontend JS — the database itself refuses the write.
- Edits go straight to Postgres. Every visitor loading the site — any
  browser, any device — sees the same, current data.
- Avatar photo, badge photo, and certificate files upload directly to
  Supabase Storage from the Profile/Certifications tabs.
- `src/data/siteContent.ts` and `src/data/projects.ts` are **fallback-only**
  now: if Supabase isn't configured yet, or a fetch fails, the site shows
  this bundled data instead of a blank page. They're also what
  `supabase/seed.sql` was generated from. Editing them won't change what's
  live once Supabase is wired up.

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project**, import the repo.
3. Add the two environment variables from your `.env`
   (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) under Project → Settings
   → Environment Variables.
4. Vercel auto-detects Vite; the included `vercel.json` makes the build
   command (`npm run build`), output directory (`dist`), and SPA rewrite
   explicit so there's no ambiguity.
5. Click **Deploy**.

Because the build inlines the JS/CSS into a single `dist/index.html` (via
`vite-plugin-singlefile`), there's very little to misconfigure — the only
real setup step is the two Supabase env vars above.

## Customization

- **Colors / fonts** — edit the `@theme` block at the top of `src/index.css`
  (`--color-ink`, `--color-sand`, `--font-display`, etc.). Everything else
  references these tokens.
- **Project artwork** — each project's little device illustration lives in
  `src/components/Mockups.tsx`, keyed by the `devices` field on each project.
- **Nav links / sections** — edit the `links` array in `src/components/Nav.tsx`.

## License

Personal portfolio project — feel free to fork the structure for your own
site, but please swap out the content, images, and copy for your own.
