'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, ExternalLink, Bell, CheckCircle2 } from 'lucide-react';

export function AdminHeader() {
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return null;
  }

  // Generate page title based on path
  const getPageTitle = () => {
    if (pathname.includes('/admin/profile')) return 'Profile & Bio Management';
    if (pathname.includes('/admin/experience')) return 'Professional Experience Manager';
    if (pathname.includes('/admin/education')) return 'Education & Degrees';
    if (pathname.includes('/admin/skills')) return 'Skills & Domains Editor';
    if (pathname.includes('/admin/projects')) return 'Project Portfolio Manager';
    if (pathname.includes('/admin/research')) return 'Research & Publication Records';
    if (pathname.includes('/admin/certifications')) return 'Certifications & Credentials';
    if (pathname.includes('/admin/documents')) return 'Document & CV Management';
    if (pathname.includes('/admin/blogs')) return 'Blog & Daily Journal Editor';
    if (pathname.includes('/admin/media')) return 'Media Asset Library';
    if (pathname.includes('/admin/messages')) return 'Contact Inquiries & Messages';
    if (pathname.includes('/admin/settings')) return 'Site & Deployment Settings';
    return 'Administrator Overview Dashboard';
  };

  return (
    <header className="h-16 bg-[#090f1f]/80 backdrop-blur-md border-b border-slate-800/80 px-6 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-base sm:text-lg font-bold text-white">
          {getPageTitle()}
        </h1>
        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800/50">
          <CheckCircle2 className="w-3 h-3" />
          <span>System Healthy</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          <span>Live Site</span>
        </Link>
      </div>
    </header>
  );
}
