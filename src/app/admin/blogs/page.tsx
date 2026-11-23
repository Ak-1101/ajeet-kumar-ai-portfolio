'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/database';
import { formatDate } from '@/lib/utils';
import {
  PenTool,
  Plus,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/content?collection=blog')
      .then((r) => r.json())
      .then((d) => setPosts(d.data || []))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', collection: 'blog', id }),
      });
      setPosts(posts.filter((p) => p.id !== id));
    } catch {
      alert('Failed to delete blog post');
    }
  };

  const handleToggleStatus = async (post: BlogPost) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          collection: 'blog',
          id: post.id,
          data: { status: newStatus },
        }),
      });
      setPosts(posts.map((p) => (p.id === post.id ? { ...p, status: newStatus } : p)));
    } catch {
      alert('Failed to update status');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Blog & Daily Journal Editor</h2>
          <p className="text-xs text-slate-400">
            Publish technical tutorials, AI deep dives, and personal daily reflections.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </Link>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-5 rounded-2xl bg-[#0c1428] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
          >
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{post.title}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    post.status === 'published'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}
                >
                  {post.status}
                </span>
                {post.is_journal && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-800">
                    Journal
                  </span>
                )}
                {post.is_private && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    Private
                  </span>
                )}
              </div>
              <p className="text-slate-400">
                {post.category_name || 'AI Publication'} • {post.reading_time_minutes} min read • Published: {formatDate(post.published_at)}
              </p>
              {post.subtitle && (
                <p className="text-slate-300 text-[11px] line-clamp-1 italic">{post.subtitle}</p>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => handleToggleStatus(post)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold"
              >
                {post.status === 'published' ? 'Unpublish (Draft)' : 'Publish'}
              </button>

              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className="p-2 rounded-lg bg-slate-800 hover:text-cyan-400 text-slate-300"
                title="View Post"
              >
                <Eye className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => handleDelete(post.id)}
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
