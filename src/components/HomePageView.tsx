import React from 'react';
import { Course, Testimonial } from '../types';
import { Hero } from './Hero';
import { CoursesSection } from './CoursesSection';
import { WhyChooseUs } from './WhyChooseUs';
import { TutorsSection } from './TutorsSection';
import { MethodologySection } from './MethodologySection';
import { TrustSection } from './TrustSection';
import { StorySection } from './StorySection';
import { FinalCTASection } from './FinalCTASection';

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
  onOpenTrial,
  onInspectCourse,
  onNavClick
}) => {
  return (
    <div className="space-y-0 bg-[#F8F5EE]">
      {/* 1. Hero Section: Editorial Composition & 5 Restrained Trust Principles */}
      <Hero
        onOpenTrial={() => onOpenTrial()}
        onViewCourses={() => onNavClick('courses')}
      />

      {/* 2. Numbered Courses Curriculum System */}
      <CoursesSection
        courses={courses}
        onOpenTrial={onOpenTrial}
        onInspectCourse={onInspectCourse}
      />

      {/* 3. Why Choose Us: Full-Width Deep Emerald Section */}
      <WhyChooseUs onOpenTrial={() => onOpenTrial()} />

      {/* 4. Teachers Section: Authentic Editorial Showcase */}
      <TutorsSection
        onOpenTrialWithGender={(g) => onOpenTrial(undefined, g)}
        onOpenTrial={onOpenTrial}
      />

      {/* 5. How It Works: 4-Step Process Timeline */}
      <MethodologySection onOpenTrial={() => onOpenTrial()} />

      {/* 6. Authentic Magazine Testimonial & Verified Metrics */}
      <TrustSection />

      {/* 7. Image & Story Section */}
      <StorySection onOpenTrial={() => onOpenTrial()} />

      {/* 8. Final Call to Action */}
      <FinalCTASection
        onOpenTrial={() => onOpenTrial()}
        onViewCourses={() => onNavClick('courses')}
      />
    </div>
  );
};
