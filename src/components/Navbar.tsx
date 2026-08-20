import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  List,
  X,
  BookOpen,
  User,
  SignIn,
  SignOut,
  CaretDown,
  Phone,
  WhatsappLogo,
  Globe,
  ArrowRight,
  Certificate,
  GraduationCap,
  Users,
  UserCheck,
  ShieldCheck,
  CreditCard,
  Question,
  FileText
} from '@phosphor-icons/react';

interface NavbarProps {
  activeTab: string;
  activeAppView: 'landing' | 'classroom' | 'student' | 'teacher' | 'admin';
  onSelectAppView: (view: 'landing' | 'classroom' | 'student' | 'teacher' | 'admin') => void;
  onNavClick: (tabId: string) => void;
  onOpenTrial: (courseName?: string) => void;
  onOpenEnroll: (courseName?: string) => void;
  onOpenAuth?: (role?: 'student' | 'teacher', mode?: 'login' | 'signup') => void;
}

interface NavSubItem {
  id: string;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; weight?: any }>;
  badge?: string;
}

interface NavParentItem {
  id: string;
  label: string;
  isDirectLink?: boolean;
  targetId?: string;
  items?: NavSubItem[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  activeAppView,
  onSelectAppView,
  onNavClick,
  onOpenTrial,
  onOpenEnroll,
  onOpenAuth
}) => {
  const { currentUser, userProfile, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>('courses-parent');
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const internationalCountries = [
    { id: 'uk-program', label: 'UK', flag: '🇬🇧' },
    { id: 'usa-program', label: 'USA', flag: '🇺🇸' },
    { id: 'canada-program', label: 'Canada', flag: '🇨🇦' },
    { id: 'australia-program', label: 'Australia', flag: '🇦🇺' },
    { id: 'pakistan-program', label: 'Pakistan', flag: '🇵🇰' }
  ];

  // 5 Top-Level Parent Hierarchy Groupings
  const parentNavigation: NavParentItem[] = [
    {
      id: 'home-parent',
      label: 'Home',
      isDirectLink: true,
      targetId: 'home'
    },
    {
      id: 'courses-parent',
      label: 'Courses & Tracks',
      items: [
        {
          id: 'courses',
          label: 'All Courses Overview',
          desc: 'Explore complete syllabus & 1-on-1 learning paths',
          icon: BookOpen
        },
        {
          id: 'courses',
          label: 'Noorani Qaida for Beginners',
          desc: 'Arabic alphabet, phonetics & letter recognition',
          icon: BookOpen,
          badge: 'Foundational'
        },
        {
          id: 'courses',
          label: 'Nazra Quran Reading',
          desc: 'Fluent recitation of 30 Juz with proper pacing',
          icon: BookOpen
        },
        {
          id: 'courses',
          label: 'Quran with Tajweed',
          desc: 'Master rules of Makharij, Noon Sakin, & Waqf',
          icon: Certificate,
          badge: 'Core'
        },
        {
          id: 'courses',
          label: 'Hifz Quran Memorization',
          desc: 'Daily Sabaq, Sabqi, and Manzil retention system',
          icon: GraduationCap
        },
        {
          id: 'kids-program',
          label: 'Kids Quran Track',
          desc: 'Fun, gentle, interactive lessons for ages 4+',
          icon: Users,
          badge: 'Kids'
        },
        {
          id: 'slow-learners',
          label: 'Adults & Beginners Track',
          desc: 'Patient, zero-pressure classes with flexible hours',
          icon: UserCheck
        }
      ]
    },
    {
      id: 'faculty-parent',
      label: 'Faculty & About',
      items: [
        {
          id: 'tutors',
          label: 'Certified Faculty & Scholars',
          desc: 'Ijazah-certified male & female scholars from Jamia Ashrafia & Wifaq',
          icon: GraduationCap
        },
        {
          id: 'female-tutor',
          label: 'Dedicated Female Tutors',
          desc: '100% private classes for sisters & young daughters with verified Aalimahs',
          icon: UserCheck,
          badge: 'Sisters'
        },
        {
          id: 'about',
          label: 'About Noor-e-Quran Institute',
          desc: 'Our educational philosophy, verified Sanad, and global mission',
          icon: ShieldCheck
        }
      ]
    },
    {
      id: 'tuition-parent',
      label: 'Tuition & Plans',
      items: [
        {
          id: 'packages',
          label: 'Tuition Plans & Fees',
          desc: 'Affordable monthly plans in USD, GBP, EUR, CAD, AUD, AED, & PKR',
          icon: CreditCard
        },
        {
          id: 'faq',
          label: 'Frequently Asked Questions',
          desc: 'Clear answers on trial classes, teachers, scheduling & payments',
          icon: Question
        }
      ]
    },
    {
      id: 'blog-parent',
      label: 'Blog & Articles',
      isDirectLink: true,
      targetId: 'blogs'
    },
    {
      id: 'contact-parent',
      label: 'Contact Us',
      isDirectLink: true,
      targetId: 'contact'
    }
  ];

  const handleLinkClick = (tabId: string) => {
    onSelectAppView('landing');
    onNavClick(tabId);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const toggleMobileSection = (sectionId: string) => {
    setMobileExpandedSection(prev => (prev === sectionId ? null : sectionId));
  };

  // Helper to check if any child item is currently active
  const isParentActive = (parent: NavParentItem) => {
    if (parent.isDirectLink) {
      if (parent.targetId === 'blogs') {
        return activeTab === 'blogs' || activeTab === 'articles' || activeTab === 'blog-post';
      }
      return activeTab === parent.targetId;
    }
    return parent.items?.some(item => item.id === activeTab) || false;
  };

  return (
    <header ref={navRef} className="sticky top-0 z-40 w-full shadow-xs min-h-[96px]">
      
      {/* 1. Top Utility Ribbon */}
      <div className="bg-[#032B21] text-white py-1.5 px-4 sm:px-8 flex justify-between items-center text-xs border-b border-[#D4A72C]/20">
        {/* Left: Value Proposition & Live Indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4A72C] animate-pulse"></span>
          <span className="font-medium text-emerald-100/90 text-[11px] sm:text-xs">
            Learn Quran Online With Tajweed • <strong className="text-[#D4A72C] font-bold">3-Day Free Trial</strong>
          </span>
        </div>

        {/* Center/Right: Country Hubs & Contact */}
        <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
          {/* International Country Hub Selector */}
          <div className="hidden md:flex items-center gap-1.5 text-emerald-200/80 border-r border-emerald-800/80 pr-3">
            <Globe className="w-3.5 h-3.5 text-[#D4A72C]" weight="duotone" />
            <span className="text-[10px] uppercase font-bold text-emerald-300">Hubs:</span>
            {internationalCountries.map(c => (
              <button
                key={c.id}
                onClick={() => handleLinkClick(c.id)}
                className="hover:text-white transition-colors cursor-pointer px-1 py-0.5 rounded text-[11px] hover:bg-emerald-800/50"
                title={`Online Quran Classes for ${c.label}`}
              >
                {c.flag} <span className="hidden lg:inline">{c.label}</span>
              </button>
            ))}
          </div>

          <a
            href="tel:+923274496163"
            aria-label="Call Noor-e-Quran Institute at +92 327 4496163"
            className="flex items-center gap-1 text-emerald-100/90 hover:text-[#F3C64D] transition-colors font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-[#F3C64D]" weight="duotone" />
            <span className="hidden sm:inline">+92 327 4496163</span>
          </a>

          <a
            href="https://wa.me/923274496163?text=Assalam-o-Alaikum%20Noor-e-Quran%20Institute.%20I%20want%20to%20inquire%20about%20online%20Quran%20classes%20and%203-day%20free%20trial."
            target="_blank"
            rel="noreferrer"
            aria-label="Contact Noor-e-Quran Institute on WhatsApp"
            className="flex items-center gap-1 text-emerald-100/90 hover:text-[#25D366] transition-colors font-medium"
          >
            <WhatsappLogo className="w-3.5 h-3.5 text-[#25D366]" weight="fill" />
            <span className="hidden sm:inline">WhatsApp 24/7</span>
          </a>

          <span className="text-emerald-800">|</span>

          {/* User Status or Login */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 bg-emerald-900/90 text-emerald-100 hover:text-white px-2.5 py-0.5 rounded-lg border border-[#D4A72C]/40 text-[11px] font-bold transition-all cursor-pointer"
              >
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="" className="w-4 h-4 rounded-full" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-[#D4A72C] text-[#064E3B] flex items-center justify-center text-[9px] font-black">
                    {userProfile?.displayName?.charAt(0) || 'U'}
                  </span>
                )}
                <span className="max-w-[75px] sm:max-w-[110px] truncate">
                  {userProfile?.displayName || currentUser.email?.split('@')[0]}
                </span>
                <CaretDown className="w-3 h-3 text-[#D4A72C]" weight="bold" />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-1.5 w-52 glass-floating text-gray-800 rounded-2xl shadow-xl border border-[#D4A72C]/30 py-1.5 z-50 animate-in fade-in"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-gray-100 bg-emerald-50/50">
                    <p className="text-xs font-bold text-[#064E3B] truncate">{userProfile?.displayName || 'Student'}</p>
                    <p className="text-[10px] text-gray-500 truncate">{currentUser.email}</p>
                  </div>

                  <button
                    onClick={() => onSelectAppView('student')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-emerald-50 text-gray-700 flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-[#064E3B]" weight="duotone" />
                    <span>My Student Portal</span>
                  </button>

                  <button
                    onClick={() => onSelectAppView('classroom')}
                    className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-emerald-50 text-gray-700 flex items-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#064E3B]" weight="duotone" />
                    <span>Live Quran Classroom</span>
                  </button>

                  <div className="border-t border-gray-100 my-1"></div>

                  <button
                    onClick={() => logout()}
                    className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-red-50 text-red-600 flex items-center gap-2 cursor-pointer"
                  >
                    <SignOut className="w-3.5 h-3.5" weight="duotone" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth && onOpenAuth('student', 'login')}
              className="text-[11px] font-bold text-emerald-100 hover:text-white flex items-center gap-1 hover:underline cursor-pointer"
            >
              <SignIn className="w-3.5 h-3.5 text-[#D4A72C]" weight="bold" />
              <span>Student / Parent Login</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className={`px-4 sm:px-8 py-3 flex justify-between items-center transition-all duration-300 ${
        isScrolled
          ? 'glass-navbar'
          : 'bg-white/95 backdrop-blur-md border-b border-emerald-950/10 shadow-xs'
      }`}>
        {/* Brand Logo */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-hidden cursor-pointer"
          id="nav-brand-logo"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-xs border border-[#D4A72C]/50 transition-transform group-hover:scale-105 shrink-0">
            <img
              src="/logo.webp"
              alt="Noor-e-Quran Institute Emblem"
              width={48}
              height={48}
              loading="eager"
              decoding="async"
              className="w-full h-full object-contain p-0.5"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = '/logo.png';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg sm:text-xl font-heading font-extrabold text-[#064E3B] tracking-tight">
                NOOR-E-<span className="text-[#D4A72C]">QURAN</span> INSTITUTE
              </span>
            </div>
            <p className="text-[10px] text-emerald-900/70 font-arabic hidden sm:block font-bold">
              معهد نور القرآن الكريم والتجويد
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links (Restructured Parent / Child) */}
        {activeAppView === 'landing' && (
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-xs font-bold uppercase tracking-wider text-[#064E3B]">
            {parentNavigation.map(parent => {
              const active = isParentActive(parent);
              const isDropdownOpen = activeDropdown === parent.id;

              if (parent.isDirectLink) {
                return (
                  <button
                    key={parent.id}
                    id={`nav-link-${parent.targetId}`}
                    onClick={() => handleLinkClick(parent.targetId!)}
                    className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer relative ${
                      active
                        ? 'text-[#064E3B] font-extrabold bg-emerald-50/70'
                        : 'text-gray-700 hover:text-[#064E3B] hover:bg-gray-50'
                    }`}
                  >
                    {parent.label}
                    {active && (
                      <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-[#D4A72C] rounded-full"></span>
                    )}
                  </button>
                );
              }

              return (
                <div
                  key={parent.id}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(parent.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => setActiveDropdown(isDropdownOpen ? null : parent.id)}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                      active || isDropdownOpen
                        ? 'text-[#064E3B] font-extrabold bg-emerald-50/70'
                        : 'text-gray-700 hover:text-[#064E3B] hover:bg-gray-50'
                    }`}
                  >
                    <span>{parent.label}</span>
                    <CaretDown className={`w-3 h-3 text-[#D4A72C] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} weight="bold" />
                    {active && (
                      <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-[#D4A72C] rounded-full"></span>
                    )}
                  </button>

                  {/* Dropdown Surface (Floating Frosted Glass) */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-80 glass-floating rounded-2xl p-2 shadow-2xl border border-[#D4A72C]/30 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="space-y-1">
                        {parent.items?.map(child => {
                          const IconComp = child.icon;
                          return (
                            <button
                              key={child.label}
                              onClick={() => handleLinkClick(child.id)}
                              className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50/90 transition-all flex items-start gap-3 group cursor-pointer"
                            >
                              <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-[#064E3B] flex items-center justify-center shrink-0 group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
                                <IconComp className="w-4 h-4" weight="duotone" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-[#064E3B] group-hover:text-[#064E3B] block">
                                    {child.label}
                                  </span>
                                  {child.badge && (
                                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 bg-[#D4A72C]/20 text-[#064E3B] border border-[#D4A72C]/50 rounded">
                                      {child.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-gray-500 font-normal leading-tight mt-0.5 line-clamp-1">
                                  {child.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Active Portal Indicator on Subviews */}
        {activeAppView !== 'landing' && (
          <div className="hidden lg:flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Current Portal:
            </span>
            <span className="glass-badge text-[#064E3B] px-3 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D4A72C] animate-pulse"></span>
              {activeAppView === 'classroom' && '📖 Digital Quran Classroom & Reciter'}
              {activeAppView === 'student' && '🎓 Student & Parent Hub'}
              {activeAppView === 'teacher' && '👨‍🏫 Teacher Roster & Evaluation'}
              {activeAppView === 'admin' && '🛡️ Academy Staff & Admin Portal'}
            </span>
            <button
              onClick={() => onSelectAppView('landing')}
              className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer ml-2"
            >
              ← Back to Website
            </button>
          </div>
        )}

        {/* Right Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <button
            id="nav-btn-student-portal"
            onClick={() => onSelectAppView('student')}
            className="bg-transparent hover:bg-emerald-50 text-[#064E3B] border border-[#064E3B]/20 hover:border-[#064E3B] px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5 text-[#064E3B]" weight="duotone" />
            <span>Student Portal</span>
          </button>

          <button
            id="nav-btn-trial-cta"
            onClick={() => onOpenTrial()}
            className="gold-gradient-btn text-[#064E3B] px-4 py-2 rounded-xl font-extrabold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Start 3-Day Free Trial</span>
            <ArrowRight className="w-3.5 h-3.5" weight="bold" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#064E3B]" weight="bold" /> : <List className="w-6 h-6 text-[#064E3B]" weight="bold" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu (Accordion Dropdowns) */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-floating border-b border-gray-200 px-4 py-4 space-y-2 animate-in fade-in shadow-xl max-h-[85vh] overflow-y-auto">
          {/* International quick row */}
          <div className="pb-2 mb-2 border-b border-gray-100">
            <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Select Country Hub:</span>
            <div className="flex flex-wrap gap-1">
              {internationalCountries.map(c => (
                <button
                  key={c.id}
                  onClick={() => handleLinkClick(c.id)}
                  className="px-2 py-1 rounded-lg text-xs font-semibold bg-gray-50 border border-gray-200 text-gray-700 hover:bg-emerald-50 hover:text-[#064E3B]"
                >
                  {c.flag} {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion Menu Groupings */}
          {parentNavigation.map(parent => {
            if (parent.isDirectLink) {
              const active = activeTab === parent.targetId;
              return (
                <button
                  key={parent.id}
                  onClick={() => handleLinkClick(parent.targetId!)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between cursor-pointer ${
                    active && activeAppView === 'landing'
                      ? 'bg-[#064E3B] text-white'
                      : 'text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <span>{parent.label}</span>
                  {active && activeAppView === 'landing' && <span className="w-1.5 h-1.5 rounded-full bg-[#D4A72C]"></span>}
                </button>
              );
            }

            const isExpanded = mobileExpandedSection === parent.id;
            const parentHasActiveChild = isParentActive(parent);

            return (
              <div key={parent.id} className="border border-gray-100 rounded-2xl overflow-hidden bg-white/70">
                <button
                  onClick={() => toggleMobileSection(parent.id)}
                  className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-between cursor-pointer ${
                    parentHasActiveChild ? 'text-[#064E3B] bg-emerald-50/50' : 'text-gray-800'
                  }`}
                >
                  <span>{parent.label}</span>
                  <CaretDown className={`w-3.5 h-3.5 text-[#D4A72C] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} weight="bold" />
                </button>

                {isExpanded && (
                  <div className="px-2 py-1.5 bg-emerald-50/30 border-t border-gray-100 space-y-1">
                    {parent.items?.map(child => {
                      const IconComp = child.icon;
                      return (
                        <button
                          key={child.label}
                          onClick={() => handleLinkClick(child.id)}
                          className="w-full text-left p-2 rounded-xl hover:bg-white text-xs font-medium text-gray-700 flex items-center gap-2.5 cursor-pointer"
                        >
                          <IconComp className="w-4 h-4 text-[#064E3B] shrink-0" weight="duotone" />
                          <span className="flex-1 font-semibold text-gray-800">{child.label}</span>
                          {child.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#D4A72C]/20 text-[#064E3B] rounded">
                              {child.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-3 grid grid-cols-2 gap-2 border-t border-gray-100 mt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectAppView('student');
              }}
              className="py-2.5 rounded-xl bg-emerald-50 text-[#064E3B] border border-emerald-200 text-xs font-bold text-center cursor-pointer"
            >
              Student Portal
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrial();
              }}
              className="py-2.5 rounded-xl gold-gradient-btn text-[#064E3B] text-xs font-extrabold text-center cursor-pointer"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
