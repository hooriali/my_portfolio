import { supabase, supabaseConfigured } from "./supabaseClient";
import type { SiteContent, ExperienceItem, EducationInfo, CertificationItem } from "@/data/siteContent";
import type { Project } from "@/data/projects";

const MEDIA_BUCKET = "portfolio-media";

// ---------------------------------------------------------------------------
// Fetch — public reads, used by every visitor (anon key, RLS allows SELECT)
// ---------------------------------------------------------------------------

export async function fetchSiteContent(): Promise<SiteContent> {
  const [profileRes, skillsRes, expRes, eduRes, certRes] = await Promise.all([
    supabase.from("profile").select("*").eq("id", 1).maybeSingle(),
    supabase.from("skill_categories").select("*").order("sort_order"),
    supabase.from("experience").select("*").order("sort_order"),
    supabase.from("education").select("*").order("sort_order"),
    supabase.from("certifications").select("*").order("sort_order"),
  ]);

  for (const res of [profileRes, skillsRes, expRes, eduRes, certRes]) {
    if (res.error) throw res.error;
  }

  const p = profileRes.data;
  if (!p) throw new Error("No profile row found — did you run supabase/seed.sql?");

  const skills: Record<string, string[]> = {};
  for (const row of skillsRes.data ?? []) {
    skills[row.category] = row.items ?? [];
  }

  const experience: ExperienceItem[] = (expRes.data ?? []).map((r) => ({
    role: r.role,
    org: r.org,
    date: r.date,
    bullets: r.bullets ?? [],
  }));

  const education: EducationInfo[] = (eduRes.data ?? []).map((r) => ({
    school: r.school,
    program: r.program,
    degree: r.degree,
    expected: r.expected,
    cgpa: r.cgpa,
  }));

  const certifications: CertificationItem[] = (certRes.data ?? []).map((r) => ({
    name: r.name,
    url: r.url ?? "",
  }));

  return {
    name: p.name,
    role: p.role,
    bio: p.bio,
    contact: {
      email: p.email,
      phone: p.phone,
      githubUrl: p.github_url,
      githubHandle: p.github_handle,
      linkedinUrl: p.linkedin_url,
      linkedinHandle: p.linkedin_handle,
      websiteUrl: p.website_url,
      websiteLabel: p.website_label,
      location: p.location,
    },
    skills,
    experience,
    education,
    certifications,
    avatarUrl: p.avatar_url ?? undefined,
    badgePhotoUrl: p.badge_photo_url ?? undefined,
  };
}

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase.from("projects").select("*").order("sort_order");
  if (error) throw error;
  return (data ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    tag: r.tag,
    color: r.color,
    deep: r.deep,
    onDark: r.on_dark,
    devices: r.devices,
    year: r.year,
    role: r.role,
    timeline: r.timeline,
    tools: r.tools ?? [],
    overview: r.overview,
    highlights: r.highlights ?? [],
    github: r.github ?? "",
    demo: r.demo ?? "",
    featured: r.featured,
  }));
}

// ---------------------------------------------------------------------------
// Mutate — admin-only writes (requires an authenticated session; RLS blocks
// anon writes at the database level regardless of what the client sends).
// The admin panel edits a whole section in local state, then calls one of
// these to replace that section's rows wholesale on Save — same shape as
// the old "edit draft, Save" flow, just hitting Postgres instead of
// localStorage now.
// ---------------------------------------------------------------------------

export async function saveProfile(content: SiteContent): Promise<void> {
  const { error } = await supabase
    .from("profile")
    .update({
      name: content.name,
      role: content.role,
      bio: content.bio,
      email: content.contact.email,
      phone: content.contact.phone,
      github_url: content.contact.githubUrl,
      github_handle: content.contact.githubHandle,
      linkedin_url: content.contact.linkedinUrl,
      linkedin_handle: content.contact.linkedinHandle,
      website_url: content.contact.websiteUrl,
      website_label: content.contact.websiteLabel,
      location: content.contact.location,
      avatar_url: content.avatarUrl ?? null,
      badge_photo_url: content.badgePhotoUrl ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);
  if (error) throw error;
}

/** Replaces every skill_categories row with the given list. */
export async function saveSkills(skills: Record<string, string[]>): Promise<void> {
  const rows = Object.entries(skills).map(([category, items], i) => ({
    category,
    items,
    sort_order: i,
  }));
  const { error: delErr } = await supabase.from("skill_categories").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (delErr) throw delErr;
  if (rows.length > 0) {
    const { error: insErr } = await supabase.from("skill_categories").insert(rows);
    if (insErr) throw insErr;
  }
}

export async function saveExperience(experience: ExperienceItem[]): Promise<void> {
  const rows = experience.map((e, i) => ({ ...e, sort_order: i }));
  const { error: delErr } = await supabase.from("experience").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (delErr) throw delErr;
  if (rows.length > 0) {
    const { error: insErr } = await supabase.from("experience").insert(rows);
    if (insErr) throw insErr;
  }
}

export async function saveEducation(education: EducationInfo[]): Promise<void> {
  const rows = education.map((e, i) => ({ ...e, sort_order: i }));
  const { error: delErr } = await supabase.from("education").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (delErr) throw delErr;
  if (rows.length > 0) {
    const { error: insErr } = await supabase.from("education").insert(rows);
    if (insErr) throw insErr;
  }
}

export async function saveCertifications(certifications: CertificationItem[]): Promise<void> {
  const rows = certifications.map((c, i) => ({ ...c, sort_order: i }));
  const { error: delErr } = await supabase.from("certifications").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (delErr) throw delErr;
  if (rows.length > 0) {
    const { error: insErr } = await supabase.from("certifications").insert(rows);
    if (insErr) throw insErr;
  }
}

/** Replaces every project row with the given list (new projects get a fresh id from the DB). */
export async function saveProjects(projects: Project[]): Promise<void> {
  const rows = projects.map((p, i) => ({
    name: p.name,
    tag: p.tag,
    color: p.color,
    deep: p.deep,
    on_dark: p.onDark,
    devices: p.devices,
    year: p.year,
    role: p.role,
    timeline: p.timeline,
    tools: p.tools,
    overview: p.overview,
    highlights: p.highlights,
    github: p.github ?? "",
    demo: p.demo ?? "",
    featured: p.featured ?? true,
    sort_order: i,
  }));
  const { error: delErr } = await supabase.from("projects").delete().neq("id", -1);
  if (delErr) throw delErr;
  if (rows.length > 0) {
    const { error: insErr } = await supabase.from("projects").insert(rows);
    if (insErr) throw insErr;
  }
}

// ---------------------------------------------------------------------------
// Media uploads (avatar, badge photo, certificate files) — Supabase Storage
// ---------------------------------------------------------------------------

/** Uploads a file to the portfolio-media bucket and returns its public URL. */
export async function uploadMedia(file: File, folder: "avatars" | "badges" | "certificates"): Promise<string> {
  if (!supabaseConfigured) {
    throw new Error("Supabase isn't configured — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY first.");
  }
  const ext = file.name.split(".").pop() || "bin";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, { upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
