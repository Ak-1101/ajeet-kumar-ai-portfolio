'use client';

import React, { useState, useEffect } from 'react';
import { Profile } from '@/types/database';
import { Save, CheckCircle2, AlertCircle, Loader2, User } from 'lucide-react';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/content?collection=profile')
      .then((res) => res.json())
      .then((data) => {
        // Fallback or fetched profile
        setProfile(data.data || {
          id: 'prof-1',
          full_name: 'Ajeet Kumar',
          headline: 'Software Engineer – AI/ML Trainer | Subject Matter Expert (SME)',
          tagline: 'Bridging AI, Industry & Education',
          short_bio: 'I work at the intersection of Artificial Intelligence, technology and education. My focus includes AI/ML, Generative AI, Agentic AI, technical training, academic innovation and developing industry-ready learning experiences.',
          detailed_bio: 'AI/ML Trainer and Software Engineering professional with experience in technical training, curriculum development, academic program coordination, and hands-on project mentoring. Specializes in Generative AI (GenAI), Agentic AI, prompt engineering, machine learning, deep learning, NLP, Python programming, data science, and application development.',
          teaching_philosophy: 'Experiential Learning: demystifying algorithmic complexity through visual architectures, live coding labs, and real-world project mentoring.',
          career_journey: 'BCA (First Division) and MCA (First Division with Honours), advancing into academic program leadership and national AI/ML training.',
          career_vision: 'To spearhead transformative AI education programs that combine Generative AI breakthroughs with production engineering standards.',
          avatar_url: '/assets/ajeet-kumar-profile.jpg',
          email: 'ajeetkumar.ak1101@gmail.com',
          phone: '7078546789',
          location: 'Rudrapur, Uttarakhand, India',
          linkedin_url: 'https://www.linkedin.com/in/itsajeetkumar/',
          github_url: 'https://github.com/Ak-1101',
          cv_url: '/docs/Ajeet_Kumar_CV.pdf',
          is_available_for_hire: true,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setStatus(null);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          collection: 'profile',
          data: profile,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Save failed');
      setStatus({ type: 'success', message: 'Profile updated successfully!' });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Profile & Bio Management</h2>
          <p className="text-xs text-slate-400">
            Edit your public biography, tagline, vision, and contact details across the website.
          </p>
        </div>
      </div>

      {status && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2.5 ${
            status.type === 'success'
              ? 'bg-emerald-950/80 border border-emerald-600/60 text-emerald-300'
              : 'bg-rose-950/80 border border-rose-600/60 text-rose-300'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-8 rounded-3xl bg-[#0c1428] border border-slate-800 space-y-6 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Full Name</label>
            <input
              type="text"
              value={profile.full_name}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Phone</label>
            <input
              type="text"
              value={profile.phone || ''}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Location</label>
            <input
              type="text"
              value={profile.location || ''}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Professional Headline</label>
          <input
            type="text"
            value={profile.headline}
            onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Main Tagline</label>
          <input
            type="text"
            value={profile.tagline}
            onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Short Introduction (Homepage Hero)</label>
          <textarea
            rows={3}
            value={profile.short_bio}
            onChange={(e) => setProfile({ ...profile, short_bio: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Detailed Biography (About Page)</label>
          <textarea
            rows={5}
            value={profile.detailed_bio || ''}
            onChange={(e) => setProfile({ ...profile, detailed_bio: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Teaching Philosophy & Experiential Learning</label>
          <textarea
            rows={4}
            value={profile.teaching_philosophy || ''}
            onChange={(e) => setProfile({ ...profile, teaching_philosophy: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">LinkedIn Profile URL</label>
            <input
              type="url"
              value={profile.linkedin_url || ''}
              onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">GitHub Profile URL</label>
            <input
              type="url"
              value={profile.github_url || ''}
              onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md text-xs hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
