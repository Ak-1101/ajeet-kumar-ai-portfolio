import React from 'react';
import { dataService } from '@/lib/data-service';
import {
  Layers,
  Brain,
  Cpu,
  Network,
  Terminal,
  Database,
  Cloud,
  BookOpen,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Skill } from '@/types/database';

export const metadata = {
  title: 'Skills & Technical Domains | Ajeet Kumar',
  description: '14 categorized technical domains across Generative AI, Agentic Systems, Machine Learning, Data Science, and Academic Leadership.',
};

const CATEGORY_MAP: Record<string, { icon: any; description: string }> = {
  'Artificial Intelligence': {
    icon: Brain,
    description: 'Foundational AI heuristics, problem-solving abstractions, and algorithmic design.',
  },
  'Machine Learning': {
    icon: Cpu,
    description: 'Supervised, unsupervised models, cross-validation, and performance metrics.',
  },
  'Deep Learning': {
    icon: Network,
    description: 'Feedforward networks, CNNs, RNNs, and framework implementations in TensorFlow.',
  },
  'Generative AI': {
    icon: Sparkles,
    description: 'Prompt engineering, text/image synthesis, Gemini API, and generative workflows.',
  },
  'Agentic AI': {
    icon: Brain,
    description: 'Autonomous goal pursuit, tool calling, reasoning loops, and multi-agent systems.',
  },
  'Large Language Models': {
    icon: Terminal,
    description: 'Transformer architectures, self-attention, context windows, and token dynamics.',
  },
  'RAG and AI Agents': {
    icon: Network,
    description: 'Document-grounded question answering, dense embeddings, vector retrieval, and reranking.',
  },
  'Python Programming': {
    icon: Terminal,
    description: 'Idiomatic Python, OOP, data structures, and rapid prototyping with Streamlit/Flask.',
  },
  'Data Science and Analytics': {
    icon: Database,
    description: 'Exploratory data analysis, cleaning, Pandas, NumPy, Matplotlib, and visualization.',
  },
  'NLP and Multimodal AI': {
    icon: Brain,
    description: 'Text preprocessing, sequence modeling, and vision-language multimodal synergy.',
  },
  'Web Development': {
    icon: Terminal,
    description: 'Full-stack fundamentals, modern JavaScript/TypeScript, React/Next.js, PHP, HTML/CSS.',
  },
  'Database Management': {
    icon: Database,
    description: 'Relational data modeling, query optimization, ACID compliance, MySQL, and PostgreSQL.',
  },
  'Cloud and Deployment': {
    icon: Cloud,
    description: 'Cloud computing fundamentals, AWS Practitioner concepts, Git, and CI/CD version control.',
  },
  'Technical Training and Academic Leadership': {
    icon: BookOpen,
    description: 'Curriculum architecture, experiential learning lab delivery, and student project mentoring.',
  },
};

export default async function SkillsPage() {
  const skills = await dataService.getSkills();

  // Unique categories in order
  const categories = Object.keys(CATEGORY_MAP);

  return (
    <div className="py-12 sm:py-20 bg-[#080d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Title */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/40 text-cyan-300 text-xs font-semibold mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Technical Mastery</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="text-gradient">Technical Domains</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            14 structured technical disciplines grounded in hands-on curriculum execution, academic leadership, and industrial AI application development.
          </p>
        </div>

        {/* 14 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((categoryName) => {
            const meta = CATEGORY_MAP[categoryName] || { icon: Layers, description: '' };
            const Icon = meta.icon;
            const categorySkills = skills.filter((s) => s.category === categoryName);

            return (
              <div
                key={categoryName}
                className="p-6 rounded-2xl bg-[#0d162e] border border-slate-800 hover:border-cyan-500/50 flex flex-col justify-between transition-all duration-200 group shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {categoryName}
                    </h2>
                  </div>

                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    {meta.description}
                  </p>

                  <div className="space-y-2">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs text-slate-300"
                      >
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                          {skill.proficiency_level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{categorySkills.length} Verified Competencies</span>
                  <span className="text-cyan-400 font-medium">Domain Active</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
