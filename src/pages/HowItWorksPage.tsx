import React from 'react';
import { MethodologySection } from '../components/MethodologySection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { TrustSection } from '../components/TrustSection';
import { FinalCTASection } from '../components/FinalCTASection';

interface HowItWorksPageProps {
  onOpenTrial: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onOpenTrial }) => {
  return (
    <div className="bg-[#FCFBF8] min-h-screen">
      {/* Page Header */}
      <div className="bg-[#0B332D] text-[#F8F5EE] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#B79A62]/20">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <p className="text-[11px] font-sans font-bold text-[#B79A62] uppercase tracking-widest">
            OUR METHODOLOGY
          </p>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F8F5EE] font-semibold">
            How Online Quran Learning Works
          </h1>
          <p className="text-sm sm:text-base text-[#E8E0D1]/80 max-w-2xl mx-auto font-sans">
            A simple, transparent, and spiritually enriching 4-step path from initial trial to fluent Quran recitation.
          </p>
        </div>
      </div>

      <MethodologySection onOpenTrial={onOpenTrial} />
      <WhyChooseUs onOpenTrial={onOpenTrial} />
      <TrustSection />
      <FinalCTASection onOpenTrial={onOpenTrial} />
    </div>
  );
};
