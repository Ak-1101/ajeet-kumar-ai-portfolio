import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Calendar, MapPin, Award, ArrowRight, ExternalLink } from 'lucide-react';
import { Research } from '@/types/database';

interface ResearchHighlightProps {
  research: Research[];
}

export function ResearchHighlight({ research }: ResearchHighlightProps) {
  const item = research[0];
  if (!item) return null;

  return (
    <section className="py-20 bg-[#0a1122]/90 border-t border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-700/40 text-indigo-300 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Research & Conference Presentation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              {item.title}
            </h2>

            {/* Conference metadata card */}
            <div className="p-5 rounded-2xl bg-[#0f1933] border border-slate-700/80 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Award className="w-4 h-4 shrink-0" />
                <span>{item.conference_name}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{item.conference_dates}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>

              {item.publishing_partner && (
                <p className="text-xs text-indigo-300/90 font-medium">
                  Publishing Partner: {item.publishing_partner}
                </p>
              )}
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {item.abstract}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/research"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all text-sm"
              >
                <span>View Full Research Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {item.certificate_url && (
                <a
                  href={item.certificate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:text-white transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                  <span>Verify Presentation Certificate</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Certificate Preview Card */}
          <div className="lg:col-span-5 flex justify-center">
            {item.certificate_url && (
              <div className="relative group max-w-md w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300" />
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={item.certificate_url}
                      alt="CIGAI 2026 Certificate"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-contain bg-white/5 p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 bg-[#0d162e] border-t border-slate-800 text-xs text-center text-slate-300">
                    Official Presentation Certificate – CIGAI 2026
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
