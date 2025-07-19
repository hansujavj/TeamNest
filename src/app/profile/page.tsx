"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function getStatusBadge(status: string) {
  const base = "px-2 py-0.5 rounded-full text-xs font-semibold inline-block";
  if (status === "completed") return <span className={base + " bg-green-100 text-green-700"}>Completed</span>;
  if (status === "in progress") return <span className={base + " bg-yellow-100 text-yellow-700"}>In Progress</span>;
  return <span className={base + " bg-gray-200 text-gray-700"}>Pending</span>;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [assignedTasks, setAssignedTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [debugAssignments, setDebugAssignments] = useState<any[]>([]);
  const [leadTeams, setLeadTeams] = useState<any[]>([]);
  const [allLeadTasks, setAllLeadTasks] = useState<any[]>([]);
  const [assignmentHistory, setAssignmentHistory] = useState<any[]>([]);
  const [teamsMap, setTeamsMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchProfileAndTasks = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      // Fetch user profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("name, email")
        .eq("id", user.id)
        .single();
      setProfile(profileData);
      // Fetch teams where user is lead
      const { data: leadTeams } = await supabase
        .from("teams")
        .select("id, name")
        .eq("created_by", user.id);
      setLeadTeams(leadTeams || []);
      // If user is a lead, fetch all tasks for those teams
      let allLeadTasks: any[] = [];
      if (leadTeams && leadTeams.length > 0) {
        const teamIds = leadTeams.map((t: any) => t.id);
        const { data: tasks } = await supabase
          .from("tasks")
          .select("id, title, team_id, due_date, priority, created_by, status")
          .in("team_id", teamIds);
        // Attach team name
        allLeadTasks = (tasks || []).map((task: any) => ({
          ...task,
          teamName: leadTeams.find((t: any) => t.id === task.team_id)?.name || "Unknown Team",
        }));
      }
      setAllLeadTasks(allLeadTasks);
      // Fetch all assigned tasks for this user (across all teams)
      const { data: assignments } = await supabase
        .from("task_assignments")
        .select("*, tasks(id, title, team_id, due_date, priority), teams(name)")
        .eq("user_id", user.id);
      setDebugAssignments(assignments || []);
      // Join with team info
      let tasksWithTeam: any[] = [];
      if (assignments && assignments.length > 0) {
        const teamIds = Array.from(new Set(assignments.map((a: any) => a.tasks?.team_id).filter(Boolean)));
        let teamsMap: Record<string, any> = {};
        if (teamIds.length > 0) {
          const { data: teams } = await supabase
            .from("teams")
            .select("id, name")
            .in("id", teamIds);
          if (teams) {
            teamsMap = Object.fromEntries(teams.map((t: any) => [t.id, t]));
          }
        }
        tasksWithTeam = assignments.map((a: any) => ({
          id: a.tasks?.id,
          title: a.tasks?.title,
          teamId: a.tasks?.team_id,
          teamName: teamsMap[a.tasks?.team_id]?.name || "Unknown Team",
          status: a.status,
          dueDate: a.tasks?.due_date,
          priority: a.tasks?.priority,
        }));
      }
      setAssignedTasks(tasksWithTeam);
      // Fetch all assignments ever for this user (history)
      const { data: allAssignments, error } = await supabase
        .from("task_assignments")
        .select("*, tasks(*)")
        .eq("user_id", user.id)
        .order("assigned_at", { ascending: false });
      console.log("Assignments with join:", allAssignments, "error:", error);
      setAssignmentHistory(allAssignments || []);
      // Fetch team names for all unique team_ids in assignments
      const teamIds = [...new Set((allAssignments || []).map(a => a.tasks?.team_id).filter(Boolean))];
      let teamsMap: Record<string, string> = {};
      if (teamIds.length > 0) {
        const { data: teams } = await supabase
          .from("teams")
          .select("id, name")
          .in("id", teamIds);
        if (teams) {
          teamsMap = Object.fromEntries(teams.map((t: any) => [t.id, t.name]));
        }
      }
      setTeamsMap(teamsMap);
      setLoading(false);
    };
    fetchProfileAndTasks();
  }, [router]);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F5F9] to-[#E0E7EF] pb-20 px-4">
      <div className="max-w-3xl mx-auto pt-12">
        <h1 className="text-3xl font-bold text-[#123458] mb-6">Task History</h1>
        {assignmentHistory.length === 0 ? (
          <div className="text-[#123458] text-base opacity-70">No task history yet.</div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 mb-10">
            {assignmentHistory.map((a) => (
              <li key={a.id + a.task_id} className="bg-white/90 rounded-xl shadow p-5 flex flex-col gap-2 border-l-4 border-[#123458] hover:bg-[#F1F5F9] transition cursor-pointer"
                onClick={() => router.push(`/team/${a.tasks?.team_id}`)}
                title="Go to team page for this task"
              >
                <span className="font-semibold text-[#123458] text-lg truncate underline hover:text-blue-700">{a.tasks?.title}</span>
                <span className="text-xs text-[#123458] opacity-80">Team: <span className="font-medium">{teamsMap[a.tasks?.team_id] || a.tasks?.team_id || "Unknown Team"}</span></span>
                {a.tasks?.due_date && (
                  <span className="text-xs text-[#123458] opacity-80">Due: {new Date(a.tasks.due_date).toLocaleDateString()}</span>
                )}
                {a.tasks?.priority && (
                  <span className="text-xs text-[#123458] opacity-80">Priority: <span className="font-semibold">{a.tasks.priority}</span></span>
                )}
                {a.assigned_at && (
                  <span className="text-xs text-[#123458] opacity-80">Assigned: {new Date(a.assigned_at).toLocaleString()}</span>
                )}
                <span>{getStatusBadge(a.status)}</span>
              </li>
            ))}
          </ul>
        )}
        {/* REMOVE assigned tasks section and debug output */}
      </div>
    </div>
  );
} 