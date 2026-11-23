import React from 'react';
import { ContactForm } from '@/components/contact/ContactForm';
import { Mail, Phone, MapPin, Linkedin, Github, Shield, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Contact & Inquiries | Ajeet Kumar',
  description: 'Reach out to Ajeet Kumar for AI/ML training, Generative AI workshops, academic curriculum design, and project mentorship.',
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#080d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/40 text-cyan-300 text-xs font-semibold mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect & Collaborate</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            Interested in booking a corporate workshop, guest faculty lecture, curriculum review, or AI consultation? Send a direct message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#0d162e] border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white">Contact Information</h3>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <Mail className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase">Email Address</p>
                    <a href="mailto:ajeetkumar.ak1101@gmail.com" className="text-white hover:text-cyan-400 transition-colors font-medium break-all">
                      ajeetkumar.ak1101@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <Phone className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase">Direct Phone</p>
                    <a href="tel:7078546789" className="text-white hover:text-cyan-400 transition-colors font-medium">
                      +91 7078546789
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <MapPin className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase">Location</p>
                    <p className="text-white font-medium">Rudrapur, Uttarakhand, India</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
                  Verified Online Profiles
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/itsajeetkumar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-cyan-400" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/Ak-1101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
                  >
                    <Github className="w-4 h-4 text-cyan-400" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0b1329] border border-cyan-500/20 text-xs text-slate-400 leading-relaxed space-y-2">
              <p className="font-semibold text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Response Commitment</span>
              </p>
              <p>
                I review all institutional, workshop, and training communications promptly. For urgent event scheduling, direct phone or email contact is recommended.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
