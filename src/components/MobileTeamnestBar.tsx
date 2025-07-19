"use client";

export default function MobileTeamnestBar() {
  return (
    <div className="md:hidden flex items-center justify-center h-16 border-b border-gray-200 bg-white/90 fixed top-0 left-0 right-0 z-30">
      <button
        className="text-2xl font-extrabold tracking-wide text-[#123458] drop-shadow-lg select-none focus:outline-none"
        onClick={() => window.location.href = '/dashboard'}
        aria-label="Go to dashboard"
      >
        TEAMNEST
      </button>
    </div>
  );
} 