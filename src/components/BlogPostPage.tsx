import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { getBlogPostBySlug, getPublishedBlogPosts } from '../lib/firestoreService';
import { Calendar, Clock, User, ArrowLeft, BookOpen, Tag, ArrowRight } from '@phosphor-icons/react';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (slug: string) => void;
  onNavigateBack: () => void;
  onOpenTrial: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onNavigate, onNavigateBack, onOpenTrial }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getBlogPostBySlug(slug);
      setPost(data);

      if (data) {
        document.title = `${data.title} | Al-Noor Quran Academy Blog`;
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute('content', data.metaDescription || '');

        // Get related posts from same category
        try {
          const all = await getPublishedBlogPosts();
          setRelated(all.filter(p => p.category === data.category && p.id !== data.id).slice(0, 3));
        } catch { /* ignore */ }
      }
      setLoading(false);
    })();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <section className="py-16 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded-lg w-3/4" />
            <div className="h-64 bg-gray-200 rounded-2xl" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="py-20 min-h-screen bg-white text-center">
        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-heading font-bold text-gray-700 mb-2">Article Not Found</h2>
        <p className="text-gray-500 text-sm mb-6">This blog post may have been removed or doesn't exist.</p>
        <button
          onClick={onNavigateBack}
          className="px-6 py-2.5 rounded-xl bg-[#064E3B] text-white text-sm font-bold hover:bg-[#043929] transition-all cursor-pointer"
        >
          ← Back to Blog
        </button>
      </section>
    );
  }

  return (
    <article className="py-10 sm:py-16 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Back Button */}
        <button
          onClick={onNavigateBack}
          className="flex items-center gap-1.5 text-[#064E3B] text-sm font-bold mb-6 hover:gap-2.5 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" weight="bold" />
          Back to Blog
        </button>

        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-lg bg-[#064E3B] text-[#F3C64D] text-[10px] font-bold uppercase tracking-wider">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-[#064E3B] tracking-tight leading-tight mb-4">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-8 pb-6 border-b border-gray-200">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#A16207]" weight="duotone" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#A16207]" weight="duotone" />
            {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#A16207]" weight="duotone" />
            {post.readTime}
          </span>
        </div>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="rounded-2xl overflow-hidden mb-10 shadow-md">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-auto max-h-[480px] object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-emerald prose-sm sm:prose-base max-w-none
            prose-headings:text-[#064E3B] prose-headings:font-heading prose-headings:font-extrabold
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-[#064E3B] prose-a:font-semibold prose-a:underline
            prose-img:rounded-xl prose-img:shadow-md
            prose-strong:text-[#064E3B]
            prose-blockquote:border-l-[#D4A72C] prose-blockquote:bg-emerald-50/50 prose-blockquote:rounded-r-xl prose-blockquote:py-1"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-200 flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-gray-400" weight="duotone" />
            {post.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded-lg bg-[#FAFAF7] text-gray-600 text-[10px] font-bold border border-gray-200/80">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA Box */}
        <div className="mt-12 p-6 sm:p-8 bg-gradient-to-br from-[#064E3B] to-[#032B21] rounded-2xl text-white">
          <h3 className="text-lg font-heading font-extrabold mb-2">Ready to Start Your Quran Learning Journey?</h3>
          <p className="text-emerald-100 text-xs sm:text-sm mb-5">
            Experience 1-on-1 live classes with certified tutors. Book your free 3-day trial — no commitment required.
          </p>
          <button
            onClick={onOpenTrial}
            className="gold-gradient-btn text-[#032B21] px-6 py-3 rounded-xl font-extrabold text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" weight="bold" />
            Book Free Trial Class
          </button>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-14">
            <h3 className="text-xl font-heading font-extrabold text-[#064E3B] mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(r => (
                <div
                  key={r.id}
                  onClick={() => onNavigate(r.slug)}
                  className="group bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  {r.featuredImage ? (
                    <img src={r.featuredImage} alt={r.title} className="w-full h-32 object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-32 bg-gradient-to-br from-[#064E3B] to-[#032B21] flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-[#F3C64D]/40" />
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="text-sm font-bold text-[#064E3B] line-clamp-2 group-hover:underline">{r.title}</h4>
                    <p className="text-[10px] text-gray-400 mt-2">{r.readTime} · {new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
