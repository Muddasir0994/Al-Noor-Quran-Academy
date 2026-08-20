import React from 'react';
import { Course } from '../types';
import { CoursesSection } from '../components/CoursesSection';
import { MethodologySection } from '../components/MethodologySection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { FinalCTASection } from '../components/FinalCTASection';

interface CoursesPageProps {
  courses: Course[];
  onOpenTrial: (courseName?: string) => void;
  onInspectCourse: (course: Course) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  courses,
  onOpenTrial,
  onInspectCourse
}) => {
  return (
    <div className="bg-[#FCFBF8] min-h-screen">
      {/* Page Header */}
      <div className="bg-[#0B332D] text-[#F8F5EE] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#B79A62]/20">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <p className="text-[11px] font-sans font-bold text-[#B79A62] uppercase tracking-widest">
            ACADEMIC CURRICULA
          </p>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F8F5EE] font-semibold">
            Certified 1-on-1 Online Quran Courses
          </h1>
          <p className="text-sm sm:text-base text-[#E8E0D1]/80 max-w-2xl mx-auto font-sans">
            From foundational Noorani Qaida to advanced Tajweed, Hifz, and Islamic Studies. Personalized learning with flexible schedules.
          </p>
        </div>
      </div>

      <CoursesSection
        courses={courses}
        onOpenTrial={onOpenTrial}
        onInspectCourse={onInspectCourse}
      />

      <MethodologySection onOpenTrial={() => onOpenTrial()} />
      <WhyChooseUs onOpenTrial={() => onOpenTrial()} />
      <FinalCTASection onOpenTrial={() => onOpenTrial()} />
    </div>
  );
};
