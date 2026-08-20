import React, { useState } from 'react';
import { Question, CaretDown, CaretUp, WhatsappLogo, ArrowRight } from '@phosphor-icons/react';

interface FAQSectionProps {
  onOpenTrial: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenTrial }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do you offer a free trial?',
      a: 'Yes! We offer a full 3-Day Free Trial with zero payment or advance commitment. This allows parents and students to evaluate our teaching style, meet the tutor, and experience our 1-on-1 learning environment before making any decision.'
    },
    {
      q: 'Are classes one-to-one?',
      a: 'Yes, all our classes are 100% one-to-one. The teacher focuses exclusively on one student throughout the session to ensure proper articulation of Makharij, immediate correction of recitation mistakes, and personalized progress.'
    },
    {
      q: 'Are male and female teachers available?',
      a: 'Yes. We have qualified and certified Male and Female Quran tutors available. Female tutors are dedicated for sisters, young girls, and children, while male teachers are available for boys and adult male students.'
    },
    {
      q: 'Do you teach children?',
      a: 'Yes, we specialize in teaching children from 4 years and older. Our instructors are trained to be gentle, engaging, and patient, using interactive Noorani Qaida lessons and positive reinforcement.'
    },
    {
      q: 'Do you teach adults?',
      a: 'Yes, we have many adult learners—both brothers and sisters. Whether you are starting from zero Arabic or looking to polish your Tajweed, revise your Hifz, or learn Quran translation, we have tailored adult curriculum tracks.'
    },
    {
      q: 'Are classes available internationally?',
      a: 'Yes, our academy operates globally 24/7. We cater to students across the United Kingdom, United States, Canada, Australia, UAE, Saudi Arabia, Pakistan, and worldwide across all timezones.'
    },
    {
      q: 'How can I enroll?',
      a: 'Simply click "Book Free Trial" or "Enroll Now" on the website and submit the short form. Our academy coordinator will reach out to you directly on WhatsApp (+92 327 4496163) to schedule your classes and answer any questions.'
    },
    {
      q: 'How will I receive my class schedule?',
      a: 'Once your application or free trial is submitted, our coordinator will message you on WhatsApp to finalize convenient days and times that fit your family\'s routine, and provide your teacher\'s details and live classroom meeting link.'
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="py-16 bg-white border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#064E3B]/10 text-[#064E3B] text-[11px] font-bold uppercase tracking-widest mb-2.5 border border-[#064E3B]/20">
            <Question className="w-3.5 h-3.5 text-[#A16207]" weight="duotone" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-[#064E3B] tracking-tight">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Everything you need to know about our 1-on-1 classes, tutors, and trial registration.
          </p>
        </div>

        {/* Bento Layout: Left Side Info Card + Right Side Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Bento Info Card (Col 1-4) */}
          <div className="lg:col-span-4 bg-[#FAFAF7] border border-gray-200/90 rounded-3xl p-7 space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#064E3B] block mb-1">
                24/7 Coordinator Support
              </span>
              <h3 className="text-xl font-heading font-bold text-gray-900">
                Have questions before starting?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                Our admissions advisor is available around the clock to assist you with timetable scheduling, tutor preferences, and course recommendations.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="https://wa.me/923274496163?text=Assalam-o-Alaikum%20Noor%20E%20Quran%20Institute.%20I%20have%20a%20question%20regarding%20the%20classes."
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-[#25D366] text-white hover:bg-[#20bd5a] transition-all shadow-sm"
              >
                <WhatsappLogo className="w-4 h-4" weight="fill" />
                <span>Ask on WhatsApp (0327-4496163)</span>
              </a>

              <button
                onClick={onOpenTrial}
                className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-[#064E3B] text-white hover:bg-[#043629] transition-all shadow-sm"
              >
                <ArrowRight className="w-3.5 h-3.5 text-[#F3C64D]" weight="bold" />
                <span>Book 3-Day Free Trial</span>
              </button>
            </div>

            <div className="pt-3 border-t border-gray-200 text-[11px] text-gray-500 space-y-1">
              <p>✓ Zero advance fees required</p>
              <p>✓ Flexible lesson times for all countries</p>
            </div>
          </div>

          {/* Right Bento Accordion (Col 5-12) */}
          <div className="lg:col-span-8 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-gray-200/90 rounded-2xl overflow-hidden transition-all duration-150 shadow-xs"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className={`w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-heading font-semibold text-sm sm:text-base transition-colors ${
                      isOpen ? 'bg-emerald-50/70 text-[#064E3B]' : 'bg-white text-gray-800 hover:bg-gray-50'
                    }`}
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                        isOpen ? 'bg-[#064E3B] text-[#F3C64D]' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {idx + 1}
                      </span>
                      <h3 className="text-gray-900 font-heading font-semibold text-sm sm:text-base inline">
                        {faq.q}
                      </h3>
                    </span>
                    <span className="text-[#064E3B] shrink-0">
                      {isOpen ? <CaretUp className="w-5 h-5" /> : <CaretDown className="w-5 h-5 text-gray-400" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-3 bg-white text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-emerald-100/60">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
