import { createFileRoute, Outlet, redirect, useLocation } from "@tanstack/react-router";
import { AuthProvider, useAuth } from "@/lib/auth/AuthContext";
import { getSession } from "@/lib/auth";
import { AdminLayout } from "@/components/admin/AdminLayout";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location }) => {
    const session = await getSession();
    const onLoginPage = location.pathname.includes("/admin/login");

    if (!session && !onLoginPage) {
      throw redirect({ to: "/admin/login" });
    }
    if (session && onLoginPage) {
      throw redirect({ to: "/admin" });
    }
  },
  component: AdminRoot,
});

function AdminRoot() {
  return (
    <AuthProvider>
      <AdminGate />
    </AuthProvider>
  );
}

/**
 * Decides between the bare <Outlet> (login page) and the full
 * authenticated shell. Lives inside AuthProvider so it can read
 * session state for the post-login render swap.
 */
function AdminGate() {
  const { session, isLoading } = useAuth();
  const pathname = useLocation({ select: (l) => l.pathname });
  const onLoginPage = pathname.includes("/admin/login");

  // Login page renders standalone, no shell, regardless of auth state.
  if (onLoginPage) {
    return <Outlet />;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-6 w-6 animate-spin-slow rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  // beforeLoad already redirected unauthenticated users; this is a guard
  // for the brief client window before the redirect resolves.
  if (!session) {
    return null;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
