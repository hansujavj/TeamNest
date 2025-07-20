"use client";
import HamburgerSidebar from "@/components/HamburgerSidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function HamburgerSidebarWrapper() {
  const pathname = usePathname();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Initial user fetch
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchUnread = async () => {
      const { data } = await supabase
        .from("notifications")
        .select("read_status")
        .eq("user_id", user.id);
      setUnreadNotifications(((data || []) as { read_status: boolean }[]).filter((n) => !n.read_status).length);
    };
    fetchUnread();
  }, [user]);

  if (!user) return null;
  return <HamburgerSidebar unreadNotifications={unreadNotifications} activePath={pathname} />;
} 