"use client";
import UserMenu from "./UserMenu";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl tracking-tight text-slate-900">TeamTask</span>
        </div>
        {/* Nav Links Centered */}
        <div className="flex-1 flex justify-center gap-8">
          <a href="/dashboard" className="text-slate-700 hover:text-slate-900 font-medium transition">Dashboard</a>
          <a href="/team" className="text-slate-700 hover:text-slate-900 font-medium transition">Teams</a>
        </div>
        <div className="flex items-center gap-4">
          <NotificationBell />
          <UserMenu />
        </div>
      </div>
    </nav>
  );
} 