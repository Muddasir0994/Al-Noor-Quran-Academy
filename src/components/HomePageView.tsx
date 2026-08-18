import React from 'react';
import { Course, Testimonial } from '../types';
import { Hero } from './Hero';
import { TrustSection } from './TrustSection';
import { WhyChooseUs } from './WhyChooseUs';
import {
  BookOpen,
  ArrowRight,
  CheckCircle,
  Users,
  Certificate,
  Star,
  Clock,
  ShieldCheck,
  GraduationCap,
  Heart,
  Globe,
  CaretRight
} from '@phosphor-icons/react';

interface HomePageViewProps {
  courses: Course[];
  testimonials: Testimonial[];
  onOpenTrial: (courseName?: string, genderPref?: 'Male' | 'Female' | 'No Preference') => void;
  onOpenEnroll: (courseName?: string) => void;
  onInspectCourse: (course: Course) => void;
  onNavClick: (tabId: string) => void;
}

export const HomePageView: React.FC<HomePageViewProps> = ({
  courses,
  testimonials,
  onOpenTrial,
  onOpenEnroll,
  onInspectCourse,
  onNavClick
}) => {
  // Top 4 featured programs for home showcase
  const featuredCourses = courses.slice(0, 4);
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <div className="space-y-0">
      {/* 1. Main Hero Section */}
      <Hero
        onOpenTrial={() => onOpenTrial()}
        onOpenEnroll={() => onOpenEnroll()}
        onViewCourses={() => onNavClick('courses')}
      />

      {/* 2. Academic Trust & Accreditation Stats */}
      <TrustSection />

      {/* 3. Featured Courses Preview Section */}
      <section className="py-20 bg-white border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#064E3B]/10 text-[#064E3B] text-[11px] font-bold uppercase tracking-widest mb-2.5 border border-[#064E3B]/20">
                <BookOpen className="w-3.5 h-3.5 text-[#D4A72C]" />
                <span>Core Curriculum</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#064E3B] tracking-tight">
                Our Courses & Featured Quran Programs
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
                Structured 1-on-1 syllabus designed by Islamic scholars for students of all ages and proficiency levels.
              </p>
            </div>

            <button
              onClick={() => onNavClick('courses')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#054131] text-[#D4A72C] font-bold text-xs uppercase tracking-wider transition-all shadow-xs shrink-0 self-start md:self-auto cursor-pointer"
            >
              <span>View All Courses & Syllabus</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Featured Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-[#FAFAF7] rounded-2xl border border-gray-200/90 p-5 flex flex-col justify-between hover:shadow-lg hover:border-[#D4A72C]/60 transition-all group"
              >
                <div>
                  <div className="h-20 rounded-xl bg-gradient-to-r from-emerald-500/10 via-emerald-600/15 to-amber-500/10 border border-emerald-900/10 p-3 mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-2xs border border-emerald-900/10 flex items-center justify-center text-[#064E3B]">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <span className="font-arabic text-sm text-[#064E3B] font-bold">
                        {course.arabicName || 'القرآن الكريم'}
                      </span>
                    </div>
                    <span className="text-[10px] font-extrabold text-[#064E3B] bg-white px-2 py-0.5 rounded-md border border-[#D4A72C]/40">
                      1-on-1
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#064E3B]/10 text-[#064E3B]">
                      {course.audience || 'All Ages'}
                    </span>
                    <span className="text-xs font-bold text-[#D4A72C] flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#D4A72C]" weight="fill" />
                      4.9
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#064E3B] group-hover:text-[#043629] transition-colors leading-snug">
                    {course.name}
                  </h3>

                  <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                    {course.shortDescription}
                  </p>

                  <div className="mt-4 pt-3 border-t border-gray-200/60 space-y-1.5 text-xs text-gray-700">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#D4A72C]" weight="duotone" />
                      <span>{course.duration || '3-6 Months'} • 30-45 min / class</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-[#064E3B]" weight="duotone" />
                      <span>1-on-1 Private Teacher</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-200 flex items-center gap-2">
                  <button
                    onClick={() => onInspectCourse(course)}
                    className="flex-1 py-2 rounded-xl bg-white border border-gray-300 hover:border-[#064E3B] text-[#064E3B] text-xs font-bold transition-colors cursor-pointer text-center"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onOpenTrial(course.name)}
                    className="flex-1 py-2 rounded-xl bg-[#064E3B] hover:bg-[#054131] text-[#D4A72C] text-xs font-bold transition-colors cursor-pointer text-center"
                  >
                    Free Trial
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavClick('courses')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#064E3B] hover:text-[#043629] hover:underline cursor-pointer"
            >
              <span>Explore full syllabus, tajweed breakdown & certifications</span>
              <CaretRight className="w-4 h-4 text-[#D4A72C]" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Specialized Program Tracks Spotlight */}
      <section className="py-20 bg-[#F4F4EE] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#064E3B]/10 text-[#064E3B] text-[11px] font-bold uppercase tracking-widest mb-2.5 border border-[#064E3B]/20">
              <Certificate className="w-3.5 h-3.5 text-[#D4A72C]" weight="duotone" />
              <span>Tailored Learning Paths</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#064E3B] tracking-tight">
              Specialized Programs for Every Household
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600">
              Discover programs customized for children, sisters, and busy adults with dedicated certified male and female scholars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Track 1: Kids */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 text-xl font-bold mb-4">
                  <GraduationCap className="w-6 h-6 text-amber-700" weight="duotone" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4A72C] bg-[#064E3B] px-2.5 py-0.5 rounded-md inline-block mb-2">
                  Ages 4 to 15
                </span>
                <h3 className="font-heading font-bold text-xl text-[#064E3B]">
                  Online Quran for Kids
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Engaging, interactive Noorani Qaida lessons with patient teachers who use child-friendly visual slides and reward systems.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#064E3B] shrink-0" weight="fill" />
                    <span>Gentle & playful teaching style</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#064E3B] shrink-0" weight="fill" />
                    <span>Daily parent progress reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#064E3B] shrink-0" weight="fill" />
                    <span>Islamic manners, Duas & Salah</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => onNavClick('kids-program')}
                  className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#064E3B] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Explore Kids Program</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4A72C]" />
                </button>
              </div>
            </div>

            {/* Track 2: Female Tutors */}
            <div className="bg-white rounded-2xl border border-emerald-300 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all relative">
              <div className="absolute -top-3 right-4 bg-[#D4A72C] text-[#064E3B] text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                Sisters & Daughters
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 text-xl font-bold mb-4">
                  <Heart className="w-6 h-6 text-emerald-800" weight="duotone" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#064E3B] bg-emerald-100 px-2.5 py-0.5 rounded-md inline-block mb-2">
                  100% Privacy
                </span>
                <h3 className="font-heading font-bold text-xl text-[#064E3B]">
                  Certified Female Tutors
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Dedicated female Quran scholars (Alimat & Hafizat) for sisters and daughters learning from the comfort and privacy of home.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#064E3B] shrink-0" weight="fill" />
                    <span>Complete privacy & audio/video comfort</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#064E3B] shrink-0" weight="fill" />
                    <span>Graduates of top Islamic faculties</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#064E3B] shrink-0" weight="fill" />
                    <span>Tajweed, Nazra, Hifz & Tafseer</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => onNavClick('female-tutor')}
                  className="w-full py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#054131] text-[#D4A72C] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Explore Female Faculty</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Track 3: Adults & Slow Learners */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-800 text-xl font-bold mb-4">
                  <BookOpen className="w-6 h-6 text-blue-800" weight="duotone" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-md inline-block mb-2">
                  Flexible Pace
                </span>
                <h3 className="font-heading font-bold text-xl text-[#064E3B]">
                  Adults & Slow Learners
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Never feel embarrassed. Personalized one-on-one sessions tailored specifically for busy adults and students requiring patient repetition.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#064E3B] shrink-0" weight="fill" />
                    <span>Flexible evening & weekend time slots</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#064E3B] shrink-0" weight="fill" />
                    <span>Zero embarrassment, 100% patient pacing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#064E3B] shrink-0" weight="fill" />
                    <span>Tajweed correction & daily prayer recitation</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => onNavClick('slow-learners')}
                  className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#064E3B] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Explore Adult Programs</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4A72C]" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Why Choose Us Section */}
      <WhyChooseUs onOpenTrial={() => onOpenTrial()} />

      {/* 6. Testimonials Preview */}
      <section className="py-20 bg-white border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#064E3B]/10 text-[#064E3B] text-[11px] font-bold uppercase tracking-widest mb-2.5 border border-[#064E3B]/20">
                <Star className="w-3.5 h-3.5 text-[#D4A72C]" weight="fill" />
                <span>Verified Parent & Student Reviews</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#064E3B] tracking-tight">
                Parent Reviews & Student Testimonials
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
                Read authentic feedback from Muslim parents and adult learners across the UK, USA, Canada, and Australia.
              </p>
            </div>

            <button
              onClick={() => onNavClick('articles')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#064E3B] font-bold text-xs uppercase tracking-wider transition-all border border-emerald-200 shrink-0 self-start md:self-auto cursor-pointer"
            >
              <span>View All Testimonials & Articles</span>
              <ArrowRight className="w-4 h-4 text-[#D4A72C]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTestimonials.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FAFAF7] rounded-2xl border border-gray-200 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#D4A72C] mb-3">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#D4A72C]" weight="fill" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                    "{item.comment}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200/80 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-[#064E3B]">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-gray-500">{item.location} • {item.courseName}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-[#064E3B]">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Conversion CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-[#043629] via-[#064E3B] to-[#043629] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-[#D4A72C] bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
            No Credit Card Required • Zero Risk
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight">
            Start Your Quranic Journey Today with a <span className="text-[#D4A72C]">3-Day Free Trial</span>
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto">
            Experience our 1-on-1 live classroom with certified male or female tutors. Flexible schedules tailored to your timezone.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenTrial()}
              className="px-8 py-3.5 rounded-xl bg-[#D4A72C] hover:bg-[#b58b1d] text-[#064E3B] font-extrabold text-sm uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            >
              Book 3-Day Free Trial
            </button>
            <button
              onClick={() => onOpenEnroll()}
              className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-wider transition-all border border-white/30 cursor-pointer"
            >
              Enroll in a Program
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
