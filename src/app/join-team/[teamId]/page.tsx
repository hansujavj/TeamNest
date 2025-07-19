"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function JoinTeamPage() {
  const { teamId } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [team, setTeam] = useState<any>(null);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // Get user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      // Get team
      const { data: team } = await supabase.from("teams").select("*").eq("id", teamId).single();
      setTeam(team);
      // Check if already a member
      const { data: member } = await supabase
        .from("team_members")
        .select("*")
        .eq("team_id", teamId)
        .eq("user_id", user.id)
        .single();
      setIsMember(!!member);
      setLoading(false);
    };
    fetchData();
  }, [teamId, router]);

  const handleJoin = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.from("team_members").insert([
      { team_id: teamId, user_id: user.id }
    ]);
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    router.push(`/team/${teamId}`);
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!team) return <div className="p-8 text-red-500">Team not found.</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F1F5F9] to-[#E0E7EF] px-4">
      <div className="w-full max-w-md bg-white/90 border border-[#D4C9BE] rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6 text-center">
        <h1 className="text-3xl font-extrabold text-[#123458] mb-2 tracking-tight">Join Team: {team.name}</h1>
        {isMember ? (
          <>
            <div className="mb-4 text-green-600 font-semibold">You are already a member of this team.</div>
            <a href={`/team/${teamId}`} className="text-[#123458] font-semibold hover:underline">Go to Team Page</a>
          </>
        ) : (
          <>
            <button
              onClick={handleJoin}
              className="w-full bg-[#123458] hover:bg-[#D4C9BE] hover:text-[#123458] text-white py-3 rounded-xl font-semibold shadow transition mb-4 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Joining..." : "Join Team"}
            </button>
            {error && <div className="text-red-500 mb-4">{error}</div>}
          </>
        )}
      </div>
    </div>
  );
} 