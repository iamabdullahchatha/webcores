import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/admin/login")({
  component: LoginPage,
});

const inputClass =
  "w-full glass rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/50 bg-transparent border border-border/40 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-200 text-foreground";

function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn(email, password);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    navigate({ to: "/admin" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm glass border border-border/60 rounded-2xl p-8 shadow-xl">
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Webcore Solutions"
            width={120}
            height={32}
            className="w-[120px] h-auto"
            decoding="async"
          />
        </div>

        <h1 className="font-display text-xl font-semibold text-center text-foreground">
          Admin Sign In
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground text-center">
          Enter your credentials to access the dashboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="admin-email"
              className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
            >
              Email
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="admin-password"
              className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
            >
              Password
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          {error && <p className="text-destructive text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full inline-flex items-center justify-center gap-2 rounded-2xl gradient-primary text-primary-foreground px-7 py-3 font-semibold shadow-elegant hover:shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 text-sm disabled:opacity-70 disabled:pointer-events-none overflow-hidden"
          >
            {loading && (
              <span className="h-4 w-4 animate-spin-slow rounded-full border-2 border-primary-foreground border-t-transparent" />
            )}
            <span className="relative">{loading ? "Signing in…" : "Sign In"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
