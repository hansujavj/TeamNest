"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { LightBulbIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { User } from "@/types";

export default function NotificationBell() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<{ id: string; read_status: boolean; content: string; timestamp: string }[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserAndNotifications = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user as User);
      if (user) {
        const { data } = await supabase
          .from("notifications")
          .select("id, read_status, content, timestamp")
          .eq("user_id", user.id)
          .order("timestamp", { ascending: false });
        setNotifications((data || []) as { id: string; read_status: boolean; content: string; timestamp: string }[]);
        setUnreadCount(((data || []) as { read_status: boolean }[]).filter((n) => !n.read_status).length);
      }
    };
    fetchUserAndNotifications();
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleNotificationClick = async (id: string) => {
    await supabase
      .from("notifications")
      .update({ read_status: true })
      .eq("id", id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read_status: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
    router.push("/notifications");
    setDropdownOpen(false);
  };

  // Add a handler for dismissing a notification
  const handleDismissNotification = async (id: string) => {
    await supabase
      .from("notifications")
      .update({ read_status: true })
      .eq("id", id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition"
        onClick={() => setDropdownOpen((v) => !v)}
        aria-label="Notifications"
      >
        <LightBulbIcon
          className="w-6 h-6 text-slate-700"
        />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
            {unreadCount}
          </span>
        )}
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 max-w-xs bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
          <div className="px-4 py-2 text-slate-700 text-sm font-semibold border-b">Notifications</div>
          {notifications.length === 0 ? (
            <div className="px-4 py-4 text-slate-500 text-sm">No notifications.</div>
          ) : (
            <ul className="max-h-80 overflow-y-auto">
              {notifications.slice(0, 8).map((n) => (
                <li
                  key={n.id}
                  className={`px-4 py-3 text-sm cursor-pointer hover:bg-slate-100 transition flex flex-col relative ${n.read_status ? "text-slate-500" : "text-slate-900 font-semibold bg-blue-50"}`}
                  onClick={() => handleNotificationClick(n.id)}
                >
                  <button
                    className="absolute top-2 right-2 p-1 rounded hover:bg-red-100 z-10"
                    onClick={e => { e.stopPropagation(); handleDismissNotification(n.id); }}
                    aria-label="Dismiss notification"
                  >
                    <XMarkIcon className="w-4 h-4 text-gray-400 hover:text-red-500 transition" />
                  </button>
                  <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${n.read_status ? 'bg-slate-200 dark:bg-gray-700' : 'bg-blue-500 text-white dark:bg-blue-600'} text-xl`}> <LightBulbIcon className="w-6 h-6" /> </span>
                  <span>{n.content}</span>
                  <span className="text-xs text-slate-400 mt-1">{new Date(n.timestamp).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="px-4 py-2 border-t text-right">
            <a
              href="/notifications"
              className="text-blue-600 hover:underline text-xs font-medium"
              onClick={() => setDropdownOpen(false)}
            >
              View all
            </a>
          </div>
        </div>
      )}
    </div>
  );
} 