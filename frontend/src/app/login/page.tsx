"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[250px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-2xl mx-auto mb-3 shadow-md">
              ⚡
            </div>
            <h1 className="text-2xl font-bold text-white">
              {isSignUp ? "Create BidReady AI Account" : "Welcome Back"}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {isSignUp
                ? "Sign up to start automated tender analysis and proposal drafting"
                : "Sign in to access your tender workspace and AI assistant"}
            </p>
          </div>

          {/* Social Login Placeholders */}
          <div className="space-y-2.5 mb-6">
            <button
              type="button"
              className="w-full py-2.5 px-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 flex items-center justify-center space-x-2 transition-colors"
            >
              <span>🔷</span>
              <span>Continue with IBM ID</span>
            </button>
            <button
              type="button"
              className="w-full py-2.5 px-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 flex items-center justify-center space-x-2 transition-colors"
            >
              <span>🌐</span>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-6">
            <div className="w-full border-t border-slate-800" />
            <span className="bg-slate-900 px-3 text-[10px] text-slate-500 uppercase tracking-widest font-mono">
              Or with email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Work Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">
                  Password
                </label>
                {!isSignUp && (
                  <a href="#" className="text-[11px] text-blue-400 hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {submitted && (
              <div className="p-3 bg-emerald-950 border border-emerald-800/50 rounded-xl text-xs text-emerald-400 text-center font-medium animate-fadeIn">
                ✅ Authentication successful! Redirecting to Dashboard...
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg transition-all"
            >
              {isSignUp ? "Create Account" : "Sign In to Workspace"}
            </button>
          </form>

          {/* Toggle Sign In / Sign Up */}
          <div className="mt-6 text-center text-xs text-slate-400">
            {isSignUp ? (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-blue-400 font-semibold hover:underline"
                >
                  Sign In
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="text-blue-400 font-semibold hover:underline"
                >
                  Create one
                </button>
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
