import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Github, ExternalLink, Code2, ShieldAlert } from 'lucide-react';
import { Project } from '@/types/database';

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  // Sort or filter featured projects
  const featuredList = projects.filter((p) => p.featured).slice(0, 4);

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return { label: 'Completed Project', color: 'bg-emerald-950/80 border-emerald-700/60 text-emerald-300' };
      case 'mentored':
        return { label: 'Mentored & Designed', color: 'bg-blue-950/80 border-blue-700/60 text-blue-300' };
      case 'concept':
        return { label: 'Concept / Architecture', color: 'bg-purple-950/80 border-purple-700/60 text-purple-300' };
      case 'prototype':
        return { label: 'Working Prototype', color: 'bg-amber-950/80 border-amber-700/60 text-amber-300' };
      default:
        return { label: 'In Progress', color: 'bg-slate-800 border-slate-700 text-slate-300' };
    }
  };

  return (
    <section className="py-20 bg-[#080d1a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/40 text-cyan-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Project Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Selected AI & Applied Engineering Projects
            </h2>
            <p className="mt-2 text-base text-slate-400 max-w-2xl">
              Real project architectures, concept tools, and mentored student capstones from my professional track record.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors group"
          >
            <span>View All 10 Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredList.map((project) => {
            const statusInfo = getStatusBadge(project.status);

            return (
              <div
                key={project.id}
                className="flex flex-col justify-between p-7 rounded-2xl bg-[#0c1428] border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 shadow-xl group"
              >
                <div className="space-y-4">
                  {/* Category & Status Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span
                      className={`px-3 py-0.5 rounded-full text-xs font-semibold border ${statusInfo.color}`}
                    >
                      {statusInfo.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Short description */}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {project.short_description}
                  </p>

                  {/* Problem & Solution Callout */}
                  {project.problem_statement && (
                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1.5">
                      <p className="text-slate-400">
                        <strong className="text-slate-200">Problem:</strong> {project.problem_statement}
                      </p>
                      {project.solution && (
                        <p className="text-cyan-300/90">
                          <strong className="text-cyan-200">Solution:</strong> {project.solution}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Links */}
                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub Profile</span>
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/projects#${project.slug}`}
                    className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold group-hover:underline"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
