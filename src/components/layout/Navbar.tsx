'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Download,
  Menu,
  X,
  Sparkles,
  Sun,
  Moon,
  Shield,
  Briefcase,
  Layers,
  GraduationCap,
  BookOpen,
  Mail,
  User,
  FlaskConical,
  Award,
} from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '/', icon: Sparkles },
  { name: 'About', href: '/about', icon: User },
  { name: 'Qualifications', href: '/education', icon: GraduationCap },
  { name: 'Experience', href: '/experience', icon: Briefcase },
  { name: 'Skills', href: '/skills', icon: Layers },
  { name: 'Projects', href: '/projects', icon: FlaskConical },
  { name: 'Research', href: '/research', icon: BookOpen },
  { name: 'Certifications', href: '/certifications', icon: Award },
  { name: 'Blog', href: '/blog', icon: BookOpen },
  { name: 'Contact', href: '/contact', icon: Mail },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (document.documentElement.classList.contains('light')) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080d1a]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform duration-200">
              <span className="font-bold text-white text-lg tracking-wider">AK</span>
            </div>
            <div>
              <span className="font-bold text-lg text-slate-100 group-hover:text-cyan-400 transition-colors">
                Ajeet Kumar
              </span>
              <span className="hidden sm:block text-[11px] font-medium text-cyan-400/90 tracking-wide">
                AI/ML & Agentic AI Specialist
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons: CV Download & Theme Switcher */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-colors"
              title="Admin Panel"
            >
              <Shield className="w-4 h-4" />
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800/50 rounded-lg transition-colors"
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Dynamic CV Download Button */}
            <a
              href="/api/cv/download"
              download="Ajeet_Kumar_CV.pdf"
              className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-lg shadow-md shadow-blue-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Download className="w-4 h-4 animate-bounce" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-300 hover:text-white"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a101f]/98 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href="/api/cv/download"
              download="Ajeet_Kumar_CV.pdf"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md shadow-cyan-500/20 text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download CV (Latest)</span>
            </a>

            <Link
              href="/admin/login"
              className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-800 text-xs"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin Management Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
