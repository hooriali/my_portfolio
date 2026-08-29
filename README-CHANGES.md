# What's in this update

Drop these files into your existing project at the same paths (they replace
the old ones 1:1) — nothing in `src/assets` was touched, so your real
`avatar.png` and `badge-photo.jpg` stay exactly where they are. Two files are
brand new: `src/context/ContentContext.tsx` and `src/utils/storage.ts`, plus
`src/components/AdminPanel.tsx`.

## 1. Resume alignment fixes
- Fixed the browser tab title (`index.html`) — it still said "Shourya Khanna,"
  left over from a template.
- Email corrected to `alihooria6@gmail.com` (site had a typo'd address).
- LinkedIn now points to your real profile `linkedin.com/in/hooria-ali7`
  instead of a generic linkedin.com link.
- CGPA corrected to `3.195 / 4.00` to match your resume.
- "GStream" in your Frameworks list fixed to "React."
- Project #1 renamed `OpenAiNavigator` → `OppsNavigator` to match your resume.

## 2. GitHub + live demo links on projects
Every project card in `src/data/projects.ts` now has `github` and `demo`
fields. I pointed `github` at your GitHub profile as a placeholder and left
`demo` empty — **update these** (either by editing `projects.ts` directly, or
through the new admin panel) with your actual repo and deployed-demo URLs.
When a link is filled in, a "Code" / "Live demo" button appears in that
project's case-study modal; empty ones just don't render a button.

## 3. Admin panel
Click the small gear icon in the top nav (next to "Say hi") to open it.

- **Password:** `hooria2026` — change this by editing the `ADMIN_PASSWORD`
  constant near the top of `src/components/AdminPanel.tsx`.
- **Important:** this is a convenience lock, not real security. The password
  ships inside your JS bundle, so anyone who opens devtools can read it. Don't
  treat it as protecting the panel on a public deployment — if you need that,
  password-protect the whole site at the hosting level (Vercel's built-in
  password protection, for example) rather than relying on this.
- Edits are saved to the visitor's browser `localStorage`, not to a server or
  back into your source files. That means: changes you make persist for you
  on your own browser, but a fresh visitor (or you, on a different device)
  will see the defaults baked into `siteContent.ts` / `projects.ts` until you
  edit those files directly. If you want edits to be permanent for everyone,
  make the change in the admin panel, then copy the same values into
  `src/data/siteContent.ts` / `src/data/projects.ts` so they ship as the new
  defaults.
- Tabs: Profile, Contact, Skills, Experience, Certifications, Education,
  Projects (including the new GitHub/demo link fields). There's a reset
  button (circular arrow icon) that wipes localStorage and goes back to the
  defaults in the source files.

## 4. Hero avatar — circle instead of rectangle
`src/components/Hero.tsx` now wraps your avatar in a circular frame (soft
glow + a slowly spinning dashed ring + a solid paper-colored ring) instead of
the plain rectangular cutout that was overlapping the "PORTFOLIO" letters
awkwardly. Same image, same position — just cropped to a circle so it sits
in the letterforms cleanly.

## 5. Certifications & Education updates
- Certifications now support an optional link — fill one in (admin panel or
  `siteContent.ts`) and a **"View Certificate"** button appears next to that
  cert; leave it blank and no button shows. The admin panel's Certifications
  tab now has per-item name/link fields plus an **Add certification** button.
- Education is now a repeatable list instead of a single fixed block, so you
  can list more than one school (e.g. if you add an A-Levels or another
  program later). The admin panel's Education tab has an **Add Education**
  button and a delete button per entry.
- Note: this changed the shape of `certifications` (now
  `{ name, url }[]` instead of `string[]`) and `education` (now an array
  instead of a single object) in `src/data/siteContent.ts` — if you had
  customized either of those in your own copy, re-apply those edits to the
  new shape.

## 6. Deployed on Vercel — ready to go
- Added `vercel.json` (framework: vite, build: `npm run build`, output:
  `dist`) and a `.gitignore`. Vercel actually auto-detects Vite projects
  without any config, but this makes the settings explicit so there's no
  ambiguity if you import the repo.
- Confirmed with a real production build (`vite build`) that
  `vite-plugin-singlefile` inlines everything — JS, CSS, and both images,
  regardless of size — into one `dist/index.html`. That means deployment is
  about as simple as it gets: no separate asset files, no broken relative
  paths, nothing to misconfigure.
- To deploy: push this repo to GitHub, then in Vercel choose **Add New →
  Project**, import the repo, and click Deploy — it will detect Vite
  automatically and use the settings above. No environment variables are
  needed since everything (including the admin panel) runs client-side.
- One thing to know: because `localStorage` is per-browser, admin panel edits
  made on the live Vercel site won't sync across visitors or devices (see the
  admin panel section above) — treat it as your personal quick-edit tool, and
  bake any edits you want everyone to see into the source files before you
  push.

## 7. Featured vs. secondary projects
OppsNavigator, RAG Document Chatbot, and AI Study Pattern Analyzer are now the
three full case-study cards in "Selected work." The WhatsApp Chatbot Suite
and Responsive Web Portfolio moved to a smaller "Also built" row underneath
— compact, single-line entries that still open the full case-study modal on
click, just without the big illustration treatment. The "tap a number"
section above it now only shows the three featured projects too, so the
numbering stays consistent.

This is controlled by a new `featured` field on each project (defaults to
`true` if omitted). Toggle it per-project in the admin panel's Projects tab,
or set `featured: false` directly in `projects.ts`.

## Verified
This was type-checked with `tsc --noEmit` and built successfully with
`vite build` against your existing `package.json` — the only thing I could
not test locally is the actual visual look of your `avatar.png` /
`badge-photo.jpg`, since those weren't part of the files you uploaded.
