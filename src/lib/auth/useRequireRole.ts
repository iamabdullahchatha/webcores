import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "./AuthContext";
import type { AdminRole } from "./types";

const ROLE_RANK: Record<AdminRole, number> = { owner: 3, admin: 2, editor: 1 };

export function useRequireRole(allowed: AdminRole[]) {
  const { profile, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (!profile) {
      navigate({ to: "/admin/login" });
      return;
    }
    const userRank = ROLE_RANK[profile.role as AdminRole] ?? 0;
    const minRank = Math.min(...allowed.map((r) => ROLE_RANK[r] ?? 0));
    if (userRank < minRank) {
      navigate({ to: "/admin" });
    }
  }, [profile, isLoading, navigate, allowed]);
}
