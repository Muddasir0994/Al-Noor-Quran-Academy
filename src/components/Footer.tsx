import React from 'react';
import {
  YoutubeLogo,
  InstagramLogo,
  FacebookLogo,
  LinkedinLogo,
  WhatsappLogo,
  Envelope
} from '@phosphor-icons/react';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onOpenTrial: (courseName?: string) => void;
  onOpenEnroll?: (courseName?: string) => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
  onSelectCountry?: (country: any) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavClick,
  onOpenTrial,
  onOpenLegal
}) => {
  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/noore_quraninstitute', icon: InstagramLogo },
    { name: 'Facebook', url: 'https://www.facebook.com/share/14pNXeMTM7o/', icon: FacebookLogo },
    { name: 'YouTube', url: 'https://www.youtube.com/@NooreQuranInstitute', icon: YoutubeLogo },
    { name: 'WhatsApp', url: 'https://wa.me/923274496163', icon: WhatsappLogo },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/muddasir-hameed', icon: LinkedinLogo }
  ];

  return (
    <footer className="bg-[#07221E] text-[#E8E0D1] pt-16 pb-12 border-t border-[#B79A62]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Minimal Quranic Calligraphy Accent */}
        <div className="pb-10 border-b border-[#B79A62]/15 text-center max-w-xl mx-auto space-y-2">
          <p className="font-arabic text-xl text-[#B79A62] font-normal" dir="rtl">
            وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
          </p>
          <p className="text-xs text-[#E8E0D1]/60 font-sans italic">
            &ldquo;And recite the Quran with measured, rhythmic recitation.&rdquo; — Surah Al-Muzzammil (73:4)
          </p>
        </div>

        {/* 5-Column Grid: Brand + 4 Structured Editorial Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-12">
          
          {/* Brand Column (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm border border-[#B79A62]/40 bg-[#0B332D] flex items-center justify-center text-[#B79A62]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 21V10C4 6 8 3 12 3C16 3 20 6 20 10V21" />
                  <path d="M8 21V13C8 11 9.5 9.5 12 9.5C14.5 9.5 16 11 16 13V21" />
                </svg>
              </div>
              <span className="font-editorial text-xl font-bold text-[#F8F5EE] tracking-tight">
                Noor Al-Quran Institute
              </span>
            </div>

            <p className="text-xs text-[#E8E0D1]/70 font-sans leading-relaxed max-w-xs">
              Premier international Islamic academy dedicated to patient, certified 1-on-1 Quran and Tajweed education for families worldwide.
            </p>

            <p className="text-xs text-[#B79A62] font-sans">
              contact.noorequraninstitute@gmail.com
            </p>
          </div>

          {/* Column 1: Courses (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-[11px] font-sans font-bold text-[#B79A62] uppercase tracking-wider">
              Courses
            </p>
            <ul className="space-y-2 text-xs font-sans text-[#E8E0D1]/80">
              <li>
                <button onClick={() => onNavClick('courses')} className="hover:text-white transition-colors cursor-pointer">
                  Quran Reading
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('courses')} className="hover:text-white transition-colors cursor-pointer">
                  Tajweed
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('courses')} className="hover:text-white transition-colors cursor-pointer">
                  Hifz-ul-Quran
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('courses')} className="hover:text-white transition-colors cursor-pointer">
                  Islamic Studies
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links (Col 7-8) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-[11px] font-sans font-bold text-[#B79A62] uppercase tracking-wider">
              Quick Links
            </p>
            <ul className="space-y-2 text-xs font-sans text-[#E8E0D1]/80">
              <li>
                <button onClick={() => onNavClick('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('tutors')} className="hover:text-white transition-colors cursor-pointer">
                  Teachers
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('packages')} className="hover:text-white transition-colors cursor-pointer">
                  Fee Packages
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('blogs')} className="hover:text-white transition-colors cursor-pointer">
                  Blog & Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Support (Col 9-10) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-[11px] font-sans font-bold text-[#B79A62] uppercase tracking-wider">
              Support
            </p>
            <ul className="space-y-2 text-xs font-sans text-[#E8E0D1]/80">
              <li>
                <button onClick={() => onNavClick('faq')} className="hover:text-white transition-colors cursor-pointer">
                  Help Center & FAQ
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('privacy')} className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('terms')} className="hover:text-white transition-colors cursor-pointer">
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Stay Connected (Col 11-12) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-[11px] font-sans font-bold text-[#B79A62] uppercase tracking-wider">
              Stay Connected
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="w-8 h-8 rounded-sm bg-[#0B332D] border border-[#B79A62]/30 flex items-center justify-center text-[#B79A62] hover:text-white hover:border-[#B79A62] transition-colors"
                  >
                    <Icon className="w-4 h-4" weight="regular" />
                  </a>
                );
              })}
            </div>
            <p className="text-[11px] text-[#E8E0D1]/50 font-sans pt-2">
              WhatsApp Support: <br />
              <span className="text-[#B79A62]">+92 327 4496163</span>
            </p>
          </div>

        </div>

        {/* Bottom Minimal Copyright Bar */}
        <div className="pt-8 border-t border-[#B79A62]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#E8E0D1]/50 font-sans">
          <p>© {new Date().getFullYear()} Noor Al-Quran Institute. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onOpenLegal('privacy')} className="hover:underline">Privacy</button>
            <span>•</span>
            <button onClick={() => onOpenLegal('terms')} className="hover:underline">Terms</button>
            <span>•</span>
            <span>Worldwide Online Education</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
