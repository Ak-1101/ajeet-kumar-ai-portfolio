'use client';

import React, { useState, useEffect } from 'react';
import { DocumentItem } from '@/types/database';
import {
  FileText,
  Plus,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Save,
  X,
  Loader2,
  Download,
  Eye,
  Lock,
  Globe,
} from 'lucide-react';

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [editingDoc, setEditingDoc] = useState<Partial<DocumentItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [settingCV, setSettingCV] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/content?collection=document')
      .then((r) => r.json())
      .then((d) => setDocuments(d.data || []));
  }, []);

  const handleSetCurrentCV = async (id: string) => {
    setSettingCV(id);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'set_cv',
          collection: 'document',
          id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDocuments(documents.map((d) => ({ ...d, is_current_cv: d.id === id })));
      }
    } catch {
      alert('Failed to set current CV');
    } finally {
      setSettingCV(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoc) return;
    setSaving(true);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isNew ? 'create' : 'update',
          collection: 'document',
          id: editingDoc.id,
          data: editingDoc,
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (isNew) {
          setDocuments([data.data, ...documents]);
        } else {
          setDocuments(documents.map((d) => (d.id === editingDoc.id ? { ...d, ...editingDoc } as DocumentItem : d)));
        }
        setEditingDoc(null);
        setIsNew(false);
      }
    } catch {
      alert('Failed to save document');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', collection: 'document', id }),
      });
      setDocuments(documents.filter((d) => d.id !== id));
    } catch {
      alert('Failed to delete document');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Document & CV Management</h2>
          <p className="text-xs text-slate-400">
            Upload new resume versions, manage public and private documents, and assign the active CV.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingDoc({
              name: '',
              description: '',
              category: 'CV / Resume',
              file_url: '/docs/Ajeet_Kumar_CV.pdf',
              file_size: '200 KB',
              is_current_cv: false,
              visibility: 'public',
              featured: true,
            });
            setIsNew(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Upload / Register Document</span>
        </button>
      </div>

      {editingDoc && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-[#0c1428] border border-cyan-500/40 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-white text-base">
              {isNew ? 'Register New Document' : 'Edit Document Info'}
            </h3>
            <button
              type="button"
              onClick={() => {
                setEditingDoc(null);
                setIsNew(false);
              }}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Document Name *</label>
              <input
                type="text"
                required
                value={editingDoc.name || ''}
                onChange={(e) => setEditingDoc({ ...editingDoc, name: e.target.value })}
                placeholder="e.g. Ajeet Kumar CV - Winter 2026 Edition"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Category *</label>
              <select
                value={editingDoc.category}
                onChange={(e) => setEditingDoc({ ...editingDoc, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              >
                <option value="CV / Resume">CV / Resume</option>
                <option value="Degree Certificate">Degree Certificate</option>
                <option value="Research Paper & Conference">Research Paper & Conference</option>
                <option value="Faculty Development">Faculty Development</option>
                <option value="Teaching Portfolio">Teaching Portfolio</option>
                <option value="Other Professional Document">Other Professional Document</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">File URL (Storage or Public path) *</label>
              <input
                type="text"
                required
                value={editingDoc.file_url || ''}
                onChange={(e) => setEditingDoc({ ...editingDoc, file_url: e.target.value })}
                placeholder="/docs/Ajeet_Kumar_CV.pdf or Supabase Storage URL"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">File Size (e.g. 192 KB)</label>
              <input
                type="text"
                value={editingDoc.file_size || ''}
                onChange={(e) => setEditingDoc({ ...editingDoc, file_size: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Description</label>
            <textarea
              rows={2}
              value={editingDoc.description || ''}
              onChange={(e) => setEditingDoc({ ...editingDoc, description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Visibility</label>
              <select
                value={editingDoc.visibility}
                onChange={(e) => setEditingDoc({ ...editingDoc, visibility: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              >
                <option value="public">Public (Visible to Visitors)</option>
                <option value="private">Private (Admin only)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="iscv"
                checked={editingDoc.is_current_cv || false}
                onChange={(e) => setEditingDoc({ ...editingDoc, is_current_cv: e.target.checked })}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-900"
              />
              <label htmlFor="iscv" className="text-xs text-slate-300 font-bold text-cyan-400">
                Mark as Active Current CV (Header Download Button)
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setEditingDoc(null);
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
              <span>Save Document</span>
            </button>
          </div>
        </form>
      )}

      {/* Documents List */}
      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className={`p-5 rounded-2xl border transition-all ${
              doc.is_current_cv
                ? 'bg-[#0f1d38] border-cyan-500 shadow-lg shadow-cyan-950/40'
                : 'bg-[#0c1428] border-slate-800'
            } flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs`}
          >
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{doc.name}</span>
                {doc.is_current_cv && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500 text-black shadow-sm">
                    Active CV
                  </span>
                )}
                {doc.visibility === 'public' ? (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                    <Globe className="w-3 h-3" />
                    <span>Public</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] text-amber-400">
                    <Lock className="w-3 h-3" />
                    <span>Private</span>
                  </span>
                )}
              </div>
              <p className="text-slate-400">{doc.category} • {doc.file_size || 'PDF Document'}</p>
              {doc.description && <p className="text-slate-300 text-[11px] line-clamp-1">{doc.description}</p>}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              {!doc.is_current_cv && doc.category.includes('CV') && (
                <button
                  onClick={() => handleSetCurrentCV(doc.id)}
                  disabled={settingCV === doc.id}
                  className="px-3 py-1.5 rounded-lg bg-cyan-950 text-cyan-300 hover:bg-cyan-900 border border-cyan-800 font-semibold text-[11px]"
                >
                  {settingCV === doc.id ? 'Activating...' : 'Set Active CV'}
                </button>
              )}

              <a
                href={doc.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:text-cyan-400 text-slate-300"
                title="Preview / Download"
              >
                <Eye className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => handleDelete(doc.id)}
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
