/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { BellIcon, CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<{ id: string; read_status: boolean }[]>([]);
  const [notificationsWithTeams, setNotificationsWithTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Get user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      // Get notifications
      const { data: notifications } = await supabase
        .from("notifications")
        .select("id, user_id, content, read_status, timestamp, team_id, task_id")
        .eq("user_id", user.id)
        .order("timestamp", { ascending: false });
      setNotifications((notifications || []) as { id: string; read_status: boolean }[]);
      console.log("Notifications:", notifications);
      setLoading(false);
      // Mark all as read
      if (notifications && notifications.some((n) => !n.read_status)) {
        await supabase
          .from("notifications")
          .update({ read_status: true })
          .eq("user_id", user.id)
          .eq("read_status", false);
      }
      // Fetch team names for notifications with team_id
      if (notifications && notifications.length > 0) {
        const teamIds = [...new Set(notifications.map((n: any) => n.team_id).filter(Boolean))];
        let teamsMap: Record<string, string> = {};
        if (teamIds.length > 0) {
          const { data: teams } = await supabase
            .from("teams")
            .select("id, name")
            .in("id", teamIds);
          if (teams) {
            teamsMap = Object.fromEntries(teams.map((t: any) => [t.id, t.name]));
          }
        }
        setNotificationsWithTeams(
          notifications.map((n: any) => ({ ...n, teamName: n.team_id ? teamsMap[n.team_id] : undefined }))
        );
      } else {
        setNotificationsWithTeams([]);
      }
    };
    fetchData();
  }, [router]);

  // Add a handler for dismissing a notification
  const handleDismissNotification = async (id: string) => {
    await supabase
      .from("notifications")
      .update({ read_status: true })
      .eq("id", id);
    setNotificationsWithTeams((prev) => prev.filter((n) => n.id !== id));
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F5F9] to-[#E0E7EF] pb-20 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-white/90 border border-[#D4C9BE] rounded-2xl shadow-lg p-8 flex flex-col gap-8 mt-10">
        <div className="flex items-center gap-3 mb-4">
          <BellIcon className="w-8 h-8 text-[#123458]" />
          <h1 className="text-3xl font-extrabold text-[#123458] tracking-tight">Notifications</h1>
        </div>
        {notificationsWithTeams.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white/80 rounded-2xl shadow-inner border border-[#D4C9BE]/60">
            <CheckCircleIcon className="w-16 h-16 text-green-400 mb-4 animate-bounce" />
            <div className="text-lg font-semibold text-[#123458]/60">You&apos;re all caught up!</div>
            <div className="text-sm text-[#123458]/40 mt-2">No notifications at the moment.</div>
          </div>
        ) : (
          <ul className="space-y-4">
            {notificationsWithTeams.map((n, idx) => (
              <li
                key={n.id}
                className={`relative p-5 pr-10 rounded-2xl shadow transition-all border flex gap-4 items-center ${n.read_status ? 'bg-white border-[#D4C9BE]/40' : 'bg-[#D4C9BE]/30 border-[#D4C9BE] animate-fade-in'} w-full`}
                style={{ animationDelay: `${idx * 40}ms`, cursor: n.team_id ? 'pointer' : 'default' }}
                onClick={() => n.team_id && router.push(`/team/${n.team_id}`)}
              >
                <button
                  className="absolute inset-y-0 right-3 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-200 hover:bg-red-100 z-10 shadow"
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                  onClick={e => { e.stopPropagation(); handleDismissNotification(n.id); }}
                  aria-label="Dismiss notification"
                >
                  <XMarkIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 hover:text-red-500 transition" />
                </button>
                <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${n.read_status ? 'bg-[#D4C9BE] text-[#123458]' : 'bg-[#123458] text-white'} text-xl`}>
                  <BellIcon className="w-6 h-6" />
                </span>
                <div className="flex-1">
                  <div className={`font-medium ${n.read_status ? 'text-[#123458]/80' : 'text-[#123458]'}`}>{n.content}</div>
                  {n.teamName && (
                    <div className="text-xs text-[#123458]/70 mt-1">Team: {n.teamName}</div>
                  )}
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