import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { getSupabase } from "@/lib/supabase/client";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/admin/accept-invite")({
  component: AcceptInvitePage,
});

type Step = "loading" | "form" | "error" | "success";

function AcceptInvitePage() {
  const navigate = useNavigate();
  const search = new URLSearchParams(window.location.search);
  const token = search.get("token") ?? "";

  const [step, setStep] = useState<Step>("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [profile, setProfile] = useState<{ email: string; full_name: string; id: string } | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) { setErrorMsg("Invalid or missing invite token."); setStep("error"); return; }
    (async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, full_name, is_active, invite_token")
        .eq("invite_token", token)
        .maybeSingle();

      if (error || !data) { setErrorMsg("This invite link is invalid or has already been used."); setStep("error"); return; }
      if (data.is_active) { setErrorMsg("This invite has already been accepted. Please sign in."); setStep("error"); return; }

      setProfile({ email: data.email, full_name: data.full_name, id: data.id });
      setStep("form");
    })();
  }, [token]);

  async function submit() {
    if (password.length < 8) { setErrorMsg("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setErrorMsg("Passwords do not match."); return; }
    if (!profile) return;

    setSaving(true);
    setErrorMsg("");

    try {
      // Create auth user via the invite endpoint would require service-role.
      // Instead we use signUp — the profile row already exists with their email,
      // so we just link the auth.users record.
      const client = getSupabase();
      const { data: signUpData, error: signUpErr } = await client.auth.signUp({
        email: profile.email,
        password,
        options: { emailRedirectTo: undefined },
      });

      if (signUpErr) throw new Error(signUpErr.message);
      const authUserId = signUpData.user?.id;
      if (!authUserId) throw new Error("Sign-up did not return a user.");

      // Update the profile: link the real auth UUID, clear invite_token, activate
      const { error: updErr } = await supabase
        .from("profiles")
        .update({
          id: authUserId,
          invite_token: null,
          is_active: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
        .eq("invite_token", token);

      if (updErr) throw new Error(updErr.message);

      // Sign in immediately
      await client.auth.signInWithPassword({ email: profile.email, password });

      setStep("success");
      setTimeout(() => navigate({ to: "/admin" }), 1800);
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong.");
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <img src={logo} alt="Webcore Solutions" className="h-8 w-auto" />
        </div>

        <div className="glass rounded-2xl border border-border/50 overflow-hidden shadow-2xl">
          {step === "loading" && (
            <div className="p-10 flex flex-col items-center gap-4">
              <div className="h-7 w-7 animate-spin-slow rounded-full border-2 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">Verifying your invite…</p>
            </div>
          )}

          {step === "error" && (
            <div className="p-10 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                <span className="text-2xl">⚠️</span>
              </div>
              <p className="font-semibold text-foreground">Invite unavailable</p>
              <p className="text-sm text-muted-foreground">{errorMsg}</p>
              <a href="/admin/login" className="inline-block text-primary text-sm font-semibold hover:underline underline-offset-2">
                Go to sign in →
              </a>
            </div>
          )}

          {step === "success" && (
            <div className="p-10 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
              </div>
              <p className="font-semibold text-foreground">Welcome to the team!</p>
              <p className="text-sm text-muted-foreground">Redirecting to the dashboard…</p>
            </div>
          )}

          {step === "form" && profile && (
            <>
              <div className="px-6 py-5 border-b border-border/40">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">You're invited</p>
                <h2 className="font-display text-lg font-bold">Welcome, {profile.full_name.split(" ")[0]}</h2>
                <p className="text-sm text-muted-foreground mt-1">Set a password to activate your account at <strong className="text-foreground">{profile.email}</strong></p>
              </div>

              <div className="p-6 space-y-4">
                {errorMsg && (
                  <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      className="w-full glass rounded-xl px-4 py-3 text-sm bg-transparent border border-border/40 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-200 pr-10"
                      placeholder="Min. 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Confirm Password</label>
                  <input
                    type={showPw ? "text" : "password"}
                    className="w-full glass rounded-xl px-4 py-3 text-sm bg-transparent border border-border/40 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                    placeholder="Repeat password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && submit()}
                  />
                </div>

                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li className={password.length >= 8 ? "text-emerald-500" : ""}>✓ At least 8 characters</li>
                  <li className={password && password === confirm ? "text-emerald-500" : ""}>✓ Passwords match</li>
                </ul>
              </div>

              <div className="px-6 py-4 border-t border-border/40">
                <button
                  type="button"
                  onClick={submit}
                  disabled={saving}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl gradient-primary text-primary-foreground px-5 py-3 text-sm font-semibold shadow-elegant hover:opacity-90 transition-all duration-200 disabled:opacity-60"
                >
                  {saving ? "Activating account…" : "Set Password & Join"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
