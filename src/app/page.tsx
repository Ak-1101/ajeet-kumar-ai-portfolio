import React from 'react';
import Link from 'next/link';
import { dataService } from '@/lib/data-service';
import { Hero } from '@/components/home/Hero';
import { FeaturedSkills } from '@/components/home/FeaturedSkills';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { ResearchHighlight } from '@/components/home/ResearchHighlight';
import { CertificationsPreview } from '@/components/home/CertificationsPreview';
import { LatestBlogs } from '@/components/home/LatestBlogs';
import { Mail, Phone, MapPin, ArrowRight, Download, Sparkles } from 'lucide-react';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const [profile, skills, projects, research, certifications, posts] = await Promise.all([
    dataService.getProfile(),
    dataService.getSkills(),
    dataService.getProjects(),
    dataService.getResearch(),
    dataService.getCertifications(),
    dataService.getBlogPosts({ includePrivate: false, includeDrafts: false }),
  ]);

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION */}
      <Hero profile={profile} />

      {/* 2. FEATURED SKILLS & DOMAINS */}
      <FeaturedSkills skills={skills} />

      {/* 3. SELECTED PROJECTS */}
      <FeaturedProjects projects={projects} />

      {/* 4. RESEARCH HIGHLIGHT */}
      <ResearchHighlight research={research} />

      {/* 5. CERTIFICATIONS PREVIEW */}
      <CertificationsPreview certifications={certifications} />

      {/* 6. LATEST BLOGS & JOURNAL */}
      <LatestBlogs posts={posts} />

      {/* 7. CONTACT CTA SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#080d1a] to-[#040711] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-600/40 text-cyan-300 text-xs font-semibold mb-6 shadow-lg shadow-cyan-950/50">
            <Sparkles className="w-4 h-4" />
            <span>Ready to Collaborate?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Let&apos;s Build the Future of <span className="text-gradient">AI Education</span> Together
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Whether you are looking for specialized training in Generative & Agentic AI, corporate workshops, academic curriculum design, or project mentorship, I would love to connect.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </Link>

            <a
              href="/api/cv/download"
              download="Ajeet_Kumar_CV.pdf"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 hover:text-white transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <a href="mailto:ajeetkumar.ak1101@gmail.com" className="hover:text-cyan-400 transition-colors">
                ajeetkumar.ak1101@gmail.com
              </a>
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan-400" />
              <a href="tel:7078546789" className="hover:text-cyan-400 transition-colors">
                +91 7078546789
              </a>
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Rudrapur, Uttarakhand, India</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
