import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  List,
  X,
  User,
  SignIn,
  SignOut,
  CaretDown,
  Globe,
  ArrowRight
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
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'tutors', label: 'Teachers' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'about', label: 'About Us' },
    { id: 'blogs', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleLinkClick = (tabId: string) => {
    onSelectAppView('landing');
    onNavClick(tabId);
    setMobileMenuOpen(false);
  };

  const isLinkActive = (id: string) => {
    if (id === 'blogs') {
      return activeTab === 'blogs' || activeTab === 'articles' || activeTab === 'blog-post';
    }
    if (id === 'how-it-works') {
      return activeTab === 'how-it-works' || activeTab === 'methodology';
    }
    return activeTab === id;
  };

  return (
    <header ref={navRef} className="sticky top-0 z-40 w-full transition-all duration-200">
      
      {/* 1. Top Utility Ribbon: Clean & Restrained */}
      <div className="bg-[#0B332D] text-[#F8F5EE] py-1.5 px-4 sm:px-8 flex justify-between items-center text-xs border-b border-[#B79A62]/20 font-sans">
        <div className="flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B79A62]"></span>
          <span className="text-[#E8E0D1] text-[11px] sm:text-xs font-normal tracking-wide">
            1-on-1 Certified Online Quran Academy • <span className="text-[#B79A62] font-semibold">3-Day Free Trial</span>
          </span>
        </div>

        {/* Right Utility: Portals & Contact */}
        <div className="flex items-center gap-4 text-[11px] text-[#E8E0D1]">
          <a
            href="https://wa.me/923274496163"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#B79A62] transition-colors hidden sm:inline-flex items-center gap-1.5"
          >
            <span>WhatsApp: +92 327 4496163</span>
          </a>
          <span className="text-[#B79A62]/40 hidden sm:inline">|</span>
          <button
            onClick={() => onSelectAppView('classroom')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Classroom Studio
          </button>
          <span className="text-[#B79A62]/40">|</span>
          {currentUser ? (
            <button
              onClick={() => onSelectAppView(userProfile?.role === 'teacher' ? 'teacher' : 'student')}
              className="text-[#B79A62] font-medium hover:underline cursor-pointer"
            >
              My Portal
            </button>
          ) : (
            <button
              onClick={() => onOpenAuth && onOpenAuth('student', 'login')}
              className="text-[#E8E0D1] hover:text-white font-medium cursor-pointer"
            >
              Portal Login
            </button>
          )}
        </div>
      </div>

      {/* 2. Main Editorial Navbar */}
      <div className={`w-full bg-[#FCFBF8] border-b border-[#E8E0D1] transition-all duration-300 ${isScrolled ? 'shadow-xs py-3' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo: Architectural Minimal Arch + Typography */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            {/* Minimal Architectural Islamic Arch Mark */}
            <div className="w-9 h-9 rounded-sm border border-[#B79A62]/40 bg-[#0B332D] flex items-center justify-center text-[#B79A62] shadow-xs group-hover:border-[#B79A62] transition-colors shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 21V10C4 6 8 3 12 3C16 3 20 6 20 10V21" />
                <path d="M8 21V13C8 11 9.5 9.5 12 9.5C14.5 9.5 16 11 16 13V21" />
                <line x1="12" y1="3" x2="12" y2="7" />
              </svg>
            </div>

            {/* Typography */}
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#0B332D]">
                  Noor Al-Quran
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#B79A62] font-semibold">
                  Institute
                </span>
              </div>
              <span className="block font-arabic text-[11px] text-gray-500 leading-none -mt-0.5" dir="rtl">
                معهد نور القرآن الكريم
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links: Editorial, Spacious */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = isLinkActive(link.id);
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-sm font-sans font-medium transition-colors relative py-1 cursor-pointer ${
                    active
                      ? 'text-[#0B332D] font-semibold'
                      : 'text-gray-600 hover:text-[#0B332D]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B79A62]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Area: Language & Primary CTA */}
          <div className="hidden sm:flex items-center gap-4">
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#0B332D] px-2 py-1.5 rounded-sm border border-transparent hover:border-[#E8E0D1] transition-all cursor-pointer"
                title="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#B79A62]" />
                <span className="font-medium">{selectedLang}</span>
                <CaretDown className="w-3 h-3 text-gray-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-[#FCFBF8] border border-[#E8E0D1] shadow-md rounded-sm py-1 z-50 text-xs">
                  {['English', 'العربية', 'اردو'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#F8F5EE] transition-colors ${
                        selectedLang === lang ? 'font-bold text-[#0B332D]' : 'text-gray-600'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary CTA Button: Deep Emerald with subtle squared corners */}
            <button
              onClick={() => onOpenTrial()}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-[#0B332D] text-[#F8F5EE] text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#07221E] transition-all border border-[#0B332D] cursor-pointer shadow-xs"
            >
              Book Free Trial
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenTrial()}
              className="sm:hidden px-3 py-1.5 bg-[#0B332D] text-[#F8F5EE] text-[11px] font-semibold uppercase tracking-wider rounded-sm"
            >
              Free Trial
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0B332D] rounded-sm hover:bg-[#F8F5EE] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <List className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FCFBF8] border-b border-[#E8E0D1] shadow-lg animate-in fade-in duration-200">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => {
                const active = isLinkActive(link.id);
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`text-left px-3 py-2.5 text-base font-sans transition-colors rounded-sm flex items-center justify-between ${
                      active
                        ? 'bg-[#F8F5EE] text-[#0B332D] font-bold border-l-2 border-[#B79A62]'
                        : 'text-gray-700 hover:bg-[#F8F5EE]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#E8E0D1] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrial();
                }}
                className="w-full py-3 bg-[#0B332D] text-[#F8F5EE] text-center font-semibold text-sm uppercase tracking-wider rounded-sm"
              >
                Book Your Free Trial
              </button>

              <div className="flex items-center justify-between text-xs text-gray-600 pt-2">
                <span>Helpline: +92 327 4496163</span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSelectAppView('classroom');
                  }}
                  className="text-[#0B332D] font-semibold underline"
                >
                  Classroom Studio
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </header>
  );
};
