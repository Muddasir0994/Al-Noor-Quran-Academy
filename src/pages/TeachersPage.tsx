import React from 'react';
import { Tutor } from '../types';
import { TutorsSection } from '../components/TutorsSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { TrustSection } from '../components/TrustSection';
import { FinalCTASection } from '../components/FinalCTASection';

interface TeachersPageProps {
  tutors: Tutor[];
  onOpenTrial: (courseName?: string, genderPref?: 'Male' | 'Female' | 'No Preference') => void;
}

export const TeachersPage: React.FC<TeachersPageProps> = ({
  tutors,
  onOpenTrial
}) => {
  return (
    <div className="bg-[#FCFBF8] min-h-screen">
      {/* Page Header */}
      <div className="bg-[#0B332D] text-[#F8F5EE] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#B79A62]/20">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <p className="text-[11px] font-sans font-bold text-[#B79A62] uppercase tracking-widest">
            FACULTY &amp; SCHOLARS
          </p>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F8F5EE] font-semibold">
            Certified Male &amp; Female Quran Teachers
          </h1>
          <p className="text-sm sm:text-base text-[#E8E0D1]/80 max-w-2xl mx-auto font-sans">
            Verified Ijazah holders and Islamic university graduates dedicated to patient, interactive 1-on-1 Quran education.
          </p>
        </div>
      </div>

      <TutorsSection
        tutors={tutors}
        onOpenTrialWithGender={(g) => onOpenTrial(undefined, g)}
        onOpenTrial={onOpenTrial}
      />

      <WhyChooseUs onOpenTrial={() => onOpenTrial()} />
      <TrustSection />
      <FinalCTASection onOpenTrial={() => onOpenTrial()} />
    </div>
  );
};
