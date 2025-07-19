"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@/types";

export default function SelectDomainsPage() {
  const { teamId } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [domains, setDomains] = useState<unknown[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Get user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      // Get domains
      const { data: domains } = await supabase.from("domains").select("*").eq("team_id", teamId);
      setDomains(domains || []);
      // Get current preferences
      const { data: prefs } = await supabase
        .from("member_domains")
        .select("domain_id")
        .eq("user_id", user.id);
      setSelected((prefs || []).map((p: unknown) => (p as { domain_id: string }).domain_id));
      setLoading(false);
    };
    fetchData();
  }, [teamId, router]);

  const handleToggle = (domainId: string) => {
    setSelected((prev) =>
      prev.includes(domainId)
        ? prev.filter((id) => id !== domainId)
        : [...prev, domainId]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    // Remove all current prefs for this user/team
    const { error: delError } = await supabase
      .from("member_domains")
      .delete()
      .eq("user_id", user?.id)
      .in("domain_id", domains.map((d) => (d as { id: string }).id));
    if (delError) {
      setError(delError.message);
      setSaving(false);
      return;
    }
    // Insert new prefs
    if (selected.length > 0) {
      const inserts = selected.map((domain_id) => ({ user_id: user?.id, domain_id }));
      const { error: insError } = await supabase.from("member_domains").insert(inserts);
      if (insError) {
        setError(insError.message);
        setSaving(false);
        return;
      }
    }
    setSaving(false);
    router.push(`/team/${teamId}`);
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F1F5F9] to-[#E0E7EF] px-4">
      <form
        onSubmit={handleSave}
        className="w-full max-w-md bg-white/90 border border-[#D4C9BE] rounded-2xl shadow-lg p-8 flex flex-col gap-6"
      >
        <h1 className="text-3xl font-extrabold text-[#123458] text-center mb-1 tracking-tight">Choose Preferred Domains</h1>
        <div className="border-b border-[#D4C9BE]/40 mb-2" />
        <div className="mb-2">
          {domains.length === 0 ? (
            <div className="text-[#123458]/60 text-center">No domains available.</div>
          ) : (
            <div className="flex flex-col gap-3">
              {domains.map((domain) => {
                const isSelected = selected.includes((domain as { id: string }).id);
                return (
                  <label
                    key={(domain as { id: string }).id}
                    className={`flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg border border-[#D4C9BE]/40 transition font-semibold text-base ${isSelected ? 'bg-[#123458] text-white' : 'bg-[#D4C9BE]/30 text-[#123458] hover:bg-[#D4C9BE]/60'}`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggle((domain as { id: string }).id)}
                      className="accent-[#123458] w-5 h-5 rounded border border-[#123458]/40"
                    />
                    <span className={isSelected ? 'font-bold text-white' : 'font-semibold text-[#123458]'}>{(domain as { name: string }).name}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
        {error && <div className="text-red-500 text-center text-sm mb-1">{error}</div>}
        <button
          type="submit"
          className="w-full bg-[#123458] hover:bg-[#D4C9BE] hover:text-[#123458] text-white py-3 rounded-xl font-semibold shadow transition disabled:opacity-60 mt-1"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Preferences"}
        </button>
      </form>
    </div>
  );
} 