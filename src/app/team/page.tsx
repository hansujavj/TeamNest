/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { UsersIcon } from "@heroicons/react/24/solid";
import type { Team } from "@/types";

export default function TeamsPage() {
  const router = useRouter();
  const [leadTeams, setLeadTeams] = useState<Team[]>([]);
  const [memberTeams, setMemberTeams] = useState<Team[]>([]);
  const [memberTeamsLeads, setMemberTeamsLeads] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    };
    getUserAndTeams();
  }, [router]);

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