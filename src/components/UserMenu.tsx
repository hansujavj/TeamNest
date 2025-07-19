"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@/types";

export default function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user as User);
    };
    fetchUser();
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!user) {
    return <a href="/login" className="text-blue-600 hover:underline">Login</a>;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold border border-slate-300 hover:bg-slate-300 transition"
        onClick={() => setDropdownOpen((v) => !v)}
      >
        {user.email?.[0]?.toUpperCase() || "U"}
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
          <div className="px-4 py-2 text-slate-700 text-sm font-medium">{user.email}</div>
          <button
            className="w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 text-sm transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
} 