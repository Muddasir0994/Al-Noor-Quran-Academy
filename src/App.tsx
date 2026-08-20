import React, { useState, useEffect, Suspense, lazy } from 'react';
import { IconContext } from '@phosphor-icons/react';
import { Course, PackagePlan, Tutor, Testimonial, Article, IslamicResource } from './types';
import { ALL_COURSES, ALL_PACKAGES, INITIAL_TUTORS, INITIAL_TESTIMONIALS, INITIAL_ARTICLES, INITIAL_RESOURCES } from './data/academyData';
import { AuthProvider, useAuth } from './context/AuthContext';

import { SEOHead } from './components/SEOHead';
import { SEO_PAGE_MAP } from './lib/seoConfig';
import type { CountryKey } from './components/InternationalLanding';
import { NotFoundPage } from './components/NotFoundPage';

// Lazy-loaded Specialized Landing Tracks
const InternationalLanding = lazy(() => import('./components/InternationalLanding').then(m => ({ default: m.InternationalLanding })));
const KidsProgramLanding = lazy(() => import('./components/KidsProgramLanding').then(m => ({ default: m.KidsProgramLanding })));
const AdultsProgramLanding = lazy(() => import('./components/AdultsProgramLanding').then(m => ({ default: m.AdultsProgramLanding })));
const FemaleTutorLanding = lazy(() => import('./components/FemaleTutorLanding').then(m => ({ default: m.FemaleTutorLanding })));

import { Navbar } from './components/Navbar';
import { HomePageView } from './components/HomePageView';
import { TrustSection } from './components/TrustSection';
import { CoursesSection } from './components/CoursesSection';
import { PackagesSection } from './components/PackagesSection';
import { TutorsSection } from './components/TutorsSection';
import { MethodologySection } from './components/MethodologySection';
import { ResourcesAndBlogSection } from './components/ResourcesAndBlogSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { ProtectedRoute } from './components/ProtectedRoute';

// Lazy-loaded Interactive Learning & Management Portals (reduces initial JS bundle size)
const ClassroomStudio = lazy(() => import('./components/ClassroomStudio').then(m => ({ default: m.ClassroomStudio })));
const StudentPortal = lazy(() => import('./components/StudentPortal').then(m => ({ default: m.StudentPortal })));
const TeacherPortal = lazy(() => import('./components/TeacherPortal').then(m => ({ default: m.TeacherPortal })));
const AdminPortal = lazy(() => import('./admin/AdminPortal').then(m => ({ default: m.AdminPortal })));

// Lazy-loaded on-demand interactive modals
const AuthModal = lazy(() => import('./components/AuthModal').then(m => ({ default: m.AuthModal })));
const FreeTrialModal = lazy(() => import('./components/FreeTrialModal').then(m => ({ default: m.FreeTrialModal })));
const EnrollmentModal = lazy(() => import('./components/EnrollmentModal').then(m => ({ default: m.EnrollmentModal })));
const CourseDetailModal = lazy(() => import('./components/CourseDetailModal').then(m => ({ default: m.CourseDetailModal })));
const ArticleModal = lazy(() => import('./components/ArticleModal').then(m => ({ default: m.ArticleModal })));
const LegalModal = lazy(() => import('./components/LegalModals').then(m => ({ default: m.LegalModal })));
const BlogListPage = lazy(() => import('./components/BlogListPage').then(m => ({ default: m.BlogListPage })));
const BlogPostPage = lazy(() => import('./components/BlogPostPage').then(m => ({ default: m.BlogPostPage })));

function AppContent() {
  const { currentUser, userProfile } = useAuth();

  // Active Application Subview: 'landing' (Public Website), 'classroom' (Studio), 'student', 'teacher', 'admin'
  const [activeAppView, setActiveAppView] = useState<'landing' | 'classroom' | 'student' | 'teacher' | 'admin'>(() => {
    const raw = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
    if (raw === '/student' || raw === '/student-portal') return 'student';
    if (raw === '/teacher' || raw === '/teacher-portal') return 'teacher';
    if (raw === '/classroom' || raw.startsWith('/classroom/')) return 'classroom';
    if (raw === '/admin' || raw.startsWith('/admin/')) return 'admin';
    const saved = sessionStorage.getItem('alnoor_active_app_view');
    if (saved === 'student' || saved === 'teacher' || saved === 'classroom' || saved === 'admin') {
      return saved as any;
    }
    return 'landing';
  });

  const [activeNavTab, setActiveNavTab] = useState<string>('home');
  const [activeCountry, setActiveCountry] = useState<CountryKey>('uk');
  const [initialClassroomSurah, setInitialClassroomSurah] = useState<number>(1);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string | null>(null);

  // Synchronize browser URL & session storage on activeAppView changes (survives F5 refresh)
  useEffect(() => {
    sessionStorage.setItem('alnoor_active_app_view', activeAppView);
    if (window.history.pushState) {
      if (activeAppView === 'student') window.history.pushState({}, '', '/student');
      else if (activeAppView === 'teacher') window.history.pushState({}, '', '/teacher');
      else if (activeAppView === 'classroom') window.history.pushState({}, '', '/classroom');
      else if (activeAppView === 'admin') window.history.pushState({}, '', '/admin');
    }
  }, [activeAppView]);

  // Core Academy Data
  const [courses, setCourses] = useState<Course[]>(ALL_COURSES);
  const [packages, setPackages] = useState<PackagePlan[]>(ALL_PACKAGES);
  const [tutors, setTutors] = useState<Tutor[]>(INITIAL_TUTORS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [resources, setResources] = useState<IslamicResource[]>(INITIAL_RESOURCES);

  // Modals
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState<string>('Noorani Qaida for Beginners');
  const [selectedGenderPreference, setSelectedGenderPreference] = useState<'Male' | 'Female' | 'No Preference'>('No Preference');
  const [selectedPackage, setSelectedPackage] = useState<PackagePlan | null>(null);

  const [inspectCourse, setInspectCourse] = useState<Course | null>(null);
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // Auth Modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState<'student' | 'teacher'>('student');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Handle URL Deep-Linking & History Navigation
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';

      if (path === '/' || path === '') {
        setActiveNavTab('home');
        setIsNotFound(false);
      } else if (path === '/classroom' || path.startsWith('/classroom/')) {
        setActiveAppView('classroom');
        setIsNotFound(false);
      } else if (path === '/student-portal' || path === '/student') {
        setActiveAppView('student');
        setIsNotFound(false);
      } else if (path === '/teacher-portal' || path === '/teacher') {
        setActiveAppView('teacher');
        setIsNotFound(false);
      } else if (path === '/online-quran-classes' || path === '/courses') {
        setActiveNavTab('courses');
        setIsNotFound(false);
      } else if (path === '/pricing' || path === '/packages') {
        setActiveNavTab('packages');
        setIsNotFound(false);
      } else if (path === '/faculty' || path === '/tutors') {
        setActiveNavTab('tutors');
        setIsNotFound(false);
      } else if (path === '/quran-classes-for-kids' || path === '/kids-program' || path === '/kids') {
        setActiveNavTab('kids-program');
        setIsNotFound(false);
      } else if (path === '/quran-classes-for-adults' || path === '/slow-learners' || path === '/adults') {
        setActiveNavTab('slow-learners');
        setIsNotFound(false);
      } else if (path === '/female-quran-teacher' || path === '/female-tutor' || path === '/female-tutors') {
        setActiveNavTab('female-tutor');
        setIsNotFound(false);
      } else if (path === '/online-quran-classes-uk') {
        setActiveNavTab('uk-program');
        setActiveCountry('uk');
        setIsNotFound(false);
      } else if (path === '/online-quran-classes-usa') {
        setActiveNavTab('usa-program');
        setActiveCountry('usa');
        setIsNotFound(false);
      } else if (path === '/online-quran-classes-canada') {
        setActiveNavTab('canada-program');
        setActiveCountry('canada');
        setIsNotFound(false);
      } else if (path === '/online-quran-classes-australia') {
        setActiveNavTab('australia-program');
        setActiveCountry('australia');
        setIsNotFound(false);
      } else if (path === '/online-quran-classes-pakistan') {
        setActiveNavTab('pakistan-program');
        setActiveCountry('pakistan');
        setIsNotFound(false);
      } else if (path === '/noorani-qaida') {
        setActiveNavTab('courses');
        const c = ALL_COURSES.find(item => item.id === 'c-1' || item.slug === 'noorani-qaida');
        if (c) setInspectCourse(c);
        setIsNotFound(false);
      } else if (path === '/quran-reading-nazra') {
        setActiveNavTab('courses');
        const c = ALL_COURSES.find(item => item.id === 'c-2' || item.slug === 'quran-reading-nazra');
        if (c) setInspectCourse(c);
        setIsNotFound(false);
      } else if (path === '/quran-with-tajweed') {
        setActiveNavTab('courses');
        const c = ALL_COURSES.find(item => item.id === 'c-3' || item.slug === 'quran-with-tajweed');
        if (c) setInspectCourse(c);
        setIsNotFound(false);
      } else if (path === '/quran-memorization-hifz') {
        setActiveNavTab('courses');
        const c = ALL_COURSES.find(item => item.id === 'c-4' || item.slug === 'quran-memorization-hifz');
        if (c) setInspectCourse(c);
        setIsNotFound(false);
      } else if (path === '/islamic-studies') {
        setActiveNavTab('courses');
        const c = ALL_COURSES.find(item => item.id === 'c-5' || item.slug === 'islamic-studies');
        if (c) setInspectCourse(c);
        setIsNotFound(false);
      } else if (path === '/about-us' || path === '/about') {
        setActiveNavTab('about');
        setIsNotFound(false);
      } else if (path === '/faq') {
        setActiveNavTab('faq');
        setIsNotFound(false);
      } else if (path === '/blog' || path === '/blogs' || path === '/articles') {
        setActiveNavTab('blogs');
        setCurrentBlogSlug(null);
        setIsNotFound(false);
      } else if (path === '/contact-us' || path === '/contact') {
        setActiveNavTab('contact');
        setIsNotFound(false);
      } else if (path === '/free-trial') {
        setActiveNavTab('home');
        setIsTrialModalOpen(true);
        setIsNotFound(false);
      } else if (path === '/admin' || path === '/admin-portal' || path === '/admin/dashboard' || path === '/staff-portal') {
        setActiveAppView('admin');
        setIsNotFound(false);
      } else if (path === '/portal' || path === '/login') {
        handleOpenAuth('student', 'login');
        setIsNotFound(false);
      } else if (path === '/register') {
        handleOpenAuth('student', 'signup');
        setIsNotFound(false);
      } else if (path.startsWith('/courses/')) {
        const slug = path.replace('/courses/', '');
        const c = ALL_COURSES.find(item => item.slug === slug || item.id === slug);
        if (c) {
          setActiveNavTab('courses');
          setInspectCourse(c);
          setIsNotFound(false);
        } else {
          setIsNotFound(true);
        }
      } else if (path.startsWith('/blog/')) {
        const slug = path.replace('/blog/', '');
        if (slug) {
          setActiveNavTab('blog-post');
          setCurrentBlogSlug(slug);
          setIsNotFound(false);
        } else {
          setActiveNavTab('blogs');
          setCurrentBlogSlug(null);
          setIsNotFound(false);
        }
      } else {
        // Fallback for safety in development / embedded preview
        setActiveNavTab('home');
        setIsNotFound(false);
      }
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    return () => window.removeEventListener('popstate', handleUrlRoute);
  }, []);

  // Fetch live server data
  const fetchData = async () => {
    try {
      const [cRes, pRes, tRes, testRes, artRes, resRes] = await Promise.all([
        fetch('/api/courses'),
        fetch('/api/packages'),
        fetch('/api/tutors'),
        fetch('/api/testimonials'),
        fetch('/api/articles'),
        fetch('/api/resources')
      ]);

      if (cRes.ok) {
        const d = await cRes.json();
        if (d.courses && d.courses.length > 0) setCourses(d.courses);
      }
      if (pRes.ok) {
        const d = await pRes.json();
        if (d.packages && d.packages.length > 0) setPackages(d.packages);
      }
      if (tRes.ok) {
        const d = await tRes.json();
        if (d.tutors && d.tutors.length > 0) setTutors(d.tutors);
      }
      if (testRes.ok) {
        const d = await testRes.json();
        if (d.testimonials && d.testimonials.length > 0) setTestimonials(d.testimonials);
      }
      if (artRes.ok) {
        const d = await artRes.json();
        if (d.articles && d.articles.length > 0) setArticles(d.articles);
      }
      if (resRes.ok) {
        const d = await resRes.json();
        if (d.resources && d.resources.length > 0) setResources(d.resources);
      }
    } catch (err) {
      console.log('Loaded static baseline academy data');
    }
  };

  useEffect(() => {
    // Non-blocking background sync after initial page paint
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => fetchData(), { timeout: 2000 });
    } else {
      const timer = setTimeout(fetchData, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenAuth = (role: 'student' | 'teacher' = 'student', mode: 'login' | 'signup' = 'signup') => {
    setAuthRole(role);
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleOpenTrial = (courseName?: string, genderPref?: 'Male' | 'Female' | 'No Preference') => {
    setSelectedCourseName(courseName || 'Noorani Qaida for Beginners');
    setSelectedGenderPreference(genderPref || 'No Preference');
    setIsTrialModalOpen(true);
  };

  const handleOpenEnroll = (courseName?: string, pkg?: PackagePlan) => {
    setSelectedCourseName(courseName || 'Nazra Quran with Tajweed');
    if (pkg) setSelectedPackage(pkg);
    setIsEnrollModalOpen(true);
  };

  const handleSelectPackage = (pkg: PackagePlan) => {
    setSelectedPackage(pkg);
    setIsEnrollModalOpen(true);
  };

  const handleInspectCourse = (course: Course) => {
    setInspectCourse(course);
    const seoMap = SEO_PAGE_MAP[course.id] || SEO_PAGE_MAP.courses;
    if (window.history.pushState) {
      window.history.pushState({}, '', seoMap.path);
    }
  };

  const handleBlogNavigate = (slug: string) => {
    if (window.history.pushState) {
      window.history.pushState({}, '', `/blog/${slug}`);
    }
    setCurrentBlogSlug(slug);
    setActiveNavTab('blog-post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBlogBack = () => {
    if (window.history.pushState) {
      window.history.pushState({}, '', '/blog');
    }
    setCurrentBlogSlug(null);
    setActiveNavTab('blogs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (sectionId: string) => {
    setIsNotFound(false);
    setActiveAppView('landing');

    if (sectionId === 'articles' || sectionId === 'blog' || sectionId === 'blogs') {
      setActiveNavTab('blogs');
      setCurrentBlogSlug(null);
      if (window.history.pushState) {
        window.history.pushState({}, '', '/blog');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setActiveNavTab(sectionId);

    // Map tab ID to clean URL
    const routeMeta = SEO_PAGE_MAP[sectionId];
    if (routeMeta && window.history.pushState) {
      window.history.pushState({}, '', routeMeta.path);
    }

    if (sectionId === 'uk-program') setActiveCountry('uk');
    if (sectionId === 'usa-program') setActiveCountry('usa');
    if (sectionId === 'canada-program') setActiveCountry('canada');
    if (sectionId === 'australia-program') setActiveCountry('australia');
    if (sectionId === 'pakistan-program') setActiveCountry('pakistan');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [classroomOriginView, setClassroomOriginView] = useState<'student' | 'teacher' | 'landing'>('landing');

  const handleOpenClassroomWithSurah = (surahNum: number = 1, origin: 'student' | 'teacher' | 'landing' = 'landing') => {
    setInitialClassroomSurah(surahNum);
    setClassroomOriginView(origin);
    setActiveAppView('classroom');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#17201B] font-body selection:bg-[#D4A72C]/30 selection:text-[#064E3B]">
      
      {/* Dynamic SEO synchronization component for <title>, <meta description>, <link canonical>, OpenGraph & Schema */}
      <SEOHead
        currentTab={activeNavTab}
        inspectCourse={inspectCourse}
        readingArticle={readingArticle}
      />

      {/* Global Navigation Bar with Multi-Portal Switcher & Auth */}
      <Navbar
        activeTab={activeNavTab}
        activeAppView={activeAppView}
        onSelectAppView={(v) => {
          setActiveAppView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavClick={handleNavClick}
        onOpenTrial={() => handleOpenTrial()}
        onOpenEnroll={() => handleOpenEnroll()}
        onOpenAuth={handleOpenAuth}
      />

      {/* ============================================================== */}
      {/* MAIN VIEWPORT SWITCHER */}
      {/* ============================================================== */}

      {/* 404 Not Found Handling */}
      {isNotFound && (
        <NotFoundPage
          onGoHome={() => handleNavClick('home')}
          onSelectTab={handleNavClick}
          onOpenTrial={() => handleOpenTrial()}
        />
      )}

      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center min-h-[50vh] p-8">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-3 border-[#064E3B] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Loading Al-Noor Portal...
              </p>
            </div>
          </div>
        }
      >
        {/* 1. DIGITAL QURAN CLASSROOM STUDIO (Interactive learning studio & video room) */}
        {!isNotFound && activeAppView === 'classroom' && (
          <ClassroomStudio
            initialSurahNumber={initialClassroomSurah}
            initialMode="whiteboard"
            portalOrigin={classroomOriginView !== 'landing' ? classroomOriginView : null}
            onReturnToPortal={classroomOriginView !== 'landing' ? () => setActiveAppView(classroomOriginView) : undefined}
            onBackToLanding={() => setActiveAppView('landing')}
            onOpenEnroll={() => handleOpenEnroll()}
            onOpenTrial={() => handleOpenTrial()}
          />
        )}

        {/* 2. STUDENT & PARENT LEARNING HUB (Protected: Requires Student Role) */}
        {!isNotFound && activeAppView === 'student' && (
          <ProtectedRoute
            requiredRole="student"
            onRequireAuth={(role, mode) => {
              setAuthRole(role || 'student');
              setAuthMode(mode || 'login');
              setIsAuthModalOpen(true);
            }}
            onBackToLanding={() => setActiveAppView('landing')}
          >
            <StudentPortal
              onOpenClassroom={(sNum) => handleOpenClassroomWithSurah(sNum || 1, 'student')}
              onBackToLanding={() => setActiveAppView('landing')}
            />
          </ProtectedRoute>
        )}

        {/* 3. TEACHER & FACULTY EVALUATION PORTAL (Protected: Requires Teacher Role) */}
        {!isNotFound && activeAppView === 'teacher' && (
          <ProtectedRoute
            requiredRole="teacher"
            onRequireAuth={(role, mode) => {
              setAuthRole(role || 'teacher');
              setAuthMode(mode || 'login');
              setIsAuthModalOpen(true);
            }}
            onBackToLanding={() => setActiveAppView('landing')}
            onGoToStudentPortal={() => setActiveAppView('student')}
          >
            <TeacherPortal
              onOpenClassroom={(sNum) => handleOpenClassroomWithSurah(sNum || 1, 'teacher')}
              onBackToLanding={() => setActiveAppView('landing')}
            />
          </ProtectedRoute>
        )}

        {/* 4. ACADEMY MANAGEMENT & ADMIN PORTAL (Protected: Requires Admin Role) */}
        {!isNotFound && activeAppView === 'admin' && (
          <AdminPortal
            isOpen={true}
            onClose={() => {
              window.history.pushState({}, '', '/');
              setActiveAppView('landing');
            }}
            courses={courses}
            onRefreshCourses={fetchData}
          />
        )}
      </Suspense>

      {/* 4. PUBLIC ACADEMY LANDING WEBSITE */}
      {!isNotFound && activeAppView === 'landing' && (
        <main className="flex-1 min-h-[600px]">

          {/* ========================================================= */}
          {/* MULTI-PAGE PUBLIC ROUTING */}
          {/* ========================================================= */}

          {/* 1. HOME PAGE */}
          {activeNavTab === 'home' && (
            <HomePageView
              courses={courses}
              testimonials={testimonials}
              onOpenTrial={handleOpenTrial}
              onOpenEnroll={handleOpenEnroll}
              onInspectCourse={handleInspectCourse}
              onNavClick={handleNavClick}
            />
          )}

          {/* 2. COURSES PAGE */}
          {activeNavTab === 'courses' && (
            <div>
              {/* Page Banner Header */}
              <div className="bg-[#064E3B] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#D4A72C]/30 bg-islamic-pattern">
                <div className="max-w-7xl mx-auto text-center space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4A72C] uppercase tracking-wider">
                    <button onClick={() => handleNavClick('home')} className="hover:underline cursor-pointer">Home</button>
                    <span>/</span>
                    <span className="text-white">Quran Courses</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
                    Certified 1-on-1 Online Quran Courses
                  </h1>
                  <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto">
                    From foundational Noorani Qaida to advanced Tajweed, Hifz, and Islamic Studies. Personalized curricula with flexible schedules.
                  </p>
                </div>
              </div>

              <CoursesSection
                courses={courses}
                onOpenTrial={handleOpenTrial}
                onOpenEnroll={handleOpenEnroll}
                onInspectCourse={handleInspectCourse}
              />
              <MethodologySection
                onOpenTrial={() => handleOpenTrial()}
                onOpenEnroll={() => handleOpenEnroll()}
              />
            </div>
          )}

          {/* 3. PACKAGES & PRICING PAGE */}
          {activeNavTab === 'packages' && (
            <div>
              {/* Page Banner Header */}
              <div className="bg-[#064E3B] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#D4A72C]/30 bg-islamic-pattern">
                <div className="max-w-7xl mx-auto text-center space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4A72C] uppercase tracking-wider">
                    <button onClick={() => handleNavClick('home')} className="hover:underline cursor-pointer">Home</button>
                    <span>/</span>
                    <span className="text-white">Packages & Pricing</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
                    Affordable 1-on-1 Quran Tuition Plans
                  </h1>
                  <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto">
                    Transparent monthly plans with multi-student family discounts and a 3-day free trial. Choose classes 2 to 5 days per week.
                  </p>
                </div>
              </div>

              <PackagesSection
                packages={packages}
                onSelectPackage={handleSelectPackage}
                onOpenTrial={() => handleOpenTrial()}
              />
            </div>
          )}

          {/* 4. FACULTY / TUTORS PAGE */}
          {activeNavTab === 'tutors' && (
            <div>
              {/* Page Banner Header */}
              <div className="bg-[#064E3B] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#D4A72C]/30 bg-islamic-pattern">
                <div className="max-w-7xl mx-auto text-center space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4A72C] uppercase tracking-wider">
                    <button onClick={() => handleNavClick('home')} className="hover:underline cursor-pointer">Home</button>
                    <span>/</span>
                    <span className="text-white">Faculty & Scholars</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
                    Certified Male & Female Quran Teachers
                  </h1>
                  <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto">
                    Verified Ijazah holders and Islamic university graduates dedicated to patient, interactive 1-on-1 Quran education.
                  </p>
                </div>
              </div>

              <TutorsSection
                tutors={tutors}
                onOpenTrialWithGender={(g) => handleOpenTrial(undefined, g)}
              />
            </div>
          )}

          {/* 5. KIDS PROGRAM PAGE */}
          {activeNavTab === 'kids-program' && (
            <KidsProgramLanding
              onOpenTrial={handleOpenTrial}
              onOpenEnroll={handleOpenEnroll}
              onNavClick={handleNavClick}
            />
          )}

          {/* 6. FEMALE TUTORS PAGE */}
          {activeNavTab === 'female-tutor' && (
            <FemaleTutorLanding
              onOpenTrial={handleOpenTrial}
              onOpenEnroll={handleOpenEnroll}
              onNavClick={handleNavClick}
            />
          )}

          {/* 7. ADULTS & SLOW LEARNERS PAGE */}
          {activeNavTab === 'slow-learners' && (
            <AdultsProgramLanding
              onOpenTrial={handleOpenTrial}
              onOpenEnroll={handleOpenEnroll}
              onNavClick={handleNavClick}
            />
          )}

          {/* 8. BLOG & ARTICLES CMS PAGE */}
          {(activeNavTab === 'blogs' || activeNavTab === 'articles') && (
            <BlogListPage
              onNavigate={handleBlogNavigate}
              onOpenTrial={() => handleOpenTrial()}
            />
          )}

          {/* 8B. SINGLE BLOG POST PAGE */}
          {activeNavTab === 'blog-post' && currentBlogSlug && (
            <BlogPostPage
              slug={currentBlogSlug}
              onNavigate={handleBlogNavigate}
              onNavigateBack={handleBlogBack}
              onOpenTrial={() => handleOpenTrial()}
            />
          )}

          {/* 9. FAQ PAGE */}
          {activeNavTab === 'faq' && (
            <div>
              {/* Page Banner Header */}
              <div className="bg-[#064E3B] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#D4A72C]/30 bg-islamic-pattern">
                <div className="max-w-7xl mx-auto text-center space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4A72C] uppercase tracking-wider">
                    <button onClick={() => handleNavClick('home')} className="hover:underline cursor-pointer">Home</button>
                    <span>/</span>
                    <span className="text-white">FAQ</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
                    Frequently Asked Questions
                  </h1>
                  <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto">
                    Everything you need to know about our online classes, trial lessons, fee structure, tutors, and technical setup.
                  </p>
                </div>
              </div>

              <FAQSection onOpenTrial={() => handleOpenTrial()} />
            </div>
          )}

          {/* 10. CONTACT PAGE */}
          {activeNavTab === 'contact' && (
            <div>
              {/* Page Banner Header */}
              <div className="bg-[#064E3B] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#D4A72C]/30 bg-islamic-pattern">
                <div className="max-w-7xl mx-auto text-center space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4A72C] uppercase tracking-wider">
                    <button onClick={() => handleNavClick('home')} className="hover:underline cursor-pointer">Home</button>
                    <span>/</span>
                    <span className="text-white">Contact Us</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
                    Get in Touch with Academic Support
                  </h1>
                  <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto">
                    Have questions or need help selecting a course? Reach out via WhatsApp, phone, or direct inquiry form.
                  </p>
                </div>
              </div>

              <ContactSection />
            </div>
          )}

          {/* 11. ABOUT US PAGE */}
          {activeNavTab === 'about' && (
            <div>
              {/* Page Banner Header */}
              <div className="bg-[#064E3B] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#D4A72C]/30 bg-islamic-pattern">
                <div className="max-w-7xl mx-auto text-center space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4A72C] uppercase tracking-wider">
                    <button onClick={() => handleNavClick('home')} className="hover:underline cursor-pointer">Home</button>
                    <span>/</span>
                    <span className="text-white">About Us</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
                    About Al-Noor Quran Academy
                  </h1>
                  <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto">
                    Dedicated to providing accessible, authentic, and certified Quranic education to families worldwide.
                  </p>
                </div>
              </div>

              <AboutSection
                onOpenTrial={() => handleOpenTrial()}
                onOpenEnroll={() => handleOpenEnroll()}
              />
              <TrustSection />
              <WhyChooseUs onOpenTrial={() => handleOpenTrial()} />
            </div>
          )}

          {/* 12. INTERNATIONAL LOCALIZED PAGES */}
          {(activeNavTab === 'uk-program' ||
            activeNavTab === 'usa-program' ||
            activeNavTab === 'canada-program' ||
            activeNavTab === 'australia-program' ||
            activeNavTab === 'pakistan-program') && (
            <InternationalLanding
              countryCode={activeCountry}
              onOpenTrial={handleOpenTrial}
              onOpenEnroll={handleOpenEnroll}
              onSelectCountry={(c) => {
                setActiveCountry(c);
                handleNavClick(`${c}-program`);
              }}
            />
          )}
        </main>
      )}

      {/* Academy Footer */}
      <Footer
        onNavClick={handleNavClick}
        onOpenTrial={() => handleOpenTrial()}
        onOpenEnroll={() => handleOpenEnroll()}
        onOpenLegal={(type) => setLegalModalType(type)}
        onSelectCountry={(c) => {
          setActiveCountry(c);
          handleNavClick(`${c}-program`);
        }}

      />

      {/* Floating 24/7 WhatsApp Chat Widget */}
      <WhatsAppWidget onOpenTrial={() => handleOpenTrial()} />

      <Suspense fallback={null}>
        {/* Student Self-Signup, Google Sign-In & Teacher/Admin Auth Modal */}
        {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            initialRole={authRole}
            initialMode={authMode}
            onSuccess={(role) => {
              if (role === 'teacher') {
                setActiveAppView('teacher');
              } else {
                setActiveAppView('student');
              }
            }}
          />
        )}

        {/* 3-Day Free Trial Modal */}
        {isTrialModalOpen && (
          <FreeTrialModal
            isOpen={isTrialModalOpen}
            onClose={() => setIsTrialModalOpen(false)}
            initialCourseName={selectedCourseName}
            defaultGender={selectedGenderPreference}
          />
        )}

        {/* Course Enrollment Modal */}
        {isEnrollModalOpen && (
          <EnrollmentModal
            isOpen={isEnrollModalOpen}
            onClose={() => setIsEnrollModalOpen(false)}
            initialCourseName={selectedCourseName}
            initialPackage={selectedPackage}
          />
        )}

        {/* Syllabus / Course Details Breakdown Modal */}
        {inspectCourse && (
          <CourseDetailModal
            course={inspectCourse}
            onClose={() => setInspectCourse(null)}
            onOpenTrial={(courseName) => handleOpenTrial(courseName)}
            onOpenEnroll={(courseName) => handleOpenEnroll(courseName)}
          />
        )}

        {/* Article Reader Modal */}
        {readingArticle && (
          <ArticleModal
            article={readingArticle}
            onClose={() => setReadingArticle(null)}
            onOpenTrial={() => handleOpenTrial()}
          />
        )}

        {/* Privacy Policy / Terms & Conditions Modal */}
        {legalModalType && (
          <LegalModal
            type={legalModalType}
            onClose={() => setLegalModalType(null)}
          />
        )}
      </Suspense>

    </div>
  );
}

export default function App() {
  return (
    <IconContext.Provider value={{ weight: 'duotone' }}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </IconContext.Provider>
  );
}
