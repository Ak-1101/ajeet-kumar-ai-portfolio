import React from 'react';
import Image from 'next/image';
import { dataService } from '@/lib/data-service';
import { BookOpen, Calendar, MapPin, Award, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Research & Conference Presentation | Ajeet Kumar',
  description: 'Academic research presentation at CIGAI 2026: LowRankAutoT: Low-Rank Autoencoder Transformer for Lossy Compression on Edge IoT Infrastructure.',
};

export default async function ResearchPage() {
  const researchList = await dataService.getResearch();

  return (
    <div className="py-12 sm:py-20 bg-[#080d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/40 text-cyan-300 text-xs font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Contributions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Research & <span className="text-gradient">Conference Presentation</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            Peer-reviewed international conference presentations and research investigations in edge IoT optimization and transformer architectures.
          </p>
        </div>

        {researchList.map((res) => (
          <div
            key={res.id}
            className="p-8 sm:p-10 rounded-3xl bg-[#0d162e] border border-slate-800 shadow-2xl space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
                <Cpu className="w-3.5 h-3.5" />
                <span>Conference Presentation Paper</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                {res.title}
              </h2>

              <p className="text-sm font-semibold text-cyan-400">
                Author: {res.authors}
              </p>
            </div>

            {/* Conference Detail Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Conference</span>
                <p className="text-sm font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{res.conference_name}</span>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Dates & Host</span>
                <p className="text-sm font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{res.conference_dates}</span>
                </p>
                <p className="text-xs text-slate-400">{res.location}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Publishing Partner</span>
                <p className="text-sm font-bold text-indigo-400">
                  {res.publishing_partner || 'Conference Proceedings'}
                </p>
                <p className="text-[11px] text-slate-400">
                  Accurately documented per official presentation certificate.
                </p>
              </div>
            </div>

            {/* Abstract */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Research Abstract & Contribution
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                {res.abstract}
              </p>
            </div>

            {/* Presentation Certificate Verification */}
            {res.certificate_url && (
              <div className="pt-6 border-t border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <span>Official Presentation Certificate (Verified)</span>
                    </h4>
                    <p className="text-xs text-slate-400">
                      Issued by Aditya Institute of Technology and Management (AITAM), Tekkali, Andhra Pradesh.
                    </p>
                  </div>

                  <a
                    href={res.certificate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white shadow-md transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open High-Res Certificate</span>
                  </a>
                </div>

                <div className="relative max-w-2xl w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700 bg-black/40">
                  <Image
                    src={res.certificate_url}
                    alt="CIGAI 2026 Presentation Certificate"
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="object-contain p-2"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
