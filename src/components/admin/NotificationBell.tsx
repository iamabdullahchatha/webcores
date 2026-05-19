import { useEffect, useRef, useState, useCallback } from "react";
import { Bell } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import * as Popover from "@radix-ui/react-popover";
import { useNavigate } from "@tanstack/react-router";
import { getSupabase } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type AdminNotification = Database["public"]["Tables"]["admin_notifications"]["Row"];

const MAX_SHOWN = 20;

export function NotificationBell() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<AdminNotification[]>([]);
  const channelRef = useRef<ReturnType<ReturnType<typeof getSupabase>["channel"]> | null>(null);

  const unreadCount = items.filter((n) => !n.is_read).length;

  // Initial fetch
  useEffect(() => {
    let cancelled = false;
    async function fetchInitial() {
      const { data } = await getSupabase()
        .from("admin_notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(MAX_SHOWN);
      if (!cancelled && data) setItems(data as AdminNotification[]);
    }
    fetchInitial();
    return () => { cancelled = true; };
  }, []);

  // Realtime subscription
  useEffect(() => {
    const client = getSupabase();
    const channel = client
      .channel("admin-notifications-bell")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "admin_notifications" },
        (payload) => {
          setItems((prev) => [payload.new as AdminNotification, ...prev].slice(0, MAX_SHOWN));
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "admin_notifications" },
        (payload) => {
          setItems((prev) =>
            prev.map((n) => (n.id === (payload.new as AdminNotification).id ? (payload.new as AdminNotification) : n)),
          );
        },
      )
      .subscribe();

    channelRef.current = channel;
    return () => {
      client.removeChannel(channel);
    };
  }, []);

  const markAllRead = useCallback(async () => {
    const unreadIds = items.filter((n) => !n.is_read).map((n) => n.id);
    if (!unreadIds.length) return;
    setItems((prev) => prev.map((n) => ({ ...n, is_read: true })));
    await getSupabase()
      .from("admin_notifications")
      .update({ is_read: true } as unknown as AdminNotification)
      .in("id", unreadIds);
  }, [items]);

  const markOneRead = useCallback(async (notif: AdminNotification) => {
    if (notif.is_read) return;
    setItems((prev) => prev.map((n) => (n.id === notif.id ? { ...n, is_read: true } : n)));
    await getSupabase()
      .from("admin_notifications")
      .update({ is_read: true } as unknown as AdminNotification)
      .eq("id", notif.id);
  }, []);

  const handleItemClick = useCallback(
    async (notif: AdminNotification) => {
      await markOneRead(notif);
      setOpen(false);
      if (notif.link) {
        navigate({ to: notif.link as Parameters<typeof navigate>[0]["to"] });
      }
    },
    [markOneRead, navigate],
  );

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2 rounded-xl glass border border-border/40 hover:bg-primary/10 hover:border-border/70 transition-colors duration-200"
        >
          <Bell className="h-4 w-4 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-4 min-w-4 px-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold leading-none">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={8}
          className="z-50 w-80 rounded-2xl border border-border/40 bg-card shadow-2xl overflow-hidden outline-none animate-in fade-in-0 zoom-in-95"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
            <span className="text-sm font-semibold text-foreground">Notifications</span>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="text-xs text-primary hover:text-primary/70 transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-96 overflow-y-auto divide-y divide-border/20">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <Bell className="h-7 w-7 text-muted-foreground/30" />
                <p className="text-xs text-muted-foreground">No notifications yet.</p>
              </div>
            ) : (
              items.map((notif) => (
                <button
                  key={notif.id}
                  type="button"
                  onClick={() => handleItemClick(notif)}
                  className={`w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors duration-100 ${
                    notif.is_read ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {!notif.is_read && (
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    )}
                    <div className={!notif.is_read ? "" : "pl-4"}>
                      <p className="text-xs font-semibold text-foreground leading-snug">{notif.title}</p>
                      {notif.body && (
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-snug">
                          {notif.body}
                        </p>
                      )}
                      <p className="text-[10px] text-muted-foreground/60 mt-1">
                        {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
