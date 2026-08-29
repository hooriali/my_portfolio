import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { defaultSiteContent, type SiteContent, type ExperienceItem, type EducationInfo, type CertificationItem } from "@/data/siteContent";
import { projects as defaultProjects, type Project } from "@/data/projects";
import { supabaseConfigured } from "@/lib/supabaseClient";
import * as api from "@/lib/contentApi";

interface ContentContextValue {
  content: SiteContent;
  projects: Project[];
  loading: boolean;
  /** Set when Supabase isn't configured or the fetch failed — content shown is the bundled fallback. */
  usingFallback: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  /** Persists the full profile/bio/contact section (everything in `content` except skills/experience/education/certifications, which have their own save functions below). */
  saveProfile: (c: SiteContent) => Promise<void>;
  saveSkills: (skills: Record<string, string[]>) => Promise<void>;
  saveExperience: (experience: ExperienceItem[]) => Promise<void>;
  saveEducation: (education: EducationInfo[]) => Promise<void>;
  saveCertifications: (certifications: CertificationItem[]) => Promise<void>;
  saveProjects: (projects: Project[]) => Promise<void>;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(!supabaseConfigured);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!supabaseConfigured) {
      setContent(defaultSiteContent);
      setProjects(defaultProjects);
      setUsingFallback(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const [fetchedContent, fetchedProjects] = await Promise.all([api.fetchSiteContent(), api.fetchProjects()]);
      setContent(fetchedContent);
      setProjects(fetchedProjects);
      setUsingFallback(false);
      setError(null);
    } catch (err) {
      console.error("Failed to load content from Supabase, using bundled fallback:", err);
      setContent(defaultSiteContent);
      setProjects(defaultProjects);
      setUsingFallback(true);
      setError(err instanceof Error ? err.message : "Unknown error loading content");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Each save* function writes to Supabase then re-fetches so every tab/
  // device converges on the same source of truth (rather than trusting
  // optimistic local state, which is exactly the "two competing sources of
  // truth" problem this migration was meant to remove).
  const saveProfile = async (c: SiteContent) => {
    await api.saveProfile(c);
    await refresh();
  };
  const saveSkills = async (skills: Record<string, string[]>) => {
    await api.saveSkills(skills);
    await refresh();
  };
  const saveExperience = async (experience: ExperienceItem[]) => {
    await api.saveExperience(experience);
    await refresh();
  };
  const saveEducation = async (education: EducationInfo[]) => {
    await api.saveEducation(education);
    await refresh();
  };
  const saveCertifications = async (certifications: CertificationItem[]) => {
    await api.saveCertifications(certifications);
    await refresh();
  };
  const saveProjects = async (newProjects: Project[]) => {
    await api.saveProjects(newProjects);
    await refresh();
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        projects,
        loading,
        usingFallback,
        error,
        refresh,
        saveProfile,
        saveSkills,
        saveExperience,
        saveEducation,
        saveCertifications,
        saveProjects,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within a ContentProvider");
  return ctx;
}
