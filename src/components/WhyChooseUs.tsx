import React from 'react';
import {
  ShieldCheck,
  UserFocus,
  UsersThree,
  CalendarCheck,
  ArrowRight
} from '@phosphor-icons/react';

interface WhyChooseUsProps {
  onOpenTrial?: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenTrial }) => {
  const principles = [
    {
      number: '01',
      title: 'Verified Teachers',
      description: 'All teachers are qualified, experienced, and background verified.',
      icon: ShieldCheck
    },
    {
      number: '02',
      title: 'Personalized Learning',
      description: 'Lessons are adapted according to each student\'s level and goals.',
      icon: UserFocus
    },
    {
      number: '03',
      title: 'Parent Involvement',
      description: 'Parents receive regular updates and progress information.',
      icon: UsersThree
    },
    {
      number: '04',
      title: 'Flexible & Convenient',
      description: 'Families can choose suitable class timings and reschedule when needed.',
      icon: CalendarCheck
    }
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-[#0B332D] text-[#F8F5EE] overflow-hidden">
      
      {/* Subtle Geometric Accent */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#B79A62 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 2-Column Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Powerful Editorial Statement */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-[11px] font-sans font-bold text-[#B79A62] uppercase tracking-widest">
              WHY NOOR AL-QURAN
            </p>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F8F5EE] leading-[1.12] font-semibold tracking-tight">
              More than classes.<br />
              <span className="italic font-normal text-[#E8E0D1]">A relationship that lasts.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#E8E0D1]/85 font-sans leading-relaxed max-w-md">
              We focus on building a deep, personal connection between teacher and student. Learning the Quran is a sacred journey that requires patience, respect, and sincere care.
            </p>

            {onOpenTrial && (
              <div className="pt-2">
                <button
                  onClick={onOpenTrial}
                  className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-[#B79A62] hover:text-[#D8C7A3] transition-colors py-2 border-b border-[#B79A62]/40 hover:border-[#D8C7A3] cursor-pointer"
                >
                  <span>Experience the Difference</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: 4 Editorial Principles (Ivory + Muted Brass Icons) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.number} className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-sm border border-[#B79A62]/40 bg-[#07221E] flex items-center justify-center text-[#B79A62]">
                      <Icon className="w-4 h-4" weight="regular" />
                    </div>
                    <span className="font-editorial text-xl text-[#B79A62]/40 font-light select-none">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl text-[#F8F5EE] font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#E8E0D1]/75 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
