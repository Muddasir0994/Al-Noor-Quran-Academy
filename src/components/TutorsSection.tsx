import React from 'react';
import { Tutor } from '../types';
import { ArrowRight, GraduationCap, Globe, Clock } from '@phosphor-icons/react';

interface TutorsSectionProps {
  tutors?: Tutor[];
  onOpenTrialWithGender?: (gender: 'Male' | 'Female' | 'No Preference') => void;
  onOpenTrial?: (courseName?: string, genderPref?: 'Male' | 'Female' | 'No Preference') => void;
}

export const TutorsSection: React.FC<TutorsSectionProps> = ({
  onOpenTrialWithGender,
  onOpenTrial
}) => {
  const editorialTeachers = [
    {
      name: 'Ustadh Abdullah',
      specialty: 'Hifz & Tajweed',
      experience: '8+ Years Experience',
      languages: 'English, Urdu',
      photoUrl: '/images/tutor-bilal.webp',
      gender: 'Male' as const,
      bio: 'Certified Hafiz & Qari specializing in classical Makharij, Noon Sakinah rules, and structured Sabaq retention.'
    },
    {
      name: 'Ustadha Aisha',
      specialty: 'Quran & Tajweed',
      experience: '6+ Years Experience',
      languages: 'English, Urdu',
      photoUrl: '/images/tutor-ayesha.webp',
      gender: 'Female' as const,
      bio: 'Dedicated Aalimah providing patient 1-on-1 instruction for sisters and young children with interactive teaching.'
    },
    {
      name: 'Ustadh Yusuf',
      specialty: 'Quran & Islamic Studies',
      experience: '7+ Years Experience',
      languages: 'English, Urdu, Arabic',
      photoUrl: '/images/tutor-tariq.webp',
      gender: 'Male' as const,
      bio: 'Graduate of Islamic Sciences specializing in Quranic translation, essential Duas, and foundational Tafseer.'
    }
  ];

  const handleSelectTeacher = (gender: 'Male' | 'Female') => {
    if (onOpenTrialWithGender) {
      onOpenTrialWithGender(gender);
    } else if (onOpenTrial) {
      onOpenTrial(undefined, gender);
    }
  };

  return (
    <section id="tutors" className="py-20 lg:py-28 bg-[#F8F5EE] border-b border-[#E8E0D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Editorial & Restrained */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-6">
          <div>
            <p className="text-[11px] font-sans font-bold text-[#B79A62] uppercase tracking-widest mb-3">
              OUR TEACHERS
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#0B332D] leading-[1.1] font-semibold tracking-tight">
              Qualified.<br />
              Compassionate.<br />
              <span className="italic font-normal">Committed.</span>
            </h2>
          </div>

          <div className="text-right">
            <button
              onClick={() => handleSelectTeacher('Male')}
              className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-[#0B332D] hover:text-[#B79A62] transition-colors py-1 border-b border-[#0B332D]/30 hover:border-[#B79A62] cursor-pointer"
            >
              <span>View All Teachers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Teachers Showcase Grid: Flat Editorial Blocks, No Stars/Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {editorialTeachers.map((teacher, idx) => (
            <div key={idx} className="group space-y-5">
              
              {/* Portrait Photography with Warm Natural Light & Architectural Frame */}
              <div className="relative rounded-sm overflow-hidden border border-[#E8E0D1] bg-[#FCFBF8] aspect-[4/5]">
                <img
                  src={teacher.photoUrl}
                  alt={teacher.name}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 filter brightness-[0.98]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B332D]/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Text Layout with Small Brass Underline */}
              <div className="space-y-2.5">
                <div className="w-8 h-[1.5px] bg-[#B79A62]" />

                <div className="flex items-baseline justify-between">
                  <h3 className="font-editorial text-2xl text-[#0B332D] font-semibold">
                    {teacher.name}
                  </h3>
                  <span className="text-[11px] font-sans font-semibold text-[#B79A62] uppercase tracking-wider">
                    {teacher.specialty}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500 font-sans">
                  <span>{teacher.experience}</span>
                  <span>•</span>
                  <span>{teacher.languages}</span>
                </div>

                <p className="text-xs text-gray-600 font-sans leading-relaxed pt-1">
                  {teacher.bio}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => handleSelectTeacher(teacher.gender)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B332D] hover:text-[#B79A62] transition-colors cursor-pointer"
                  >
                    <span>Request Trial with {teacher.name.split(' ')[0]}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
