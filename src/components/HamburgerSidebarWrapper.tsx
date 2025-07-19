"use client";
import HamburgerSidebar from "@/components/HamburgerSidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function HamburgerSidebarWrapper() {
  const pathname = usePathname();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  useEffect(() => {
    const fetchUnread = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("notifications")
        .select("read_status")
        .eq("user_id", user.id);
      setUnreadNotifications((data || []).filter((n: any) => !n.read_status).length);
    };
    fetchUnread();
  }, []);
  return <HamburgerSidebar unreadNotifications={unreadNotifications} activePath={pathname} />;
} 