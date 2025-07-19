"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function CreateTeamPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("You must be logged in to create a team.");
      setLoading(false);
      return;
    }
    // Insert team
    const { data, error: insertError } = await supabase
      .from("teams")
      .insert([
        { name, created_by: user.id }
      ])
      .select()
      .single();
    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }
    // Add creator as team member
    await supabase.from("team_members").insert([
      { team_id: data.id, user_id: user.id }
    ]);
    setLoading(false);
    router.push(`/team/${data.id}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F1F5F9] to-[#E0E7EF] px-4">
      <div className="w-full max-w-md bg-white/90 border border-[#D4C9BE] rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold text-[#123458] text-center mb-1 tracking-tight">Create a Team</h1>
        <p className="text-center text-[#123458]/80 mb-2">Start your new workspace on <span className='font-bold text-[#123458]'>TEAMNEST</span>.</p>
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Team Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg border border-[#D4C9BE] bg-white text-[#123458] focus:outline-none focus:ring-2 focus:ring-[#123458] text-lg font-semibold"
            required
          />
          {error && <div className="text-red-500 text-center text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-[#123458] hover:bg-[#D4C9BE] hover:text-[#123458] text-white py-3 rounded-xl font-semibold shadow transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Team"}
          </button>
        </form>
      </div>
    </div>
  );
} 