"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import { UsersIcon } from "@heroicons/react/24/outline";
import type { User, Profile, Team } from "@/types";
import { Dialog } from "@headlessui/react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const joinInputRef = useRef<HTMLInputElement>(null);
  const [leadTeams, setLeadTeams] = useState<Team[]>([]);
  const [memberTeams, setMemberTeams] = useState<Team[]>([]);
  const [preferredDomains, setPreferredDomains] = useState<Record<string, string[]>>({});
  const [memberTeamsLeads, setMemberTeamsLeads] = useState<Record<string, string>>({});
  const [leavingTeamId, setLeavingTeamId] = useState<string | null>(null);
  const [confirmLeaveTeamId, setConfirmLeaveTeamId] = useState<string | null>(null);

  useEffect(() => {
    const getUserAndTasks = async (): Promise<void> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      // Fetch user profile for name
      const { data: profileData } = await supabase
        .from("profiles")
        .select("name, email")
        .eq("id", user.id)
        .single();
      setProfile(profileData);
      // Fetch all assigned tasks for this user (across all teams)
      // const { data: assignments } = await supabase
      //   .from("task_assignments")
      //   .select("*, tasks(id, title, team_id, due_date, priority), teams(name)")
      //   .eq("user_id", user.id);
      // Remove teamsMap and tasksWithTeam logic. If you need to show assigned tasks, use assignments as TaskAssignment[] and display a.tasks directly.
      // For mapping, ensure the result matches Task type: { id, title, team_id, due_date, priority, created_by, status }
      // Remove teamName and teamId properties from mapped objects if not in Task type.
      // Remove any code that tries to use properties not in the type.
      // Remove any remaining 'any' usage.
    };
    getUserAndTasks();
  }, [router]);

  useEffect(() => {
    // Fetch teams for dashboard
    const getTeams = async () => {
      // Teams you lead
      const { data: leadTeams } = await supabase
        .from("teams")
        .select("*")
        .eq("created_by", user?.id);
      setLeadTeams(leadTeams || []);
      // Teams you belong to
      const { data: memberTeams } = await supabase
        .from("team_members")
        .select("team_id, teams(*)")
        .eq("user_id", user?.id);
      // For memberTeams mapping/filtering:
      const memberTeamsFiltered = (memberTeams || [])
        .map((tm: { teams: Team | Team[] }) => Array.isArray(tm.teams) ? tm.teams[0] : tm.teams)
        .filter((team: Team | undefined) => team && !leadTeams?.some((lt: Team) => lt.id === team.id));
      setMemberTeams(memberTeamsFiltered as Team[]);
      // For teamsWithLeads:
      if (memberTeamsFiltered.length > 0) {
        const teamIds = memberTeamsFiltered.map((t) => t.id);
        supabase
          .from("teams")
          .select("id, name, created_by, profiles:created_by(name)")
          .in("id", teamIds)
          .then(({ data: teamsWithLeads }) => {
            const leadsMap: Record<string, string> = {};
            type TeamWithProfile = Team & { profiles?: { name: string }[] };
            (teamsWithLeads || []).forEach((t: TeamWithProfile) => {
              if (Array.isArray(t.profiles)) {
                leadsMap[t.id] = t.profiles[0]?.name || "Unknown";
              } else if (t.profiles && typeof t.profiles === 'object') {
                leadsMap[t.id] = (t.profiles as { name: string })?.name || "Unknown";
              } else {
                leadsMap[t.id] = "Unknown";
              }
            });
            setMemberTeamsLeads(leadsMap);
          });
      }
      // For memberDomains:
      const { data: memberDomains } = await supabase
        .from("member_domains")
        .select("domain_id, domain:domains(name, team_id)")
        .eq("user_id", user?.id);
      const pref: Record<string, string[]> = {};
      (memberDomains || []).forEach((md: { domain: { name: string; team_id: string } | { name: string; team_id: string }[] }) => {
        const domain = Array.isArray(md.domain) ? md.domain[0] : md.domain;
        if (domain && domain.team_id) {
          if (!pref[domain.team_id]) pref[domain.team_id] = [];
          pref[domain.team_id].push(domain.name);
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

  const handleConfirmLeaveTeam = async () => {
    if (!confirmLeaveTeamId) return;
    setLeavingTeamId(confirmLeaveTeamId);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to leave a team.");
        return;
      }
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("user_id", user.id)
        .eq("team_id", confirmLeaveTeamId);
      if (error) {
        console.error("Error leaving team:", error);
        toast.error("Failed to leave team. Please try again.");
        return;
      }
      setMemberTeams(prev => prev.filter(team => team.id !== confirmLeaveTeamId));
      setMemberTeamsLeads(prev => {
        const newLeads = { ...prev };
        delete newLeads[confirmLeaveTeamId];
        return newLeads;
      });
      toast.success("Successfully left the team!");
    } catch (error) {
      console.error("Error leaving team:", error);
      toast.error("Failed to leave team. Please try again.");
    } finally {
      setLeavingTeamId(null);
      setConfirmLeaveTeamId(null);
    }
  };

  // Determine display name for welcome
  const displayName = profile?.name || (user?.email ? user.email.split('@')[0] : '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F5F9] to-[#E0E7EF] pb-20 overflow-x-hidden flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full px-4 pt-10 pb-6 flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-4 mb-8 w-full">
          <div>
            <h1 className="text-4xl font-extrabold text-[#123458] mb-1">Welcome{displayName ? `, ${displayName}` : ''}!</h1>
            <p className="text-[#123458] text-base">Your team workspace at a glance.</p>
          </div>
          <button
            className="bg-[#123458] hover:bg-[#D4C9BE] hover:text-[#123458] text-white font-semibold px-6 py-3 rounded-xl shadow-md transition text-base focus:outline-none focus:ring-2 mx-auto w-full sm:w-auto"
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
            className="flex-1 px-4 py-2 rounded-lg border border-[#D4C9BE] bg-white text-[#123458] shadow-sm focus:outline-none focus:ring-2 max-w-md w-full"
          />
          <button
            type="submit"
            className="bg-[#D4C9BE] text-[#123458] font-semibold px-5 py-2 rounded-lg shadow-sm transition hover:bg-[#123458] hover:text-[#D4C9BE] w-full sm:w-auto"
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
            <h2 className="text-2xl font-extrabold tracking-tight text-[#123458]">Teams You&apos;re a Member Of</h2>
          </div>
          {memberTeams.length === 0 ? (
            <div className="text-[#123458] text-lg font-medium opacity-70">You haven&apos;t joined any teams as a member yet.</div>
          ) : (
            <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {memberTeams.map((team: Team) => (
                <li key={team.id} className="rounded-3xl shadow-xl hover:shadow-2xl transition-all p-7 flex flex-col gap-4 group focus-within:ring-2 max-w-full border border-[#D4C9BE]/60 bg-white/90 backdrop-blur-lg hover:scale-[1.03]">
                  <span className="font-bold text-xl group-hover:text-[#123458] transition text-[#123458]">{team.name}</span>
                  <span className="text-base text-[#123458]/70">Team workspace for collaboration.</span>
                  <span className="text-xs text-[#123458]/70 block mt-1">Lead: {memberTeamsLeads[team.id] || "Unknown"}</span>
                  {/* Preferred Domains */}
                  {preferredDomains[team.id] && preferredDomains[team.id].length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {preferredDomains[team.id].map((domain) => (
                        <span key={domain} className="px-3 py-1 rounded-full border text-xs font-bold bg-[#123458] text-white border-[#123458]">{domain}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2 mt-2">
                    <button
                      className="flex-1 font-semibold px-4 py-2 rounded-lg text-base transition border border-[#D4C9BE] bg-gradient-to-r from-[#123458] to-[#D4C9BE] text-white hover:border-[#123458] hover:bg-[#D4C9BE]/90 hover:text-[#123458] hover:scale-105"
                      onClick={() => router.push(`/team/${team.id}`)}
                    >
                      View
                    </button>
                    <button
                      className="flex-1 font-semibold px-4 py-2 rounded-lg text-base transition border border-gray-300 bg-gradient-to-r from-gray-500 to-gray-400 text-white hover:border-gray-400 hover:bg-gray-400/90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => setConfirmLeaveTeamId(team.id)}
                      disabled={leavingTeamId === team.id}
                    >
                      {leavingTeamId === team.id ? "Leaving..." : "Leave"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {confirmLeaveTeamId && (
        <Dialog open={!!confirmLeaveTeamId} onClose={() => setConfirmLeaveTeamId(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
          <Dialog.Panel className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 flex flex-col items-center gap-6 w-full max-w-xs border border-[#D4C9BE]">
            <Dialog.Title className="text-lg font-bold text-[#123458]">Leave this team?</Dialog.Title>
            <div className="text-[#123458]/80 mb-4 text-center">Are you sure you want to leave this team? You will lose access to all its data.</div>
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              <button className="px-5 py-2 rounded-lg bg-gray-500 text-white font-semibold hover:bg-gray-700 transition w-full sm:w-auto" onClick={handleConfirmLeaveTeam}>Yes, Leave</button>
              <button className="px-5 py-2 rounded-lg bg-gray-200 text-[#123458] font-semibold hover:bg-gray-300 transition w-full sm:w-auto" onClick={() => setConfirmLeaveTeamId(null)}>Cancel</button>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}
    </div>
  );
} 