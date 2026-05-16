/**
 * Auth context — mount inside the admin parent route only.
 *
 * Do NOT wrap the public site in <AuthProvider>. The public pages
 * are prerendered and have no auth dependency; adding the provider
 * forces a Supabase session lookup on every visitor.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/lib/supabase/client";
import { getProfile, signIn as signInHelper, signOut as signOutHelper } from "./index";
import type { Profile, Session } from "./types";

type AuthContextValue = {
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
  session: null,
  profile: null,
  isLoading: true,
  signIn: async () => ({ error: "AuthProvider not mounted" }),
  signOut: async () => {
    /* no-op default */
  },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Track the last loaded user id to avoid duplicate profile fetches when
  // Supabase emits TOKEN_REFRESHED with the same user.
  const loadedUserId = useRef<string | null>(null);

  const loadProfile = useCallback(async (userId: string) => {
    if (loadedUserId.current === userId) return;
    loadedUserId.current = userId;
    const p = await getProfile(userId);
    setProfile(p);
  }, []);

  useEffect(() => {
    let active = true;

    // If Supabase env vars are missing, the lazy client throws on first
    // touch. Catch it so the login page still renders with a clear error
    // path instead of crashing the whole admin tree to a blank screen.
    let unsubscribe: (() => void) | undefined;

    try {
      // Initial session probe.
      supabase.auth.getSession().then(async ({ data }) => {
        if (!active) return;
        setSession(data.session);
        if (data.session?.user) {
          await loadProfile(data.session.user.id);
        }
        setIsLoading(false);
      });

      const { data: sub } = supabase.auth.onAuthStateChange(async (event, newSession) => {
        if (!active) return;
        setSession(newSession);

        if (event === "SIGNED_OUT" || !newSession?.user) {
          loadedUserId.current = null;
          setProfile(null);
          return;
        }

        // SIGNED_IN, TOKEN_REFRESHED, USER_UPDATED — refresh profile if user changed.
        await loadProfile(newSession.user.id);
      });

      unsubscribe = () => sub.subscription.unsubscribe();
    } catch (err) {
      console.error("Supabase auth unavailable:", err);
      setIsLoading(false);
    }

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, [loadProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    return signInHelper(email, password);
  }, []);

  const signOut = useCallback(async () => {
    await signOutHelper();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ session, profile, isLoading, signIn, signOut }),
    [session, profile, isLoading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
