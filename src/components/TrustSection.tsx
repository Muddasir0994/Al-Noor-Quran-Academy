import React from 'react';
import { Quotes, ShieldCheck, Globe, Users } from '@phosphor-icons/react';

export const TrustSection: React.FC = () => {
  const verifiedMetrics = [
    { label: 'Active Live Classes', value: '150+', icon: Users },
    { label: 'Global Students Taught', value: '2K+', icon: ShieldCheck },
    { label: 'Countries Represented', value: '40+', icon: Globe }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F8F5EE] border-b border-[#E8E0D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Magazine-Style Editorial Testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Featured Quote */}
          <div className="lg:col-span-8 space-y-6">
            <div className="text-[#B79A62]">
              <Quotes className="w-10 h-10" weight="fill" />
            </div>

            <blockquote className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#0B332D] leading-[1.25] font-normal italic">
              &ldquo;My son has improved so much in his recitation, and his love for the Quran has grown. Alhamdulillah for such amazing teachers.&rdquo;
            </blockquote>

            <div className="flex items-center gap-4 pt-2">
              <div className="w-10 h-10 rounded-full border border-[#B79A62] bg-[#FCFBF8] flex items-center justify-center font-editorial text-base text-[#0B332D] font-bold shrink-0">
                F
              </div>
              <div>
                <p className="text-sm font-sans font-bold text-[#0B332D]">
                  Fatima
                </p>
                <p className="text-xs text-gray-500 font-sans">
                  Mother of a 9 year old • London, United Kingdom
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Subtle Qualitative Trust & Verified Metrics Panel */}
          <div className="lg:col-span-4 bg-[#FCFBF8] border border-[#E8E0D1] rounded-sm p-6 sm:p-8 space-y-6">
            <p className="text-[11px] font-sans font-bold text-[#B79A62] uppercase tracking-widest">
              INSTITUTE REACH
            </p>

            <div className="space-y-5 divide-y divide-[#E8E0D1]">
              {verifiedMetrics.map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div key={idx} className={idx > 0 ? 'pt-5' : ''}>
                    <div className="flex items-center justify-between">
                      <span className="font-editorial text-3xl text-[#0B332D] font-bold">
                        {metric.value}
                      </span>
                      <Icon className="w-5 h-5 text-[#B79A62]" weight="regular" />
                    </div>
                    <p className="text-xs text-gray-600 font-sans mt-0.5">
                      {metric.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-gray-400 font-sans pt-2 border-t border-[#E8E0D1] leading-relaxed">
              100% verified 1-on-1 private tuition. Every session supervised with academic standards.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
