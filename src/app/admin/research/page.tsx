'use client';

import React, { useState, useEffect } from 'react';
import { Research } from '@/types/database';
import { Save, Loader2, BookOpen, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function AdminResearchPage() {
  const [research, setResearch] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/content?collection=research')
      .then((r) => r.json())
      .then((d) => setResearch(d.data || []))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = async (item: Research) => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          collection: 'research',
          id: item.id,
          data: item,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('Research details updated successfully!');
      }
    } catch {
      alert('Failed to update research');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-slate-400">Loading research...</div>;

  const current = research[0];
  if (!current) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Research & Publications</h2>
          <p className="text-xs text-slate-400">Manage CIGAI 2026 conference presentation and paper data.</p>
        </div>
      </div>

      {status && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{status}</span>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate(current);
        }}
        className="p-8 rounded-3xl bg-[#0c1428] border border-slate-800 space-y-5 shadow-xl"
      >
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Paper Title</label>
          <input
            type="text"
            required
            value={current.title}
            onChange={(e) => setResearch([{ ...current, title: e.target.value }])}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Conference Name</label>
            <input
              type="text"
              required
              value={current.conference_name}
              onChange={(e) => setResearch([{ ...current, conference_name: e.target.value }])}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Publishing Partner</label>
            <input
              type="text"
              value={current.publishing_partner || ''}
              onChange={(e) => setResearch([{ ...current, publishing_partner: e.target.value }])}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Dates</label>
            <input
              type="text"
              value={current.conference_dates}
              onChange={(e) => setResearch([{ ...current, conference_dates: e.target.value }])}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Location</label>
            <input
              type="text"
              value={current.location}
              onChange={(e) => setResearch([{ ...current, location: e.target.value }])}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Authors & Institutional Affiliation</label>
          <input
            type="text"
            value={current.authors}
            onChange={(e) => setResearch([{ ...current, authors: e.target.value }])}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Abstract</label>
          <textarea
            rows={5}
            value={current.abstract || ''}
            onChange={(e) => setResearch([{ ...current, abstract: e.target.value }])}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Presentation Certificate File URL</label>
          <input
            type="text"
            value={current.certificate_url || ''}
            onChange={(e) => setResearch([{ ...current, certificate_url: e.target.value }])}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
          />
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-md"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Research Record</span>
          </button>
        </div>
      </form>
    </div>
  );
}
