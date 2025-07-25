"use client";
import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      toast.error(error.message);
    } else {
      toast.success("Logged in!");
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg p-8 space-y-6 border border-gray-100 dark:border-gray-800"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">Sign In</h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Welcome back! Please login to your account.</p>
        {(searchParams.get("confirm") === "1" || searchParams.get("confirmed") === "1") && (
          <div className="mb-4 text-green-700 text-center font-semibold bg-green-50 border border-green-200 rounded p-2">
            {searchParams.get("confirmed") === "1"
              ? "Your email has been confirmed! You can now log in."
              : "Registration successful! Please check your email to confirm your account before logging in."}
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {error && <div className="text-red-500 text-center text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don&apos;t have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </p>
      </form>
    </div>
  );
} 