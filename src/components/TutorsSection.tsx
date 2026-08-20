import React from 'react';
import { Tutor } from '../types';
import { ArrowRight, User } from '@phosphor-icons/react';

interface TutorsSectionProps {
  tutors?: Tutor[];
  onOpenTrialWithGender?: (gender: 'Male' | 'Female' | 'No Preference') => void;
  onOpenTrial?: (courseName?: string, genderPref?: 'Male' | 'Female' | 'No Preference') => void;
}

export const TutorsSection: React.FC<TutorsSectionProps> = ({
  tutors = [],
  onOpenTrialWithGender,
  onOpenTrial
}) => {
  // Display top certified faculty members from real database records
  const displayTutors = tutors.length > 0 ? tutors.slice(0, 3) : [];

  const handleSelectTeacher = (gender: 'Male' | 'Female', tutorName?: string) => {
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
              onClick={() => handleSelectTeacher('No Preference' as any)}
              className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-[#0B332D] hover:text-[#B79A62] transition-colors py-1 border-b border-[#0B332D]/30 hover:border-[#B79A62] cursor-pointer"
            >
              <span>View All Teachers ({tutors.length || 4})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Teachers Showcase Grid: Dynamic Data from Database */}
        {displayTutors.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-sm font-sans">
            Verified faculty directory is loading...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {displayTutors.map((tutor) => {
              const firstName = tutor.name.replace(/^(Ustadha|Ustadh|Qari|Shaykh|Maulana)\s+/i, '');

              return (
                <div key={tutor.id} className="group space-y-5">
                  
                  {/* Portrait Photography with Warm Natural Light & Architectural Frame */}
                  <div className="relative rounded-sm overflow-hidden border border-[#E8E0D1] bg-[#FCFBF8] aspect-[4/5]">
                    {tutor.photoUrl ? (
                      <img
                        src={tutor.photoUrl}
                        alt={tutor.name}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 filter brightness-[0.98]"
                        loading="lazy"
                        onError={(e) => {
                          // Clean neutral fallback if image is unreachable
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-[#F8F5EE] text-[#0B332D]/40">
                        <User className="w-16 h-16 mb-2" weight="thin" />
                        <span className="text-xs font-sans font-medium text-gray-400">Certified Faculty</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B332D]/35 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Text Layout with Small Brass Underline */}
                  <div className="space-y-2.5">
                    <div className="w-8 h-[1.5px] bg-[#B79A62]" />

                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-editorial text-2xl text-[#0B332D] font-semibold">
                        {tutor.name}
                      </h3>
                    </div>

                    <p className="text-[11px] font-sans font-semibold text-[#B79A62] uppercase tracking-wider">
                      {tutor.specialization}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-gray-500 font-sans">
                      <span>{tutor.experienceYears}+ Years Experience</span>
                      <span>•</span>
                      <span>{Array.isArray(tutor.languages) ? tutor.languages.join(', ') : tutor.languages}</span>
                    </div>

                    {tutor.bio && (
                      <p className="text-xs text-gray-600 font-sans leading-relaxed pt-1 line-clamp-3">
                        {tutor.bio}
                      </p>
                    )}

                    <div className="pt-2">
                      <button
                        onClick={() => handleSelectTeacher(tutor.gender, tutor.name)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B332D] hover:text-[#B79A62] transition-colors cursor-pointer"
                      >
                        <span>Request Trial with {firstName}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
