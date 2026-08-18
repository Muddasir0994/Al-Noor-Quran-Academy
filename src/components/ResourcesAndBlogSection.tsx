import React, { useState } from 'react';
import { Testimonial, Article, IslamicResource } from '../types';
import { Star, BookOpen, DownloadSimple, FileText, ArrowRight, ShieldCheck, CheckCircle, User, Quotes } from '@phosphor-icons/react';

interface ResourcesAndBlogSectionProps {
  testimonials: Testimonial[];
  articles: Article[];
  resources: IslamicResource[];
  onOpenArticle: (art: Article) => void;
  onOpenTrial: () => void;
}

export const ResourcesAndBlogSection: React.FC<ResourcesAndBlogSectionProps> = ({
  testimonials,
  articles,
  resources,
  onOpenArticle,
  onOpenTrial
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (resTitle: string, downloadUrl?: string) => {
    if (downloadUrl && downloadUrl.startsWith('/resources/')) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setDownloadSuccess(`"${resTitle}" downloaded successfully!`);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <div className="py-20 bg-white space-y-24 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* 1. Testimonials Section */}
        <section id="testimonials">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/70 text-[#064E3B] text-[11px] font-extrabold uppercase tracking-widest mb-3 border border-emerald-300">
              <Star className="w-3.5 h-3.5 text-[#D4A72C]" weight="fill" />
              <span>Verified Parent & Student Reflections</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#064E3B] tracking-tight">
              What Our Global Community Says
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base max-w-2xl mx-auto">
              Real feedback from parents, sisters, and adult students learning with Al-Noor Academy worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map(item => (
              <div
                key={item.id}
                className="bg-[#FAF9F5] rounded-3xl p-6 border border-emerald-950/10 shadow-xs flex flex-col justify-between hover:shadow-lg hover:border-[#D4A72C]/60 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-[#D4A72C]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-[#D4A72C]" weight="fill" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-gray-400">{item.date}</span>
                  </div>

                  <Quotes className="w-6 h-6 text-emerald-900/20 mb-2" weight="fill" />

                  <p className="text-xs text-gray-700 leading-relaxed italic mb-4">
                    "{item.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200/80 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#064E3B] text-[#D4A72C] flex items-center justify-center font-extrabold text-xs shrink-0 shadow-2xs">
                    {item.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-[#064E3B] truncate">{item.name}</h4>
                      {item.countryFlag && <span className="text-xs">{item.countryFlag}</span>}
                    </div>
                    <p className="text-[10px] text-gray-500 truncate">{item.studentOrParent}</p>
                    <p className="text-[10px] text-[#A37B15] font-bold truncate">{item.courseName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Free Islamic Downloads & Resources */}
        <section id="downloads" className="bg-[#FAF9F5] rounded-3xl p-8 sm:p-12 border border-emerald-950/10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#064E3B] text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
                <DownloadSimple className="w-3.5 h-3.5 text-[#064E3B]" weight="bold" />
                <span>Free Academic Resources</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#064E3B] tracking-tight">
                Free Islamic Resources & Learning PDFs
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                Download verified Qaida charts, daily Duas, and Salah guides for home practice.
              </p>
            </div>
            {downloadSuccess && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold animate-in fade-in flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-700" weight="fill" />
                <span>{downloadSuccess}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map(res => (
              <div
                key={res.id}
                className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex flex-col justify-between hover:border-[#D4A72C] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      {res.category}
                    </span>
                    <span className="text-[10px] font-semibold text-gray-500">
                      {res.fileType} • {res.fileSize}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#064E3B] mt-2 line-clamp-1">
                    {res.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {res.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-emerald-800">100% Free</span>
                  <button
                    onClick={() => handleDownload(res.title, res.downloadUrl)}
                    className="inline-flex items-center gap-1.5 bg-[#064E3B] hover:bg-[#032B21] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <DownloadSimple className="w-3.5 h-3.5 text-[#D4A72C]" weight="bold" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Articles & Islamic Blog */}
        <section id="articles">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#064E3B] text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
                <BookOpen className="w-3.5 h-3.5 text-[#D4A72C]" weight="duotone" />
                <span>Educational Insights</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#064E3B] tracking-tight">
                Latest Articles & Quran Learning Guides
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                Practical advice on Tajweed rules, parenting, and Hifz methodology.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map(art => (
              <div
                key={art.id}
                onClick={() => onOpenArticle(art)}
                className="bg-[#FAF9F5] rounded-3xl p-6 border border-emerald-950/10 shadow-xs hover:shadow-lg hover:border-[#D4A72C]/60 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="h-28 rounded-2xl bg-gradient-to-br from-emerald-600/15 via-emerald-800/10 to-amber-500/10 p-4 mb-4 flex items-center justify-between border border-emerald-900/10">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-2xs flex items-center justify-center text-[#064E3B]">
                        <BookOpen className="w-5 h-5" weight="duotone" />
                      </div>
                      <span className="text-xs font-extrabold text-[#064E3B] uppercase tracking-wider">
                        {art.category}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 bg-white/80 px-2 py-0.5 rounded-md">
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-heading font-extrabold text-[#064E3B] group-hover:text-[#A37B15] transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200/80 flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">{art.author}</span>
                  <span className="font-extrabold text-[#064E3B] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Guide →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
