'use client';

import React, { useState, useEffect } from 'react';
import { Experience } from '@/types/database';
import { Plus, Edit2, Trash2, Save, X, Briefcase, CheckCircle2, Loader2 } from 'lucide-react';

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchExperiences = () => {
    fetch('/api/admin/content?collection=experience')
      .then((res) => res.json())
      .then((data) => {
        // Fallback to initial data if needed
        setExperiences(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    // Initial fetch from dataService
    fetch('/api/admin/content?collection=experience')
      .then((r) => r.json())
      .then((d) => setExperiences(d.data || []))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;
    setSaving(true);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isNew ? 'create' : 'update',
          collection: 'experience',
          id: editingExp.id,
          data: editingExp,
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (isNew) {
          setExperiences([...experiences, data.data]);
        } else {
          setExperiences(experiences.map((exp) => (exp.id === editingExp.id ? { ...exp, ...editingExp } as Experience : exp)));
        }
        setEditingExp(null);
        setIsNew(false);
      }
    } catch (err) {
      alert('Failed to save experience');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience record?')) return;
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          collection: 'experience',
          id,
        }),
      });
      setExperiences(experiences.filter((e) => e.id !== id));
    } catch {
      alert('Failed to delete experience');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Experience Timeline Manager</h2>
          <p className="text-xs text-slate-400">Add, edit, and organize verified work history and academic roles.</p>
        </div>
        <button
          onClick={() => {
            setEditingExp({
              company: '',
              role: '',
              start_date: '',
              end_date: 'Present',
              is_current: false,
              description: '',
              responsibilities: [],
              technologies: [],
              display_order: experiences.length + 1,
            });
            setIsNew(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Position</span>
        </button>
      </div>

      {/* Editor Modal / Form */}
      {editingExp && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#0c1428] border border-cyan-500/40 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-base">
              {isNew ? 'Add New Experience' : 'Edit Experience'}
            </h3>
            <button
              type="button"
              onClick={() => {
                setEditingExp(null);
                setIsNew(false);
              }}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Company / Organization *</label>
              <input
                type="text"
                required
                value={editingExp.company || ''}
                onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Job Title / Role *</label>
              <input
                type="text"
                required
                value={editingExp.role || ''}
                onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Deployment Details (Optional)</label>
              <input
                type="text"
                value={editingExp.deployment_details || ''}
                onChange={(e) => setEditingExp({ ...editingExp, deployment_details: e.target.value })}
                placeholder="e.g. Deployed at Dev Bhoomi Uttarakhand University"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Start Date *</label>
              <input
                type="text"
                required
                value={editingExp.start_date || ''}
                onChange={(e) => setEditingExp({ ...editingExp, start_date: e.target.value })}
                placeholder="Aug 2026"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">End Date *</label>
              <input
                type="text"
                required
                value={editingExp.end_date || ''}
                onChange={(e) => setEditingExp({ ...editingExp, end_date: e.target.value })}
                placeholder="Present"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Role Summary *</label>
            <textarea
              rows={3}
              required
              value={editingExp.description || ''}
              onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setEditingExp(null);
                setIsNew(false);
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-md"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Record</span>
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="space-y-3">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-5 rounded-2xl bg-[#0c1428] border border-slate-800 flex items-center justify-between text-xs gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{exp.role}</span>
                <span className="font-semibold text-cyan-400">@ {exp.company}</span>
                {exp.is_current && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800">
                    Active
                  </span>
                )}
              </div>
              <p className="text-slate-400">
                {exp.start_date} – {exp.end_date} {exp.deployment_details ? `(${exp.deployment_details})` : ''}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingExp(exp);
                  setIsNew(false);
                }}
                className="p-2 rounded-lg bg-slate-800 hover:text-cyan-400 text-slate-300"
                title="Edit"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="p-2 rounded-lg bg-slate-800 hover:text-rose-400 text-slate-300"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
