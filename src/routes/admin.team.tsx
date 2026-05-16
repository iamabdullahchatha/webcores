import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Users, UserPlus, X, Crown, Shield, Feather,
  CheckCircle2, Clock, XCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth/AuthContext";
import { requireRole } from "@/lib/auth";
import type { Database } from "@/lib/supabase/types";
import { FormField, inputClass } from "@/components/admin/ui/FormField";
import { ConfirmDialog } from "@/components/admin/ui/ConfirmDialog";

export const Route = createFileRoute("/admin/team")({
  component: TeamPage,
});

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

/* ─── helpers ─────────────────────────────────────────────────────────── */
function RolePill({ role }: { role: string }) {
  if (role === "owner")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full gradient-primary text-primary-foreground px-2.5 py-0.5 text-xs font-bold">
        <Crown className="h-3 w-3" /> Owner
      </span>
    );
  if (role === "admin")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 text-blue-500 px-2.5 py-0.5 text-xs font-bold">
        <Shield className="h-3 w-3" /> Admin
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 text-emerald-500 px-2.5 py-0.5 text-xs font-bold">
      <Feather className="h-3 w-3" /> Editor
    </span>
  );
}

function StatusDot({ active, invited }: { active: boolean; invited: boolean }) {
  if (!active && invited)
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-amber-500 font-medium">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /> Invited
      </span>
    );
  if (!active)
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
        <span className="w-2 h-2 rounded-full bg-muted-foreground/40" /> Deactivated
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
      <span className="w-2 h-2 rounded-full bg-emerald-400" /> Active
    </span>
  );
}

function Avatar({ name, email }: { name: string; email: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const hue = (email.charCodeAt(0) * 37 + email.charCodeAt(1) * 13) % 360;
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
      style={{ background: `hsl(${hue},55%,42%)` }}
    >
      {initials}
    </div>
  );
}

/* ─── Invite modal ─────────────────────────────────────────────────────── */
function InviteModal({
  callerRole,
  onClose,
  onInvited,
}: {
  callerRole: string;
  onClose: () => void;
  onInvited: () => void;
}) {
  const [form, setForm] = useState({ full_name: "", email: "", role: "editor" as "admin" | "editor" });
  const [sending, setSending] = useState(false);

  async function send() {
    if (!form.full_name.trim() || !form.email.trim()) {
      toast.error("Full name and email are required");
      return;
    }
    setSending(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/team/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token ?? ""}`,
        },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Invite failed");
      toast.success(`Invite sent to ${form.email}`);
      onInvited();
      onClose();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Invite failed");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative glass rounded-2xl border border-border/50 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
          <h3 className="font-display text-base font-semibold flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-primary" /> Invite Team Member
          </h3>
          <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <FormField label="Full Name" htmlFor="inv-name">
            <input
              id="inv-name"
              className={inputClass}
              placeholder="Jane Smith"
              value={form.full_name}
              onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))}
            />
          </FormField>
          <FormField label="Email Address" htmlFor="inv-email">
            <input
              id="inv-email"
              type="email"
              className={inputClass}
              placeholder="jane@example.com"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            />
          </FormField>
          <FormField label="Role" htmlFor="inv-role">
            <select
              id="inv-role"
              className={`${inputClass} bg-transparent`}
              value={form.role}
              onChange={(e) => setForm((p) => ({ ...p, role: e.target.value as "admin" | "editor" }))}
            >
              {callerRole === "owner" && <option value="admin" className="bg-background">Admin</option>}
              <option value="editor" className="bg-background">Editor</option>
            </select>
          </FormField>
          <p className="text-xs text-muted-foreground">
            They'll receive an email with a link to set their password and join the CMS.
          </p>
        </div>
        <div className="px-6 py-4 border-t border-border/40 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2">Cancel</button>
          <button
            type="button"
            onClick={send}
            disabled={sending}
            className="inline-flex items-center gap-2 rounded-xl gradient-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold shadow-elegant hover:opacity-90 transition-all duration-200 disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send Invite"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────── */
function TeamPage() {
  const { profile: me, session } = useAuth();
  const myId = session?.user.id;
  const isOwner = me?.role === "owner";
  const isAdmin = me?.role === "admin";

  const [members, setMembers] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInvite, setShowInvite] = useState(false);
  const [confirmDeactivate, setConfirmDeactivate] = useState<string | null>(null);
  const [working, setWorking] = useState<string | null>(null);

  async function load() {
    const { data } = await supabase.from("profiles").select("*").order("created_at");
    setMembers((data ?? []) as unknown as ProfileRow[]);
    setLoading(false);
  }

  useEffect(() => { void load(); }, []);

  async function changeRole(memberId: string, newRole: "admin" | "editor") {
    setWorking(memberId);
    const { error } = await supabase.from("profiles").update({ role: newRole } as unknown as ProfileRow).eq("id", memberId);
    setWorking(null);
    if (error) { toast.error(error.message); return; }
    toast.success("Role updated");
    void load();
  }

  async function deactivate(memberId: string) {
    setWorking(memberId);
    const { error } = await supabase.from("profiles").update({ is_active: false } as unknown as ProfileRow).eq("id", memberId);
    setWorking(null);
    setConfirmDeactivate(null);
    if (error) { toast.error(error.message); return; }
    toast.success("Access revoked");
    void load();
  }

  async function reactivate(memberId: string) {
    setWorking(memberId);
    const { error } = await supabase.from("profiles").update({ is_active: true } as unknown as ProfileRow).eq("id", memberId);
    setWorking(null);
    if (error) { toast.error(error.message); return; }
    toast.success("Access restored");
    void load();
  }

  const canAct = (target: ProfileRow) => {
    if (target.id === myId) return false;
    if (isOwner) return target.role !== "owner";
    if (isAdmin) return target.role === "editor";
    return false;
  };

  const targetName = members.find((m) => m.id === confirmDeactivate)?.full_name ?? "this member";

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="h-6 w-6 animate-spin-slow rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      {showInvite && me && (
        <InviteModal
          callerRole={me.role}
          onClose={() => setShowInvite(false)}
          onInvited={() => void load()}
        />
      )}

      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-base font-semibold flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" /> Team Members
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {members.filter((m) => m.is_active).length} active · {members.length} total
            </p>
          </div>
          {(isOwner || isAdmin) && (
            <button
              type="button"
              onClick={() => setShowInvite(true)}
              className="inline-flex items-center gap-1.5 rounded-xl gradient-primary text-primary-foreground px-4 py-2 text-xs font-semibold shadow-elegant hover:opacity-90 transition-all duration-200"
            >
              <UserPlus className="h-3.5 w-3.5" /> Invite Member
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 text-left">
                {["Member", "Role", "Status", "Last Login", "Actions"].map((h) => (
                  <th key={h} className={`px-6 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground ${h === "Actions" ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map((m) => {
                const isMe = m.id === myId;
                const actable = canAct(m);
                const isWorking = working === m.id;
                const invited = !m.is_active && !!m.invite_token;

                return (
                  <tr key={m.id} className="border-b border-border/20 hover:bg-primary/3 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={m.full_name} email={m.email} />
                        <div>
                          <p className="font-semibold text-foreground leading-none">
                            {m.full_name} {isMe && <span className="text-xs text-muted-foreground font-normal">(you)</span>}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><RolePill role={m.role} /></td>
                    <td className="px-6 py-4"><StatusDot active={m.is_active} invited={invited} /></td>
                    <td className="px-6 py-4 text-xs text-muted-foreground">
                      {/* last login not on profile row — shown via Security page */}
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {m.created_at ? new Date(m.created_at).toLocaleDateString() : "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {actable && !isWorking && (
                        <div className="inline-flex items-center gap-2">
                          {/* Role toggle (owner only) */}
                          {isOwner && m.role !== "owner" && (
                            <select
                              value={m.role}
                              onChange={(e) => changeRole(m.id, e.target.value as "admin" | "editor")}
                              className="glass rounded-lg px-2 py-1 text-xs bg-transparent border border-border/40 focus:border-primary/40 focus:outline-none"
                            >
                              <option value="admin" className="bg-background">Admin</option>
                              <option value="editor" className="bg-background">Editor</option>
                            </select>
                          )}
                          {/* Deactivate / Reactivate */}
                          {m.is_active ? (
                            <ConfirmDialog
                              open={confirmDeactivate === m.id}
                              onOpenChange={(o) => setConfirmDeactivate(o ? m.id : null)}
                              title="Revoke access"
                              description={`This will immediately revoke access for ${targetName}. They will be signed out of all active sessions.`}
                              loading={isWorking}
                              onConfirm={() => deactivate(m.id)}
                              trigger={
                                <button
                                  type="button"
                                  className="inline-flex items-center gap-1 rounded-lg bg-destructive/10 text-destructive px-3 py-1.5 text-xs font-semibold hover:bg-destructive/20 transition-colors duration-150"
                                >
                                  <XCircle className="h-3 w-3" /> Deactivate
                                </button>
                              }
                            />
                          ) : (
                            <button
                              type="button"
                              onClick={() => reactivate(m.id)}
                              className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 text-emerald-500 px-3 py-1.5 text-xs font-semibold hover:bg-emerald-500/20 transition-colors duration-150"
                            >
                              <CheckCircle2 className="h-3 w-3" /> Reactivate
                            </button>
                          )}
                        </div>
                      )}
                      {isWorking && <span className="text-xs text-muted-foreground">Saving…</span>}
                      {!actable && !isMe && <span className="text-xs text-muted-foreground">—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
