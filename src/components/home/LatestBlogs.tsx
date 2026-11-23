import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, Clock, Calendar, Sparkles } from 'lucide-react';
import { BlogPost } from '@/types/database';
import { formatDate } from '@/lib/utils';

interface LatestBlogsProps {
  posts: BlogPost[];
}

export function LatestBlogs({ posts }: LatestBlogsProps) {
  return (
    <section className="py-20 bg-[#090f1e]/80 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/40 text-cyan-300 text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Insights & Reflections</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Latest Articles & Daily Journal
            </h2>
            <p className="mt-2 text-base text-slate-400 max-w-2xl">
              Exploring the frontiers of Agentic AI, modern curriculum engineering, and hands-on educator insights.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition-colors group"
          >
            <span>Visit Publication Hub</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="p-6 rounded-2xl bg-[#0c1428] border border-slate-800 hover:border-cyan-500/40 flex flex-col justify-between transition-all duration-300 group shadow-lg"
            >
              <div className="space-y-3">
                {/* Category & Badge */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-cyan-400 uppercase tracking-wider">
                    {post.category_name || (post.is_journal ? 'Daily Journal' : 'AI Article')}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{post.reading_time_minutes} min read</span>
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{formatDate(post.published_at)}</span>
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="font-semibold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
