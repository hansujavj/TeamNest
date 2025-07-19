"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { UsersIcon } from "@heroicons/react/24/solid";

export default function TeamsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [leadTeams, setLeadTeams] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [memberTeams, setMemberTeams] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserAndTeams = async (): Promise<void> => { // eslint-disable-line @typescript-eslint/no-explicit-any
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      // Fetch user profile for name
      const { data: profileData } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .single();
      setProfile(profileData);
      // Teams you lead
      const { data: leadTeams } = await supabase
        .from("teams")
        .select("*")
        .eq("created_by", user.id);
      setLeadTeams(leadTeams || []);
      // Teams joined as member (exclude teams where user is lead)
      const { data: memberTeams } = await supabase
        .from("team_members")
        .select("team_id, teams(*)")
        .eq("user_id", user.id);
      // Only show teams where user is not the lead
      const memberTeamsFiltered = (memberTeams || []).map((tm: any) => tm.teams).filter((team: any) => !leadTeams?.some((lt: any) => lt.id === team.id));
      setMemberTeams(memberTeamsFiltered);
      setLoading(false);
    };
    getUserAndTeams();
  }, [router]);

  if (loading) return <div className="p-8">Loading...</div>;

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