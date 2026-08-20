import React from 'react';
import { AboutSection } from '../components/AboutSection';
import { TrustSection } from '../components/TrustSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { StorySection } from '../components/StorySection';
import { FinalCTASection } from '../components/FinalCTASection';

interface AboutPageProps {
  onOpenTrial: () => void;
  onOpenEnroll: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenTrial, onOpenEnroll }) => {
  return (
    <div className="bg-[#FCFBF8] min-h-screen">
      {/* Page Header */}
      <div className="bg-[#0B332D] text-[#F8F5EE] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#B79A62]/20">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <p className="text-[11px] font-sans font-bold text-[#B79A62] uppercase tracking-widest">
            OUR HERITAGE &amp; MISSION
          </p>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F8F5EE] font-semibold">
            About Noor E Quran Institute
          </h1>
          <p className="text-sm sm:text-base text-[#E8E0D1]/80 max-w-2xl mx-auto font-sans">
            Dedicated to providing authentic, certified, and deeply respectful Quranic education to families across the globe.
          </p>
        </div>
      </div>

      <AboutSection onOpenTrial={onOpenTrial} onOpenEnroll={onOpenEnroll} />
      <StorySection onOpenTrial={onOpenTrial} />
      <WhyChooseUs onOpenTrial={onOpenTrial} />
      <TrustSection />
      <FinalCTASection onOpenTrial={onOpenTrial} />
    </div>
  );
};
