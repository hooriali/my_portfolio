import { useState, type ChangeEvent } from "react";
import { LogOut, Plus, RotateCcw, Save, Trash2, Upload, X } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { useAuth } from "@/context/AuthContext";
import { supabaseConfigured } from "@/lib/supabaseClient";
import { uploadMedia } from "@/lib/contentApi";
import type { SiteContent } from "@/data/siteContent";
import type { Project } from "@/data/projects";

type Tab = "profile" | "contact" | "skills" | "experience" | "certifications" | "education" | "projects";

const TABS: { id: Tab; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "contact", label: "Contact" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
];

function Field({ label, value, onChange, textarea = false }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink/50">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          rows={4}
          className="w-full rounded-md border border-line bg-white px-3 py-2 text-[13px] text-ink outline-none focus:border-sand-deep"
        />
      ) : (
        <input
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          className="w-full rounded-md border border-line bg-white px-3 py-2 text-[13px] text-ink outline-none focus:border-sand-deep"
        />
      )}
    </label>
  );
}

/** A file input that uploads to Supabase Storage on selection and reports back the public URL. */
function FileField({
  label,
  folder,
  currentUrl,
  onUploaded,
}: {
  label: string;
  folder: "avatars" | "badges" | "certificates";
  currentUrl?: string;
  onUploaded: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      const url = await uploadMedia(file, folder);
      onUploaded(url);
    } catch (uploadErr) {
      setErr(uploadErr instanceof Error ? uploadErr.message : "Upload failed");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };

  return (
    <div>
      <span className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink/50">{label}</span>
      <div className="flex items-center gap-3">
        {currentUrl && <img src={currentUrl} alt="" className="h-12 w-12 rounded-md object-cover ring-1 ring-line" />}
        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-dashed border-ink/30 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-ink/60 hover:border-sand-deep hover:text-sand-deep">
          <Upload size={13} />
          {busy ? "Uploading…" : "Upload image"}
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={busy} />
        </label>
      </div>
      {err && <p className="mt-1 text-[11px] font-semibold text-red-600">{err}</p>}
    </div>
  );
}

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const { content, projects, saveProfile, saveSkills, saveExperience, saveEducation, saveCertifications, saveProjects, refresh, usingFallback } = useContent();
  const { session, loading: authLoading, signIn, signOut } = useAuth();

  const [emailInput, setEmailInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  const [draftContent, setDraftContent] = useState<SiteContent>(() => structuredClone(content));
  const [draftProjects, setDraftProjects] = useState<Project[]>(() => structuredClone(projects));
  const [tab, setTab] = useState<Tab>("profile");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const tryUnlock = async () => {
    setSigningIn(true);
    setAuthError(null);
    const { error } = await signIn(emailInput, pwInput);
    setSigningIn(false);
    if (error) setAuthError(error);
  };

  // Saves every section to Supabase, then refreshes so the panel (and the
  // live site, next time it loads) reflects exactly what's in the database
  // — no local state that could drift from what's actually persisted.
  const save = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      await saveProfile(draftContent);
      await saveSkills(draftContent.skills);
      await saveExperience(draftContent.experience);
      await saveEducation(draftContent.education);
      await saveCertifications(draftContent.certifications);
      await saveProjects(draftProjects);
      setSaved(true);
      setTimeout(() => setSaved(false), 1600);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const discardAndReload = async () => {
    if (!confirm("Discard unsaved changes and reload from the database?")) return;
    await refresh();
    setDraftContent(structuredClone(content));
    setDraftProjects(structuredClone(projects));
  };

  if (authLoading) return null;

  if (!session) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm" onClick={onClose}>
        <div className="w-full max-w-sm rounded-xl bg-paper p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-2 text-ink">
            <h3 className="font-display text-lg font-extrabold">Admin sign in</h3>
          </div>
          {!supabaseConfigured ? (
            <p className="mt-2 text-[12px] font-semibold text-red-600">
              Supabase isn't configured yet — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (see .env.example and README.md) before you can sign in.
            </p>
          ) : (
            <p className="mt-2 text-[12px] text-ink/60">Sign in with your admin account and password.</p>
          )}
          <input
            type="email"
            autoFocus
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="mt-4 w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-sand-deep"
            placeholder="Email"
          />
          <input
            type="password"
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
            className="mt-2 w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-sand-deep"
            placeholder="Password"
          />
          {authError && <p className="mt-2 text-[11px] font-semibold text-red-600">{authError}</p>}
          <div className="mt-5 flex justify-end gap-2">
            <button onClick={onClose} className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest text-ink/50 hover:text-ink">
              Cancel
            </button>
            <button
              onClick={tryUnlock}
              disabled={signingIn || !supabaseConfigured}
              className="rounded-full bg-ink px-5 py-2 text-xs font-bold uppercase tracking-widest text-paper hover:bg-sand-deep disabled:opacity-50"
            >
              {signingIn ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="flex h-[86vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-paper shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h3 className="font-display text-lg font-extrabold">Admin panel</h3>
          <div className="flex items-center gap-2">
            {saved && <span className="text-[11px] font-bold uppercase tracking-widest text-green-700">Saved ✓</span>}
            <button onClick={discardAndReload} title="Discard changes & reload from database" className="flex h-8 w-8 items-center justify-center rounded-full text-ink/50 hover:bg-cream hover:text-ink">
              <RotateCcw size={15} />
            </button>
            <button onClick={signOut} title="Sign out" className="flex h-8 w-8 items-center justify-center rounded-full text-ink/50 hover:bg-cream hover:text-ink">
              <LogOut size={15} />
            </button>
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full text-ink/50 hover:bg-cream hover:text-ink">
              <X size={16} />
            </button>
          </div>
        </div>

        {usingFallback && (
          <div className="border-b border-line bg-amber-50 px-6 py-2 text-[11px] font-semibold text-amber-800">
            Showing bundled fallback content — Supabase isn't reachable (or isn't configured), so saving here won't persist. Check your env vars and the Supabase project status.
          </div>
        )}

        {/* tabs */}
        <div className="flex gap-1 overflow-x-auto border-b border-line px-4 py-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                tab === t.id ? "bg-ink text-paper" : "text-ink/50 hover:bg-cream"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {tab === "profile" && (
            <div className="space-y-4">
              <Field label="Full name" value={draftContent.name} onChange={(v) => setDraftContent({ ...draftContent, name: v })} />
              <Field label="Role / title" value={draftContent.role} onChange={(v) => setDraftContent({ ...draftContent, role: v })} />
              <Field label="Bio" value={draftContent.bio} onChange={(v) => setDraftContent({ ...draftContent, bio: v })} textarea />
              <div className="grid gap-4 sm:grid-cols-2">
                <FileField
                  label="Hero avatar photo"
                  folder="avatars"
                  currentUrl={draftContent.avatarUrl}
                  onUploaded={(url) => setDraftContent({ ...draftContent, avatarUrl: url })}
                />
                <FileField
                  label="About badge photo"
                  folder="badges"
                  currentUrl={draftContent.badgePhotoUrl}
                  onUploaded={(url) => setDraftContent({ ...draftContent, badgePhotoUrl: url })}
                />
              </div>
            </div>
          )}

          {tab === "contact" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" value={draftContent.contact.email} onChange={(v) => setDraftContent({ ...draftContent, contact: { ...draftContent.contact, email: v } })} />
              <Field label="Phone" value={draftContent.contact.phone} onChange={(v) => setDraftContent({ ...draftContent, contact: { ...draftContent.contact, phone: v } })} />
              <Field label="Location" value={draftContent.contact.location} onChange={(v) => setDraftContent({ ...draftContent, contact: { ...draftContent.contact, location: v } })} />
              <Field label="GitHub URL" value={draftContent.contact.githubUrl} onChange={(v) => setDraftContent({ ...draftContent, contact: { ...draftContent.contact, githubUrl: v } })} />
              <Field label="GitHub handle (display text)" value={draftContent.contact.githubHandle} onChange={(v) => setDraftContent({ ...draftContent, contact: { ...draftContent.contact, githubHandle: v } })} />
              <Field label="LinkedIn URL" value={draftContent.contact.linkedinUrl} onChange={(v) => setDraftContent({ ...draftContent, contact: { ...draftContent.contact, linkedinUrl: v } })} />
              <Field label="LinkedIn handle (display text)" value={draftContent.contact.linkedinHandle} onChange={(v) => setDraftContent({ ...draftContent, contact: { ...draftContent.contact, linkedinHandle: v } })} />
              <Field label="Website URL" value={draftContent.contact.websiteUrl} onChange={(v) => setDraftContent({ ...draftContent, contact: { ...draftContent.contact, websiteUrl: v } })} />
              <Field label="Website label" value={draftContent.contact.websiteLabel} onChange={(v) => setDraftContent({ ...draftContent, contact: { ...draftContent.contact, websiteLabel: v } })} />
            </div>
          )}

          {tab === "skills" && (
            <div className="space-y-4">
              {Object.entries(draftContent.skills).map(([category, items]) => (
                <div key={category} className="rounded-lg border border-line p-4">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      value={category}
                      onChange={(e) => {
                        const newSkills = { ...draftContent.skills };
                        const vals = newSkills[category];
                        delete newSkills[category];
                        newSkills[e.target.value] = vals;
                        setDraftContent({ ...draftContent, skills: newSkills });
                      }}
                      className="w-1/2 rounded-md border border-line bg-white px-2.5 py-1.5 text-[12px] font-extrabold uppercase tracking-wider outline-none focus:border-sand-deep"
                    />
                    <button
                      onClick={() => {
                        const newSkills = { ...draftContent.skills };
                        delete newSkills[category];
                        setDraftContent({ ...draftContent, skills: newSkills });
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-ink/40 hover:bg-cream hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="mb-1 mt-3 text-[10px] font-bold uppercase tracking-widest text-ink/40">Skills (comma separated)</p>
                  <textarea
                    value={items.join(", ")}
                    onChange={(e) => {
                      const newSkills = { ...draftContent.skills, [category]: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) };
                      setDraftContent({ ...draftContent, skills: newSkills });
                    }}
                    rows={2}
                    className="w-full rounded-md border border-line bg-white px-3 py-2 text-[13px] outline-none focus:border-sand-deep"
                  />
                </div>
              ))}
              <button
                onClick={() => setDraftContent({ ...draftContent, skills: { ...draftContent.skills, "New Category": [] } })}
                className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-ink/30 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-ink/50 hover:border-sand-deep hover:text-sand-deep"
              >
                <Plus size={13} /> Add category
              </button>
            </div>
          )}

          {tab === "experience" && (
            <div className="space-y-4">
              {draftContent.experience.map((exp, i) => (
                <div key={i} className="rounded-lg border border-line p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="grid flex-1 gap-3 sm:grid-cols-3">
                      <Field
                        label="Role"
                        value={exp.role}
                        onChange={(v) => {
                          const next = [...draftContent.experience];
                          next[i] = { ...exp, role: v };
                          setDraftContent({ ...draftContent, experience: next });
                        }}
                      />
                      <Field
                        label="Organization"
                        value={exp.org}
                        onChange={(v) => {
                          const next = [...draftContent.experience];
                          next[i] = { ...exp, org: v };
                          setDraftContent({ ...draftContent, experience: next });
                        }}
                      />
                      <Field
                        label="Date"
                        value={exp.date}
                        onChange={(v) => {
                          const next = [...draftContent.experience];
                          next[i] = { ...exp, date: v };
                          setDraftContent({ ...draftContent, experience: next });
                        }}
                      />
                    </div>
                    <button
                      onClick={() => setDraftContent({ ...draftContent, experience: draftContent.experience.filter((_, idx) => idx !== i) })}
                      className="mt-6 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink/40 hover:bg-cream hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="mt-3">
                    <Field
                      label="Bullet points (one per line)"
                      value={exp.bullets.join("\n")}
                      onChange={(v) => {
                        const next = [...draftContent.experience];
                        next[i] = { ...exp, bullets: v.split("\n").map((s) => s.trim()).filter(Boolean) };
                        setDraftContent({ ...draftContent, experience: next });
                      }}
                      textarea
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() =>
                  setDraftContent({
                    ...draftContent,
                    experience: [...draftContent.experience, { role: "New role", org: "New company", date: "2026", bullets: [] }],
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-ink/30 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-ink/50 hover:border-sand-deep hover:text-sand-deep"
              >
                <Plus size={13} /> Add experience
              </button>
            </div>
          )}

          {tab === "certifications" && (
            <div className="space-y-3">
              {draftContent.certifications.map((c, i) => (
                <div key={i} className="rounded-lg border border-line p-3">
                  <div className="flex items-start gap-3">
                    <div className="grid flex-1 gap-3 sm:grid-cols-2">
                      <Field
                        label="Certification name"
                        value={c.name}
                        onChange={(v) => {
                          const next = [...draftContent.certifications];
                          next[i] = { ...c, name: v };
                          setDraftContent({ ...draftContent, certifications: next });
                        }}
                      />
                      <Field
                        label="Certificate link (optional)"
                        value={c.url}
                        onChange={(v) => {
                          const next = [...draftContent.certifications];
                          next[i] = { ...c, url: v };
                          setDraftContent({ ...draftContent, certifications: next });
                        }}
                      />
                    </div>
                    <button
                      onClick={() => setDraftContent({ ...draftContent, certifications: draftContent.certifications.filter((_, idx) => idx !== i) })}
                      className="mt-6 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink/40 hover:bg-cream hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="mt-3 max-w-xs">
                    <FileField
                      label="Or upload a certificate file"
                      folder="certificates"
                      onUploaded={(url) => {
                        const next = [...draftContent.certifications];
                        next[i] = { ...c, url };
                        setDraftContent({ ...draftContent, certifications: next });
                      }}
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() => setDraftContent({ ...draftContent, certifications: [...draftContent.certifications, { name: "New certification", url: "" }] })}
                className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-ink/30 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-ink/50 hover:border-sand-deep hover:text-sand-deep"
              >
                <Plus size={13} /> Add certification
              </button>
            </div>
          )}

          {tab === "education" && (
            <div className="space-y-4">
              {draftContent.education.map((ed, i) => (
                <div key={i} className="rounded-lg border border-line p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[11px] font-extrabold uppercase tracking-widest text-sand-deep">Education {i + 1}</p>
                    <button
                      onClick={() => setDraftContent({ ...draftContent, education: draftContent.education.filter((_, idx) => idx !== i) })}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-ink/40 hover:bg-cream hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    <Field
                      label="School"
                      value={ed.school}
                      onChange={(v) => {
                        const next = [...draftContent.education];
                        next[i] = { ...ed, school: v };
                        setDraftContent({ ...draftContent, education: next });
                      }}
                    />
                    <Field
                      label="Program / campus"
                      value={ed.program}
                      onChange={(v) => {
                        const next = [...draftContent.education];
                        next[i] = { ...ed, program: v };
                        setDraftContent({ ...draftContent, education: next });
                      }}
                    />
                    <Field
                      label="Degree"
                      value={ed.degree}
                      onChange={(v) => {
                        const next = [...draftContent.education];
                        next[i] = { ...ed, degree: v };
                        setDraftContent({ ...draftContent, education: next });
                      }}
                    />
                    <Field
                      label="Expected graduation"
                      value={ed.expected}
                      onChange={(v) => {
                        const next = [...draftContent.education];
                        next[i] = { ...ed, expected: v };
                        setDraftContent({ ...draftContent, education: next });
                      }}
                    />
                    <Field
                      label="CGPA/Grade"
                      value={ed.cgpa}
                      onChange={(v) => {
                        const next = [...draftContent.education];
                        next[i] = { ...ed, cgpa: v };
                        setDraftContent({ ...draftContent, education: next });
                      }}
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() =>
                  setDraftContent({
                    ...draftContent,
                    education: [...draftContent.education, { school: "New school", program: "", degree: "", expected: "", cgpa: "" }],
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-ink/30 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-ink/50 hover:border-sand-deep hover:text-sand-deep"
              >
                <Plus size={13} /> Add Education
              </button>
            </div>
          )}

          {tab === "projects" && (
            <div className="space-y-4">
              {draftProjects.map((p, i) => (
                <div key={p.id} className="rounded-lg border border-line p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[11px] font-extrabold uppercase tracking-widest text-sand-deep">Project 0{p.id}</p>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-ink/50">
                        <input
                          type="checkbox"
                          checked={p.featured !== false}
                          onChange={(e) => { const next = [...draftProjects]; next[i] = { ...p, featured: e.target.checked }; setDraftProjects(next); }}
                          className="h-3.5 w-3.5 accent-sand-deep"
                        />
                        Featured
                      </label>
                      <button
                        onClick={() => setDraftProjects(draftProjects.filter((_, idx) => idx !== i))}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-ink/40 hover:bg-cream hover:text-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Field label="Name" value={p.name} onChange={(v) => { const next = [...draftProjects]; next[i] = { ...p, name: v }; setDraftProjects(next); }} />
                    <Field label="Tagline" value={p.tag} onChange={(v) => { const next = [...draftProjects]; next[i] = { ...p, tag: v }; setDraftProjects(next); }} />
                    <Field label="Role" value={p.role} onChange={(v) => { const next = [...draftProjects]; next[i] = { ...p, role: v }; setDraftProjects(next); }} />
                    <Field label="Year" value={p.year} onChange={(v) => { const next = [...draftProjects]; next[i] = { ...p, year: v }; setDraftProjects(next); }} />
                    <Field label="Timeline" value={p.timeline} onChange={(v) => { const next = [...draftProjects]; next[i] = { ...p, timeline: v }; setDraftProjects(next); }} />
                    <Field label="Tools (comma separated)" value={p.tools.join(", ")} onChange={(v) => { const next = [...draftProjects]; next[i] = { ...p, tools: v.split(",").map((s) => s.trim()).filter(Boolean) }; setDraftProjects(next); }} />
                    <Field label="GitHub link" value={p.github ?? ""} onChange={(v) => { const next = [...draftProjects]; next[i] = { ...p, github: v }; setDraftProjects(next); }} />
                    <Field label="Live demo link" value={p.demo ?? ""} onChange={(v) => { const next = [...draftProjects]; next[i] = { ...p, demo: v }; setDraftProjects(next); }} />
                  </div>
                  <div className="mt-3">
                    <Field label="Overview" value={p.overview} onChange={(v) => { const next = [...draftProjects]; next[i] = { ...p, overview: v }; setDraftProjects(next); }} textarea />
                  </div>
                  <div className="mt-3">
                    <Field
                      label="Highlights (one per line)"
                      value={p.highlights.join("\n")}
                      onChange={(v) => { const next = [...draftProjects]; next[i] = { ...p, highlights: v.split("\n").map((s) => s.trim()).filter(Boolean) }; setDraftProjects(next); }}
                      textarea
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() =>
                  setDraftProjects([
                    ...draftProjects,
                    {
                      id: (draftProjects.at(-1)?.id ?? 0) + 1,
                      name: "New project",
                      tag: "Short tagline",
                      color: "#5b7cd9",
                      deep: "#3f5fc0",
                      onDark: false,
                      devices: "phones",
                      year: "2026",
                      role: "Your role",
                      timeline: "Timeline",
                      tools: [],
                      overview: "",
                      highlights: [],
                      github: "",
                      demo: "",
                      featured: true,
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-ink/30 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-ink/50 hover:border-sand-deep hover:text-sand-deep"
              >
                <Plus size={13} /> Add project
              </button>
            </div>
          )}
        </div>

        {/* footer */}
        <div className="flex items-center justify-end gap-3 border-t border-line px-6 py-4">
          {saveError && <p className="mr-auto text-[11px] font-semibold text-red-600">{saveError}</p>}
          <button onClick={onClose} className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest text-ink/50 hover:text-ink">
            Close
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-paper hover:bg-sand-deep disabled:opacity-50"
          >
            <Save size={14} /> {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
