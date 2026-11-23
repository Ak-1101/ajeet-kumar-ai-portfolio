'use client';

import React, { useState, useEffect } from 'react';
import { SiteSettings } from '@/types/database';
import { Save, Loader2, CheckCircle2, Shield, Globe, Terminal, Database } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/content?collection=settings')
      .then((r) => r.json())
      .then((d) =>
        setSettings(d.data || {
          id: 'set-1',
          site_title: 'Ajeet Kumar | AI/ML Trainer & Agentic AI Specialist',
          site_description: 'Personal Portfolio, Blog & Academic Platform of Ajeet Kumar.',
          contact_email: 'ajeetkumar.ak1101@gmail.com',
          contact_phone: '7078546789',
          linkedin_url: 'https://www.linkedin.com/in/itsajeetkumar/',
          github_url: 'https://github.com/Ak-1101',
          maintenance_mode: false,
        })
      );
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setStatus(null);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          collection: 'settings',
          data: settings,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Settings successfully persisted!');
      }
    } catch {
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (!settings) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white">Website & Deployment Settings</h2>
        <p className="text-xs text-slate-400">
          Configure site metadata, Supabase connectivity parameters, and deployment environment status.
        </p>
      </div>

      {status && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{status}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-8 rounded-3xl bg-[#0c1428] border border-slate-800 space-y-6 shadow-xl">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Site Title (Browser Tab & SEO)</label>
          <input
            type="text"
            required
            value={settings.site_title}
            onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Site Meta Description</label>
          <textarea
            rows={3}
            value={settings.site_description}
            onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Contact Email</label>
            <input
              type="email"
              value={settings.contact_email}
              onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Contact Phone</label>
            <input
              type="text"
              value={settings.contact_phone || ''}
              onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md text-xs hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Settings</span>
          </button>
        </div>
      </form>

      {/* Supabase & Vercel Diagnostics Card */}
      <div className="p-6 rounded-3xl bg-[#0a1122] border border-cyan-500/30 space-y-4 text-xs text-slate-300">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" />
          <span>Production Integration Architecture</span>
        </h3>
        <p className="leading-relaxed">
          The application is fully wired for Supabase PostgreSQL & Storage. Migration scripts and seed data are stored under <code className="text-cyan-400">/supabase/migrations/</code>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px]">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="font-bold text-white block mb-1">Local Development:</span>
            <span>Runs out of the box with verified CV credentials and local in-memory fallback.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <span className="font-bold text-white block mb-1">Vercel Deployment:</span>
            <span>Configure <code className="text-cyan-400">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="text-cyan-400">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in Vercel project settings.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
