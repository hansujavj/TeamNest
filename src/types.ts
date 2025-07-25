// User as returned by Supabase Auth
export interface User {
  id: string;
  email?: string; // Supabase user.email can be undefined
}

// Profile as stored in the 'profiles' table
export interface Profile {
  id?: string; // Sometimes not returned by select
  name: string;
  email: string;
}

// Team as stored in the 'teams' table
export interface Team {
  id: string;
  name: string;
  created_by: string;
}

// Task as stored in the 'tasks' table
export interface Task {
  id: string;
  title: string;
  team_id: string;
  due_date?: string;
  priority?: string;
  created_by?: string;
  status?: string;
  description?: string;
}

// TaskAssignment as stored in the 'task_assignments' table
export interface TaskAssignment {
  id: string;
  task_id: string;
  user_id: string;
  status: string;
  tasks?: Task;
  teams?: Team;
  assigned_at?: string;
  profiles?: { name: string; email?: string };
  // Optionally, add more fields as needed
} 