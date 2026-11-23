import React from 'react';
import { dataService } from '@/lib/data-service';
import { Award, Calendar, ExternalLink, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Certifications & Professional Development | Ajeet Kumar',
  description: 'Verified certifications in Generative AI, Data Science, Cloud, Programming, and Academic Excellence.',
};

export default async function CertificationsPage() {
  const certifications = await dataService.getCertifications();

  return (
    <div className="py-12 sm:py-20 bg-[#080d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/40 text-cyan-300 text-xs font-semibold mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Certifications & <span className="text-gradient">Professional Development</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            All credentials correspond to genuine documents and certificates verified across global technology leaders and academic bodies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl bg-[#0d162e] border border-slate-800 hover:border-cyan-500/50 flex flex-col justify-between transition-all duration-200 group shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{cert.issue_date}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    {cert.issuing_organization}
                  </p>
                </div>

                {cert.badge_details && (
                  <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-900/50 text-xs text-cyan-300 font-medium flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{cert.badge_details}</span>
                  </div>
                )}

                {cert.credential_id && (
                  <p className="text-[11px] text-slate-400 font-mono">
                    ID: {cert.credential_id}
                  </p>
                )}
              </div>

              <div className="pt-4 mt-6 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-emerald-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </span>

                {cert.certificate_file_url ? (
                  <a
                    href={cert.certificate_file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-400 hover:text-white hover:bg-cyan-600 transition-colors font-semibold"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-slate-400">Credential on File</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
