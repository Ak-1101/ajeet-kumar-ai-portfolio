import React from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, Brain, Cpu, Terminal, Network, Database, Cloud, BookOpen, ShieldCheck } from 'lucide-react';
import { Skill } from '@/types/database';

interface FeaturedSkillsProps {
  skills: Skill[];
}

const CATEGORY_ICONS: Record<string, any> = {
  'Artificial Intelligence': Brain,
  'Machine Learning': Cpu,
  'Deep Learning': Network,
  'Generative AI': Brain,
  'Agentic AI': Cpu,
  'Large Language Models': Terminal,
  'RAG and AI Agents': Network,
  'Python Programming': Terminal,
  'Data Science and Analytics': Database,
  'NLP and Multimodal AI': Brain,
  'Web Development': Terminal,
  'Database Management': Database,
  'Cloud and Deployment': Cloud,
  'Technical Training and Academic Leadership': BookOpen,
};

export function FeaturedSkills({ skills }: FeaturedSkillsProps) {
  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section className="py-16 md:py-24 bg-[#0a1020]/70 border-t border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-700/40 text-blue-400 text-xs font-semibold mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Core Expertise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Skills & Technical Expertise
            </h2>
            <p className="mt-2 text-base text-slate-400 max-w-2xl">
              Categorized domains verified through academic instruction, curriculum coordination, and industry-grade AI/ML delivery.
            </p>
          </div>

          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors group"
          >
            <span>Explore All 14 Domains</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((catName) => {
            const Icon = CATEGORY_ICONS[catName] || Layers;
            const categorySkills = skills.filter((s) => s.category === catName);

            return (
              <div
                key={catName}
                className="p-6 rounded-2xl bg-[#0e172e]/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 group hover:shadow-xl hover:shadow-cyan-950/20"
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {catName}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900/80 border border-slate-700/60 text-slate-300"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
