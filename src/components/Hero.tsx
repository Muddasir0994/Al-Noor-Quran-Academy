import React from 'react';
import {
  GraduationCap,
  Users,
  Clock,
  FileText,
  ShieldCheck,
  WhatsappLogo,
  ArrowRight
} from '@phosphor-icons/react';

interface HeroProps {
  onOpenTrial: (courseName?: string) => void;
  onOpenEnroll?: (courseName?: string) => void;
  onViewCourses?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrial, onViewCourses }) => {
  const trustPrinciples = [
    { label: 'Qualified Teachers', icon: GraduationCap },
    { label: '1 on 1 Live Classes', icon: Users },
    { label: 'Flexible Timings', icon: Clock },
    { label: 'Progress Reports', icon: FileText },
    { label: 'Safe & Secure Environment', icon: ShieldCheck }
  ];

  return (
    <section className="relative bg-[#F8F5EE] text-[#12201D] pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden border-b border-[#E8E0D1]">
      
      {/* Subtle Architectural Islamic Geometry Linework (Edge Accent) */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#B79A62 0.75px, transparent 0.75px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Editorial 2-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Typography & Actions */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Small Quranic Verse in Classical Amiri Calligraphy */}
            <div className="inline-flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[#B79A62]" />
              <p className="font-arabic text-lg sm:text-xl text-[#0B332D] tracking-wide font-normal" dir="rtl">
                اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ
              </p>
              <span className="text-[11px] font-sans text-gray-500 uppercase tracking-widest pl-1">
                (Surah Al-Alaq)
              </span>
            </div>

            {/* Large High-Contrast Editorial Serif Headline */}
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#0B332D] leading-[1.08] tracking-tight font-semibold">
              A better way to learn the Quran.
            </h1>

            {/* Editorial Subtitle */}
            <p className="text-base sm:text-lg text-[#12201D]/80 leading-relaxed max-w-xl font-sans font-normal">
              One to one online Quran classes with qualified teachers, personalized learning, flexible schedules, and meaningful progress.
            </p>

            {/* CTAs: Primary Deep Emerald Button + Restrained Text Link */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <button
                onClick={() => onOpenTrial()}
                className="px-7 py-3.5 bg-[#0B332D] text-[#F8F5EE] text-sm font-semibold tracking-wider uppercase rounded-sm hover:bg-[#07221E] transition-all shadow-xs border border-[#0B332D] cursor-pointer"
              >
                Book Your Free Trial
              </button>

              <button
                onClick={() => onViewCourses && onViewCourses()}
                className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-[#0B332D] hover:text-[#B79A62] transition-colors py-2 border-b border-[#0B332D]/30 hover:border-[#B79A62] cursor-pointer"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Authentic Cinematic Photography with Architectural Framing */}
          <div className="lg:col-span-5 relative">
            
            {/* Photographic Container with Subtle Architectural Arch Framing */}
            <div className="relative rounded-t-[120px] rounded-b-sm overflow-hidden border border-[#E8E0D1] bg-[#FCFBF8] shadow-sm">
              <img
                src="/images/banners/hero-banner.webp"
                alt="Student studying the Holy Quran in peaceful natural light"
                className="w-full h-[420px] sm:h-[480px] object-cover filter brightness-[0.98] contrast-[1.02]"
                loading="eager"
                fetchPriority="high"
                width="600"
                height="480"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B332D]/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Small Refined Floating WhatsApp Assistance Panel */}
            <div className="absolute -bottom-6 -left-4 sm:left-4 bg-[#FCFBF8] border border-[#E8E0D1] rounded-sm p-4 shadow-md max-w-[240px] z-20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0B332D] text-[#B79A62] flex items-center justify-center shrink-0">
                  <WhatsappLogo className="w-4 h-4" weight="fill" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0B332D] leading-tight">
                    Have questions?
                  </p>
                  <p className="text-[11px] text-gray-500 mb-1.5 leading-tight">
                    We&apos;re here to help.
                  </p>
                  <a
                    href="https://wa.me/923274496163"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B332D] hover:text-[#B79A62] transition-colors"
                  >
                    <span>Chat on WhatsApp</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Trust Principles: Restrained Horizontal Row */}
        <div className="mt-20 pt-10 border-t border-[#E8E0D1]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {trustPrinciples.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm bg-[#FCFBF8] border border-[#E8E0D1] flex items-center justify-center text-[#B79A62] shrink-0">
                    <Icon className="w-4 h-4" weight="regular" />
                  </div>
                  <span className="text-xs font-sans font-medium text-[#12201D]/90 tracking-tight">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </section>
  );
};
