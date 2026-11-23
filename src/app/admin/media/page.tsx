'use client';

import React, { useState, useEffect } from 'react';
import { MediaItem } from '@/types/database';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  Search,
  Upload,
  FileText,
  Video,
} from 'lucide-react';

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/content?collection=media')
      .then((r) => r.json())
      .then((d) => setMedia(d.data || []));
  }, []);

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this media reference?')) return;
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', collection: 'media', id }),
      });
      setMedia(media.filter((m) => m.id !== id));
    } catch {
      alert('Failed to delete media');
    }
  };

  const filteredMedia = media.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase()) || m.file_url.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Media Asset Library</h2>
          <p className="text-xs text-slate-400">
            Central repository for profile portraits, degrees, certification PDFs, and diagrams.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#0c1428] border border-slate-800 flex flex-col justify-between space-y-4 shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
                  {item.file_type === 'image' && <ImageIcon className="w-4 h-4" />}
                  {item.file_type === 'pdf' && <FileText className="w-4 h-4" />}
                  {item.file_type === 'video' && <Video className="w-4 h-4" />}
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  {item.file_type}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm line-clamp-1">{item.title}</h4>
                <p className="text-[11px] text-slate-400 font-mono truncate mt-0.5">{item.file_url}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <button
                onClick={() => handleCopyUrl(item.file_url, item.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1">
                <a
                  href={item.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-slate-800 hover:text-cyan-400 text-slate-300"
                  title="Open Preview"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:text-rose-400 text-slate-300"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
