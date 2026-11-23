import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { dataService } from '@/lib/data-service';
import {
  User,
  GraduationCap,
  Sparkles,
  BookOpen,
  Award,
  Compass,
  ArrowRight,
  Download,
  Linkedin,
  Github,
  Mail,
  CheckCircle2,
} from 'lucide-react';

export const metadata = {
  title: 'About Me | Ajeet Kumar - AI/ML Trainer & SME',
  description: 'Professional biography, academic journey, teaching philosophy, and career vision of Ajeet Kumar.',
};

export default async function AboutPage() {
  const profile = await dataService.getProfile();
  const education = await dataService.getEducation();

  return (
    <div className="py-12 sm:py-20 bg-[#080d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Banner */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/40 text-cyan-300 text-xs font-semibold mb-4">
            <User className="w-3.5 h-3.5" />
            <span>Profile & Background</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            About <span className="text-gradient">Ajeet Kumar</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            {profile.headline}
          </p>
        </div>

        {/* Bio & Portrait Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden bg-[#0d162e] border border-slate-700 shadow-2xl">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={profile.avatar_url || '/assets/ajeet-kumar-profile.jpg'}
                  alt="Ajeet Kumar"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-6 bg-[#0a1124] border-t border-slate-800 space-y-2">
                <p className="font-bold text-white text-lg">Ajeet Kumar</p>
                <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                  Software Engineer – AI/ML Trainer | SME
                </p>
                <p className="text-xs text-slate-400">Rudrapur, Uttarakhand, India</p>

                <div className="pt-4 flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/itsajeetkumar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-800 hover:text-cyan-400 text-slate-300 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/Ak-1101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-800 hover:text-cyan-400 text-slate-300 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:ajeetkumar.ak1101@gmail.com"
                    className="p-2 rounded-lg bg-slate-800 hover:text-cyan-400 text-slate-300 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c1428] border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Professional Identity</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Software Engineer – AI/ML Trainer</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Generative AI and Agentic AI Professional</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AI/ML Educator and Technical Trainer</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Academic Innovation and EdTech Professional</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Aspiring AI Education Program Leader</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            {/* Biography */}
            <div className="p-8 rounded-2xl bg-[#0d162e] border border-slate-800 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
                <User className="w-5 h-5 text-cyan-400" />
                <span>Professional Biography</span>
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {profile.detailed_bio}
              </p>
            </div>

            {/* Teaching Philosophy */}
            <div className="p-8 rounded-2xl bg-[#0d162e] border border-slate-800 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>Teaching Philosophy & Experiential Learning</span>
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {profile.teaching_philosophy}
              </p>
            </div>

            {/* Career Journey */}
            <div className="p-8 rounded-2xl bg-[#0d162e] border border-slate-800 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
                <Award className="w-5 h-5 text-cyan-400" />
                <span>Career Journey</span>
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {profile.career_journey}
              </p>
            </div>

            {/* Career Vision */}
            <div className="p-8 rounded-2xl bg-[#0d162e] border border-slate-800 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-cyan-400" />
                <span>Career Vision</span>
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {profile.career_vision}
              </p>
            </div>

            {/* Verified Education Section */}
            <div className="p-8 rounded-2xl bg-[#0d162e] border border-slate-800 space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <span>Academic Education</span>
              </h2>

              <div className="space-y-6">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                        {edu.start_year} – {edu.end_year}
                      </span>
                    </div>

                    <p className="text-sm text-cyan-400/90 font-medium">{edu.institution}</p>
                    {edu.university && (
                      <p className="text-xs text-slate-400">{edu.university}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
                      {edu.grade && (
                        <span className="font-semibold text-emerald-400">
                          {edu.grade}
                        </span>
                      )}
                      {edu.honors && (
                        <span className="font-semibold text-amber-300">
                          {edu.honors}
                        </span>
                      )}
                      {edu.certificate_url && (
                        <a
                          href={edu.certificate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:underline font-medium"
                        >
                          View Official Degree
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
