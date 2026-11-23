'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Download, ArrowRight, BookOpen, Linkedin, Github, Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { Profile } from '@/types/database';

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 md:py-24">
      {/* Background Glow Blobs */}
      <div className="hero-glow-blob w-96 h-96 bg-cyan-500 -top-20 -left-20" />
      <div className="hero-glow-blob w-[32rem] h-[32rem] bg-indigo-600 top-1/3 -right-20" />
      <div className="hero-glow-blob w-80 h-80 bg-blue-600 bottom-0 left-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-700/40 text-cyan-300 text-xs font-medium shadow-inner">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Available for Technical Training, Consulting & AI Mentorship</span>
            </div>

            {/* Headline & Name */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                Hi, I&apos;m <span className="text-gradient">Ajeet Kumar</span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-300">
                {profile.headline}
              </p>
            </div>

            {/* Tagline Callout */}
            <div className="py-2 px-4 rounded-xl bg-slate-900/60 border-l-4 border-cyan-400 border-slate-800 backdrop-blur-sm">
              <p className="text-lg font-medium text-cyan-300 italic">
                &ldquo;{profile.tagline}&rdquo;
              </p>
            </div>

            {/* Short Intro */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {profile.short_bio}
            </p>

            {/* Core Focus Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              {[
                'Generative AI',
                'Agentic AI & Tool Calling',
                'Retrieval-Augmented Generation (RAG)',
                'Experiential Learning (EL)',
                'Python & Data Science',
              ].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 rounded-md text-xs font-medium bg-slate-800/80 border border-slate-700 text-slate-300 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  {badge}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="/api/cv/download"
                download="Ajeet_Kumar_CV.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm sm:text-base"
              >
                <Download className="w-4 h-4 animate-bounce" />
                <span>Download CV</span>
              </a>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700/80 border border-slate-700 hover:border-cyan-500/50 hover:text-white transition-all text-sm sm:text-base"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </Link>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-slate-300 hover:text-cyan-300 bg-slate-900/50 hover:bg-slate-850 border border-slate-800 transition-colors text-sm"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Read My Blogs</span>
              </Link>
            </div>

            {/* Socials & Contact Preview */}
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-sm text-slate-400">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Connect:</span>
              <a
                href="https://www.linkedin.com/in/itsajeetkumar/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-cyan-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/Ak-1101"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub</span>
              </a>
              <a
                href="mailto:ajeetkumar.ak1101@gmail.com"
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right Profile Photo Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm sm:max-w-md w-full">
              {/* Outer decorative gradient frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-blue-500 rounded-3xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-200" />

              <div className="relative rounded-3xl overflow-hidden bg-[#0d1527] border border-slate-700/80 shadow-2xl">
                <div className="relative w-full aspect-[4/5]">
                  <Image
                    src={profile.avatar_url || '/assets/ajeet-kumar-profile.jpg'}
                    alt="Ajeet Kumar - AI/ML Trainer"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-transparent to-transparent opacity-60" />
                </div>

                {/* Floating Highlight Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0b1329]/90 backdrop-blur-md border border-cyan-500/30 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                        Current Role
                      </p>
                      <p className="text-sm font-bold text-white">
                        Software Engineer (AI/ML Trainer | SME)
                      </p>
                      <p className="text-xs text-slate-300 font-medium">SmartBridge</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
