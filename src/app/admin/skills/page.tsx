'use client';

import React, { useState, useEffect } from 'react';
import { Skill } from '@/types/database';
import { Plus, Edit2, Trash2, Save, X, Layers, Loader2 } from 'lucide-react';

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const categories = [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Generative AI',
    'Agentic AI',
    'Large Language Models',
    'RAG and AI Agents',
    'Python Programming',
    'Data Science and Analytics',
    'NLP and Multimodal AI',
    'Web Development',
    'Database Management',
    'Cloud and Deployment',
    'Technical Training and Academic Leadership',
  ];

  useEffect(() => {
    fetch('/api/admin/content?collection=skill')
      .then((r) => r.json())
      .then((d) => setSkills(d.data || []));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;
    setSaving(true);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isNew ? 'create' : 'update',
          collection: 'skill',
          id: editingSkill.id,
          data: editingSkill,
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (isNew) {
          setSkills([...skills, data.data]);
        } else {
          setSkills(skills.map((s) => (s.id === editingSkill.id ? { ...s, ...editingSkill } as Skill : s)));
        }
        setEditingSkill(null);
        setIsNew(false);
      }
    } catch {
      alert('Failed to save skill');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', collection: 'skill', id }),
      });
      setSkills(skills.filter((s) => s.id !== id));
    } catch {
      alert('Failed to delete skill');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Skills & Domains Editor</h2>
          <p className="text-xs text-slate-400">Manage skills across all 14 structured technical domains.</p>
        </div>
        <button
          onClick={() => {
            setEditingSkill({
              category: 'Generative AI',
              name: '',
              proficiency_level: 'Advanced',
              featured: true,
              display_order: skills.length + 1,
            });
            setIsNew(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {editingSkill && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#0c1428] border border-cyan-500/40 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-base">
              {isNew ? 'Add Technical Skill' : 'Edit Skill'}
            </h3>
            <button
              type="button"
              onClick={() => {
                setEditingSkill(null);
                setIsNew(false);
              }}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Category *</label>
              <select
                value={editingSkill.category}
                onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Skill Name *</label>
              <input
                type="text"
                required
                value={editingSkill.name || ''}
                onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                placeholder="e.g. Agentic AI Architecture"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Proficiency Level</label>
              <select
                value={editingSkill.proficiency_level}
                onChange={(e) => setEditingSkill({ ...editingSkill, proficiency_level: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              >
                <option value="Advanced">Advanced</option>
                <option value="Proficient">Proficient</option>
                <option value="Core">Core</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="feat"
                checked={editingSkill.featured || false}
                onChange={(e) => setEditingSkill({ ...editingSkill, featured: e.target.checked })}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-900"
              />
              <label htmlFor="feat" className="text-xs text-slate-300">Feature on Homepage</label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setEditingSkill(null);
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
              <span>Save Skill</span>
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {skills.map((s) => (
          <div
            key={s.id}
            className="p-3.5 rounded-xl bg-[#0c1428] border border-slate-800 flex items-center justify-between text-xs"
          >
            <div>
              <p className="font-bold text-white">{s.name}</p>
              <p className="text-[11px] text-cyan-400">{s.category} • {s.proficiency_level}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setEditingSkill(s);
                  setIsNew(false);
                }}
                className="p-1.5 rounded-lg bg-slate-800 hover:text-cyan-400 text-slate-300"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                className="p-1.5 rounded-lg bg-slate-800 hover:text-rose-400 text-slate-300"
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
