'use client';

import React, { useState } from 'react';
import { Project } from '@/types/database';
import {
  Sparkles,
  Github,
  ExternalLink,
  Code2,
  CheckCircle2,
  Layers,
  ArrowRight,
  X,
  Lightbulb,
  ShieldCheck,
} from 'lucide-react';

interface ProjectGalleryProps {
  projects: Project[];
}

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ['all', 'Generative AI', 'Agentic AI', 'Multimodal AI', 'Machine Learning', 'Web & Mobile'];

  const filtered = projects.filter((p) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'Generative AI') return p.category.includes('Generative AI') || p.category.includes('GenAI');
    if (selectedCategory === 'Agentic AI') return p.category.includes('Agentic AI') || p.category.includes('RAG');
    if (selectedCategory === 'Multimodal AI') return p.category.includes('Multimodal');
    if (selectedCategory === 'Machine Learning') return p.category.includes('Machine Learning') || p.category.includes('Data Science');
    if (selectedCategory === 'Web & Mobile') return p.category.includes('Web') || p.category.includes('Android');
    return true;
  });

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return { label: 'Completed Project', color: 'bg-emerald-950/80 border-emerald-700/60 text-emerald-300' };
      case 'mentored':
        return { label: 'Mentored & Architecture', color: 'bg-blue-950/80 border-blue-700/60 text-blue-300' };
      case 'concept':
        return { label: 'System Concept', color: 'bg-purple-950/80 border-purple-700/60 text-purple-300' };
      case 'prototype':
        return { label: 'Working Prototype', color: 'bg-amber-950/80 border-amber-700/60 text-amber-300' };
      default:
        return { label: 'In Progress', color: 'bg-slate-800 border-slate-700 text-slate-300' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Category Filter Pills */}
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((proj) => {
          const statusInfo = getStatusBadge(proj.status);

          return (
            <div
              key={proj.id}
              id={proj.slug}
              className="p-7 rounded-2xl bg-[#0d162e] border border-slate-800 hover:border-cyan-500/50 flex flex-col justify-between transition-all duration-300 shadow-xl group"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    {proj.category}
                  </span>
                  <span
                    className={`px-3 py-0.5 rounded-full text-xs font-semibold border ${statusInfo.color}`}
                  >
                    {statusInfo.label}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {proj.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {proj.short_description}
                </p>

                {proj.problem_statement && (
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1.5">
                    <p className="text-slate-400">
                      <strong className="text-slate-200">Problem Statement:</strong> {proj.problem_statement}
                    </p>
                    {proj.solution && (
                      <p className="text-cyan-300/90">
                        <strong className="text-cyan-200">Architected Solution:</strong> {proj.solution}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs">
                {proj.github_url && (
                  <a
                    href={proj.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}

                <button
                  onClick={() => setActiveProject(proj)}
                  className="inline-flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  <span>Detailed Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-2xl w-full bg-[#0a1124] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  {activeProject.category}
                </span>
                <h2 className="text-2xl font-black text-white mt-1">
                  {activeProject.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Overview
                </h4>
                <p>{activeProject.detailed_explanation || activeProject.short_description}</p>
              </div>

              {activeProject.problem_statement && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">
                    Problem Identified
                  </h4>
                  <p>{activeProject.problem_statement}</p>
                </div>
              )}

              {activeProject.solution && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                    Engineered Solution
                  </h4>
                  <p>{activeProject.solution}</p>
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Technologies Utilized
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 text-cyan-300 border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveProject(null)}
                className="px-5 py-2.5 rounded-xl font-semibold text-white bg-slate-800 hover:bg-slate-700 text-xs"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
