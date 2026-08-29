export const STORAGE_KEYS = {
  content: "portfolio_content_v1",
  projects: "portfolio_projects_v1",
} as const;

/**
 * Loads JSON from localStorage, falling back to `fallback` if missing or invalid.
 * Objects are shallow-merged over the fallback (so new default fields still show
 * up after you've saved once); arrays are replaced wholesale.
 */
export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (Array.isArray(fallback)) return parsed as T;
    if (typeof fallback === "object" && fallback !== null) {
      return { ...fallback, ...parsed } as T;
    }
    return parsed as T;
  } catch {
    return fallback;
  }
}

export function saveJSON<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
}
