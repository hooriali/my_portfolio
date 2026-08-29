import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Only the anon (publishable) key ever goes in frontend code — it's safe to
// ship because Row Level Security on every table decides what it can
// actually read/write (see supabase/schema.sql). The service-role key must
// never appear here or anywhere in the frontend bundle.
export const supabaseConfigured = Boolean(url && anonKey);

if (!supabaseConfigured) {
  // Don't throw — this lets the app still render (with a clear "not
  // configured" state, see ContentContext) instead of a blank white screen
  // if someone forgets to set the env vars.
  console.warn(
    "Supabase is not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY " +
      "(see .env.example). Falling back to bundled placeholder content.",
  );
}

export const supabase = createClient(url || "https://placeholder.supabase.co", anonKey || "placeholder-anon-key");
