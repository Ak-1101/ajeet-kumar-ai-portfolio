import React from 'react';
import Link from 'next/link';
import { dataService } from '@/lib/data-service';
import { formatDate } from '@/lib/utils';
import {
  BookOpen,
  FlaskConical,
  Award,
  FileText,
  Mail,
  Plus,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const [posts, projects, certs, docs, messages] = await Promise.all([
    dataService.getBlogPosts({ includePrivate: true, includeDrafts: true }),
    dataService.getProjects(),
    dataService.getCertifications(),
    dataService.getDocuments(false),
    dataService.getContactMessages(),
  ]);

  const publishedCount = posts.filter((p) => p.status === 'published').length;
  const draftCount = posts.filter((p) => p.status === 'draft').length;
  const unreadMessages = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-[#0c1428] border border-cyan-500/25 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-600/40 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Administrator Control Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Welcome back, Ajeet Kumar
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Manage your AI portfolio content, research articles, projects, uploaded credentials, and student/corporate inquiries in one place.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md text-xs hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Blog</span>
          </Link>

          <Link
            href="/admin/documents"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 text-xs transition-colors"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Manage CV</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Blogs */}
        <div className="p-6 rounded-2xl bg-[#0c1428] border border-slate-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Blog Publications
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{posts.length}</p>
          <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
            <span className="text-emerald-400 font-medium">{publishedCount} Published</span>
            <span>•</span>
            <span className="text-amber-400 font-medium">{draftCount} Drafts</span>
          </div>
        </div>

        {/* Total Projects */}
        <div className="p-6 rounded-2xl bg-[#0c1428] border border-slate-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Projects
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <FlaskConical className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{projects.length}</p>
          <p className="text-xs text-slate-400 pt-1">
            {projects.filter((p) => p.featured).length} Featured on Homepage
          </p>
        </div>

        {/* Certifications */}
        <div className="p-6 rounded-2xl bg-[#0c1428] border border-slate-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Certifications
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{certs.length}</p>
          <p className="text-xs text-slate-400 pt-1">
            All Verified Credentials On File
          </p>
        </div>

        {/* Contact Enquiries */}
        <div className="p-6 rounded-2xl bg-[#0c1428] border border-slate-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Contact Inquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{messages.length}</p>
          <p className="text-xs text-cyan-400 font-semibold pt-1">
            {unreadMessages > 0 ? `${unreadMessages} New Unread Messages` : 'All Messages Reviewed'}
          </p>
        </div>
      </div>

      {/* Two-Column Activity & Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Contact Messages */}
        <div className="p-6 rounded-3xl bg-[#0c1428] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Recent Inquiries</span>
            </h3>
            <Link
              href="/admin/messages"
              className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {messages.slice(0, 3).map((msg) => (
              <div
                key={msg.id}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{msg.name}</span>
                  <span className="text-[10px] text-slate-400">{formatDate(msg.created_at)}</span>
                </div>
                <p className="text-xs text-cyan-400 font-medium">{msg.subject}</p>
                <p className="text-xs text-slate-300 line-clamp-2">{msg.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Current Documents & Active CV */}
        <div className="p-6 rounded-3xl bg-[#0c1428] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Active Documents & CV</span>
            </h3>
            <Link
              href="/admin/documents"
              className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Manage Docs</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {docs.slice(0, 3).map((d) => (
              <div
                key={d.id}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-white line-clamp-1">{d.name}</p>
                  <p className="text-[11px] text-slate-400">{d.category} • {d.file_size}</p>
                </div>
                {d.is_current_cv ? (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                    Active CV
                  </span>
                ) : (
                  <span className="text-slate-500 text-[11px]">{d.download_count} Downloads</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
