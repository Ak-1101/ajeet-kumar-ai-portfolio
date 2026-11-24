import React from 'react';
import { dataService } from '@/lib/data-service';
import { EducationList } from '@/components/education/EducationList';
import { GraduationCap, Award, Building2 } from 'lucide-react';

export const metadata = {
  title: 'Academic Qualifications & Degrees | Ajeet Kumar',
  description: 'Verified educational background of Ajeet Kumar: Master of Computer Applications (MCA) Honours from AKTU and Bachelor of Computer Applications (BCA) from MJPRU.',
};

export default async function EducationPage() {
  const education = await dataService.getEducation();

  return (
    <div className="py-12 sm:py-20 bg-[#080d1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/40 text-cyan-300 text-xs font-semibold mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Excellence</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Education & <span className="text-gradient">Qualifications</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            Verified degree credentials awarded with Honours and First Division by recognized state technical and central universities, accompanied by attached official degree documents.
          </p>
        </div>

        <EducationList education={education} />
      </div>
    </div>
  );
}
