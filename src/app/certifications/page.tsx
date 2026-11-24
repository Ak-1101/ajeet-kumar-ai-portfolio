import React from 'react';
import { dataService } from '@/lib/data-service';
import { CertificationsList } from '@/components/certifications/CertificationsList';
import { Award, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Certifications & Professional Credentials | Ajeet Kumar',
  description: 'Verified certifications in Generative AI, Data Science, Cloud, Programming, and Academic Excellence, arranged chronologically with attached PDF and document viewers.',
};

export default async function CertificationsPage() {
  const certifications = await dataService.getCertifications();

  return (
    <div className="py-12 sm:py-20 bg-[#080d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/40 text-cyan-300 text-xs font-semibold mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Chronological Credentials</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Certifications & <span className="text-gradient">Professional Development</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            All credentials correspond to genuine documents and certificates verified across global technology leaders and academic bodies, sequenced chronologically with attached PDF and document previews.
          </p>
        </div>

        <CertificationsList certifications={certifications} />
      </div>
    </div>
  );
}
