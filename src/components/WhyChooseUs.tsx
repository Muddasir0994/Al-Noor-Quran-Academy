import React from 'react';
import { 
  ShieldCheck, 
  Handshake, 
  Certificate, 
  Clock, 
  CheckCircle, 
  UserCheck, 
  BookOpen, 
  WhatsappLogo, 
  ArrowRight, 
  XCircle 
} from '@phosphor-icons/react';

interface WhyChooseUsProps {
  onOpenTrial: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenTrial }) => {
  const comparisonRows = [
    { feature: 'Class Format', traditional: 'Group class (15-20 students)', alnoor: '100% Private 1-on-1 Individual Attention' },
    { feature: 'Teacher Vetting', traditional: 'Varies; often unverified credentials', alnoor: 'Ijazah Certified & Background Audited' },
    { feature: 'Female Teachers', traditional: 'Rarely available locally', alnoor: 'Dedicated Female Aalimah & Qaria Faculty' },
    { feature: 'Schedule Flexibility', traditional: 'Fixed inflexible hours after school', alnoor: 'Custom 24/7 Timezone Matching & Rescheduling' },
    { feature: 'Parent Oversight', traditional: 'Little to no weekly feedback', alnoor: 'Weekly WhatsApp Voice Notes & Monthly Reports' },
    { feature: 'Teaching Atmosphere', traditional: 'Can be intimidating or stressful', alnoor: 'Gentle, Patient Positive Encouragement' }
  ];

  return (
    <section id="why-us-section" className="py-20 bg-white border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-badge text-[#064E3B] text-[11px] font-extrabold uppercase tracking-widest mb-2.5">
            <Certificate className="w-3.5 h-3.5 text-[#A16207]" weight="duotone" />
            <span>Excellence In Teaching</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-[#064E3B] tracking-tight">
            Why Discerning Families Choose Noor-e-Quran
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            We combine authentic classical Islamic scholarship with modern, compassionate 1-on-1 digital teaching methods to build genuine Quranic fluency.
          </p>
        </div>

        {/* 4 Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <div className="glass-card-light rounded-3xl p-6 hover:border-[#D4A72C]/60 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#064E3B] flex items-center justify-center border border-emerald-200">
                <Certificate className="w-6 h-6 text-[#064E3B]" weight="duotone" />
              </div>
              <h3 className="text-lg font-heading font-extrabold text-[#064E3B]">
                Ijazah-Certified Scholars
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Our male and female instructors hold verified degrees from Wifaq-ul-Madaris and Jamia Ashrafia with flawless Tajweed.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-gray-200/80 flex items-center text-[11px] font-bold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-[#A16207] mr-2"></span>
              Verified Sanad
            </div>
          </div>

          <div className="glass-card-light rounded-3xl p-6 hover:border-[#D4A72C]/60 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#064E3B] flex items-center justify-center border border-emerald-200">
                <UserCheck className="w-6 h-6 text-[#064E3B]" weight="duotone" />
              </div>
              <h3 className="text-lg font-heading font-extrabold text-[#064E3B]">
                100% Private 1-on-1
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Zero crowded group classrooms. Your child receives the instructor's undivided patience, focus, and real-time pronunciation corrections.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-gray-200/80 flex items-center text-[11px] font-bold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-[#A16207] mr-2"></span>
              Custom Learning Speed
            </div>
          </div>

          <div className="glass-card-light rounded-3xl p-6 hover:border-[#D4A72C]/60 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#064E3B] flex items-center justify-center border border-emerald-200">
                <Handshake className="w-6 h-6 text-[#064E3B]" weight="duotone" />
              </div>
              <h3 className="text-lg font-heading font-extrabold text-[#064E3B]">
                Gentle & Encouraging
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Patience and positive reinforcement are at the center of our philosophy, making Quran classes spiritually uplifting and joyful.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-gray-200/80 flex items-center text-[11px] font-bold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-[#A16207] mr-2"></span>
              Zero-Frustration Guarantee
            </div>
          </div>

          <div className="glass-card-light rounded-3xl p-6 hover:border-[#D4A72C]/60 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#064E3B] flex items-center justify-center border border-emerald-200">
                <Clock className="w-6 h-6 text-[#064E3B]" weight="duotone" />
              </div>
              <h3 className="text-lg font-heading font-extrabold text-[#064E3B]">
                Flexible International Slots
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Choose convenient slots across UK, USA, Canada, Australia & Gulf timezones. Make-up classes available for missed sessions.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-gray-200/80 flex items-center text-[11px] font-bold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-[#A16207] mr-2"></span>
              24/7 International Availability
            </div>
          </div>

        </div>

        {/* Traditional vs Noor-e-Quran Comparison Matrix */}
        <div className="mb-14 glass-card-light rounded-3xl p-6 sm:p-10 border border-emerald-950/10 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#064E3B]">
              How Noor-e-Quran Compares to Traditional Madrasas
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              A modern, personalized approach designed for the reality of today's Muslim families.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b-2 border-emerald-900/20 text-gray-500 font-extrabold uppercase text-[11px]">
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4 text-red-600/90">Traditional / Group Madrasa</th>
                  <th className="py-3 px-4 text-[#064E3B] bg-emerald-100/50 rounded-t-xl">Noor-e-Quran Institute</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-800">{row.feature}</td>
                    <td className="py-3 px-4 text-gray-500 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500 shrink-0" weight="fill" />
                      <span>{row.traditional}</span>
                    </td>
                    <td className="py-3 px-4 text-[#064E3B] font-bold bg-emerald-50/40">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#064E3B] shrink-0" weight="fill" />
                        <span>{row.alnoor}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4-Step Learning Roadmap Banner */}
        <div className="bg-gradient-to-br from-[#064E3B] via-[#043327] to-[#022119] text-white rounded-3xl p-8 sm:p-10 border border-[#D4A72C]/40 shadow-xl bg-islamic-pattern">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 space-y-3">
              <span className="font-arabic text-lg sm:text-xl text-[#F3C64D] font-bold block">
                خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                Our 4-Step Learning Journey
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                "The best among you are those who learn the Quran and teach it." — Sahih Bukhari
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenTrial}
                  className="gold-gradient-btn text-[#032B21] px-5 py-3 rounded-xl text-xs font-extrabold shadow-md cursor-pointer flex items-center gap-2"
                >
                  <ArrowRight className="w-4 h-4 text-[#032B21]" weight="bold" />
                  <span>Book 3-Day Free Trial</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800/80 flex items-start gap-3.5">
                <span className="w-8 h-8 rounded-full bg-[#F3C64D] text-[#032B21] font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
                  1
                </span>
                <div>
                  <p className="text-sm font-extrabold text-white">Book 3-Day Trial</p>
                  <p className="text-[11px] text-emerald-300 mt-0.5">Submit request with zero advance payment</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800/80 flex items-start gap-3.5">
                <span className="w-8 h-8 rounded-full bg-[#F3C64D] text-[#032B21] font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
                  2
                </span>
                <div>
                  <p className="text-sm font-extrabold text-white">Level Assessment</p>
                  <p className="text-[11px] text-emerald-300 mt-0.5">WhatsApp timing & dedicated teacher match</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800/80 flex items-start gap-3.5">
                <span className="w-8 h-8 rounded-full bg-[#F3C64D] text-[#032B21] font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
                  3
                </span>
                <div>
                  <p className="text-sm font-extrabold text-white">1-on-1 Live Class</p>
                  <p className="text-[11px] text-emerald-300 mt-0.5">Interactive lessons on video/audio classroom</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800/80 flex items-start gap-3.5">
                <span className="w-8 h-8 rounded-full bg-[#F3C64D] text-[#032B21] font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
                  4
                </span>
                <div>
                  <p className="text-sm font-extrabold text-white">Monthly Report & Mastery</p>
                  <p className="text-[11px] text-emerald-300 mt-0.5">Continuous evaluation & Tajweed milestones</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
