import React from 'react';
import { BookOpen, House, WhatsappLogo, ArrowRight, MagnifyingGlass } from '@phosphor-icons/react';

interface NotFoundPageProps {
  onGoHome: () => void;
  onSelectTab: (tab: string) => void;
  onOpenTrial: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onGoHome,
  onSelectTab,
  onOpenTrial
}) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-[#FAFAF7]">
      <div className="max-w-2xl w-full text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-md">
        
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-[#064E3B] flex items-center justify-center mx-auto border border-emerald-100 shadow-inner">
          <BookOpen className="w-8 h-8" weight="duotone" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4A72C] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Error 404 • Page Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#064E3B] pt-2">
            Looking for Quran Lessons or Academy Details?
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
            The page you are trying to visit might have been moved or updated. Please choose from our popular online Quran programs below or return to the main academy portal.
          </p>
        </div>

        {/* Quick Recommended Links */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <button
            onClick={() => onSelectTab('courses')}
            className="p-3.5 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition flex items-center justify-between text-xs font-semibold text-gray-800 cursor-pointer"
          >
            <span>📖 Browse Quran Courses</span>
            <ArrowRight className="w-4 h-4 text-emerald-700" weight="bold" />
          </button>

          <button
            onClick={() => onSelectTab('packages')}
            className="p-3.5 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition flex items-center justify-between text-xs font-semibold text-gray-800 cursor-pointer"
          >
            <span>💳 Monthly Tuition Packages</span>
            <ArrowRight className="w-4 h-4 text-emerald-700" weight="bold" />
          </button>

          <button
            onClick={() => onSelectTab('kids-program')}
            className="p-3.5 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition flex items-center justify-between text-xs font-semibold text-gray-800 cursor-pointer"
          >
            <span>👶 Kids Quran Classes</span>
            <ArrowRight className="w-4 h-4 text-emerald-700" weight="bold" />
          </button>

          <button
            onClick={() => onSelectTab('female-tutor')}
            className="p-3.5 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition flex items-center justify-between text-xs font-semibold text-gray-800 cursor-pointer"
          >
            <span>🧕 Female Quran Teachers</span>
            <ArrowRight className="w-4 h-4 text-emerald-700" weight="bold" />
          </button>
        </div>

        {/* Primary Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onGoHome}
            className="px-5 py-2.5 rounded-xl bg-[#064E3B] hover:bg-[#043629] text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <House className="w-4 h-4" weight="duotone" />
            <span>Return to Homepage</span>
          </button>

          <button
            onClick={onOpenTrial}
            className="px-5 py-2.5 rounded-xl bg-[#D4A72C] hover:bg-[#B48A1E] text-[#064E3B] font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <ArrowRight className="w-4 h-4 text-[#064E3B]" weight="bold" />
            <span>Book 3-Day Free Trial</span>
          </button>

          <a
            href="https://wa.me/923274496163?text=Assalam-o-Alaikum%20Al-Noor%20Quran%20Academy.%20I%20need%20assistance%20on%20the%20website."
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-sm"
          >
            <WhatsappLogo className="w-4 h-4" weight="fill" />
            <span>WhatsApp Support</span>
          </a>
        </div>

      </div>
    </div>
  );
};
