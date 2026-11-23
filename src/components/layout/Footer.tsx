import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Github, Shield, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#050812] border-t border-slate-800/80 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Identity & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-cyan-500/20">
                AK
              </div>
              <div>
                <span className="font-bold text-base text-slate-100">Ajeet Kumar</span>
                <p className="text-xs text-cyan-400 font-medium">Software Engineer & AI/ML Trainer</p>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              &quot;Bridging AI, Industry & Education&quot; — delivering modern Generative AI, Agentic AI, and
              hands-on experiential learning for industry-ready engineering professionals.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/in/itsajeetkumar/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/70 hover:bg-cyan-500/20 hover:text-cyan-400 flex items-center justify-center transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/Ak-1101"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/70 hover:bg-cyan-500/20 hover:text-cyan-400 flex items-center justify-center transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="mailto:ajeetkumar.ak1101@gmail.com"
                className="w-9 h-9 rounded-lg bg-slate-800/70 hover:bg-cyan-500/20 hover:text-cyan-400 flex items-center justify-center transition-colors"
                aria-label="Email Ajeet Kumar"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About & Career Vision
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-cyan-400 transition-colors">
                  Professional Experience Timeline
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-cyan-400 transition-colors">
                  Skills & Technical Domains
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-cyan-400 transition-colors">
                  Project Portfolio & Lab Architecture
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-cyan-400 transition-colors">
                  Research (LowRankAutoT - CIGAI 2026)
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Academics */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Academic & Resources
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/certifications" className="hover:text-cyan-400 transition-colors">
                  Certifications & Credentials
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-cyan-400 transition-colors">
                  AI Blog & Tech Tutorials
                </Link>
              </li>
              <li>
                <Link href="/blog?tab=journal" className="hover:text-cyan-400 transition-colors">
                  Daily Personal Journal
                </Link>
              </li>
              <li>
                <a href="/api/cv/download" className="hover:text-cyan-400 transition-colors">
                  Download Latest Verified CV
                </a>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-slate-400">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Admin Management</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Contact Details */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Contact & Inquiries
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <a href="mailto:ajeetkumar.ak1101@gmail.com" className="hover:text-cyan-400 transition-colors break-all">
                  ajeetkumar.ak1101@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="tel:7078546789" className="hover:text-cyan-400 transition-colors">
                  +91 7078546789
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span>Rudrapur, Uttarakhand, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Ajeet Kumar. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed for AI Education & Engineering Excellence
          </p>
        </div>
      </div>
    </footer>
  );
}
