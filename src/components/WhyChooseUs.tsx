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
    <section className="relative py-20 lg:py-28 bg-[#0B332D] text-[#F8F5EE] overflow-hidden">
      
      {/* Subtle Islamic Geometric Accent */}
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
              WHY CHOOSE US
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F8F5EE] leading-[1.12] font-semibold tracking-tight">
              More than classes.<br />
              <span className="italic font-normal text-[#E8E0D1]">A relationship that lasts.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#E8E0D1]/80 font-sans leading-relaxed max-w-md">
              We focus on cultivating sincere reverence, proper pronunciation, and enduring attachment to the Quran through patient, accredited educators.
            </p>

            {onOpenTrial && (
              <div className="pt-4">
                <button
                  onClick={onOpenTrial}
                  className="px-6 py-3 bg-[#B79A62] text-[#07221E] text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#D8C7A3] transition-colors shadow-xs cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Experience A Free Class</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: 4 Trust Principles with Fine Brass Details */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.number} className="space-y-3 pt-4 border-t border-[#B79A62]/25">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-sm bg-[#07221E] border border-[#B79A62]/30 flex items-center justify-center text-[#B79A62]">
                      <Icon className="w-4 h-4" weight="regular" />
                    </div>
                    <span className="font-editorial text-sm text-[#B79A62]/60 font-light">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl sm:text-2xl text-[#F8F5EE] font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#E8E0D1]/80 font-sans leading-relaxed">
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
