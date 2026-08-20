import React from 'react';
import { Course } from '../types';
import {
  BookOpen,
  Certificate,
  GraduationCap,
  Sparkle,
  ArrowRight
} from '@phosphor-icons/react';

interface CoursesSectionProps {
  courses: Course[];
  onOpenTrial: (courseName?: string) => void;
  onOpenEnroll?: (courseName?: string) => void;
  onInspectCourse: (course: Course) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  courses,
  onOpenTrial,
  onInspectCourse
}) => {
  const editorialCourses = [
    {
      number: '01',
      id: 'c-1',
      slug: 'noorani-qaida',
      title: 'Quran Reading',
      arabicName: 'قراءة القرآن والقاعدة النورانية',
      description: 'Noorani Qaida, reading practice, pronunciation, and fluency for learners of all ages.',
      icon: BookOpen
    },
    {
      number: '02',
      id: 'c-3',
      slug: 'quran-with-tajweed',
      title: 'Tajweed',
      arabicName: 'أحكام التجويد والإتقان',
      description: 'Learn the rules of Tajweed and develop accurate, confident Quran recitation.',
      icon: Certificate
    },
    {
      number: '03',
      id: 'c-4',
      slug: 'quran-memorization-hifz',
      title: 'Hifz-ul-Quran',
      arabicName: 'حفظ القرآن الكريم وتثبيته',
      description: 'Memorize the Quran through a structured, supportive, and personalized method.',
      icon: GraduationCap
    },
    {
      number: '04',
      id: 'c-5',
      slug: 'islamic-studies',
      title: 'Islamic Studies',
      arabicName: 'الدراسات الإسلامية والعبادات',
      description: 'Build authentic understanding through essential Islamic knowledge and practical learning.',
      icon: Sparkle
    }
  ];

  const handleExplore = (item: typeof editorialCourses[0]) => {
    const matched = courses.find(c => c.slug === item.slug || c.id === item.id) || courses[0];
    if (matched) {
      onInspectCourse(matched);
    }
  };

  return (
    <section id="courses" className="py-20 lg:py-28 bg-[#FCFBF8] border-b border-[#E8E0D1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <p className="text-[11px] font-sans font-bold text-[#B79A62] uppercase tracking-widest mb-3">
            OUR COURSES
          </p>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#0B332D] leading-[1.12] font-semibold tracking-tight">
            Learn at your pace.<br />
            <span className="italic font-normal">Grow for a lifetime.</span>
          </h2>
        </div>

        {/* Numbered Curriculum System (Open Editorial Layout) */}
        <div className="divide-y divide-[#E8E0D1] border-t border-b border-[#E8E0D1]">
          {editorialCourses.map((course) => {
            const Icon = course.icon;
            return (
              <div
                key={course.number}
                className="py-10 lg:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start lg:items-center group hover:bg-[#F8F5EE]/60 transition-colors px-2 sm:px-4"
              >
                
                {/* 1. Large Editorial Number & Icon */}
                <div className="md:col-span-3 flex items-baseline gap-4">
                  <span className="font-editorial text-3xl sm:text-4xl text-[#B79A62] font-light">
                    {course.number}
                  </span>
                  <div className="w-8 h-8 rounded-sm bg-[#F8F5EE] border border-[#E8E0D1] flex items-center justify-center text-[#0B332D] group-hover:border-[#B79A62] transition-colors">
                    <Icon className="w-4 h-4" weight="regular" />
                  </div>
                </div>

                {/* 2. Course Title & Arabic Subheading */}
                <div className="md:col-span-4 space-y-1">
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#0B332D] font-semibold group-hover:text-[#07221E] transition-colors">
                    {course.title}
                  </h3>
                  <p className="font-arabic text-xs text-gray-500" dir="rtl">
                    {course.arabicName}
                  </p>
                </div>

                {/* 3. Description */}
                <div className="md:col-span-3">
                  <p className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* 4. Action Text Link */}
                <div className="md:col-span-2 flex md:justify-end items-center gap-4 pt-2 md:pt-0">
                  <button
                    onClick={() => handleExplore(course)}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#0B332D] hover:text-[#B79A62] transition-colors py-1 border-b border-[#0B332D]/30 hover:border-[#B79A62] cursor-pointer"
                  >
                    <span>Explore Course</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Editorial Note & Trial Link */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-gray-600 font-sans">
          <p>
            All courses include 1-on-1 personalized attention, verified male and female scholars, and custom schedules.
          </p>
          <button
            onClick={() => onOpenTrial()}
            className="inline-flex items-center gap-1.5 font-bold text-[#0B332D] hover:text-[#B79A62] transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>Need advice selecting a track? Book a Free Trial</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
