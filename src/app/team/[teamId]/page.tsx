/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import { UsersIcon, ClipboardDocumentListIcon, SparklesIcon, UserCircleIcon, LinkIcon, PlusIcon } from "@heroicons/react/24/solid";
import type { User, Profile, Team, Task, TaskAssignment } from "@/types";
import { Dialog } from "@headlessui/react";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "in progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export default function TeamPage() {
  const { teamId } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [members, setMembers] = useState<{ user_id: string; profiles: Profile }[]>([]);
  const [domains, setDomains] = useState<{ id: string; name: string }[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [assignments, setAssignments] = useState<TaskAssignment[]>([]);
  const [isLead, setIsLead] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);
  const [activities, setActivities] = useState<any[]>([]); // keep as any[] for now
  const [activityInput, setActivityInput] = useState("");
  const [activityLoading, setActivityLoading] = useState(false);
  const [preferredDomainIds, setPreferredDomainIds] = useState<string[]>([]);
  const [showRemoveUser, setShowRemoveUser] = useState<{ open: boolean; userId: string | null }>({ open: false, userId: null });
  const [showDeleteTask, setShowDeleteTask] = useState<{ open: boolean; taskId: string | null }>({ open: false, taskId: null });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user as User);
      const { data: team } = await supabase.from("teams").select("id, name, created_by").eq("id", teamId).single();
      setTeam(team as Team);
      setIsLead((team as Team)?.created_by === user.id);
      const { data: members } = await supabase
        .from("team_members")
        .select("user_id, profiles(id, name, email, role)")
        .eq("team_id", teamId);
      setMembers((members || []) as { user_id: string; profiles: Profile }[]);
      const { data: domains } = await supabase
        .from("domains")
        .select("id, name")
        .eq("team_id", teamId);
      setDomains((domains || []) as { id: string; name: string }[]);
      const { data: tasks, error: tasksError } = await supabase
        .from("tasks")
        .select("id, title, team_id, created_by, status, domain_id")
        .eq("team_id", teamId);
      if (tasksError) console.error("Supabase error fetching tasks:", tasksError);
      console.log("Fetched tasks for team", teamId, tasks);
      setTasks((tasks || []) as Task[]);
      const { data: assignments } = await supabase
        .from("task_assignments")
        .select("*, profiles(name, email)")
        .in("task_id", (tasks || []).map((t: Task) => t.id));
      setAssignments((assignments || []) as TaskAssignment[]);
      setLoading(false);
      // Fetch team activities
      const { data: teamActivities } = await supabase
        .from("team_activities")
        .select("*, profiles(name)")
        .eq("team_id", teamId)
        .order("created_at", { ascending: false });
      setActivities(teamActivities || []);
      // Fetch preferred domains for this user in this team
      if (user && teamId) {
        const { data: memberDomains } = await supabase
          .from("member_domains")
          .select("domain_id")
          .eq("user_id", user.id);
        setPreferredDomainIds((memberDomains || []).map((md: { domain_id: string }) => md.domain_id));
      }
    };
    fetchData();
  }, [teamId, router]);

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    setStatusUpdating(taskId);
    await supabase
      .from("task_assignments")
      .update({ status: newStatus })
      .eq("task_id", taskId)
      .eq("user_id", user?.id);
    setAssignments((prev) =>
      prev.map((a) =>
        a.task_id === taskId && a.user_id === user?.id
          ? { ...a, status: newStatus }
          : a
      )
    );
    setStatusUpdating(null);
    toast.success("Task status updated!");
    // Notify team lead if completed
    if (newStatus === "completed" && team) {
      // Get task title
      const task = tasks.find((t) => t.id === taskId);
      // Fetch user name
      let userName = user?.email;
      const { data: profileData } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user?.id)
        .single();
      if (profileData && profileData.name) userName = profileData.name;
      await supabase.from("notifications").insert([
        {
          user_id: team.created_by,
          content: `Task '${task?.title || "A task"}' was marked as completed by ${userName}`,
          read_status: false,
          team_id: teamId,
          task_id: task?.id,
        },
      ]);
    }
  };

  const handleAddActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityInput.trim()) return;
    setActivityLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("team_activities").insert([
      {
        team_id: teamId,
        user_id: user.id,
        message: activityInput.trim(),
      },
    ]);
    setActivityInput("");
    setActivityLoading(false);
    // Refresh activities
    const { data: teamActivities } = await supabase
      .from("team_activities")
      .select("*, profiles(name)")
      .eq("team_id", teamId)
      .order("created_at", { ascending: false });
    setActivities(teamActivities || []);
  };

  const handleRemoveUser = async () => {
    if (!showRemoveUser.userId) return;
    await supabase.from("team_members").delete().eq("user_id", showRemoveUser.userId).eq("team_id", teamId);
    setMembers((prev) => prev.filter((m) => m.user_id !== showRemoveUser.userId));
    setShowRemoveUser({ open: false, userId: null });
    toast.success("User removed from team.");
  };
  const handleDeleteTask = async () => {
    if (!showDeleteTask.taskId) return;
    await supabase.from("task_assignments").delete().eq("task_id", showDeleteTask.taskId);
    await supabase.from("tasks").delete().eq("id", showDeleteTask.taskId);
    setTasks((prev) => prev.filter((t) => t.id !== showDeleteTask.taskId));
    setShowDeleteTask({ open: false, taskId: null });
    toast.success("Task deleted.");
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!team) return <div className="p-8 text-red-500">Team not found.</div>;

  const joinLink = `${typeof window !== "undefined" ? window.location.origin : ""}/join-team/${teamId}`;
  const getAssignment = (taskId: string) => assignments.find((a) => a.task_id === taskId);
  const currentUserId = user?.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F5F9] to-[#E0E7EF] pb-20 px-2 md:px-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto space-y-10 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Team Info */}
          <div className="col-span-1 rounded-2xl shadow-lg bg-white/90 border border-[#D4C9BE] p-7 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#123458] text-lg font-bold mb-2"><SparklesIcon className="w-6 h-6"/> Team Info</div>
            <div className="text-3xl font-extrabold text-[#123458] mb-2 tracking-tight">{team.name}</div>
            <div className="flex items-center gap-2 text-xs text-[#123458] mb-1"><LinkIcon className="w-4 h-4"/> Join Link:</div>
            <div className="flex items-center gap-2">
              <div className="text-xs bg-white rounded px-2 py-1 text-[#123458] break-all mb-2 border border-[#D4C9BE]">{joinLink}</div>
              <button
                className="text-xs px-2 py-1 rounded bg-[#123458] text-white hover:bg-[#D4C9BE] hover:text-[#123458] transition"
                onClick={() => {
                  navigator.clipboard.writeText(joinLink);
                  setCopied(true);
                  toast.success("Join link copied!");
                  setTimeout(() => setCopied(false), 1500);
                }}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            {isLead && (
              <button className="mt-2 bg-[#123458] hover:bg-[#D4C9BE] hover:text-[#123458] text-white px-4 py-2 rounded-xl font-semibold shadow transition-all" onClick={() => router.push(`/team/${teamId}/add-domain`)}>
                + Add Domain
              </button>
            )}
          </div>
          {/* Domains */}
          <div className="col-span-1 rounded-2xl shadow-lg bg-white/90 border border-[#D4C9BE] p-7 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#123458] text-lg font-bold mb-2"><ClipboardDocumentListIcon className="w-6 h-6"/> Domains</div>
            <ul className="flex flex-wrap gap-2 mb-2">
              {domains.map((d) => (
                <li
                  key={d.id}
                  className={`px-3 py-1 rounded-full border text-xs font-semibold border-[#123458] ${preferredDomainIds.includes(d.id) ? 'bg-[#123458] text-white font-bold' : 'bg-[#D4C9BE] text-[#123458]'}`}
                >
                  {d.name}
                </li>
              ))}
            </ul>
            <div className="flex gap-2 mt-2">
              {isLead && (
                <button className="bg-[#123458] hover:bg-[#D4C9BE] hover:text-[#123458] text-white px-3 py-1 rounded-lg font-semibold shadow transition-all" onClick={() => router.push(`/team/${teamId}/add-domain`)}>
                  + Add Domain
                </button>
              )}
              <button className="bg-[#D4C9BE] text-[#123458] px-3 py-1 rounded-lg font-semibold border border-[#123458] hover:bg-[#123458] hover:text-[#D4C9BE] transition-all" onClick={() => router.push(`/team/${teamId}/select-domains`)}>
                Choose Preferred Domains
              </button>
            </div>
          </div>
          {/* Members */}
          <div className="col-span-1 rounded-2xl shadow-lg bg-white/90 border border-[#D4C9BE] p-7 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#123458] text-lg font-bold mb-2"><UsersIcon className="w-6 h-6"/> Members</div>
            <ul className="space-y-3">
              {[
                ...members.filter((m) => m.user_id === currentUserId),
                ...members.filter((m) => m.user_id !== currentUserId),
              ].map((m) => {
                const memberProfile = (m.profiles as any);
                const isCurrentUser = m.user_id === currentUserId;
                return (
                  <li key={m.user_id} className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-[#D4C9BE] flex items-center justify-center text-[#123458] font-bold text-lg border-2 border-[#123458] shadow">{memberProfile?.name?.[0]?.toUpperCase() || "U"}</span>
                    <div>
                      <div className="font-semibold text-[#123458] text-base">
                        {memberProfile?.name} {isCurrentUser && <span className="text-xs text-[#123458]/70 font-bold">(You)</span>}
                      </div>
                      <div className="text-xs text-[#123458]/70 font-bold">
                        {m.user_id === team?.created_by ? "Lead" : "Member"}
                      </div>
                    </div>
                    <span className="ml-auto text-xs text-[#123458]/70">{memberProfile?.email}</span>
                    {isLead && m.user_id !== team?.created_by && (
                      <button
                        className="ml-2 px-3 py-1 rounded bg-teal-500 text-white text-xs font-bold hover:bg-teal-600 transition"
                        onClick={() => setShowRemoveUser({ open: true, userId: m.user_id })}
                      >
                        Remove
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* Tasks & Activity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tasks */}
          <div className="col-span-2 rounded-2xl shadow-lg bg-white/90 border border-[#D4C9BE] p-7 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#123458] text-lg font-bold"><ClipboardDocumentListIcon className="w-6 h-6"/> Tasks</div>
              {isLead && (
                <button className="bg-[#123458] hover:bg-[#D4C9BE] hover:text-[#123458] text-white px-4 py-2 rounded-xl font-semibold shadow transition-all" onClick={() => router.push(`/create-task/${teamId}`)}>
                  + Create Task
                </button>
              )}
            </div>
            <ul className="grid gap-6 sm:grid-cols-2">
              {tasks.map((task) => {
                const assignment = getAssignment(task.id) as any;
                const taskDomain = (task as any).domain;
                const isAssignedToMe = assignment && assignment.user_id === currentUserId;
                return (
                  <li key={task.id} className="p-5 bg-white border border-[#D4C9BE] rounded-2xl shadow-md flex flex-col gap-2 hover:shadow-lg hover:scale-[1.01] transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-lg text-[#123458]">{task.title}</span>
                      {taskDomain?.name && (
                        <span className="ml-2 px-2 py-0.5 rounded-full border text-xs font-semibold bg-[#D4C9BE] text-[#123458] border-[#123458]">{taskDomain.name}</span>
                      )}
                      {isLead && (
                        <button
                          className="ml-auto px-3 py-1 rounded bg-teal-500 text-white text-xs font-bold hover:bg-teal-600 transition"
                          onClick={() => setShowDeleteTask({ open: true, taskId: task.id })}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    <div className="text-sm text-[#123458]/80 mb-1">{(task as any).description}</div>
                    {assignment && (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs mt-2">
                        <span className="flex items-center gap-1 text-[#123458]">
                          Assigned to: <span className="font-semibold flex items-center gap-1">
                            <UserCircleIcon className="w-4 h-4"/>
                            {isAssignedToMe ? "You" : assignment.profiles?.name || assignment.user_id}
                          </span>
                        </span>
                        <span className="flex items-center gap-1 text-[#123458]">Status:
                          {assignment.user_id === user?.id ? (
                            <select value={assignment.status} onChange={(e) => handleStatusChange(task.id, e.target.value)} className="border rounded px-2 py-1 text-xs bg-white text-[#123458] font-semibold ml-1" disabled={statusUpdating === task.id}>
                              {STATUS_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                          ) : (
                            <span className={`text-xs font-semibold ml-1 px-2 py-0.5 rounded-full ${assignment.status === "completed" ? "bg-green-100 text-green-700" : assignment.status === "in progress" ? "bg-yellow-100 text-yellow-700" : "bg-gray-200 text-gray-700"}`}>{assignment.status}</span>
                          )}
                        </span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Team Activity */}
          <div className="col-span-1 rounded-2xl shadow-lg bg-white/90 border border-[#D4C9BE] p-7 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[#123458] text-lg font-bold mb-2"><SparklesIcon className="w-6 h-6"/> Team Activity</div>
            <form onSubmit={handleAddActivity} className="flex gap-2 mb-4">
              <input
                type="text"
                value={activityInput}
                onChange={e => setActivityInput(e.target.value)}
                placeholder="Add an activity..."
                className="flex-1 px-3 py-2 rounded-lg border border-[#D4C9BE] bg-white text-[#123458] focus:outline-none focus:ring-2 focus:ring-[#123458]"
                maxLength={120}
                disabled={activityLoading}
              />
              <button
                type="submit"
                className="bg-[#123458] hover:bg-[#D4C9BE] hover:text-[#123458] text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-1 disabled:opacity-60"
                disabled={activityLoading || !activityInput.trim()}
              >
                <PlusIcon className="w-5 h-5" /> Add
              </button>
            </form>
            <div className="bg-white rounded-2xl p-4 shadow flex flex-col gap-2 text-[#123458]/90 text-sm min-h-[60px]">
              {activities.length === 0 ? (
                <div className="text-[#123458]/60 text-center">No activity yet.</div>
              ) : (
                <ul className="space-y-3">
                  {activities.map((a) => (
                    <li key={a.id} className="flex items-center gap-3 border-b border-[#D4C9BE]/40 pb-2 last:border-b-0">
                      <span className="font-bold text-[#123458]">{a.profiles?.name || "User"}</span>
                      <span className="text-xs text-[#123458]/60">{new Date(a.created_at).toLocaleString()}</span>
                      <span className="ml-2">{a.message}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Remove User Confirmation Dialog */}
      {showRemoveUser.open && (
        <Dialog open={showRemoveUser.open} onClose={() => setShowRemoveUser({ open: false, userId: null })} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Dialog.Panel className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6 max-w-xs w-full border border-[#D4C9BE]">
            <Dialog.Title className="text-lg font-bold text-[#123458]">Remove this user from the team?</Dialog.Title>
            <div className="flex gap-4 w-full justify-center">
              <button className="px-5 py-2 rounded-lg bg-[#123458] text-white font-semibold hover:bg-[#D4C9BE] hover:text-[#123458] transition" onClick={handleRemoveUser}>Yes</button>
              <button className="px-5 py-2 rounded-lg bg-gray-200 text-[#123458] font-semibold hover:bg-gray-300 transition" onClick={() => setShowRemoveUser({ open: false, userId: null })}>No</button>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}
      {/* Delete Task Confirmation Dialog */}
      {showDeleteTask.open && (
        <Dialog open={showDeleteTask.open} onClose={() => setShowDeleteTask({ open: false, taskId: null })} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Dialog.Panel className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6 max-w-xs w-full border border-[#D4C9BE]">
            <Dialog.Title className="text-lg font-bold text-[#123458]">Delete this task?</Dialog.Title>
            <div className="flex gap-4 w-full justify-center">
              <button className="px-5 py-2 rounded-lg bg-[#123458] text-white font-semibold hover:bg-[#D4C9BE] hover:text-[#123458] transition" onClick={handleDeleteTask}>Yes</button>
              <button className="px-5 py-2 rounded-lg bg-gray-200 text-[#123458] font-semibold hover:bg-gray-300 transition" onClick={() => setShowDeleteTask({ open: false, taskId: null })}>No</button>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}
    </div>
  );
} 