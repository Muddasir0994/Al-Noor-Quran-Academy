import React from 'react';
import { Users, Handshake, Certificate, Clock, ArrowRight, ShieldCheck, CheckCircle, GraduationCap } from '@phosphor-icons/react';

interface MethodologySectionProps {
  onOpenTrial: () => void;
  onOpenEnroll: () => void;
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({
  onOpenTrial,
  onOpenEnroll
}) => {
  return (
    <div className="py-20 bg-[#FAFAF7] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* 1. Kids Quran Program */}
        <section id="kids-program" className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#064E3B] text-xs font-bold uppercase tracking-wider mb-4">
                <GraduationCap className="w-3.5 h-3.5 text-[#064E3B]" weight="duotone" />
                Child-Friendly Pedagogy (Ages 4 - 14)
              </div>
              <h2 className="text-3xl font-heading font-black text-[#064E3B] tracking-tight">
                Quran Classes for Kids with 1-on-1 Gentle Encouragement
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-4 leading-relaxed">
                Children learn best when they are happy, praised, and engaged. We replace traditional harsh memorization with joyful digital whiteboards, interactive alphabet games, and warm 1-on-1 attention.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6">
                {[
                  '1-on-1 private lesson with zero classroom distractions',
                  'Gentle positive reinforcement with digital stars & rewards',
                  'Combined Noorani Qaida + Namaz + Daily Masnoon Duas',
                  'Parental oversight with weekly WhatsApp audio recordings',
                  'Flexible slots around school and homework times',
                  'Patient Certified Female & Male kids specialists'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                    <CheckCircle className="w-4 h-4 text-[#D4A72C] shrink-0 mt-0.5" weight="fill" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3">
                <button
                  onClick={onOpenTrial}
                  className="bg-[#064E3B] text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-emerald-900 transition-all shadow-xs cursor-pointer"
                >
                  START 3-DAY KIDS FREE TRIAL
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FAFAF7] rounded-2xl p-6 border border-gray-200">
              <h3 className="text-sm font-bold text-[#064E3B] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Certificate className="w-4 h-4 text-[#D4A72C]" weight="duotone" />
                What Children Learn in Level 1
              </h3>
              <div className="space-y-3 text-xs text-gray-600">
                <div className="p-3 bg-white rounded-xl border border-gray-100">
                  <span className="font-bold text-[#064E3B] block">Arabic Letter Makharij</span>
                  Accurate sound recognition without confusion between similar letters.
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-100">
                  <span className="font-bold text-[#064E3B] block">Practical Salah (Namaz)</span>
                  Step-by-step physical postures, Takbeer, Ruku, and Sajdah.
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-100">
                  <span className="font-bold text-[#064E3B] block">Prophetic Islamic Manners</span>
                  Honesty, kindness to parents, and daily bedtime/eating Duas.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Slow Learner Program */}
        <section id="slow-learners" className="bg-linear-to-br from-[#064E3B] to-[#043327] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-lg border border-[#D4A72C]/30">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#032B21]/90 text-[#F3C64D] text-xs font-bold uppercase tracking-wider mb-4 border border-[#F3C64D]/40">
              <Handshake className="w-3.5 h-3.5" weight="duotone" />
              Specialized Care & Zero Pressure
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight">
              "Every Student Learns at Their Own Pace" — Slow Learner Support
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base mt-4 leading-relaxed">
              Some students struggle with specific letter pronunciations (Makharij), memory retention, or reading speed. At Noor-e-Quran Institute, <strong>no student is ever rushed or reprimanded</strong>. Our tutors adapt their pace entirely to the student's unique learning rhythm.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
                <h3 className="font-bold text-white text-sm mb-1">Targeted Phonetic Drills</h3>
                <p className="text-xs text-emerald-100">Patient repetition for difficult letters like Ayn, Haa, Qaf, and Dhaad until mastered naturally.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
                <h3 className="font-bold text-white text-sm mb-1">Micro-Lessons (Short Steps)</h3>
                <p className="text-xs text-emerald-100">Breaking down long Quranic verses into bite-sized 2-word chunks to prevent cognitive fatigue.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
                <h3 className="font-bold text-white text-sm mb-1">Tutor Diagnosis & Notes</h3>
                <p className="text-xs text-emerald-100">Continuous observation of whether difficulties stem from articulation, eyesight, or anxiety.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
                <h3 className="font-bold text-white text-sm mb-1">Unlimited Patience</h3>
                <p className="text-xs text-emerald-100">A warm, smiling teacher who repeats the same lesson 10 times with the exact same kindness as the first.</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={onOpenTrial}
                className="gold-gradient-btn text-[#032B21] px-6 py-3 rounded-xl font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                REQUEST PATIENT TUTOR TRIAL
              </button>
            </div>
          </div>
        </section>

        {/* 3. Adults Quran Program */}
        <section id="adults-program" className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#064E3B] text-xs font-bold uppercase tracking-wider mb-4">
                <Users className="w-3.5 h-3.5" weight="duotone" />
                Adults & Professionals Program
              </div>
              <h2 className="text-3xl font-heading font-black text-[#064E3B] tracking-tight">
                Quran Classes for Adults & Working Professionals
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-4 leading-relaxed">
                It is never too late to connect with the divine speech of Allah SWT. Whether you are learning to read for the first time, rectifying childhood Tajweed habits, or exploring word-by-word Tafseer, our adult curriculum is designed for dignity, discretion, and executive flexibility.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {[
                  'Zero embarrassment, 100% private 1-on-1 sessions',
                  'Flexible 24/7 time slots (Early morning before work or late night)',
                  'Choice of Arabic Basics, Tajweed, Translation, or Hifz',
                  'Respectful adult pedagogy and intellectual discussion',
                  'Makeup class rescheduling for business meetings'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                    <CheckCircle className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" weight="fill" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button
                  onClick={onOpenTrial}
                  className="bg-[#064E3B] text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-emerald-900 transition-all shadow-xs cursor-pointer"
                >
                  START ADULT 3-DAY TRIAL
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FAFAF7] rounded-2xl p-6 border border-gray-200">
              <h3 className="text-sm font-bold text-[#064E3B] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4A72C]" weight="duotone" />
                Flexible International Schedules
              </h3>
              <p className="text-xs text-gray-600 mb-4">
                We accommodate students across all major international timezones:
              </p>
              <div className="space-y-2 text-xs font-semibold text-gray-700">
                <div className="flex justify-between p-2.5 bg-white rounded-xl border border-gray-100">
                  <span>🇬🇧 United Kingdom (GMT/BST)</span>
                  <span className="text-emerald-700">Morning & Evenings</span>
                </div>
                <div className="flex justify-between p-2.5 bg-white rounded-xl border border-gray-100">
                  <span>🇺🇸 USA / Canada (EST, CST, PST)</span>
                  <span className="text-emerald-700">Afternoons & Nights</span>
                </div>
                <div className="flex justify-between p-2.5 bg-white rounded-xl border border-gray-100">
                  <span>🇦🇪 UAE / Gulf (GST)</span>
                  <span className="text-emerald-700">Flexible After-Work</span>
                </div>
                <div className="flex justify-between p-2.5 bg-white rounded-xl border border-gray-100">
                  <span>🇦🇺 Australia (AEST)</span>
                  <span className="text-emerald-700">Weekend & Afternoons</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
