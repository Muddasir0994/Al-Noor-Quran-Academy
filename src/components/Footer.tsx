import React from 'react';
import { IMAGES } from '../config/images';
import { BookOpen, Phone, Envelope, Globe, WhatsappLogo, Heart, ShieldCheck, MapPin, YoutubeLogo, InstagramLogo, FacebookLogo } from '@phosphor-icons/react';
import { CountryKey } from './InternationalLanding';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onOpenTrial: (courseName?: string) => void;
  onOpenEnroll: (courseName?: string) => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
  onSelectCountry?: (country: CountryKey) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavClick,
  onOpenTrial,
  onOpenEnroll,
  onOpenLegal,
  onSelectCountry
}) => {
  const socialLinks = [
    { name: 'YouTube', url: 'https://www.youtube.com/@NooreQuranInstitute', icon: YoutubeLogo },
    { name: 'Instagram', url: 'https://www.instagram.com/noore_quraninstitute', icon: InstagramLogo },
    { name: 'Facebook', url: 'https://www.facebook.com/share/14pNXeMTM7o/', icon: FacebookLogo },
    { name: 'Email', url: 'mailto:contact.noorequraninstitute@gmail.com', icon: Envelope }
  ];

  return (
    <footer className="bg-[#032B21] text-gray-300 pt-16 pb-8 border-t border-[#D4A72C]/30 bg-islamic-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Quranic Calligraphy Quote */}
        <div className="pb-10 border-b border-emerald-800/80 text-center max-w-2xl mx-auto">
          <span className="font-arabic text-xl sm:text-2xl text-[#D4A72C] font-bold block mb-2">
            وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
          </span>
          <p className="text-xs sm:text-sm text-emerald-200/90 italic">
            "And recite the Quran with measured, rhythmic recitation." — Surah Al-Muzzammil (73:4)
          </p>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-12">
          
          {/* Brand Col (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-md border border-[#D4A72C]/40 flex items-center justify-center shrink-0">
                <img
                  src="/logo.webp"
                  alt="Noor-e-Quran Institute"
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = '/logo.png';
                  }}
                />
              </div>
              <div>
                <span className="font-heading font-extrabold text-lg text-white block">
                  NOOR-E-QURAN
                </span>
                <span className="text-[#D4A72C] text-xs font-bold tracking-widest uppercase">
                  INSTITUTE
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-sm">
              An authentic international online Quran institute delivering 1-on-1 personalized lessons in Tajweed, Hifz, Noorani Qaida, and Islamic studies with verified male and female scholars.
            </p>

            {/* Social Media Links Bar */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${item.name}`}
                    className="w-9 h-9 rounded-xl bg-emerald-900/90 text-emerald-200 hover:text-[#D4A72C] hover:bg-emerald-800 border border-emerald-700/60 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                  >
                    <IconComponent className="w-5 h-5" weight="duotone" />
                  </a>
                );
              })}
            </div>

            {/* Quick Action Badges */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="bg-emerald-900/80 text-[#D4A72C] px-3 py-1 rounded-full border border-[#D4A72C]/40 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" weight="duotone" />
                <span>Verified Sanad</span>
              </span>
              <span className="bg-emerald-900/80 text-emerald-200 px-3 py-1 rounded-full border border-emerald-700 font-semibold">
                ★ 4.9/5 Rating
              </span>
              <span className="bg-emerald-900/80 text-emerald-200 px-3 py-1 rounded-full border border-emerald-700 font-semibold">
                24/7 Global Classes
              </span>
            </div>
          </div>

          {/* Quick Links Column (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-heading font-extrabold text-sm text-white uppercase tracking-wider border-b border-emerald-800 pb-2">
              Featured Programs
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-100/90">
              <li>
                <button
                  onClick={() => onNavClick('courses')}
                  className="hover:text-[#F3C64D] transition-colors text-left cursor-pointer"
                >
                  Noorani Qaida for Beginners
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('courses')}
                  className="hover:text-[#F3C64D] transition-colors text-left cursor-pointer"
                >
                  Nazra Quran with Tajweed
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('courses')}
                  className="hover:text-[#F3C64D] transition-colors text-left cursor-pointer"
                >
                  Hifz-ul-Quran Memorization
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('female-program')}
                  className="hover:text-[#F3C64D] transition-colors text-left font-semibold text-[#F3C64D] cursor-pointer"
                >
                  🌸 Dedicated Female Quran Teachers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('kids-program')}
                  className="hover:text-[#F3C64D] transition-colors text-left cursor-pointer"
                >
                  Kids Interactive Quran Program
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('adults-program')}
                  className="hover:text-[#F3C64D] transition-colors text-left cursor-pointer"
                >
                  Adults & Reverts Quran Track
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('packages')}
                  className="hover:text-[#F3C64D] transition-colors text-left cursor-pointer"
                >
                  Packages & Pricing (From $35/mo)
                </button>
              </li>
            </ul>
          </div>

          {/* International Student Hubs (Col 8-9) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-heading font-extrabold text-sm text-white uppercase tracking-wider border-b border-emerald-800 pb-2">
              Country Hubs
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-100/90">
              <li>
                <button
                  onClick={() => {
                    if (onSelectCountry) onSelectCountry('uk');
                    onNavClick('uk-program');
                  }}
                  className="hover:text-[#F3C64D] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span>🇬🇧</span>
                  <span>United Kingdom</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onSelectCountry) onSelectCountry('usa');
                    onNavClick('usa-program');
                  }}
                  className="hover:text-[#F3C64D] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span>🇺🇸</span>
                  <span>United States</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onSelectCountry) onSelectCountry('canada');
                    onNavClick('canada-program');
                  }}
                  className="hover:text-[#F3C64D] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span>🇨🇦</span>
                  <span>Canada</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onSelectCountry) onSelectCountry('australia');
                    onNavClick('australia-program');
                  }}
                  className="hover:text-[#F3C64D] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span>🇦🇺</span>
                  <span>Australia</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onSelectCountry) onSelectCountry('pakistan');
                    onNavClick('pakistan-program');
                  }}
                  className="hover:text-[#F3C64D] transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <span>🇵🇰</span>
                  <span>Pakistan</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Academy Contact (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-heading font-extrabold text-sm text-white uppercase tracking-wider border-b border-emerald-800 pb-2">
              Admissions & Contact
            </h3>
            <address className="not-italic space-y-2.5 text-xs sm:text-sm text-emerald-100/90">
              <a
                href="tel:03274496163"
                aria-label="Call +92 327 4496163 (Helpline)"
                className="flex items-center gap-2 hover:text-[#F3C64D] transition-colors font-medium"
              >
                <Phone className="w-4 h-4 text-[#F3C64D] shrink-0" weight="duotone" />
                <span>+92 327 4496163 (Helpline)</span>
              </a>
              <a
                href="tel:03360796786"
                aria-label="Call +92 336 0796786 (Support Line)"
                className="flex items-center gap-2 hover:text-[#F3C64D] transition-colors font-medium"
              >
                <Phone className="w-4 h-4 text-[#F3C64D] shrink-0" weight="duotone" />
                <span>+92 336 0796786 (Support Line)</span>
              </a>
              <a
                href="mailto:contact.noorequraninstitute@gmail.com"
                aria-label="Email contact.noorequraninstitute@gmail.com"
                className="flex items-center gap-2 hover:text-[#F3C64D] transition-colors font-medium break-all"
              >
                <Envelope className="w-4 h-4 text-[#F3C64D] shrink-0" weight="duotone" />
                <span>contact.noorequraninstitute@gmail.com</span>
              </a>
              <a
                href="https://wa.me/923274496163?text=Assalam-o-Alaikum%20Noor-e-Quran%20Institute"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Coordinator (24/7)"
                className="flex items-center gap-2 text-[#25D366] hover:text-white font-bold transition-colors"
              >
                <WhatsappLogo className="w-4 h-4 shrink-0" weight="fill" />
                <span>WhatsApp Coordinator (24/7)</span>
              </a>
            </address>

            <div className="pt-3">
              <button
                onClick={() => onOpenTrial()}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-extrabold gold-gradient-btn text-[#032B21] shadow-md cursor-pointer text-center"
              >
                Book 3-Day Free Trial
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/80 gap-4">
          <p>© {new Date().getFullYear()} Noor-e-Quran Institute. All rights reserved.</p>
          
          <div className="flex items-center gap-4 text-xs font-semibold">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              onClick={() => onNavClick('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
