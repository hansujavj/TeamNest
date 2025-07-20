"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { Task, User } from "@/types";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

export default function TasksPage() {
  const router = useRouter();
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [createdTasks, setCreatedTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      // Fetch tasks assigned to me
      const { data: assignments } = await supabase
        .from("task_assignments")
        .select("*, tasks(id, title, team_id, status, created_by)")
        .eq("user_id", user.id);
      setAssignedTasks((assignments || []).map((a: { tasks: Task }) => a.tasks).filter(Boolean));
      // Fetch tasks created by me
      const { data: created } = await supabase
        .from("tasks")
        .select("id, title, team_id, status, created_by")
        .eq("created_by", user.id);
      setCreatedTasks(created || []);
    };
    fetchTasks();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F5F9] to-[#E0E7EF] pb-20 px-2 sm:px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl bg-white/90 border border-[#D4C9BE] rounded-2xl shadow-lg p-6 flex flex-col gap-8 mt-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ClipboardDocumentListIcon className="w-7 h-7 text-[#123458]" />
            <h1 className="text-2xl font-extrabold tracking-tight text-[#123458]">Tasks Assigned to You</h1>
          </div>
          {assignedTasks.length === 0 ? (
            <div className="text-[#123458] text-base opacity-70">No tasks have been assigned to you yet.</div>
          ) : (
            <ul className="space-y-4">
              {assignedTasks.map((task) => (
                <li
                  key={task.id}
                  className="bg-[#F1F5F9] rounded-xl shadow p-4 border border-[#D4C9BE] flex flex-col gap-2 cursor-pointer hover:bg-[#D4C9BE]/40 transition"
                  onClick={() => router.push(`/team/${task.team_id}`)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Go to team for task ${task.title}`}
                >
                  <span className="font-bold text-lg text-[#123458]">{task.title}</span>
                  <span className="text-xs text-[#123458]/70">Status: {task.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ClipboardDocumentListIcon className="w-7 h-7 text-[#123458]" />
            <h1 className="text-2xl font-extrabold tracking-tight text-[#123458]">Tasks Created by You</h1>
          </div>
          {createdTasks.length === 0 ? (
            <div className="text-[#123458] text-base opacity-70">You haven&apos;t created any tasks yet.</div>
          ) : (
            <ul className="space-y-4">
              {createdTasks.map((task) => (
                <li
                  key={task.id}
                  className="bg-[#F1F5F9] rounded-xl shadow p-4 border border-[#D4C9BE] flex flex-col gap-2 cursor-pointer hover:bg-[#D4C9BE]/40 transition"
                  onClick={() => router.push(`/team/${task.team_id}`)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Go to team for task ${task.title}`}
                >
                  <span className="font-bold text-lg text-[#123458]">{task.title}</span>
                  <span className="text-xs text-[#123458]/70">Status: {task.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
} 