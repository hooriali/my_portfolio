# Setting up the Supabase CMS

Your portfolio's content (bio, skills, experience, education, certifications,
projects) now lives in a Supabase database instead of localStorage/TS files.
This is a one-time setup — after this, updating your portfolio is just:
**open `/` on your live site → gear icon → sign in → edit → Save.**

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → **New project**.
2. Pick any name/region, set a database password (you won't need it day to
   day — Supabase manages the connection for you), and wait ~2 minutes for
   it to provision.

## 2. Run the schema

1. In your project, open **SQL Editor** → **New query**.
2. Paste the entire contents of `supabase/schema.sql` from this repo, run it.
   This creates all the tables, Row Level Security policies, and the
   `portfolio-media` storage bucket.
3. New query again, paste the entire contents of `supabase/seed.sql`, run it.
   This migrates your existing bio/projects/experience/etc. into the
   database so you don't start from a blank slate.

## 3. Create your admin account

1. **Authentication → Users → Add user → Create new user.**
2. Enter your email and a password. Toggle **Auto Confirm User** on (so you
   don't need to click an email link).
3. **Important:** go to **Authentication → Settings** (or **Providers** →
   Email, depending on your Supabase version) and turn **Allow new user
   signups OFF**. This portfolio only needs one admin account — leaving
   signups open would let anyone create an account (they still couldn't
   write content thanks to Row Level Security, but there's no reason to
   leave the door open).

## 4. Get your API keys

**Settings → API.** You need two values:
- **Project URL** (e.g. `https://abcdefgh.supabase.co`)
- **anon / public key** (a long string starting with `eyJ...`)

Do **not** use the `service_role` key anywhere in this project — it bypasses
all the security rules and must never appear in frontend code.

## 5. Set your environment variables

**Locally:** copy `.env.example` to `.env` and fill in the two values from
step 4:

```bash
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://abcdefgh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

`.env` is already gitignored — it will never get committed.

**On Vercel:** Project → Settings → Environment Variables → add the same two
keys (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) for Production (and
Preview if you want preview deployments to work too). Redeploy once after
adding them.

## 6. Run it

```bash
npm install
npm run dev
```

Open the site, click the gear icon in the nav, sign in with the account from
step 3. You should see your migrated content across every tab.

## Day-to-day usage

Once this is set up, the workflow is exactly what you asked for:

```
/ (your live site)
    → gear icon
    → sign in
    → edit any tab (Profile, Skills, Experience, Certifications,
      Education, Projects — including image/certificate uploads)
    → Save changes
    → live immediately, no redeploy
```

Code changes (new features, design tweaks) still go through git → Vercel, as
normal. Content changes never do.

## Troubleshooting

- **"Supabase isn't configured" in the admin panel** → your `.env` (local)
  or Vercel env vars aren't set, or you haven't restarted `npm run dev` /
  redeployed since adding them.
- **Site shows old/placeholder content even though Supabase is configured**
  → check the browser console for a Supabase fetch error (the app falls
  back to the bundled placeholder data automatically if the fetch fails, so
  the site never breaks — but it also means you're not looking at your real
  data). Common cause: `schema.sql` wasn't run, or the URL/key has a typo.
- **Can't sign in** → confirm the user exists in Authentication → Users, and
  that you toggled "Auto Confirm User" when creating it (otherwise it's
  waiting on an unconfirmed email).
- **Uploads fail** → confirm `schema.sql` ran successfully (it creates the
  `portfolio-media` bucket and its policies) and that you're actually signed
  in when uploading.
