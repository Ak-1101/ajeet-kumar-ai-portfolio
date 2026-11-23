import React from 'react';
import { dataService } from '@/lib/data-service';
import { Briefcase, Calendar, MapPin, Building2, CheckCircle2, Award } from 'lucide-react';

export const metadata = {
  title: 'Professional Experience | Ajeet Kumar',
  description: 'Verified professional experience timeline of Ajeet Kumar across SmartBridge, CollegeDekho, Universities, and NASSCOM FutureSkills Prime.',
};

export default async function ExperiencePage() {
  const experiences = await dataService.getExperiences();

  return (
    <div className="py-12 sm:py-20 bg-[#080d1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Title */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/40 text-cyan-300 text-xs font-semibold mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Professional <span className="text-gradient">Experience</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            Verified chronology of academic teaching, program leadership, and technical SME roles in AI/ML, Generative AI, and software engineering.
          </p>
        </div>

        {/* Interactive Timeline Container */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative group">
              {/* Timeline marker node */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full border-4 ${
                  exp.is_current
                    ? 'bg-cyan-400 border-[#080d1a] shadow-lg shadow-cyan-500/50 animate-pulse'
                    : 'bg-slate-700 border-[#080d1a]'
                }`}
              />

              {/* Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0d162e] border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 shadow-xl space-y-4">
                {/* Header Info */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      {exp.company}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>
                      {exp.start_date} – {exp.end_date}
                    </span>
                    {exp.is_current && (
                      <span className="ml-1 px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500 text-black">
                        Active
                      </span>
                    )}
                  </div>
                </div>

                {/* Deployment details (if applicable) */}
                {exp.deployment_details && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/70 border border-blue-800/60 text-blue-300 text-xs font-medium">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>{exp.deployment_details}</span>
                  </div>
                )}

                {/* Summary */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Responsibilities list */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Key Responsibilities & Deliverables
                    </h4>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900/90 text-cyan-300 border border-slate-700/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
