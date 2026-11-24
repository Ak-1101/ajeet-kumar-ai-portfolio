'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Certification } from '@/types/database';
import {
  Award,
  Calendar,
  ExternalLink,
  ShieldCheck,
  FileText,
  Download,
  Eye,
  X,
  Filter,
  CheckCircle2,
} from 'lucide-react';

interface CertificationsListProps {
  certifications: Certification[];
}

export function CertificationsList({ certifications }: CertificationsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewCert, setPreviewCert] = useState<Certification | null>(null);

  const categories = [
    'all',
    'Generative AI',
    'Data Science & Analytics',
    'Cloud',
    'Academic & Faculty',
    'Programming',
  ];

  const filteredCerts = certifications.filter((cert) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'Generative AI')
      return (
        cert.title.toLowerCase().includes('gen ai') ||
        cert.title.toLowerCase().includes('generative') ||
        cert.issuing_organization.toLowerCase().includes('databricks')
      );
    if (selectedCategory === 'Data Science & Analytics')
      return (
        cert.title.toLowerCase().includes('data science') ||
        cert.title.toLowerCase().includes('data analytics') ||
        cert.title.toLowerCase().includes('dataplus')
      );
    if (selectedCategory === 'Cloud')
      return cert.title.toLowerCase().includes('aws') || cert.title.toLowerCase().includes('cloud');
    if (selectedCategory === 'Academic & Faculty')
      return (
        cert.title.toLowerCase().includes('faculty') ||
        cert.title.toLowerCase().includes('cigai') ||
        cert.title.toLowerCase().includes('fdp')
      );
    if (selectedCategory === 'Programming')
      return (
        cert.title.toLowerCase().includes('python') ||
        cert.title.toLowerCase().includes('c training') ||
        cert.title.toLowerCase().includes('digital 101')
      );
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Category Filter Navigation */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Date-wise Sequential Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert, index) => {
          const isPdf = cert.certificate_file_url?.toLowerCase().endsWith('.pdf');

          return (
            <div
              key={cert.id}
              className="p-6 rounded-2xl bg-[#0d162e] border border-slate-800 hover:border-cyan-500/50 flex flex-col justify-between transition-all duration-300 group shadow-xl"
            >
              <div className="space-y-4">
                {/* Header Node with Sequence & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-800/80 text-cyan-400 font-mono text-[11px] font-bold flex items-center justify-center">
                      #{index + 1}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-cyan-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{cert.issue_date}</span>
                    </span>
                  </div>

                  {cert.certificate_file_url && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {isPdf ? 'PDF ATTACHED' : 'CERTIFICATE SCAN'}
                    </span>
                  )}
                </div>

                {/* Title & Organization */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    {cert.issuing_organization}
                  </p>
                </div>

                {/* Badge Details */}
                {cert.badge_details && (
                  <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-900/50 text-xs text-cyan-300 font-medium flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="line-clamp-2">{cert.badge_details}</span>
                  </div>
                )}

                {/* Credential ID */}
                {cert.credential_id && (
                  <p className="text-[11px] text-slate-400 font-mono truncate">
                    ID: {cert.credential_id}
                  </p>
                )}
              </div>

              {/* Action Buttons: Embedded Preview & Download in Same Section */}
              <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-emerald-400 flex items-center gap-1 font-semibold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </span>

                <div className="flex items-center gap-2">
                  {cert.certificate_file_url ? (
                    <>
                      <button
                        onClick={() => setPreviewCert(cert)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/90 text-cyan-300 hover:bg-cyan-900 border border-cyan-800 font-bold transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview File</span>
                      </button>

                      <a
                        href={cert.certificate_file_url}
                        download
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                        title="Download Document"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </>
                  ) : (
                    <span className="text-slate-400 text-[11px]">Verified on File</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* In-Page Certificate Document Viewer Modal */}
      {previewCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="max-w-4xl w-full bg-[#0a1124] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  {previewCert.issuing_organization} • {previewCert.issue_date}
                </span>
                <h3 className="text-xl font-black text-white mt-0.5">
                  {previewCert.title}
                </h3>
                {previewCert.credential_id && (
                  <p className="text-xs text-slate-400 font-mono">
                    Credential ID: {previewCert.credential_id}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={previewCert.certificate_file_url}
                  download
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => setPreviewCert(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
                  aria-label="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content Preview */}
            <div className="flex-1 overflow-y-auto py-4 flex items-center justify-center">
              {previewCert.certificate_file_url?.toLowerCase().endsWith('.pdf') ? (
                <div className="w-full h-[65vh] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                  <iframe
                    src={`${previewCert.certificate_file_url}#toolbar=0`}
                    className="w-full h-full"
                    title={previewCert.title}
                  />
                </div>
              ) : (
                <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden bg-slate-900/60 border border-slate-800 flex items-center justify-center p-2">
                  <Image
                    src={previewCert.certificate_file_url || '/assets/ajeet-kumar-profile.jpg'}
                    alt={previewCert.title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Verified credential document of Ajeet Kumar</span>
              <a
                href={previewCert.certificate_file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Open in Full Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
