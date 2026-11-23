'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  ArrowLeft,
  PenTool,
  Loader2,
  Sparkles,
  Code2,
  List,
  Heading2,
  Heading3,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';

export default function NewBlogPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    slug: '',
    content: '',
    excerpt: '',
    category_id: 'cat-1',
    category_name: 'Generative AI',
    status: 'published' as 'published' | 'draft',
    is_journal: false,
    is_private: false,
    featured: false,
    reading_time_minutes: 5,
    tags: 'Generative AI, LLMs',
    seo_title: '',
    seo_description: '',
  });

  const categories = [
    { id: 'cat-1', name: 'Generative AI' },
    { id: 'cat-2', name: 'Agentic AI' },
    { id: 'cat-3', name: 'Machine Learning' },
    { id: 'cat-4', name: 'Data Science' },
    { id: 'cat-5', name: 'Teaching and Education' },
    { id: 'cat-6', name: 'Personal Life & Journal' },
    { id: 'cat-7', name: 'Technology Tutorials' },
  ];

  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setFormData({ ...formData, title, slug, seo_title: `${title} | Ajeet Kumar` });
  };

  const insertSnippet = (snippet: string) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content + '\n' + snippet,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const tagArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      ...formData,
      tags: tagArray,
      published_at: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          collection: 'blog',
          data: payload,
        }),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/blogs');
      } else {
        alert(data.message || 'Failed to create blog');
      }
    } catch {
      alert('Network error while saving post');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>
        <span className="text-xs text-slate-400 font-medium">New Publication Post</span>
      </div>

      <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-[#0c1428] border border-slate-800 space-y-6 shadow-2xl">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white">Create Article / Daily Journal</h2>
          <p className="text-xs text-slate-400">
            Write content using structured Markdown, syntax highlighting, and SEO metadata.
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Article Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. Building Enterprise RAG with Autonomous AI Agents"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm font-bold text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Subtitle / Tagline</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="e.g. Architecture patterns for grounded LLM workflows"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">URL Slug *</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-400 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Category *</label>
            <select
              value={formData.category_name}
              onChange={(e) => {
                const found = categories.find((c) => c.name === e.target.value);
                setFormData({
                  ...formData,
                  category_name: e.target.value,
                  category_id: found?.id || 'cat-1',
                });
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Publication Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="published">Published (Live)</option>
              <option value="draft">Draft (Private)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Est. Reading Time (Mins)</label>
            <input
              type="number"
              min={1}
              value={formData.reading_time_minutes}
              onChange={(e) => setFormData({ ...formData, reading_time_minutes: parseInt(e.target.value) || 5 })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Summary / Excerpt *</label>
          <textarea
            rows={2}
            required
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value, seo_description: e.target.value })}
            placeholder="A compelling 1-2 sentence overview shown on blog index cards and search results..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Content & Snippet Toolbar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300">Article Content (Markdown) *</label>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>Insert:</span>
              <button
                type="button"
                onClick={() => insertSnippet('## Section Heading')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:text-white"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => insertSnippet('### Subheading')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:text-white"
              >
                H3
              </button>
              <button
                type="button"
                onClick={() => insertSnippet('```python\n# Code snippet\nprint("Hello, Agentic AI")\n```')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:text-white"
              >
                Code
              </button>
              <button
                type="button"
                onClick={() => insertSnippet('- Bullet point item')}
                className="px-2 py-0.5 rounded bg-slate-800 hover:text-white"
              >
                List
              </button>
            </div>
          </div>

          <textarea
            rows={14}
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write your article in markdown. Supports headings (##, ###), bullet lists (- ), numbered lists (1. ), code blocks (```python ... ```)..."
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 leading-relaxed"
          />
        </div>

        {/* Flags & Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_journal"
              checked={formData.is_journal}
              onChange={(e) => setFormData({ ...formData, is_journal: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-800"
            />
            <label htmlFor="is_journal" className="text-slate-300">Personal Daily Journal</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_private"
              checked={formData.is_private}
              onChange={(e) => setFormData({ ...formData, is_private: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-800"
            />
            <label htmlFor="is_private" className="text-slate-300">Private Entry (Admin Only)</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-800"
            />
            <label htmlFor="featured" className="text-slate-300">Featured on Homepage</label>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Tags (comma-separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="Generative AI, Agentic AI, Python, Mentoring"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
          <Link
            href="/admin/blogs"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md text-xs hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save & Publish Article</span>
          </button>
        </div>
      </form>
    </div>
  );
}
