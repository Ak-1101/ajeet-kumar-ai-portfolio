import React from 'react';
import { dataService } from '@/lib/data-service';
import { BlogList } from '@/components/blog/BlogList';
import { BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Blog & Daily Journal | Ajeet Kumar',
  description: 'AI tutorials, deep-dives into Agentic systems, prompt engineering, and daily personal learning reflections by Ajeet Kumar.',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const [posts, categories] = await Promise.all([
    dataService.getBlogPosts({ includePrivate: false, includeDrafts: false }),
    dataService.getBlogCategories(),
  ]);

  return (
    <div className="py-12 sm:py-20 bg-[#080d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/40 text-cyan-300 text-xs font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Articles & Reflections</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            AI Engineering Blog & <span className="text-gradient">Daily Journal</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            In-depth technical writeups on Agentic workflows, LLM applications, pedagogical innovations, and day-to-day reflections.
          </p>
        </div>

        <BlogList posts={posts} categories={categories} initialTab={searchParams?.tab} />
      </div>
    </div>
  );
}
