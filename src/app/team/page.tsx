/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { UsersIcon } from "@heroicons/react/24/solid";
import type { Team } from "@/types";
import { Dialog } from "@headlessui/react";

export default function TeamsPage() {
  const router = useRouter();
  const [leadTeams, setLeadTeams] = useState<Team[]>([]);
  const [memberTeams, setMemberTeams] = useState<Team[]>([]);
  const [memberTeamsLeads, setMemberTeamsLeads] = useState<Record<string, string>>({});
  const [leavingTeamId, setLeavingTeamId] = useState<string | null>(null);
  const [confirmLeaveTeamId, setConfirmLeaveTeamId] = useState<string | null>(null);

  useEffect(() => {
    const getUserAndTeams = async (): Promise<void> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      // Teams you lead
      const { data: leadTeams } = await supabase
        .from("teams")
        .select("id, name, created_by")
        .eq("created_by", user.id);
      setLeadTeams((leadTeams || []) as Team[]);
      // Teams joined as member (exclude teams where user is lead)
      const { data: memberTeams } = await supabase
        .from("team_members")
        .select("team_id, teams(id, name, created_by)")
        .eq("user_id", user.id);
      // Only show teams where user is not the lead
      const memberTeamsFiltered = (memberTeams || [])
        .map((tm: { teams: Team | Team[] }) => Array.isArray(tm.teams) ? tm.teams[0] : tm.teams)
        .filter((team: Team | undefined) => team && !leadTeams?.some((lt: Team) => lt.id === team.id));
      setMemberTeams(memberTeamsFiltered as Team[]);
      // Fetch leads for member teams
      if (memberTeamsFiltered.length > 0) {
        const teamIds = memberTeamsFiltered.map((t) => t.id);
        const { data: teamsWithLeads } = await supabase
          .from("teams")
          .select("id, name, created_by, profiles:created_by(name)")
          .in("id", teamIds);
        const leadsMap: Record<string, string> = {};
        (teamsWithLeads || []).forEach((t: any) => {
          leadsMap[t.id] = t.profiles?.name || "Unknown";
        });
        setMemberTeamsLeads(leadsMap);
      }
    };
    getUserAndTeams();
  }, [router]);

  const handleLeaveTeam = async (teamId: string) => {
    setLeavingTeamId(teamId);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("You must be logged in to leave a team.");
        return;
      }

      // Remove user from team_members table
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("user_id", user.id)
        .eq("team_id", teamId);

      if (error) {
        console.error("Error leaving team:", error);
        alert("Failed to leave team. Please try again.");
        return;
      }

      // Remove team from memberTeams list
      setMemberTeams(prev => prev.filter(team => team.id !== teamId));
      
      // Remove from leads map
      setMemberTeamsLeads(prev => {
        const newLeads = { ...prev };
        delete newLeads[teamId];
        return newLeads;
      });

      alert("Successfully left the team!");
    } catch (error) {
      console.error("Error leaving team:", error);
      alert("Failed to leave team. Please try again.");
    } finally {
      setLeavingTeamId(null);
    }
  };

  const handleConfirmLeaveTeam = async () => {
    if (!confirmLeaveTeamId) return;
    setLeavingTeamId(confirmLeaveTeamId);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("You must be logged in to leave a team.");
        return;
      }
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("user_id", user.id)
        .eq("team_id", confirmLeaveTeamId);
      if (error) {
        console.error("Error leaving team:", error);
        alert("Failed to leave team. Please try again.");
        return;
      }
      setMemberTeams(prev => prev.filter(team => team.id !== confirmLeaveTeamId));
      setMemberTeamsLeads(prev => {
        const newLeads = { ...prev };
        delete newLeads[confirmLeaveTeamId];
        return newLeads;
      });
      alert("Successfully left the team!");
    } catch (error) {
      console.error("Error leaving team:", error);
      alert("Failed to leave team. Please try again.");
    } finally {
      setLeavingTeamId(null);
      setConfirmLeaveTeamId(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#F1F5F9] to-[#E0E7EF] pb-20 overflow-x-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 space-y-12 pt-16">
        {/* Teams You Lead */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <UsersIcon className="w-7 h-7 text-[#123458]" />
            <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: '#123458' }}>Teams You Lead</h2>
          </div>
          {leadTeams.length === 0 ? (
            <div className="text-[#123458] text-lg font-medium opacity-70">You don&apos;t lead any teams yet.</div>
          ) : (
            <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {leadTeams.map((team) => (
                <li key={team.id} className="rounded-3xl shadow-xl hover:shadow-2xl transition-all p-7 flex flex-col gap-4 group focus-within:ring-2 max-w-full border border-[#D4C9BE]/60 bg-white/90 backdrop-blur-lg hover:scale-[1.03]">
                  <span className="font-bold text-xl group-hover:text-[#123458] transition" style={{ color: '#123458' }}>{team.name}</span>
                  <span className="text-base" style={{ color: '#123458', opacity: 0.7 }}>Team workspace for collaboration.</span>
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
            <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: '#123458' }}>Teams Joined as Member</h2>
          </div>
          {memberTeams.length === 0 ? (
            <div className="text-[#123458] text-lg font-medium opacity-70">You haven&apos;t joined any teams as a member yet.</div>
          ) : (
            <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {memberTeams.map((team) => (
                <li key={team.id} className="rounded-3xl shadow-xl hover:shadow-2xl transition-all p-7 flex flex-col gap-4 group focus-within:ring-2 max-w-full border border-[#D4C9BE]/60 bg-white/90 backdrop-blur-lg hover:scale-[1.03]">
                  <span className="font-bold text-xl group-hover:text-[#123458] transition" style={{ color: '#123458' }}>{team.name}</span>
                  <span className="text-base" style={{ color: '#123458', opacity: 0.7 }}>Team workspace for collaboration.</span>
                  <span className="text-xs text-[#123458]/70 block mt-1">Lead: {memberTeamsLeads[team.id] || "Unknown"}</span>
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