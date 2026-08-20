import React from 'react';
import { 
  UserCheck, 
  Users, 
  Clock, 
  Globe, 
  ShieldCheck, 
  Star, 
  CalendarCheck, 
  GraduationCap, 
  Certificate, 
  BookOpen, 
  CheckCircle 
} from '@phosphor-icons/react';

export const TrustSection: React.FC = () => {
  const trustFeatures = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#064E3B]" weight="duotone" />,
      title: 'Ijazah-Certified Scholars',
      badge: 'Rigorous Vetting',
      description: 'Graduates of renowned Islamic institutions (Wifaq-ul-Madaris, Jamia Ashrafia) with verified Sanad and unbroken chains of recitation.'
    },
    {
      icon: <UserCheck className="w-6 h-6 text-[#064E3B]" weight="duotone" />,
      title: '100% Private 1-on-1 Classes',
      badge: 'Zero Group Distractions',
      description: 'Every minute is dedicated solely to your child or yourself. Immediate mouth and tongue positioning corrections with boundless patience.'
    },
    {
      icon: <Clock className="w-6 h-6 text-[#064E3B]" weight="duotone" />,
      title: 'Flexible International Schedules',
      badge: '24/7 Availability',
      description: 'Classes available after school, evenings, or weekends matching UK, USA, Canada, Australia, and Middle East time zones.'
    },
    {
      icon: <CalendarCheck className="w-6 h-6 text-[#064E3B]" weight="duotone" />,
      title: '3-Day Full Free Trial',
      badge: 'Zero Risk',
      description: 'Experience genuine live 1-on-1 lessons before paying a single dollar. No credit card or advance commitment required.'
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-[#064E3B]" weight="duotone" />,
      title: 'Structured 3-Tier Pedagogy',
      badge: 'Proven Retention',
      description: 'Daily Sabaq (New Lesson), Sabqi (Recent Revision), and Manzil (Cumulative Revision) prevents Quranic forgetfulness.'
    },
    {
      icon: <Globe className="w-6 h-6 text-[#064E3B]" weight="duotone" />,
      title: 'Trusted Global Sanctuary',
      badge: '450+ Families',
      description: 'Serving diaspora Muslim families across 15+ countries with bilingual English, Urdu, and Arabic speaking faculty.'
    }
  ];

  const accreditations = [
    { name: 'Wifaq-ul-Madaris Al-Arabia', desc: 'Shahadat-ul-Aalamia Verified Faculty' },
    { name: 'Jamia Ashrafia Tradition', desc: 'Classical Qiraat & Tajweed Rigor' },
    { name: 'Al-Azhar Curriculum Model', desc: 'Phonetic Articulation & Makharij Framework' },
    { name: 'Interactive Digital Whiteboards', desc: 'Child-Friendly Real-Time Notation' }
  ];

  return (
    <section className="py-14 bg-[#FAF9F5] border-b border-[#064E3B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Statistics & Trust Proof Bar */}
        <div className="glass-card-light rounded-3xl border border-emerald-900/10 p-6 sm:p-8 shadow-sm mb-14 relative overflow-hidden">
          <div className="text-center mb-6">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#064E3B] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              Verified Academic Excellence
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <div className="pt-3 sm:pt-0">
              <p className="text-3xl sm:text-4xl font-heading font-extrabold text-[#064E3B]">450+</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Active Students</p>
            </div>
            <div className="pt-3 sm:pt-0 sm:pl-6">
              <p className="text-3xl sm:text-4xl font-heading font-extrabold text-[#064E3B]">35+</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Certified Tutors</p>
            </div>
            <div className="pt-3 sm:pt-0 sm:pl-6">
              <p className="text-3xl sm:text-4xl font-heading font-extrabold text-[#064E3B]">15+</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Countries Served</p>
            </div>
            <div className="pt-3 sm:pt-0 sm:pl-6">
              <div className="flex items-center justify-center gap-1 text-[#A16207] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#A16207]" weight="fill" />
                ))}
              </div>
              <p className="text-xl sm:text-2xl font-heading font-extrabold text-[#064E3B]">4.9 / 5.0</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Parent Satisfaction</p>
            </div>
          </div>

          {/* Accreditation Badges Strip */}
          <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {accreditations.map((acc, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-gray-50/80 border border-gray-200/60">
                <p className="text-xs font-bold text-[#064E3B]">{acc.name}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{acc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Section Header: Why Choose Noor-e-Quran? */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-badge text-[#064E3B] text-[11px] font-extrabold uppercase tracking-widest mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#A16207]" weight="duotone" />
            <span>Sacred Mission & Standards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-[#064E3B] tracking-tight">
            Why Discerning Muslim Families Trust Noor-e-Quran
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            We merge traditional Tajweed mastery with modern 1-on-1 digital teaching methods to nurture lifelong love for the Holy Quran.
          </p>
        </div>

        {/* 3. 6 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustFeatures.map((item, idx) => (
            <div
              key={idx}
              className="glass-card-light rounded-3xl p-6 sm:p-7 border border-emerald-950/10 shadow-sm hover:shadow-md hover:border-[#D4A72C]/60 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#064E3B] flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#064E3B] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-[#064E3B] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center text-[11px] font-bold text-emerald-800">
                <CheckCircle className="w-3.5 h-3.5 text-[#A16207] mr-1.5" weight="fill" />
                Guaranteed Academy Standard
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
