import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BlogPost } from '../types';
import { getAllBlogPosts, saveBlogPost, deleteBlogPost } from '../lib/firestoreService';
import {
  Plus,
  PencilSimple,
  Trash,
  CheckCircle,
  Eye,
  ArrowLeft,
  FloppyDisk,
  Image as ImageIcon,
  Tag,
  ArrowsClockwise,
  Clock,
  Sparkle,
  UploadSimple
} from '@phosphor-icons/react';

const CATEGORIES: BlogPost['category'][] = [
  'Tajweed',
  'Quran Learning',
  'Parenting',
  'Kids',
  'Hifz',
  'Duas & Salah',
  'Islamic Studies'
];

const QUILL_MODULES = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'clean']
  ]
};

const QUILL_FORMATS = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet',
  'link', 'image'
];

interface BlogEditorProps {
  onViewPost?: (slug: string) => void;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({ onViewPost }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [currentId, setCurrentId] = useState<string>('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<BlogPost['category']>('Quran Learning');
  const [metaDescription, setMetaDescription] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [author, setAuthor] = useState('Al-Noor Quran Academy');
  const [readTime, setReadTime] = useState('5 min read');
  const [published, setPublished] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getAllBlogPosts();
      setPosts(data);
    } catch (err) {
      console.error('Error loading blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreateNew = () => {
    setCurrentId('post-' + Date.now());
    setTitle('');
    setSlug('');
    setCategory('Quran Learning');
    setMetaDescription('');
    setFeaturedImage('');
    setContent('');
    setTagsInput('');
    setAuthor('Al-Noor Quran Academy');
    setReadTime('5 min read');
    setPublished(true);
    setIsEditing(true);
    setStatusMessage(null);
  };

  const handleEdit = (post: BlogPost) => {
    setCurrentId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setCategory(post.category);
    setMetaDescription(post.metaDescription || '');
    setFeaturedImage(post.featuredImage || '');
    setContent(post.content || '');
    setTagsInput(post.tags ? post.tags.join(', ') : '');
    setAuthor(post.author || 'Al-Noor Quran Academy');
    setReadTime(post.readTime || '5 min read');
    setPublished(post.published ?? true);
    setIsEditing(true);
    setStatusMessage(null);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!currentId.startsWith('existing') && (!slug || slug === generateSlug(title))) {
      setSlug(generateSlug(val));
    }
  };

  // Image Upload to backend / Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setStatusMessage(null);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64String = reader.result as string;
      try {
        const token = localStorage.getItem('alnoor_admin_token') || '';
        const res = await fetch('/api/upload-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ imageBase64: base64String })
        });

        const data = await res.json();
        if (data.success && data.imageUrl) {
          setFeaturedImage(data.imageUrl);
          setStatusMessage({ type: 'success', text: 'Image uploaded successfully!' });
        } else {
          setFeaturedImage(base64String);
          setStatusMessage({ type: 'success', text: 'Image preview loaded (Base64).' });
        }
      } catch {
        setFeaturedImage(base64String);
        setStatusMessage({ type: 'success', text: 'Image preview loaded (Local).' });
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setStatusMessage({ type: 'error', text: 'Please provide a title.' });
      return;
    }
    if (!slug.trim()) {
      setStatusMessage({ type: 'error', text: 'Please provide a URL slug.' });
      return;
    }

    setSaving(true);
    setStatusMessage(null);

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    // Calculate approximate read time if not set
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const computedReadTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    const blogPost: BlogPost = {
      id: currentId || 'post-' + Date.now(),
      title: title.trim(),
      slug: slug.trim(),
      category,
      metaDescription: metaDescription.trim(),
      featuredImage: featuredImage.trim(),
      content,
      tags,
      author: author.trim() || 'Al-Noor Quran Academy',
      readTime: readTime || computedReadTime,
      published,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      await saveBlogPost(blogPost);
      setStatusMessage({ type: 'success', text: 'Blog post published successfully!' });
      await fetchPosts();
      setTimeout(() => {
        setIsEditing(false);
      }, 1000);
    } catch (err) {
      console.error('Save failed:', err);
      setStatusMessage({ type: 'error', text: 'Failed to save blog post. Check console.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, postTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${postTitle}"?`)) return;
    try {
      await deleteBlogPost(id);
      setPosts(prev => prev.filter(p => p.id !== id));
      setStatusMessage({ type: 'success', text: 'Blog post deleted.' });
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'Failed to delete blog post.' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Alert Status */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <span>{statusMessage.text}</span>
          <button onClick={() => setStatusMessage(null)} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
      )}

      {/* Editor View */}
      {isEditing ? (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-1.5 text-gray-600 hover:text-[#064E3B] text-xs font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog List
            </button>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={e => setPublished(e.target.checked)}
                  className="rounded text-[#064E3B] focus:ring-[#064E3B]"
                />
                <span>Published on Website</span>
              </label>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Title & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 Simple Tajweed Rules Every Parent Should Teach"
                  value={title}
                  onChange={e => handleTitleChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  URL Slug (/blog/slug) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="5-simple-tajweed-rules"
                  value={slug}
                  onChange={e => setSlug(generateSlug(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#064E3B] font-mono text-gray-600"
                />
              </div>
            </div>

            {/* Category, Author, Read Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as BlogPost['category'])}
                  aria-label="Article Category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#064E3B]"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Read Time
                </label>
                <input
                  type="text"
                  value={readTime}
                  onChange={e => setReadTime(e.target.value)}
                  placeholder="e.g. 5 min read"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#064E3B]"
                />
              </div>
            </div>

            {/* Meta Description (SEO) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-gray-700">
                  SEO Meta Description (For Google/Bing snippet)
                </label>
                <span className={`text-[10px] ${metaDescription.length > 160 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                  {metaDescription.length} / 160 characters
                </span>
              </div>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={e => setMetaDescription(e.target.value)}
                placeholder="A compelling 1-2 sentence summary of this article that will appear on Google and Bing search results..."
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-[#064E3B]"
              />
            </div>

            {/* Featured Image URL & Upload */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Featured Banner Image
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={featuredImage}
                    onChange={e => setFeaturedImage(e.target.value)}
                    placeholder="https://res.cloudinary.com/... or image URL"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-[#064E3B]"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold cursor-pointer transition-colors">
                    <UploadSimple className="w-4 h-4" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                  {featuredImage && (
                    <div className="w-12 h-8 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shrink-0">
                      <img src={featuredImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                placeholder="Tajweed, Quran for Kids, Online Tutor, Hifz"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:border-[#064E3B]"
              />
            </div>

            {/* Rich Text Editor */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Article Body Content (Rich Text) *
              </label>
              <div className="bg-white rounded-xl overflow-hidden border border-gray-300">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={QUILL_MODULES}
                  formats={QUILL_FORMATS}
                  placeholder="Write your comprehensive Islamic article here. Add headings, lists, quotes, and images..."
                  style={{ minHeight: '320px' }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#064E3B] text-[#F3C64D] hover:bg-[#043629] active:scale-95 transition-all shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <FloppyDisk className="w-4 h-4" />
                <span>{saving ? 'Saving Post...' : 'Save & Publish Post'}</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Blog Posts Table / Management */
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-heading font-bold text-[#064E3B] flex items-center gap-2">
                <Sparkle className="w-5 h-5 text-[#A16207]" weight="duotone" />
                <span>Blog & Articles CMS ({posts.length})</span>
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Create and manage SEO-optimized blog posts, upload images, and publish articles to your academy blog.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchPosts}
                disabled={loading}
                className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold cursor-pointer"
                title="Refresh posts"
              >
                <ArrowsClockwise className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleCreateNew}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#064E3B] text-[#F3C64D] hover:bg-[#043629] active:scale-95 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" weight="bold" />
                <span>Write New Article</span>
              </button>
            </div>
          </div>

          {/* Posts List */}
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-16 bg-gray-50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl">
              <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-500 font-medium">No blog posts published yet.</p>
              <button
                onClick={handleCreateNew}
                className="mt-3 px-4 py-1.5 bg-[#064E3B] text-[#F3C64D] rounded-lg text-xs font-bold cursor-pointer"
              >
                Write First Article
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-600">
                <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-[10px] tracking-wider border-y border-gray-200">
                  <tr>
                    <th className="py-3 px-3">Article</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {posts.map(post => (
                    <tr key={post.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          {post.featuredImage ? (
                            <img
                              src={post.featuredImage}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-[#064E3B] flex items-center justify-center font-bold text-xs shrink-0">
                              Art
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-gray-900 line-clamp-1">{post.title}</p>
                            <p className="text-[10px] text-gray-400 font-mono">/blog/{post.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-semibold text-[10px]">
                          {post.category}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        {post.published ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                            <CheckCircle className="w-3 h-3" weight="fill" />
                            Live
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold text-[10px] border border-amber-200">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-gray-400 text-[10px]">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {onViewPost && (
                            <button
                              onClick={() => onViewPost(post.slug)}
                              className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 cursor-pointer"
                              title="View Article"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleEdit(post)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg text-[#064E3B] cursor-pointer"
                            title="Edit"
                          >
                            <PencilSimple className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 cursor-pointer"
                            title="Delete"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
