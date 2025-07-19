"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import { UsersIcon } from "@heroicons/react/24/outline";
import type { User, Profile, Team, TaskAssignment } from "@/types";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const joinInputRef = useRef<HTMLInputElement>(null);
  const [leadTeams, setLeadTeams] = useState<Team[]>([]);
  const [memberTeams, setMemberTeams] = useState<Team[]>([]);
  const [preferredDomains, setPreferredDomains] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  useEffect(() => {
    const getUserAndTasks = async (): Promise<void> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user as User);
      // Fetch user profile for name
      const { data: profileData } = await supabase
        .from("profiles")
        .select("id, name, email")
        .eq("id", user.id)
        .single();
      setProfile(profileData as Profile);
      // Fetch all assigned tasks for this user (across all teams)
      const { data: assignments } = await supabase
        .from("task_assignments")
        .select("*, tasks(id, title, team_id, due_date, priority), teams(name)")
        .eq("user_id", user.id);
      // Join with team info
      let tasksWithTeam: TaskAssignment[] = [];
      if (assignments && assignments.length > 0) {
        // Fetch all teams for the assigned tasks
        const teamIds = Array.from(new Set((assignments as TaskAssignment[]).map((a) => a.tasks?.team_id).filter(Boolean)));
        let teamsMap: Record<string, Team> = {};
        if (teamIds.length > 0) {
          const { data: teams } = await supabase
            .from("teams")
            .select("id, name, created_by")
            .in("id", teamIds);
          if (teams) {
            teamsMap = Object.fromEntries((teams as Team[]).map((t) => [t.id, t]));
          }
        }
        tasksWithTeam = (assignments as TaskAssignment[]).map((a) => ({
          ...a,
          teamId: a.tasks?.team_id,
          teamName: a.tasks?.team_id ? (teamsMap[a.tasks?.team_id]?.name || "Unknown Team") : "Unknown Team",
          title: a.tasks?.title,
          dueDate: a.tasks?.due_date,
          priority: a.tasks?.priority,
        }));
      }
      setAssignedTasks(tasksWithTeam);
      setLoading(false);
    };
    getUserAndTasks();
  }, [router]);

  useEffect(() => {
    // Fetch teams for dashboard
    const getTeams = async () => {
      // Teams you lead
      const { data: leadTeams } = await supabase
        .from("teams")
        .select("id, name, created_by")
        .eq("created_by", user?.id ?? "");
      setLeadTeams((leadTeams || []) as Team[]);
      // Teams you belong to
      const { data: memberTeams } = await supabase
        .from("team_members")
        .select("team_id, teams(id, name, created_by)")
        .eq("user_id", user?.id ?? "");
      // Only show teams where user is not the lead
      const memberTeamsFiltered = (memberTeams || [])
        .map((tm: { teams: Team | Team[] }) => Array.isArray(tm.teams) ? tm.teams[0] : tm.teams)
        .filter((team: Team | undefined) => team && !leadTeams?.some((lt: Team) => lt.id === team.id));
      setMemberTeams(memberTeamsFiltered as Team[]);
      // Fetch preferred domains for all teams
      const { data: memberDomains } = await supabase
        .from("member_domains")
        .select("domain_id, domain:domains(name, team_id)")
        .eq("user_id", user?.id ?? "");
      const pref: Record<string, string[]> = {};
      (memberDomains || []).forEach((md: { domain?: { team_id?: string; name?: string } | { team_id?: string; name?: string }[] }) => {
        let domain = md.domain;
        if (Array.isArray(domain)) domain = domain[0];
        if (domain && domain.team_id) {
          if (!pref[domain.team_id]) pref[domain.team_id] = [];
          pref[domain.team_id].push(domain.name!);
        }
      });
      setPreferredDomains(pref);
    };
    if (user) getTeams();
  }, [user]);

  const handleJoinTeam = (e: React.FormEvent) => {
    e.preventDefault();
    const value = joinInputRef.current?.value.trim();
    if (!value) return;
    // Accept either a full join URL or just the team ID
    let teamId = value;
    try {
      const url = new URL(value);
      const match = url.pathname.match(/join-team\/(.+)$/);
      if (match) teamId = match[1];
    } catch {}
    if (teamId) router.push(`/join-team/${teamId}`);
  };

  // Determine display name for welcome
  const displayName = profile?.name || (user?.email ? user.email.split('@')[0] : '');

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F5F9] to-[#E0E7EF] pb-20 overflow-x-hidden flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full px-4 pt-10 pb-6 flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-4 mb-8 w-full">
          <div>
            <h1 className="text-4xl font-extrabold text-[#123458] mb-1">Welcome{displayName ? `, ${displayName}` : ''}!</h1>
            <p className="text-[#123458] text-base">Your team workspace at a glance.</p>
          </div>
          <button
            className="bg-[#123458] hover:bg-[#D4C9BE] hover:text-[#123458] text-white font-semibold px-6 py-3 rounded-xl shadow-md transition text-base focus:outline-none focus:ring-2 mx-auto"
            onClick={() => {
              toast("Create a new team");
              router.push("/team/create");
            }}
          >
            + Create New Team
          </button>
        </div>
        {/* Join a Team Card */}
        <form onSubmit={handleJoinTeam} className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <input
            ref={joinInputRef}
            type="text"
            placeholder="Paste team join link or enter team ID..."
            className="flex-1 px-4 py-2 rounded-lg border border-[#D4C9BE] bg-white text-[#123458] shadow-sm focus:outline-none focus:ring-2 max-w-md"
          />
          <button
            type="submit"
            className="bg-[#D4C9BE] text-[#123458] font-semibold px-5 py-2 rounded-lg shadow-sm transition hover:bg-[#123458] hover:text-[#D4C9BE]"
          >
            Join Team
          </button>
        </form>
      </div>
      {/* TEAMS SECTION FROM TEAMS PAGE */}
      <div className="w-full max-w-6xl mx-auto px-4 space-y-12 pt-8">
        {/* Teams You Lead */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <UsersIcon className="w-7 h-7 text-[#123458]" />
            <h2 className="text-2xl font-extrabold tracking-tight text-[#123458]">Teams You Lead</h2>
          </div>
          {leadTeams.length === 0 ? (
            <div className="text-[#123458] text-lg font-medium opacity-70">You don&apos;t lead any teams yet.</div>
          ) : (
            <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {leadTeams.map((team) => (
                <li key={team.id} className="rounded-3xl shadow-xl hover:shadow-2xl transition-all p-7 flex flex-col gap-4 group focus-within:ring-2 max-w-full border border-[#D4C9BE]/60 bg-white/90 backdrop-blur-lg hover:scale-[1.03]">
                  <span className="font-bold text-xl group-hover:text-[#123458] transition text-[#123458]">{team.name}</span>
                  <span className="text-base text-[#123458]/70">Team workspace for collaboration.</span>
                  {/* Preferred Domains */}
                  {preferredDomains[team.id] && preferredDomains[team.id].length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {preferredDomains[team.id].map((domain) => (
                        <span key={domain} className="px-3 py-1 rounded-full border text-xs font-bold bg-[#123458] text-white border-[#123458]">{domain}</span>
                      ))}
                    </div>
                  )}
                  <button
                    className="mt-2 font-semibold px-4 py-2 rounded-lg text-base transition border border-[#D4C9BE] bg-gradient-to-r from-[#123458] to-[#D4C9BE] text-white hover:border-[#123458] hover:bg-[#D4C9BE]/90 hover:text-[#123458] hover:scale-105"
                    onClick={() => router.push(`/team/${team.id}`)}
                  >
                    View
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Teams Joined as Member */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <UsersIcon className="w-7 h-7 text-[#123458]" />
            <h2 className="text-2xl font-extrabold tracking-tight text-[#123458]">Teams Joined as Member</h2>
          </div>
          {memberTeams.length === 0 ? (
            <div className="text-[#123458] text-lg font-medium opacity-70">You haven&apos;t joined any teams as a member yet.</div>
          ) : (
            <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {memberTeams.map((team) => (
                <li key={team.id} className="rounded-3xl shadow-xl hover:shadow-2xl transition-all p-7 flex flex-col gap-4 group focus-within:ring-2 max-w-full border border-[#D4C9BE]/60 bg-white/90 backdrop-blur-lg hover:scale-[1.03]">
                  <span className="font-bold text-xl group-hover:text-[#123458] transition text-[#123458]">{team.name}</span>
                  <span className="text-base text-[#123458]/70">Team workspace for collaboration.</span>
                  {/* Preferred Domains */}
                  {preferredDomains[team.id] && preferredDomains[team.id].length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {preferredDomains[team.id].map((domain) => (
                        <span key={domain} className="px-3 py-1 rounded-full border text-xs font-bold bg-[#123458] text-white border-[#123458]">{domain}</span>
                      ))}
                    </div>
                  )}
                  <button
                    className="mt-2 font-semibold px-4 py-2 rounded-lg text-base transition border border-[#D4C9BE] bg-gradient-to-r from-[#123458] to-[#D4C9BE] text-white hover:border-[#123458] hover:bg-[#D4C9BE]/90 hover:text-[#123458] hover:scale-105"
                    onClick={() => router.push(`/team/${team.id}`)}
                  >
                    View
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
} 