import React, { useState } from 'react';
import { 
  WhatsappLogo, 
  Star, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  UserCheck, 
  ShieldCheck, 
  Globe, 
  BookOpen, 
  GraduationCap, 
  Check, 
  Certificate 
} from '@phosphor-icons/react';

interface HeroProps {
  onOpenTrial: (courseName?: string) => void;
  onOpenEnroll: (courseName?: string) => void;
  onViewCourses?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrial, onOpenEnroll, onViewCourses }) => {
  // Quick trial state in bento card
  const [studentName, setStudentName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [courseName, setCourseName] = useState('Nazra Quran with Tajweed');
  const [tutorGender, setTutorGender] = useState<'Male' | 'Female' | 'Any'>('Any');
  const [preferredTime, setPreferredTime] = useState('Evening (5PM - 9PM)');
  const [submitting, setSubmitting] = useState(false);
  const [quickSuccess, setQuickSuccess] = useState(false);
  const [quickError, setQuickError] = useState('');

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuickError('');

    if (!studentName.trim() || !whatsapp.trim()) {
      setQuickError('Please enter student name and WhatsApp number.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/book-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          phone: whatsapp,
          whatsapp,
          courseName,
          tutorGender: tutorGender === 'Any' ? 'No Preference' : tutorGender,
          timeSlot: preferredTime,
          country: 'Online / Worldwide',
          notes: 'Submitted via Quick Hero Booking Card'
        })
      });

      if (res.ok) {
        setQuickSuccess(true);
      } else {
        const data = await res.json();
        setQuickError(data.error || 'Failed to submit. Please contact us via WhatsApp.');
      }
    } catch (err: any) {
      setQuickError('Network error. Please try again or reach out on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#FAF9F5] text-[#17201B] py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 border-b border-[#064E3B]/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Main Hero Bento Card (Col 1-8, Top) */}
          <div className="lg:col-span-8 bg-gradient-to-br from-[#064E3B] via-[#043E2F] to-[#032B21] text-white rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl border border-emerald-700/40 bg-islamic-pattern min-h-[490px]">
            {/* Ambient Watermark */}
            <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none transform translate-x-20 -translate-y-20">
              <svg viewBox="0 0 100 100" fill="currentColor" className="text-[#F3C64D]">
                <path d="M50 0L61.2 38.8H100L68.5 61.2L79.7 100L50 77.6L20.3 100L31.5 61.2L0 38.8H38.8L50 0Z" />
              </svg>
            </div>

            {/* Top Tag & Arabic Bismillah */}
            <div className="relative z-10 flex items-center justify-between gap-2 mb-4 h-8">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 py-1 px-2.5 sm:px-3.5 rounded-full glass-card-dark shadow-inner h-8">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#F3C64D] animate-pulse"></span>
                <span className="font-arabic text-xs sm:text-base text-[#F3C64D] tracking-wide font-bold leading-none">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-extrabold bg-[#F3C64D] text-[#032B21] px-2.5 sm:px-3.5 py-1 rounded-full shadow-md h-7 flex items-center shrink-0">
                100% Free 3-Day Trial
              </span>
            </div>

            {/* Main Headline & Graphic Presentation */}
            <div className="relative z-10 py-2 sm:py-4 grid md:grid-cols-[1.3fr_.7fr] gap-6 items-center flex-1">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white leading-tight mb-4 tracking-tight">
                  Learn Holy Quran with <span className="gold-gradient-text italic font-bold">Tajweed</span> From Certified Tutors
                </h1>
                <p className="text-emerald-100/90 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-normal">
                  Dedicated Male & Female scholars for kids and adults worldwide. Authentic 1-on-1 personalized recitation, Noorani Qaida, and Hifz from the comfort of home.
                </p>
                <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-bold text-emerald-100">
                  <span className="rounded-full glass-card-dark px-3 py-1.5 flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-[#F3C64D]" weight="bold" /> 1-on-1 Private Classes
                  </span>
                  <span className="rounded-full glass-card-dark px-3 py-1.5 flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-[#F3C64D]" weight="bold" /> Male & Female Faculty
                  </span>
                  <span className="rounded-full glass-card-dark px-3 py-1.5 flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-[#F3C64D]" weight="bold" /> Flexible Time Zones
                  </span>
                </div>
              </div>

              {/* High-Definition Authentic Quran Study Visual Card */}
              <div className="relative group rounded-3xl overflow-hidden border-2 border-[#D4A72C]/40 shadow-2xl bg-emerald-950 aspect-[4/3] sm:aspect-[3/2] md:aspect-auto md:h-72 w-full">
                <img
                  src="/images/hero-banner.webp"
                  alt="Muslim child learning Quran online with certified teacher at Noor-e-Quran Institute"
                  width={1200}
                  height={800}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = '/images/hero-banner.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent"></div>
                
                {/* Floating Glassmorphism Badge Overlay */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl glass-card-dark flex items-center justify-between text-white">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-[#F3C64D] text-[#032B21] font-bold text-sm flex items-center justify-center shadow-xs">
                      ن
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white tracking-wide">1-on-1 Live Digital Classroom</p>
                      <p className="text-[10px] text-emerald-200">Personalized Makharij & Tajweed</p>
                    </div>
                  </div>
                  <span className="bg-emerald-800/90 text-[#F3C64D] text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-600">
                    ● Live HD
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons & Trust Stats */}
            <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-emerald-800/80">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  id="hero-cta-trial"
                  onClick={() => onOpenTrial()}
                  className="gold-gradient-btn text-[#032B21] px-6 py-3.5 rounded-xl font-extrabold text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-4.5 h-4.5 text-[#032B21]" weight="bold" />
                  <span>Start 3-Day Free Trial</span>
                </button>

                <a
                  id="hero-cta-whatsapp"
                  href="https://wa.me/923274496163?text=Assalam-o-Alaikum%20Noor-e-Quran%20Institute.%20I%20want%20to%20inquire%20about%20Quran%20classes%20and%20Free%20Trial."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base backdrop-blur-md transition-all hover:translate-y-[-1px]"
                >
                  <WhatsappLogo className="w-5 h-5 text-[#25D366]" weight="fill" />
                  <span>WhatsApp 24/7</span>
                </a>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-2 text-xs text-emerald-200">
                <div className="flex text-[#F3C64D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#F3C64D]" weight="fill" />
                  ))}
                </div>
                <span className="font-extrabold text-white">4.9/5.0</span>
                <span className="text-emerald-300 text-[11px] hidden sm:inline">• 450+ Active Families</span>
              </div>
            </div>
          </div>

          {/* Quick Trial Application Bento Card (Col 9-12) */}
          <div className="lg:col-span-4 glass-card-light rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div>
                  <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-[#064E3B]">
                    Instant Free Trial
                  </h2>
                  <p className="text-gray-500 text-xs mt-0.5 font-medium">
                    No payment required. Start learning within 24h.
                  </p>
                </div>
                <span className="w-8 h-8 rounded-full bg-emerald-50 text-[#064E3B] border border-emerald-200 flex items-center justify-center font-bold text-xs shadow-xs">
                  <GraduationCap className="w-4 h-4 text-[#064E3B]" weight="duotone" />
                </span>
              </div>

              {quickSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle className="w-6 h-6" weight="duotone" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#064E3B]">
                    Trial Request Received!
                  </h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    JazakAllah Khair! Our academic coordinator will message you on WhatsApp to confirm your preferred class slot.
                  </p>
                  <a
                    href={`https://wa.me/923274496163?text=Assalam-o-Alaikum%20Noor-e-Quran%20Institute.%20I%20just%20booked%20a%20trial%20for%20${encodeURIComponent(studentName)}.%20Please%20schedule%20our%20class.`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Confirm your booked trial via WhatsApp"
                    className="mt-2 inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#25D366] text-white font-bold text-xs shadow-sm hover:bg-[#20bd5a] transition-all"
                  >
                    <WhatsappLogo className="w-4 h-4" weight="fill" />
                    <span>Confirm via WhatsApp Immediately</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-3.5">
                  {quickError && (
                    <div className="p-2.5 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
                      {quickError}
                    </div>
                  )}

                  <div>
                    <label htmlFor="hero-student-name" className="block text-xs font-bold text-gray-700 mb-1">
                      Student Name *
                    </label>
                    <input
                      id="hero-student-name"
                      type="text"
                      required
                      placeholder="e.g. Zayd / Sarah"
                      value={studentName}
                      onChange={e => setStudentName(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B]"
                    />
                  </div>

                  <div>
                    <label htmlFor="hero-whatsapp-number" className="block text-xs font-bold text-gray-700 mb-1">
                      WhatsApp Number (With Country Code) *
                    </label>
                    <input
                      id="hero-whatsapp-number"
                      type="tel"
                      required
                      placeholder="+44 7700 900077 / +1 647..."
                      value={whatsapp}
                      onChange={e => setWhatsapp(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B]"
                    />
                  </div>

                  <div>
                    <label htmlFor="hero-target-course" className="block text-xs font-bold text-gray-700 mb-1">
                      Target Course
                    </label>
                    <select
                      id="hero-target-course"
                      aria-label="Target Course"
                      value={courseName}
                      onChange={e => setCourseName(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm bg-white focus:outline-hidden focus:border-[#064E3B]"
                    >
                      <option>Noorani Qaida for Beginners</option>
                      <option>Nazra Quran with Tajweed</option>
                      <option>Quran Memorization / Hifz Track</option>
                      <option>Islamic Studies & Duas for Kids</option>
                      <option>Adults Tajweed Accelerator</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="hero-tutor-preference" className="block text-[11px] font-bold text-gray-700 mb-1">
                        Tutor Preference
                      </label>
                      <select
                        id="hero-tutor-preference"
                        aria-label="Tutor Preference"
                        value={tutorGender}
                        onChange={e => setTutorGender(e.target.value as any)}
                        className="w-full px-2.5 py-2 border border-gray-300 rounded-xl text-xs bg-white focus:outline-hidden"
                      >
                        <option value="Any">No Preference</option>
                        <option value="Female">Female Tutor</option>
                        <option value="Male">Male Tutor</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="hero-preferred-time" className="block text-[11px] font-bold text-gray-700 mb-1">
                        Preferred Time
                      </label>
                      <select
                        id="hero-preferred-time"
                        aria-label="Preferred Class Time Slot"
                        value={preferredTime}
                        onChange={e => setPreferredTime(e.target.value)}
                        className="w-full px-2.5 py-2 border border-gray-300 rounded-xl text-xs bg-white focus:outline-hidden"
                      >
                        <option>Evening (4PM - 9PM)</option>
                        <option>Morning (8AM - 12PM)</option>
                        <option>Weekend Only</option>
                        <option>Flexible / Any Time</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold gold-gradient-btn text-[#064E3B] shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60 mt-2"
                  >
                    {submitting ? 'Booking Your Trial...' : 'Book 3-Day Free Trial →'}
                  </button>

                  <p className="text-[10px] text-gray-400 text-center font-medium">
                    🔒 Zero commitment • No credit card required • Instant coordinator response
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
