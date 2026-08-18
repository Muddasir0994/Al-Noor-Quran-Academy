import React from 'react';
import { Course } from '../types';
import { 
  ShieldCheck, 
  Clock, 
  Calendar, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  BookOpen, 
  GraduationCap, 
  Certificate, 
  Compass, 
  Star 
} from '@phosphor-icons/react';

interface CourseCardProps {
  course: Course;
  onOpenTrial: (courseName: string) => void;
  onOpenEnroll: (courseName: string) => void;
  onInspectCourse: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onOpenTrial,
  onOpenEnroll,
  onInspectCourse
}) => {
  // Course-specific visual iconography & color theme
  const getCourseBadge = (slug: string) => {
    if (slug.includes('qaida') || slug.includes('kid')) {
      return {
        icon: <GraduationCap className="w-5 h-5 text-amber-600" weight="duotone" />,
        bg: 'from-amber-500/15 to-orange-500/10',
        level: 'Foundation • Level 1',
        tagColor: 'bg-amber-100/90 text-amber-900 border-amber-300/60'
      };
    }
    if (slug.includes('hifz')) {
      return {
        icon: <Certificate className="w-5 h-5 text-emerald-700" weight="duotone" />,
        bg: 'from-emerald-600/15 to-teal-600/10',
        level: 'Advanced • Memorization',
        tagColor: 'bg-emerald-100/90 text-emerald-900 border-emerald-300/60'
      };
    }
    if (slug.includes('tajweed') || slug.includes('tarteel')) {
      return {
        icon: <BookOpen className="w-5 h-5 text-[#064E3B]" weight="duotone" />,
        bg: 'from-[#064E3B]/15 to-emerald-600/10',
        level: 'Intermediate • Phonetics',
        tagColor: 'bg-emerald-100/90 text-[#064E3B] border-emerald-300/60'
      };
    }
    if (slug.includes('women') || slug.includes('sister')) {
      return {
        icon: <ShieldCheck className="w-5 h-5 text-pink-600" weight="duotone" />,
        bg: 'from-pink-500/15 to-rose-500/10',
        level: 'Sisters Sanctuary • All Levels',
        tagColor: 'bg-pink-100/90 text-pink-900 border-pink-300/60'
      };
    }
    return {
      icon: <BookOpen className="w-5 h-5 text-[#064E3B]" weight="duotone" />,
      bg: 'from-emerald-500/15 to-teal-500/10',
      level: 'Structured Track • All Ages',
      tagColor: 'bg-emerald-100/90 text-[#064E3B] border-emerald-300/60'
    };
  };

  const badge = getCourseBadge(course.slug);

  return (
    <div className="bg-white rounded-3xl border border-emerald-950/10 hover:border-[#D4A72C]/70 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      
      {/* Top Banner Header with Real Course Photo */}
      <div className="relative overflow-hidden">
        <div className="h-44 w-full relative overflow-hidden bg-emerald-950">
          <img
            src={course.imageUrl ? course.imageUrl.replace(/\.jpg$/, '.webp') : '/images/course-nazra-tajweed.webp'}
            alt={course.name}
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 brightness-95 group-hover:brightness-105"
            onError={(e) => {
              const target = e.currentTarget;
              target.onerror = null;
              target.src = course.imageUrl ? course.imageUrl.replace(/\.webp$/, '.jpg') : '/images/course-nazra-tajweed.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent"></div>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-md ${badge.tagColor}`}>
              {badge.level}
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#064E3B] bg-[#D4A72C] px-2.5 py-1 rounded-full shadow-md">
              1-on-1 Live
            </span>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <p className="font-arabic text-sm text-[#F3C64D] font-bold">
              {course.arabicName || 'القرآن الكريم والتجويد'}
            </p>
            <h3 className="text-lg sm:text-xl font-heading font-extrabold text-white leading-tight drop-shadow-sm">
              {course.name}
            </h3>
          </div>
        </div>

        <div className="p-6 pb-3 bg-gradient-to-b from-white to-gray-50/50 border-b border-gray-100">
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>
        </div>
      </div>

      {/* Course Metadata Specs */}
      <div className="p-6 pt-4 flex-1 space-y-4">
        
        {/* Meta Pills */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-[#FAF9F5] text-gray-700 border border-gray-100 font-medium">
            <Users className="w-3.5 h-3.5 text-[#064E3B] shrink-0" />
            <span className="truncate">{course.audience}</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-[#FAF9F5] text-gray-700 border border-gray-100 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#064E3B] shrink-0" />
            <span className="truncate">{course.duration}</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-[#FAF9F5] text-gray-700 col-span-2 border border-gray-100 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#064E3B] shrink-0" />
            <span>{course.classesPerWeek} • 30 mins / class</span>
          </div>
        </div>

        {/* Highlights List */}
        <div className="space-y-1.5 pt-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Curriculum Highlights:</p>
          {course.highlights.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
              <CheckCircle className="w-3.5 h-3.5 text-[#A16207] shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Fee Indicator & Syllabus */}
        <div className="p-3 rounded-2xl bg-emerald-900/5 border border-emerald-900/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Standard Tuition</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-extrabold text-[#064E3B]">PKR {course.feePKR.toLocaleString()}</span>
              <span className="text-xs text-gray-400 font-medium">(${course.feeUSD} USD)</span>
            </div>
          </div>
          <button
            onClick={() => onInspectCourse(course)}
            className="text-xs font-bold text-[#064E3B] hover:text-[#9A690B] flex items-center gap-1 group/btn bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-2xs cursor-pointer"
          >
            <span>View Syllabus</span>
            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </div>

      {/* Card Action Buttons */}
      <div className="p-6 pt-0 grid grid-cols-2 gap-2.5">
        <button
          onClick={() => onOpenTrial(course.name)}
          className="w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold gold-gradient-btn text-[#032B21] shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ArrowRight className="w-3.5 h-3.5" weight="bold" />
          <span>Free Trial</span>
        </button>

        <button
          onClick={() => onOpenEnroll(course.name)}
          className="w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold bg-[#064E3B] text-white hover:bg-[#032B21] active:scale-[0.98] transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#F3C64D]" weight="duotone" />
          <span>Enroll Now</span>
        </button>
      </div>

    </div>
  );
};
