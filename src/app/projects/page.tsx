import React from 'react';
import { dataService } from '@/lib/data-service';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Project Portfolio | Ajeet Kumar',
  description: 'Interactive portfolio of AI applications, Agentic systems, concept tools, and mentored engineering capstones.',
};

export default async function ProjectsPage() {
  const projects = await dataService.getProjects();

  return (
    <div className="py-12 sm:py-20 bg-[#080d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/40 text-cyan-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Gallery</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Projects & <span className="text-gradient">AI Solutions</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            Verified project concepts, production architectures, and mentored capstones spanning Generative AI, RAG, Multimodal systems, and Machine Learning.
          </p>
        </div>

        <ProjectGallery projects={projects} />
      </div>
    </div>
  );
}
