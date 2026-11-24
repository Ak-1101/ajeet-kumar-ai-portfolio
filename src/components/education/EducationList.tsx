'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Education } from '@/types/database';
import {
  GraduationCap,
  Calendar,
  Award,
  Building2,
  ExternalLink,
  Download,
  Eye,
  X,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';

interface EducationListProps {
  education: Education[];
}

export function EducationList({ education }: EducationListProps) {
  const [previewDegree, setPreviewDegree] = useState<Education | null>(null);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {education.map((edu, idx) => (
          <div
            key={edu.id}
            className="p-8 rounded-3xl bg-[#0d162e] border border-slate-800 hover:border-cyan-500/50 flex flex-col justify-between transition-all duration-300 shadow-2xl group space-y-6"
          >
            <div className="space-y-4">
              {/* Badge & Timeline */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/80">
                  {edu.start_year} – {edu.end_year}
                </span>

                {edu.honors && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-800/60 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>{edu.honors}</span>
                  </span>
                )}
              </div>

              {/* Title & College */}
              <div>
                <h3 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                  {edu.degree}
                </h3>
                <p className="text-sm font-semibold text-cyan-400 mt-1 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span>{edu.institution}</span>
                </p>
                {edu.university && (
                  <p className="text-xs text-slate-400 mt-1">
                    Affiliated to {edu.university}
                  </p>
                )}
              </div>

              {/* Academic Performance */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Cumulative Grade</span>
                  <p className="text-base font-bold text-emerald-400 mt-0.5">{edu.grade || 'First Division'}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Classification</span>
                  <p className="text-base font-bold text-amber-300 mt-0.5">{edu.honors || 'First Division'}</p>
                </div>
              </div>

              {/* Official Certificate Verification Callout */}
              {edu.certificate_url && (
                <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-900/40 text-xs text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-cyan-400" />
                    <span>Official University Degree Scan Attached</span>
                  </span>
                  <button
                    onClick={() => setPreviewDegree(edu)}
                    className="text-cyan-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <Eye className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Degree Awarded & Verified</span>
              </span>

              {edu.certificate_url && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewDegree(edu)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all shadow-md"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Degree</span>
                  </button>

                  <a
                    href={edu.certificate_url}
                    download
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Download Degree Document"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Degree Inspection Modal */}
      {previewDegree && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="max-w-4xl w-full bg-[#0a1124] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[92vh]">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  {previewDegree.university || previewDegree.institution}
                </span>
                <h3 className="text-xl font-black text-white mt-0.5">
                  {previewDegree.degree}
                </h3>
                <p className="text-xs text-slate-400">
                  {previewDegree.honors} • {previewDegree.grade}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={previewDegree.certificate_url}
                  download
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Scan</span>
                </a>
                <button
                  onClick={() => setPreviewDegree(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
                  aria-label="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 flex items-center justify-center">
              <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center p-2">
                <Image
                  src={previewDegree.certificate_url || '/assets/ajeet-kumar-profile.jpg'}
                  alt={previewDegree.degree}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Official University Degree Scan</span>
              <a
                href={previewDegree.certificate_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Open in Full Browser Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
