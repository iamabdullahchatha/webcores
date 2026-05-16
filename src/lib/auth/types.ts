import type { Session as SupabaseSession } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

export type AdminRole = "owner" | "admin" | "editor";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type Session = SupabaseSession;

export type AuthState = {
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
};
