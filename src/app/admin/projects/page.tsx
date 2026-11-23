'use client';

import React, { useState, useEffect } from 'react';
import { Project, ProjectStatus } from '@/types/database';
import { Plus, Edit2, Trash2, Save, X, FlaskConical, Loader2, Sparkles } from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProj, setEditingProj] = useState<Partial<Project> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    fetch('/api/admin/content?collection=project')
      .then((r) => r.json())
      .then((d) => setProjects(d.data || []));
  }, []);

  const handleEdit = (p: Project) => {
    setEditingProj({ ...p });
    setTechInput(p.technologies?.join(', ') || '');
    setIsNew(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProj) return;
    setSaving(true);

    const techArray = techInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      ...editingProj,
      technologies: techArray,
      slug: editingProj.slug || editingProj.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    };

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isNew ? 'create' : 'update',
          collection: 'project',
          id: editingProj.id,
          data: payload,
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (isNew) {
          setProjects([...projects, data.data]);
        } else {
          setProjects(projects.map((p) => (p.id === editingProj.id ? { ...p, ...payload } as Project : p)));
        }
        setEditingProj(null);
        setIsNew(false);
      }
    } catch {
      alert('Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', collection: 'project', id }),
      });
      setProjects(projects.filter((p) => p.id !== id));
    } catch {
      alert('Failed to delete project');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Project Portfolio Manager</h2>
          <p className="text-xs text-slate-400">Manage project descriptions, problem statements, solutions, and status badges.</p>
        </div>
        <button
          onClick={() => {
            setEditingProj({
              title: '',
              slug: '',
              short_description: '',
              problem_statement: '',
              solution: '',
              detailed_explanation: '',
              category: 'Generative AI',
              status: 'concept',
              technologies: [],
              featured: false,
              display_order: projects.length + 1,
            });
            setTechInput('');
            setIsNew(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {editingProj && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#0c1428] border border-cyan-500/40 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-base">
              {isNew ? 'Create New Project' : 'Edit Project Details'}
            </h3>
            <button
              type="button"
              onClick={() => {
                setEditingProj(null);
                setIsNew(false);
              }}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Project Title *</label>
              <input
                type="text"
                required
                value={editingProj.title || ''}
                onChange={(e) => setEditingProj({ ...editingProj, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Category *</label>
              <input
                type="text"
                required
                value={editingProj.category || ''}
                onChange={(e) => setEditingProj({ ...editingProj, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Project Status *</label>
              <select
                value={editingProj.status}
                onChange={(e) => setEditingProj({ ...editingProj, status: e.target.value as ProjectStatus })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              >
                <option value="completed">Completed Project</option>
                <option value="mentored">Mentored & Architecture</option>
                <option value="concept">System Concept</option>
                <option value="prototype">Working Prototype</option>
                <option value="in_progress">In Progress</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="pfeat"
                checked={editingProj.featured || false}
                onChange={(e) => setEditingProj({ ...editingProj, featured: e.target.checked })}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-900"
              />
              <label htmlFor="pfeat" className="text-xs text-slate-300">Feature on Homepage</label>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Short Summary *</label>
            <textarea
              rows={2}
              required
              value={editingProj.short_description || ''}
              onChange={(e) => setEditingProj({ ...editingProj, short_description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Problem Statement</label>
              <textarea
                rows={3}
                value={editingProj.problem_statement || ''}
                onChange={(e) => setEditingProj({ ...editingProj, problem_statement: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Solution</label>
              <textarea
                rows={3}
                value={editingProj.solution || ''}
                onChange={(e) => setEditingProj({ ...editingProj, solution: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Technologies (comma-separated)</label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="e.g. Generative AI, Gemini API, Streamlit, Python"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setEditingProj(null);
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
              <span>Save Project</span>
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {projects.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-2xl bg-[#0c1428] border border-slate-800 flex items-center justify-between text-xs gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{p.title}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {p.status}
                </span>
                {p.featured && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-950 text-blue-300 border border-blue-800">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-slate-400 line-clamp-1">{p.short_description}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="p-2 rounded-lg bg-slate-800 hover:text-cyan-400 text-slate-300"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="p-2 rounded-lg bg-slate-800 hover:text-rose-400 text-slate-300"
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
