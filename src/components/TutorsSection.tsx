import React, { useState } from 'react';
import { Tutor } from '../types';
import { 
  UserCheck, 
  ShieldCheck, 
  Star, 
  WhatsappLogo, 
  Calendar, 
  BookOpen, 
  Clock, 
  Heart, 
  Certificate, 
  GraduationCap, 
  ArrowRight 
} from '@phosphor-icons/react';

interface TutorsSectionProps {
  tutors: Tutor[];
  onOpenTrialWithGender: (gender: 'Male' | 'Female') => void;
}

export const TutorsSection: React.FC<TutorsSectionProps> = ({
  tutors,
  onOpenTrialWithGender
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'female' | 'male'>('all');

  const filteredTutors = tutors.filter(t => {
    if (activeFilter === 'female') return t.gender === 'Female';
    if (activeFilter === 'male') return t.gender === 'Male';
    return true;
  });

  return (
    <section id="tutors" className="py-20 bg-white relative overflow-hidden border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Female Tutors Feature Banner */}
        <div className="mb-16 bg-gradient-to-r from-[#064E3B] via-[#043327] to-[#022119] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl border border-[#D4A72C]/30 bg-islamic-pattern">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4A72C]/20 text-[#D4A72C] text-xs font-bold uppercase tracking-wider mb-3 border border-[#D4A72C]/40">
              <Heart className="w-3.5 h-3.5" weight="fill" />
              <span>Specialized Sister & Kids Faculty</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold tracking-tight leading-tight">
              Certified Female Quran Teachers for Sisters & Young Children
            </h3>
            <p className="text-emerald-100/90 text-sm sm:text-base mt-3 leading-relaxed">
              We understand the paramount importance of privacy, comfort, and gentle encouragement for female students and young children. Our qualified Aalimahs and Qarias provide private 1-on-1 classes with flexible international scheduling.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenTrialWithGender('Female')}
                className="gold-gradient-btn text-[#064E3B] px-6 py-3.5 rounded-xl font-extrabold text-sm shadow-md cursor-pointer flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4 text-[#064E3B]" weight="bold" />
                <span>Start Trial with Female Teacher</span>
              </button>

              <a
                href="https://wa.me/923274496163?text=Assalam-o-Alaikum%20Al-Noor%20Academy.%20I%20am%20inquiring%20about%20a%20Female%20Quran%20Teacher."
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm transition-all shadow-md flex items-center gap-2"
              >
                <WhatsappLogo className="w-4 h-4" weight="fill" />
                <span>WhatsApp Female Coordinator</span>
              </a>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/70 text-[#064E3B] text-[11px] font-extrabold uppercase tracking-widest mb-2 border border-emerald-300">
              <UserCheck className="w-3.5 h-3.5 text-[#D4A72C]" weight="duotone" />
              <span>Vetted & Certified Faculty</span>
            </div>
            <h2 className="text-3xl font-heading font-extrabold text-[#064E3B] tracking-tight">
              Meet Our Certified Quran Instructors
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Every instructor undergoes strict academic audits, background checks, and Ijazah verification.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-2xl shrink-0 self-start md:self-auto border border-gray-200">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white text-[#064E3B] shadow-xs'
                  : 'text-gray-600 hover:text-[#064E3B]'
              }`}
            >
              All Faculty ({tutors.length})
            </button>
            <button
              onClick={() => setActiveFilter('female')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'female'
                  ? 'bg-white text-[#064E3B] shadow-xs'
                  : 'text-gray-600 hover:text-[#064E3B]'
              }`}
            >
              Female Faculty
            </button>
            <button
              onClick={() => setActiveFilter('male')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'male'
                  ? 'bg-white text-[#064E3B] shadow-xs'
                  : 'text-gray-600 hover:text-[#064E3B]'
              }`}
            >
              Male Faculty
            </button>
          </div>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTutors.map(tutor => (
            <div
              key={tutor.id}
              className="bg-[#FAF9F5] rounded-3xl p-5 border border-emerald-950/10 shadow-xs hover:shadow-lg hover:border-[#D4A72C]/60 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Authentic Tutor Portrait Image Card */}
                <div className="h-48 rounded-2xl mb-4 relative overflow-hidden border border-emerald-950/15 shadow-sm group-hover:shadow-md transition-all bg-emerald-950">
                  <img
                    src={tutor.photoUrl ? tutor.photoUrl.replace(/\.jpg$/, '.webp') : (tutor.gender === 'Female' ? '/images/tutor-maryam.webp' : '/images/tutor-bilal.webp')}
                    alt={tutor.name}
                    width={500}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = tutor.photoUrl ? tutor.photoUrl.replace(/\.webp$/, '.jpg') : (tutor.gender === 'Female' ? '/images/tutor-maryam.jpg' : '/images/tutor-bilal.jpg');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent"></div>

                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border backdrop-blur-md shadow-xs ${
                      tutor.gender === 'Female' ? 'bg-pink-900/80 text-pink-100 border-pink-400' : 'bg-emerald-900/80 text-emerald-100 border-emerald-400'
                    }`}>
                      {tutor.gender === 'Female' ? '👩 Ustadha / Qaria' : '👨 Qari / Scholar'}
                    </span>
                    <div className="flex items-center gap-1 text-[#F3C64D] text-xs font-black bg-emerald-950/90 border border-[#F3C64D]/40 px-2 py-0.5 rounded-md shadow-2xs">
                      <Star className="w-3 h-3 text-[#F3C64D]" weight="fill" />
                      <span>{tutor.rating || '5.0'}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Verified Faculty</p>
                    <p className="font-heading font-extrabold text-sm sm:text-base leading-tight truncate">{tutor.name}</p>
                  </div>
                </div>

                <h3 className="text-lg font-heading font-extrabold text-[#064E3B]">
                  {tutor.name}
                </h3>
                <p className="text-xs text-[#9A690B] font-bold mt-0.5">
                  {tutor.specialization}
                </p>

                <div className="mt-4 space-y-2 text-xs text-gray-700">
                  <div className="flex items-start gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{tutor.qualification}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                    <span>{tutor.experienceYears}+ Years Teaching Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                    <span>{tutor.availableTimings}</span>
                  </div>
                </div>

                {tutor.bio && (
                  <p className="text-[11px] text-gray-600 italic mt-3 bg-white p-3 rounded-xl border border-gray-200/80 leading-relaxed">
                    "{tutor.bio}"
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => onOpenTrialWithGender(tutor.gender)}
                  className="w-full py-2.5 bg-[#064E3B] hover:bg-[#032B21] text-white rounded-xl font-bold text-xs transition-all shadow-xs cursor-pointer"
                >
                  REQUEST {tutor.gender.toUpperCase()} TUTOR
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
