"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to <a href="/dashboard" className="text-blue-600 underline">dashboard</a>...</p>
    </div>
  );
}
