/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { Team, TaskAssignment, Profile } from "@/types";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [leadTeams, setLeadTeams] = useState<Team[]>([]);
  const [memberTeams, setMemberTeams] = useState<Team[]>([]);
  const [memberTeamsLeads, setMemberTeamsLeads] = useState<Record<string, string>>(/* teamId: leadName */ {});
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(userProfile?.name || "");

  useEffect(() => {
    const fetchProfileAndTeams = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      // Fetch user profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("id, name, email")
        .eq("id", user.id)
        .single();
      setUserProfile(profileData as Profile);
      // Fetch teams you lead
      const { data: leadTeams } = await supabase
        .from("teams")
        .select("id, name, created_by")
        .eq("created_by", user.id);
      setLeadTeams((leadTeams || []) as Team[]);
      // Fetch teams you belong to (exclude teams you lead)
      const { data: memberTeams } = await supabase
        .from("team_members")
        .select("team_id, teams(id, name, created_by)")
        .eq("user_id", user.id);
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
    fetchProfileAndTeams();
  }, [router]);

  if (loading) return <div className="p-8">Loading...</div>;

  const handleSaveName = async () => {
    if (!newName.trim() || !userProfile) return;
    await supabase.from("profiles").update({ name: newName.trim() }).eq("id", userProfile.id);
    setUserProfile({ ...userProfile, name: newName.trim() });
    setEditingName(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F5F9] to-[#E0E7EF] pb-20 px-4">
      <div className="max-w-3xl mx-auto pt-12">
        <h1 className="text-3xl font-bold text-[#123458] mb-6">My Profile</h1>
        {userProfile && (
          <div className="bg-white/90 rounded-xl shadow p-5 mb-8 flex flex-col gap-2 border-l-4 border-[#123458]">
            <span className="font-semibold text-[#123458] text-lg flex items-center gap-2">
              {editingName ? (
                <>
                  <input
                    type="text"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    className="px-2 py-1 rounded border border-[#123458] text-black"
                    maxLength={40}
                    autoFocus
                  />
                  <button
                    className="px-3 py-1 rounded bg-[#123458] text-white hover:bg-[#D4C9BE] hover:text-[#123458] transition text-xs font-semibold"
                    onClick={handleSaveName}
                  >Save</button>
                  <button
                    className="px-3 py-1 rounded bg-gray-200 text-[#123458] hover:bg-gray-300 transition text-xs font-semibold"
                    onClick={() => { setEditingName(false); setNewName(userProfile.name); }}
                  >Cancel</button>
                </>
              ) : (
                <>
                  {userProfile.name}
                  <button onClick={() => setEditingName(true)}><PencilIcon className="w-4 h-4 text-gray-400 hover:text-blue-500 transition" /></button>
                </>
              )}
            </span>
            <span className="text-xs text-[#123458]/80">{userProfile.email}</span>
          </div>
        )}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#123458] mb-2">Teams You Lead</h2>
          {leadTeams.length === 0 ? (
            <div className="text-[#123458] text-base opacity-70">You don&apos;t lead any teams yet.</div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {leadTeams.map((team) => (
                <li key={team.id} className="bg-white/90 rounded-xl shadow p-4 border border-[#D4C9BE] hover:bg-[#F1F5F9] transition cursor-pointer"
                  onClick={() => router.push(`/team/${team.id}`)}
                  title="Go to team page"
                >
                  <span className="font-semibold text-[#123458] text-lg">{team.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#123458] mb-2">Teams You&apos;re a Member Of</h2>
          {memberTeams.length === 0 ? (
            <div className="text-[#123458] text-base opacity-70">You haven&apos;t joined any teams as a member yet.</div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {memberTeams.map((team) => (
                <li key={team.id} className="bg-white/90 rounded-xl shadow p-4 border border-[#D4C9BE] hover:bg-[#F1F5F9] transition cursor-pointer"
                  onClick={() => router.push(`/team/${team.id}`)}
                  title="Go to team page"
                >
                  <span className="font-semibold text-[#123458] text-lg">{team.name}</span>
                  <span className="text-xs text-[#123458]/70 block mt-1">Lead: {memberTeamsLeads[team.id] || "Unknown"}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
} 