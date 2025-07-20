"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { User, Team, Profile } from "@/types";

export default function CreateTaskPage() {
  const { teamId } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [domains, setDomains] = useState<{ id: string; name: string }[]>([]);
  const [members, setMembers] = useState<(Profile & { preferredDomains: string[] })[]>([]);
  const [domainId, setDomainId] = useState("");
  const [assignee, setAssignee] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Get user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user as User);
      // Get team
      const { data: team } = await supabase.from("teams").select("id, name, created_by").eq("id", teamId).single();
      if ((team as Team)?.created_by !== user.id) {
        setError("Only the Team Lead can create tasks.");
        setLoading(false);
        return;
      }
      // Get domains
      const { data: domains } = await supabase.from("domains").select("id, name").eq("team_id", teamId);
      setDomains((domains || []) as { id: string; name: string }[]);
      // Get team member user_ids
      const { data: teamMembers } = await supabase
        .from("team_members")
        .select("user_id")
        .eq("team_id", teamId);
      const userIds = (teamMembers || []).map((tm: { user_id: string }) => tm.user_id);
      // Get profiles for those user_ids
      let profiles: Profile[] = [];
      if (userIds.length > 0) {
        const { data } = await supabase
          .from("profiles")
          .select("id, name, email, role")
          .in("id", userIds);
        profiles = (data || []) as Profile[];
      }
      // Get member_domains for those users
      let memberDomains: { user_id: string; domain_id: string }[] = [];
      if (userIds.length > 0) {
        const { data } = await supabase
          .from("member_domains")
          .select("user_id, domain_id");
        memberDomains = (data || []) as { user_id: string; domain_id: string }[];
      }
      // Merge profiles and domain preferences
      const members = profiles.map((profile) => ({
        ...profile,
        preferredDomains: memberDomains
          .filter((md) => md.user_id === profile.id)
          .map((md) => md.domain_id),
      }));
      setMembers(members);
      setLoading(false);
    };
    fetchData();
  }, [teamId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    // Insert task
    const { data: task, error: taskError } = await supabase
      .from("tasks")
      .insert([
        {
          title,
          description,
          domain_id: domainId,
          team_id: teamId,
          created_by: user?.id,
          status: "pending", // Add default status
        },
      ])
      .select()
      .single();
    if (taskError) {
      setError(taskError.message);
      setSaving(false);
      return;
    }
    // Assign task
    const { error: assignError } = await supabase
      .from("task_assignments")
      .insert([
        { task_id: task.id, user_id: assignee, status: "pending" },
      ]);
    if (assignError) {
      setError(assignError.message);
      setSaving(false);
      return;
    }
    // Create notification
    await supabase.from("notifications").insert([
      {
        user_id: assignee,
        content: `You have been assigned a new task: ${title}`,
        read_status: false,
        team_id: teamId,
        task_id: task.id,
      },
    ]);
    setSaving(false);
    router.push(`/team/${teamId}`);
  };

  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F1F5F9] to-[#E0E7EF] px-4">
      <div className="w-full max-w-md bg-white/90 border border-[#D4C9BE] rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold text-[#123458] text-center mb-1 tracking-tight">Create Task</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg border border-[#D4C9BE] bg-white text-[#123458] focus:outline-none focus:ring-2 focus:ring-[#123458] text-lg font-semibold"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded-lg border border-[#D4C9BE] bg-white text-[#123458] focus:outline-none focus:ring-2 focus:ring-[#123458] text-base"
          />
          <select
            value={domainId}
            onChange={(e) => setDomainId(e.target.value)}
            className="w-full p-3 rounded-lg border border-[#D4C9BE] bg-white text-[#123458] focus:outline-none focus:ring-2 focus:ring-[#123458] text-base"
            required
          >
            <option value="">Select Domain</option>
            {domains.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="w-full p-3 rounded-lg border border-[#D4C9BE] bg-white text-[#123458] focus:outline-none focus:ring-2 focus:ring-[#123458] text-base"
            required
          >
            <option value="">Assign to Member</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.email}){domainId && m.preferredDomains.includes(domainId) ? " ⭐" : ""}
              </option>
            ))}
          </select>
          {error && <div className="text-red-500 text-center text-sm mb-1">{error}</div>}
          <button
            type="submit"
            className="w-full bg-[#123458] hover:bg-[#D4C9BE] hover:text-[#123458] text-white py-3 rounded-xl font-semibold shadow transition disabled:opacity-60 mt-1"
            disabled={saving}
          >
            {saving ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
} 