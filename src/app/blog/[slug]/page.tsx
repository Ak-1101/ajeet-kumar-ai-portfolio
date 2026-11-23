import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dataService } from '@/lib/data-service';
import { formatDate } from '@/lib/utils';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Linkedin,
  Twitter,
  BookOpen,
  Sparkles,
  User,
  ChevronRight,
} from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await dataService.getBlogPostBySlug(params.slug);
  if (!post) {
    return { title: 'Post Not Found | Ajeet Kumar' };
  }
  return {
    title: `${post.title} | Ajeet Kumar`,
    description: post.excerpt || post.subtitle || 'Article by Ajeet Kumar',
    openGraph: {
      title: post.title,
      description: post.excerpt || post.subtitle,
      images: [post.cover_image_url || '/assets/ajeet-kumar-profile.jpg'],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await dataService.getBlogPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const allPosts = await dataService.getBlogPosts({ includePrivate: false, includeDrafts: false });
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  // Render content helper: handle headings, paragraphs, lists, code blocks cleanly
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];

    lines.forEach((line, idx) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={`code-${idx}`}
              className="my-6 p-4 rounded-xl bg-[#050813] border border-cyan-900/40 text-cyan-300 font-mono text-xs sm:text-sm overflow-x-auto shadow-inner"
            >
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={idx} className="text-xl font-bold text-white mt-8 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={idx} className="text-2xl font-black text-cyan-300 mt-10 mb-4 border-b border-slate-800 pb-2">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={idx} className="text-slate-300 text-sm sm:text-base ml-6 list-disc mb-1.5 leading-relaxed">
            {line.replace('- ', '')}
          </li>
        );
      } else if (/^\d+\.\s/.test(line)) {
        elements.push(
          <li key={idx} className="text-slate-300 text-sm sm:text-base ml-6 list-decimal mb-1.5 leading-relaxed">
            {line.replace(/^\d+\.\s/, '')}
          </li>
        );
      } else if (line.trim() !== '') {
        elements.push(
          <p key={idx} className="text-slate-300 text-base leading-relaxed my-3">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="py-12 sm:py-20 bg-[#080d1a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Publications</span>
        </Link>

        {/* Header Block */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="font-bold text-cyan-400 uppercase tracking-wider px-2.5 py-1 rounded bg-cyan-950 border border-cyan-800/60">
              {post.category_name || (post.is_journal ? 'Personal Journal' : 'AI Article')}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(post.published_at)}</span>
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.reading_time_minutes} min read</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="text-lg sm:text-xl text-slate-300 italic leading-relaxed">
              {post.subtitle}
            </p>
          )}

          {/* Author Badge */}
          <div className="pt-4 flex items-center justify-between border-t border-b border-slate-800 py-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-cyan-500/40">
                <Image
                  src="/assets/ajeet-kumar-profile.jpg"
                  alt="Ajeet Kumar"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Ajeet Kumar</p>
                <p className="text-xs text-cyan-400 font-medium">Software Engineer – AI/ML Trainer</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="hidden sm:inline">Share:</span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://ajeetkumar.dev/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:text-cyan-400 transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://ajeetkumar.dev/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:text-cyan-400 transition-colors"
                title="Share on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Main Article Body */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0d162e] border border-slate-800 shadow-2xl">
          <div className="prose prose-invert max-w-none">
            {renderFormattedContent(post.content)}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Filed under:</span>
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-md text-xs font-medium bg-slate-900 text-cyan-300 border border-slate-700"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="space-y-4 pt-6">
            <h3 className="text-xl font-bold text-white">Related Reading</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="p-5 rounded-2xl bg-[#0c1428] border border-slate-800 hover:border-cyan-500/40 transition-colors group block space-y-2"
                >
                  <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                    {r.category_name || 'AI Article'}
                  </span>
                  <h4 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {r.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {r.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
