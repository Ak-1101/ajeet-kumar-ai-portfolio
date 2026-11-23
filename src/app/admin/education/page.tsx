'use client';

import React, { useState, useEffect } from 'react';
import { Education } from '@/types/database';
import { Plus, Edit2, Trash2, Save, X, GraduationCap, Loader2 } from 'lucide-react';

export default function AdminEducationPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [editingEdu, setEditingEdu] = useState<Partial<Education> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/content?collection=education')
      .then((r) => r.json())
      .then((d) => setEducation(d.data || []));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu) return;
    setSaving(true);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isNew ? 'create' : 'update',
          collection: 'education',
          id: editingEdu.id,
          data: editingEdu,
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (isNew) {
          setEducation([...education, data.data]);
        } else {
          setEducation(education.map((edu) => (edu.id === editingEdu.id ? { ...edu, ...editingEdu } as Education : edu)));
        }
        setEditingEdu(null);
        setIsNew(false);
      }
    } catch {
      alert('Failed to save degree');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return;
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', collection: 'education', id }),
      });
      setEducation(education.filter((e) => e.id !== id));
    } catch {
      alert('Failed to delete education');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Education & Degrees</h2>
          <p className="text-xs text-slate-400">Manage academic qualifications, honors, and certificate attachments.</p>
        </div>
        <button
          onClick={() => {
            setEditingEdu({
              degree: '',
              institution: '',
              university: '',
              start_year: '',
              end_year: '',
              grade: '',
              honors: '',
              certificate_url: '',
              display_order: education.length + 1,
            });
            setIsNew(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Degree</span>
        </button>
      </div>

      {editingEdu && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#0c1428] border border-cyan-500/40 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-base">
              {isNew ? 'Add Academic Degree' : 'Edit Degree'}
            </h3>
            <button
              type="button"
              onClick={() => {
                setEditingEdu(null);
                setIsNew(false);
              }}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Degree / Qualification *</label>
              <input
                type="text"
                required
                value={editingEdu.degree || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">College / Institution *</label>
              <input
                type="text"
                required
                value={editingEdu.institution || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Affiliated University</label>
              <input
                type="text"
                value={editingEdu.university || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, university: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Start Year</label>
              <input
                type="text"
                value={editingEdu.start_year || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, start_year: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">End Year</label>
              <input
                type="text"
                value={editingEdu.end_year || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, end_year: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Grade / CGPA</label>
              <input
                type="text"
                value={editingEdu.grade || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, grade: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Honors / Division</label>
              <input
                type="text"
                value={editingEdu.honors || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, honors: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setEditingEdu(null);
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
              <span>Save Degree</span>
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="p-5 rounded-2xl bg-[#0c1428] border border-slate-800 flex items-center justify-between text-xs gap-4"
          >
            <div className="space-y-1">
              <span className="font-bold text-white text-sm">{edu.degree}</span>
              <p className="text-cyan-400 font-medium">{edu.institution} ({edu.start_year} – {edu.end_year})</p>
              <p className="text-slate-400">{edu.honors || ''} {edu.grade ? `• ${edu.grade}` : ''}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingEdu(edu);
                  setIsNew(false);
                }}
                className="p-2 rounded-lg bg-slate-800 hover:text-cyan-400 text-slate-300"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(edu.id)}
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
