import React from 'react';
import Link from 'next/link';
import { Award, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { Certification } from '@/types/database';

interface CertificationsPreviewProps {
  certifications: Certification[];
}

export function CertificationsPreview({ certifications }: CertificationsPreviewProps) {
  return (
    <section className="py-20 bg-[#080d1a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/40 text-cyan-300 text-xs font-semibold mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Certifications & Professional Development
            </h2>
            <p className="mt-2 text-base text-slate-400 max-w-2xl">
              Authentic industry and academic credentials in GenAI, Data Science, Cloud, and Faculty Excellence.
            </p>
          </div>

          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors group"
          >
            <span>View All Credentials</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.slice(0, 4).map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-2xl bg-[#0c1428] border border-slate-800 hover:border-cyan-500/40 flex flex-col justify-between transition-all group"
            >
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Award className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  {cert.issuing_organization}
                </p>
                {cert.badge_details && (
                  <p className="text-xs text-cyan-400/90 font-medium bg-cyan-950/40 px-2 py-1 rounded-md border border-cyan-900/40">
                    {cert.badge_details}
                  </p>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>{cert.issue_date}</span>
                {cert.certificate_file_url ? (
                  <a
                    href={cert.certificate_file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-slate-400">Verified</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
