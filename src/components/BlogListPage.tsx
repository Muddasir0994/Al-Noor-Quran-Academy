import React, { useEffect, useState } from 'react';
import { BlogPost } from '../types';
import { INITIAL_ARTICLES } from '../data/academyData';
import { getPublishedBlogPosts } from '../lib/firestoreService';
import { BookOpen, Calendar, Clock, ArrowRight, MagnifyingGlass, User } from '@phosphor-icons/react';

interface BlogListPageProps {
  onNavigate: (slug: string) => void;
  onOpenTrial: () => void;
}

const CATEGORIES = ['All', 'Tajweed', 'Quran Learning', 'Parenting', 'Kids', 'Hifz', 'Duas & Salah', 'Islamic Studies'];

export const BlogListPage: React.FC<BlogListPageProps> = ({ onNavigate, onOpenTrial }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = 'Islamic Blog & Articles | Noor-e-Quran Institute';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Read expert articles on Tajweed rules, Quran memorization tips, kids Islamic education, and online Quran learning guides from certified scholars.');

    const mapInitialArticlesToBlogPosts = (): BlogPost[] => {
      return INITIAL_ARTICLES.map(a => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        metaDescription: a.summary,
        featuredImage: a.category === 'Tajweed' ? '/images/course-nazra-tajweed.webp' : a.category === 'Hifz' ? '/images/course-hifz.webp' : '/images/hero-banner.webp',
        content: a.content,
        category: (a.category === 'Tajweed' || a.category === 'Kids' || a.category === 'Hifz') ? a.category as any : 'Quran Learning',
        tags: [a.category, 'Quran', 'Islamic Education'],
        author: a.author,
        readTime: a.readTime,
        published: true,
        createdAt: a.publishedAt || '2026-02-01',
        updatedAt: a.publishedAt || '2026-02-01'
      }));
    };

    (async () => {
      try {
        const data = await getPublishedBlogPosts();
        if (data && data.length > 0) {
          setPosts(data);
        } else {
          setPosts(mapInitialArticlesToBlogPosts());
        }
      } catch (err) {
        console.warn('Could not load blog posts from Firestore, using built-in baseline articles:', err);
        setPosts(mapInitialArticlesToBlogPosts());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = posts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.metaDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <section className="py-16 bg-white border-b border-gray-200/80 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#064E3B]/10 text-[#064E3B] text-[11px] font-bold uppercase tracking-widest mb-2.5 border border-[#064E3B]/20">
            <BookOpen className="w-3.5 h-3.5 text-[#A16207]" weight="duotone" />
            <span>Islamic Knowledge & Insights</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#064E3B] tracking-tight">
            Blog & Islamic Articles
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Expert articles on Tajweed, Quran memorization, kids Islamic education, and practical tips for Muslim families worldwide.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]/30 focus:border-[#064E3B] bg-white"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#064E3B] text-white shadow-xs'
                    : 'bg-[#FAFAF7] text-gray-700 hover:bg-gray-100 border border-gray-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-80" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-sm font-medium">No articles found. Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <article
                key={post.id}
                onClick={() => onNavigate(post.slug)}
                className="group bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                {/* Featured Image */}
                <div className="relative h-48 overflow-hidden bg-emerald-50">
                  {post.featuredImage ? (
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#064E3B] to-[#032B21]">
                      <BookOpen className="w-12 h-12 text-[#F3C64D]/50" />
                    </div>
                  )}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#064E3B]/90 text-[#F3C64D] text-[10px] font-bold uppercase backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-base font-heading font-bold text-[#064E3B] mb-2 line-clamp-2 group-hover:text-[#032B21] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                    {post.metaDescription || stripHtml(post.content).slice(0, 120) + '...'}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-gray-400 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" weight="duotone" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" weight="duotone" />
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-[#064E3B] font-bold">
                      <Clock className="w-3 h-3" weight="duotone" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 p-8 bg-gradient-to-br from-[#064E3B] to-[#032B21] rounded-3xl text-white text-center shadow-xl">
          <h2 className="text-2xl font-heading font-extrabold mb-3">Want to Learn Quran with Expert Scholars?</h2>
          <p className="text-emerald-100 text-sm max-w-lg mx-auto mb-6">
            Start your 3-day free trial today. 1-on-1 private classes with certified male & female tutors for kids and adults.
          </p>
          <button
            onClick={onOpenTrial}
            className="gold-gradient-btn text-[#032B21] px-8 py-3.5 rounded-xl font-extrabold text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" weight="bold" />
            Book Free Trial Class
          </button>
        </div>
      </div>
    </section>
  );
};
