"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  FolderOpenIcon,
  ChartBarIcon,
  UsersIcon,
  DocumentTextIcon,
  UserCircleIcon,
  ArrowPathIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
  CalendarDaysIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const menuItems = [
  { label: "Dashboard", icon: <HomeIcon className="w-6 h-6" />, path: "/dashboard" },
  { label: "Teams", icon: <UsersIcon className="w-6 h-6" />, path: "/team" },
  { label: "Tasks", icon: <DocumentTextIcon className="w-6 h-6" />, path: "/profile" },
  { label: "Notifications", icon: <BellIcon className="w-6 h-6" />, path: "/notifications", badge: true },
  { label: "Calendar", icon: <CalendarDaysIcon className="w-6 h-6" />, path: "/calendar" },
  { label: "Profile", icon: <UserCircleIcon className="w-6 h-6" />, path: "/profile" },
];

export default function HamburgerSidebar({ unreadNotifications = 0, activePath = "" }) {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  // Removed dark mode state

  // Close sidebar on outside click (mobile)
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  async function handleLogout() {
    setShowLogoutConfirm(false);
    await supabase.auth.signOut();
    router.push("/login");
  }

  // Responsive: show hamburger on small screens
  return (
    <>
      {/* Hamburger Icon */}
      <button
        className="fixed top-4 left-4 z-40 md:hidden bg-gray-800 text-white p-2 rounded-lg shadow-lg focus:outline-none"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar menu"
      >
        <Bars3Icon className="w-7 h-7" />
      </button>
      {/* Sidebar Overlay (mobile) */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/30 dark:bg-black/60 transition-all md:hidden" onClick={() => setOpen(false)} />
      )}
      {/* Sidebar */}
      <nav
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-gray-800 dark:bg-gray-900 text-white flex flex-col transition-all duration-300 transform ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-64 md:flex md:h-screen`}
        aria-label="Sidebar"
      >
        {/* App Name at Top */}
        <div className="flex items-center justify-center py-6 border-b border-gray-700">
          <button
            className="text-2xl font-extrabold tracking-wide text-[#D4C9BE] drop-shadow-lg select-none hover:text-[#123458] transition focus:outline-none"
            onClick={() => router.push('/dashboard')}
            aria-label="Go to dashboard"
          >
            TEAMNEST
          </button>
        </div>
        {/* Close button (mobile) */}
        <div className="flex items-center justify-between px-4 py-4 md:hidden">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={() => setOpen(false)} aria-label="Close sidebar">
            <XMarkIcon className="w-7 h-7 text-white" />
          </button>
        </div>
        {/* Menu Items */}
        <ul className="flex-1 flex flex-col gap-1 mt-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                className={`w-full flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-200 font-medium text-base hover:bg-gray-700 focus:outline-none relative ${activePath === item.path ? "bg-gray-700" : ""}`}
                onClick={() => { router.push(item.path); setOpen(false); }}
                aria-current={activePath === item.path ? "page" : undefined}
              >
                {item.icon}
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && unreadNotifications > 0 && (
                  <>
                    <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">{unreadNotifications}</span>
                    <span className="ml-2 inline-block w-3 h-3 rounded-full bg-blue-500 border-2 border-white animate-pulse" aria-label="New notification" />
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
        {/* Theme Toggle & Logout at bottom */}
        <div className="px-5 py-4 border-t border-gray-700 flex flex-col gap-2">
          {/* Removed dark mode toggle button */}
          <button
            className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-red-600 hover:text-white transition text-base font-semibold mt-2"
            onClick={() => setShowLogoutConfirm(true)}
            aria-label="Logout"
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            <span>Logout</span>
          </button>
        </div>
        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6 max-w-xs w-full border border-[#D4C9BE]">
              <div className="text-lg font-bold text-[#123458]">Are you sure you want to log out?</div>
              <div className="flex gap-4 w-full justify-center">
                <button
                  className="px-5 py-2 rounded-lg bg-[#123458] text-white font-semibold hover:bg-[#D4C9BE] hover:text-[#123458] transition"
                  onClick={handleLogout}
                >
                  Yes
                </button>
                <button
                  className="px-5 py-2 rounded-lg bg-gray-200 text-[#123458] font-semibold hover:bg-gray-300 transition"
                  onClick={() => setShowLogoutConfirm(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
} 