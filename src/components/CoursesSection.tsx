import React, { useState } from 'react';
import { Course } from '../types';
import { CourseCard } from './CourseCard';
import { BookOpen, ShieldCheck, Check, ArrowRight, Star } from '@phosphor-icons/react';

interface CoursesSectionProps {
  courses: Course[];
  onOpenTrial: (courseName?: string) => void;
  onOpenEnroll: (courseName?: string) => void;
  onInspectCourse: (course: Course) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  courses,
  onOpenTrial,
  onOpenEnroll,
  onInspectCourse
}) => {
  const [filter, setFilter] = useState<'all' | 'kids' | 'recitation' | 'tajweed' | 'hifz' | 'islamic' | 'women' | 'adults'>('all');

  const filteredCourses = courses.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'kids') return c.category === 'kids' || c.slug.includes('kid') || c.slug.includes('qaida');
    if (filter === 'recitation') return c.category === 'recitation' || c.slug.includes('nazra') || c.slug.includes('qaida');
    if (filter === 'tajweed') return c.category === 'tajweed' || c.slug.includes('tajweed');
    if (filter === 'hifz') return c.category === 'hifz' || c.slug.includes('hifz');
    if (filter === 'islamic') return c.category === 'islamic_studies' || c.slug.includes('islamic') || c.slug.includes('namaz') || c.slug.includes('dua') || c.slug.includes('translation');
    if (filter === 'women') return c.category === 'women' || c.slug.includes('women');
    if (filter === 'adults') return c.category === 'adults' || c.slug.includes('adult') || c.slug.includes('beginner');
    return true;
  });

  return (
    <section id="courses" className="py-20 bg-white border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#064E3B]/10 text-[#064E3B] text-[11px] font-bold uppercase tracking-widest mb-2.5 border border-[#064E3B]/20">
            <BookOpen className="w-3.5 h-3.5 text-[#A16207]" weight="duotone" />
            <span>Comprehensive Academic Curriculum</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#064E3B] tracking-tight">
            Our Courses & Certified Quran Programs
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            From basic Noorani Qaida to full Hifz-ul-Quran and Tafseer. Every course has a structured syllabus, 1-on-1 private attention, and tailored learning speed.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: `All Programs (${courses.length})` },
              { id: 'kids', label: 'Kids & Beginners' },
              { id: 'recitation', label: 'Quran Reading / Nazra' },
              { id: 'tajweed', label: 'Tajweed Rules' },
              { id: 'hifz', label: 'Hifz Memorization' },
              { id: 'islamic', label: 'Islamic Studies & Salah' },
              { id: 'women', label: 'Women & Sisters' },
              { id: 'adults', label: 'Adults Program' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#064E3B] text-white shadow-xs'
                    : 'bg-[#FAFAF7] text-gray-700 hover:bg-gray-100 border border-gray-200/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onOpenTrial={onOpenTrial}
              onOpenEnroll={onOpenEnroll}
              onInspectCourse={onInspectCourse}
            />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 bg-[#FAFAF7] rounded-3xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#064E3B] flex items-center justify-center font-bold">
              <Star className="w-5 h-5 text-[#064E3B]" weight="fill" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#064E3B]">Not sure which course is right for your child?</p>
              <p className="text-xs text-gray-500">Take a 3-Day Free Trial; our certified tutor will evaluate level & recommend the optimal track.</p>
            </div>
          </div>
          <button
            onClick={() => onOpenTrial()}
            className="gold-gradient-btn text-[#032B21] px-5 py-2.5 rounded-xl font-bold text-xs hover:brightness-110 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            FREE ASSESSMENT TRIAL
          </button>
        </div>

      </div>
    </section>
  );
};
