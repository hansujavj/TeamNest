"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { BellIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import type { User } from "@/types";

export default function NotificationsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<{ id: string; read_status: boolean }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Get user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user as User);
      // Get notifications
      const { data: notifications } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("timestamp", { ascending: false });
      setNotifications((notifications || []) as { id: string; read_status: boolean }[]);
      setLoading(false);
      // Mark all as read
      if (notifications && notifications.some((n) => !n.read_status)) {
        await supabase
          .from("notifications")
          .update({ read_status: true })
          .eq("user_id", user.id)
          .eq("read_status", false);
      }
    };
    fetchData();
  }, [router]);

  if (loading) return <div className="p-8">Loading...</div>;

  const allRead = notifications.length > 0 && notifications.every((n) => n.read_status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F5F9] to-[#E0E7EF] pb-20 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-white/90 border border-[#D4C9BE] rounded-2xl shadow-lg p-8 flex flex-col gap-8 mt-10">
        <div className="flex items-center gap-3 mb-4">
          <BellIcon className="w-8 h-8 text-[#123458]" />
          <h1 className="text-3xl font-extrabold text-[#123458] tracking-tight">Notifications</h1>
        </div>
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white/80 rounded-2xl shadow-inner border border-[#D4C9BE]/60">
            <CheckCircleIcon className="w-16 h-16 text-green-400 mb-4 animate-bounce" />
            <div className="text-lg font-semibold text-[#123458]/60">You're all caught up!</div>
            <div className="text-sm text-[#123458]/40 mt-2">No notifications at the moment.</div>
          </div>
        ) : (
          <ul className="space-y-4">
            {notifications.map((n, idx) => (
              <li
                key={n.id}
                className={`relative p-5 rounded-2xl shadow transition-all border flex gap-4 items-center ${n.read_status ? 'bg-white border-[#D4C9BE]/40' : 'bg-[#D4C9BE]/30 border-[#D4C9BE] animate-fade-in'}`}
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${n.read_status ? 'bg-[#D4C9BE] text-[#123458]' : 'bg-[#123458] text-white'} text-xl`}>
                  <BellIcon className="w-6 h-6" />
                </span>
                <div className="flex-1">
                  <div className={`font-medium ${n.read_status ? 'text-[#123458]/80' : 'text-[#123458]'}`}>{n.content}</div>
                  <div className="text-xs text-[#123458]/50 mt-1">{new Date(n.timestamp).toLocaleString()}</div>
                </div>
                {!n.read_status && <span className="ml-2 px-2 py-0.5 rounded-full bg-[#123458] text-white text-xs font-semibold">New</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in { animation: fade-in 0.5s both; }
      `}</style>
    </div>
  );
} 