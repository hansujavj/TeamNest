"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AddDomainPage() {
  const { teamId } = useParams();
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("You must be logged in.");
      setLoading(false);
      return;
    }
    // Check if user is team lead
    const { data: team } = await supabase.from("teams").select("*").eq("id", teamId).single();
    if (team?.created_by !== user.id) {
      setError("Only the Team Lead can add domains.");
      setLoading(false);
      return;
    }
    // Insert domain
    const { error: insertError } = await supabase.from("domains").insert([
      { name, team_id: teamId }
    ]);
    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    router.push(`/team/${teamId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F1F5F9] to-[#E0E7EF] px-4">
      <div className="w-full max-w-md bg-white/90 border border-[#D4C9BE] rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold text-[#123458] text-center mb-1 tracking-tight">Add Domain</h1>
        <form onSubmit={handleAddDomain} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Domain Name"
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
            {loading ? "Adding..." : "Add Domain"}
          </button>
        </form>
      </div>
    </div>
  );
} 