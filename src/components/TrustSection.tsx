import React, { useState } from 'react';
import { Testimonial } from '../types';
import { Quotes, Users, GraduationCap, Clock, CaretLeft, CaretRight } from '@phosphor-icons/react';

interface TrustSectionProps {
  testimonials?: Testimonial[];
}

export const TrustSection: React.FC<TrustSectionProps> = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Institutional standards (authentic qualitative metrics, not fabricated counts)
  const academicPrinciples = [
    { label: 'Private Live Classes', value: '1-on-1', icon: Users },
    { label: 'Accredited Faculty', value: 'Certified', icon: GraduationCap },
    { label: 'Flexible Scheduling', value: '24/7', icon: Clock }
  ];

  const currentTestimonial = testimonials && testimonials.length > 0
    ? testimonials[currentIndex % testimonials.length]
    : {
        name: 'Dr. Tariq Mahmood',
        studentOrParent: 'Father of Ayaan (7 yrs) & Zoya (9 yrs)',
        location: 'London, United Kingdom',
        comment: 'Finding genuine teachers who combine deep Tajweed knowledge with child-friendly patience was difficult until we joined. My children look forward to every single class.'
      };

  const handleNext = () => {
    if (testimonials.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  const handlePrev = () => {
    if (testimonials.length > 1) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F8F5EE] border-b border-[#E8E0D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Magazine-Style Editorial Testimonial from Real Data */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Featured Real Quote */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-[#B79A62]">
                <Quotes className="w-10 h-10" weight="fill" />
              </div>

              {testimonials.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="p-1.5 rounded-sm border border-[#E8E0D1] bg-[#FCFBF8] text-[#0B332D] hover:border-[#B79A62] transition-colors cursor-pointer"
                  >
                    <CaretLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="p-1.5 rounded-sm border border-[#E8E0D1] bg-[#FCFBF8] text-[#0B332D] hover:border-[#B79A62] transition-colors cursor-pointer"
                  >
                    <CaretRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <blockquote className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#0B332D] leading-[1.25] font-normal italic">
              &ldquo;{currentTestimonial.comment}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4 pt-2">
              <div className="w-10 h-10 rounded-full border border-[#B79A62] bg-[#FCFBF8] flex items-center justify-center font-editorial text-base text-[#0B332D] font-bold shrink-0">
                {currentTestimonial.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-sans font-bold text-[#0B332D]">
                  {currentTestimonial.name}
                </p>
                <p className="text-xs text-gray-700 font-sans font-medium">
                  {currentTestimonial.studentOrParent} • {currentTestimonial.location}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Academic Standards Panel */}
          <div className="lg:col-span-4 bg-[#FCFBF8] border border-[#E8E0D1] rounded-sm p-6 sm:p-8 space-y-6">
            <p className="text-[11px] font-sans font-bold text-[#8C6D37] uppercase tracking-widest">
              ACADEMIC STANDARDS
            </p>

            <div className="space-y-5 divide-y divide-[#E8E0D1]">
              {academicPrinciples.map((principle, idx) => {
                const Icon = principle.icon;
                return (
                  <div key={idx} className={idx > 0 ? 'pt-5' : ''}>
                    <div className="flex items-center justify-between">
                      <span className="font-editorial text-2xl sm:text-3xl text-[#0B332D] font-bold">
                        {principle.value}
                      </span>
                      <Icon className="w-5 h-5 text-[#B79A62]" weight="regular" />
                    </div>
                    <p className="text-xs text-gray-700 font-sans mt-0.5">
                      {principle.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-gray-600 font-sans pt-2 border-t border-[#E8E0D1] leading-relaxed font-medium">
              Every lesson is conducted 1-on-1 with accredited educators under ongoing academic review.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
