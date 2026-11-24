'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Mail, ArrowRight, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid administrator credentials');
      }

      // Successfully authenticated
      window.location.href = '/admin/dashboard';
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060a14] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center mx-auto shadow-xl shadow-cyan-500/25">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white">Administrator Access</h1>
          <p className="text-xs text-slate-400">
            Sign in to manage portfolio content, projects, research, and publications.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form
          onSubmit={handleLogin}
          className="p-8 rounded-3xl bg-[#0c1428] border border-slate-800 shadow-2xl space-y-5"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your administrator email"
                autoComplete="email"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your administrator password"
                autoComplete="current-password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all text-xs"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying credentials...</span>
              </>
            ) : (
              <>
                <span>Sign in to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-500 text-center">
          <p>Protected area. All actions and sessions are authenticated securely.</p>
        </div>
      </div>
    </div>
  );
}
