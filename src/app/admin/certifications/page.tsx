'use client';

import React, { useState, useEffect } from 'react';
import { Certification } from '@/types/database';
import { Plus, Edit2, Trash2, Save, X, Award, ExternalLink, Loader2 } from 'lucide-react';

export default function AdminCertificationsPage() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [editingCert, setEditingCert] = useState<Partial<Certification> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/content?collection=certification')
      .then((r) => r.json())
      .then((d) => setCerts(d.data || []));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;
    setSaving(true);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isNew ? 'create' : 'update',
          collection: 'certification',
          id: editingCert.id,
          data: editingCert,
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (isNew) {
          setCerts([...certs, data.data]);
        } else {
          setCerts(certs.map((c) => (c.id === editingCert.id ? { ...c, ...editingCert } as Certification : c)));
        }
        setEditingCert(null);
        setIsNew(false);
      }
    } catch {
      alert('Failed to save certification');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certification?')) return;
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', collection: 'certification', id }),
      });
      setCerts(certs.filter((c) => c.id !== id));
    } catch {
      alert('Failed to delete certification');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Certifications & Credentials</h2>
          <p className="text-xs text-slate-400">Manage credentials, badges, IDs, and certificate file links.</p>
        </div>
        <button
          onClick={() => {
            setEditingCert({
              title: '',
              issuing_organization: '',
              issue_date: '',
              credential_id: '',
              badge_details: '',
              certificate_file_url: '',
              display_order: certs.length + 1,
            });
            setIsNew(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Credential</span>
        </button>
      </div>

      {editingCert && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#0c1428] border border-cyan-500/40 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-base">
              {isNew ? 'Add Credential' : 'Edit Credential'}
            </h3>
            <button
              type="button"
              onClick={() => {
                setEditingCert(null);
                setIsNew(false);
              }}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Certification Title *</label>
              <input
                type="text"
                required
                value={editingCert.title || ''}
                onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Issuing Organization *</label>
              <input
                type="text"
                required
                value={editingCert.issuing_organization || ''}
                onChange={(e) => setEditingCert({ ...editingCert, issuing_organization: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Issue Date *</label>
              <input
                type="text"
                required
                value={editingCert.issue_date || ''}
                onChange={(e) => setEditingCert({ ...editingCert, issue_date: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Credential ID</label>
              <input
                type="text"
                value={editingCert.credential_id || ''}
                onChange={(e) => setEditingCert({ ...editingCert, credential_id: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Badge / Recognition Details</label>
            <input
              type="text"
              value={editingCert.badge_details || ''}
              onChange={(e) => setEditingCert({ ...editingCert, badge_details: e.target.value })}
              placeholder="e.g. Gold Badge | TEQ: 9.4/10"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Certificate File URL (PDF or Image)</label>
            <input
              type="text"
              value={editingCert.certificate_file_url || ''}
              onChange={(e) => setEditingCert({ ...editingCert, certificate_file_url: e.target.value })}
              placeholder="/certs/filename.pdf"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setEditingCert(null);
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
              <span>Save Credential</span>
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {certs.map((c) => (
          <div
            key={c.id}
            className="p-4 rounded-xl bg-[#0c1428] border border-slate-800 flex items-center justify-between text-xs"
          >
            <div>
              <p className="font-bold text-white">{c.title}</p>
              <p className="text-slate-400">{c.issuing_organization} • {c.issue_date} {c.badge_details ? `(${c.badge_details})` : ''}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingCert(c);
                  setIsNew(false);
                }}
                className="p-2 rounded-lg bg-slate-800 hover:text-cyan-400 text-slate-300"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(c.id)}
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
