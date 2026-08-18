import React from 'react';
import { Article } from '../types';
import { X, Calendar, Clock, User, BookOpen, ShareNetwork } from '@phosphor-icons/react';
import ReactMarkdown from 'react-markdown';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onOpenTrial: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onOpenTrial
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="bg-white/95 backdrop-blur-xl w-full max-w-3xl rounded-3xl shadow-2xl border border-emerald-950/10 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#064E3B] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-emerald-200 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="inline-block px-3 py-1 bg-[#D4A72C] text-[#064E3B] text-xs font-bold uppercase rounded-lg mb-3">
            {article.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-emerald-100">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#D4A72C]" weight="duotone" />
              {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D4A72C]" weight="duotone" />
              {article.publishedAt}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4A72C]" weight="duotone" />
              {article.readTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10 max-h-[65vh] overflow-y-auto text-gray-800 space-y-4 leading-relaxed text-sm">
          <div className="p-4 bg-[#FAFAF7] rounded-2xl border-l-4 border-[#D4A72C] text-xs text-gray-700 italic">
            <strong>Summary:</strong> {article.summary}
          </div>

          <div className="markdown-body prose prose-emerald max-w-none text-sm leading-relaxed space-y-4">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>

          <div className="mt-8 p-6 bg-[#064E3B]/5 rounded-2xl border border-[#064E3B]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-[#064E3B]">Start Learning with 1-on-1 Personalized Coaching</h4>
              <p className="text-xs text-gray-600 mt-0.5">Experience practical Tajweed and Quran reading with our certified tutors.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenTrial();
              }}
              className="bg-[#064E3B] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-emerald-900 transition-all shrink-0"
            >
              BOOK 3-DAY FREE TRIAL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
