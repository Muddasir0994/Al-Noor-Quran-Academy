import React from 'react';
import { ArrowRight } from '@phosphor-icons/react';

interface FinalCTASectionProps {
  onOpenTrial: () => void;
  onViewCourses?: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  onOpenTrial,
  onViewCourses
}) => {
  return (
    <section className="relative py-20 lg:py-28 bg-[#0B332D] text-[#F8F5EE] overflow-hidden text-center">
      
      {/* Subtle Geometric Background */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#B79A62 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        
        {/* Subtle Decorative Arabic Monogram / Bismillah */}
        <p className="font-arabic text-sm text-[#B79A62] font-normal tracking-wide" dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>

        {/* Headline */}
        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F8F5EE] font-semibold leading-[1.15] tracking-tight">
          Begin a journey that will<br />
          <span className="italic font-normal text-[#E8E0D1]">stay with you forever.</span>
        </h2>

        {/* Supporting Line */}
        <p className="text-sm sm:text-base text-[#E8E0D1]/85 font-sans leading-relaxed max-w-xl mx-auto">
          Start learning with a qualified teacher and discover a more personal way to learn the Quran.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
          <button
            onClick={onOpenTrial}
            className="px-7 py-3.5 bg-[#B79A62] text-[#07221E] text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#D8C7A3] transition-colors shadow-xs cursor-pointer"
          >
            Book Your Free Trial
          </button>

          {onViewCourses && (
            <button
              onClick={onViewCourses}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F8F5EE] hover:text-[#B79A62] transition-colors py-3 px-4 border-b border-[#F8F5EE]/40 hover:border-[#B79A62] cursor-pointer"
            >
              <span>Explore Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <p className="text-[11px] text-[#E8E0D1]/60 font-sans pt-3">
          No payment details required • Cancel anytime • 3-Day risk-free trial
        </p>

      </div>

    </section>
  );
};
