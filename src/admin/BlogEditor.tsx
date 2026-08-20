import React, { useState, useEffect, useRef } from 'react';
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
  UploadSimple,
  TextB,
  TextItalic,
  TextUnderline,
  TextHTwo,
  TextHThree,
  ListBullets,
  ListNumbers,
  Quotes,
  LinkSimple,
  Code,
  EyeSlash,
  BookOpen,
  ArrowCounterClockwise
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

interface BlogEditorProps {
  onViewPost?: (slug: string) => void;
}

// Error Boundary for resilient rendering
class BlogEditorErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('BlogEditor runtime error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-900 space-y-4 max-w-xl mx-auto my-8 text-center">
          <h3 className="font-heading font-bold text-lg text-red-700">Editor Encountered an Issue</h3>
          <p className="text-xs text-red-600">
            {this.state.error?.message || 'An unexpected rendering error occurred.'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Reload Editor
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const BlogEditorContent: React.FC<BlogEditorProps> = ({ onViewPost }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editorMode, setEditorMode] = useState<'visual' | 'code' | 'preview'>('visual');

  // Form State
  const [currentId, setCurrentId] = useState<string>('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<BlogPost['category']>('Quran Learning');
  const [metaDescription, setMetaDescription] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [author, setAuthor] = useState('Noor-e-Quran Institute');
  const [readTime, setReadTime] = useState('5 min read');
  const [published, setPublished] = useState(true);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const contentEditableRef = useRef<HTMLDivElement | null>(null);

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

  // Synchronize contentEditable div with content state
  useEffect(() => {
    if (contentEditableRef.current && editorMode === 'visual') {
      if (contentEditableRef.current.innerHTML !== content) {
        contentEditableRef.current.innerHTML = content || '<p><br></p>';
      }
    }
  }, [content, editorMode, isEditing]);

  const handleCreateNew = () => {
    setCurrentId('post-' + Date.now());
    setTitle('');
    setSlug('');
    setCategory('Quran Learning');
    setMetaDescription('');
    setFeaturedImage('');
    setContent('');
    setTagsInput('');
    setAuthor('Noor-e-Quran Institute');
    setReadTime('5 min read');
    setPublished(true);
    setEditorMode('visual');
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
    setAuthor(post.author || 'Noor-e-Quran Institute');
    setReadTime(post.readTime || '5 min read');
    setPublished(post.published ?? true);
    setEditorMode('visual');
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

  // Execute rich formatting commands
  const executeCommand = (command: string, value: string = '') => {
    if (editorMode === 'visual' && contentEditableRef.current) {
      contentEditableRef.current.focus();
      document.execCommand(command, false, value);
      setContent(contentEditableRef.current.innerHTML);
    } else if (editorMode === 'code' && textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = textarea.value.substring(start, end);
      let insertion = '';

      switch (command) {
        case 'bold':
          insertion = `<strong>${selected || 'bold text'}</strong>`;
          break;
        case 'italic':
          insertion = `<em>${selected || 'italic text'}</em>`;
          break;
        case 'underline':
          insertion = `<u>${selected || 'underlined text'}</u>`;
          break;
        case 'formatBlock':
          if (value === 'h2') insertion = `<h2>${selected || 'Heading 2'}</h2>\n`;
          else if (value === 'h3') insertion = `<h3>${selected || 'Heading 3'}</h3>\n`;
          else if (value === 'blockquote') insertion = `<blockquote>${selected || 'Quotation / Hadith'}</blockquote>\n`;
          break;
        case 'insertUnorderedList':
          insertion = `<ul>\n  <li>${selected || 'List item 1'}</li>\n  <li>List item 2</li>\n</ul>\n`;
          break;
        case 'insertOrderedList':
          insertion = `<ol>\n  <li>${selected || 'First step'}</li>\n  <li>Second step</li>\n</ol>\n`;
          break;
        case 'createLink':
          insertion = `<a href="${value || 'https://noorequraninstitute.me'}">${selected || 'link text'}</a>`;
          break;
        case 'insertImage':
          insertion = `<img src="${value || 'https://res.cloudinary.com/demo/image/upload/sample.jpg'}" alt="Article Illustration" class="rounded-xl shadow-md my-4" />\n`;
          break;
        default:
          insertion = selected;
      }

      const newContent = textarea.value.substring(0, start) + insertion + textarea.value.substring(end);
      setContent(newContent);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + insertion.length, start + insertion.length);
      }, 0);
    }
  };

  const insertLinkPrompt = () => {
    const url = prompt('Enter destination URL:', 'https://noorequraninstitute.me');
    if (url) executeCommand('createLink', url);
  };

  const insertImagePrompt = () => {
    const url = prompt('Enter Image URL (e.g. Cloudinary HTTPS link):', featuredImage || 'https://');
    if (url) executeCommand('insertImage', url);
  };

  const insertQuranBox = () => {
    const ayah = prompt('Enter Arabic Ayah / Text:', 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ');
    const translation = prompt('Enter English / Urdu Translation:', 'In the name of Allah, the Entirely Merciful, the Especially Merciful.');
    if (ayah) {
      const boxHtml = `
<div class="my-6 p-5 rounded-2xl bg-emerald-900/90 text-white border border-[#D4A72C]/50 shadow-md">
  <p class="font-arabic text-xl sm:text-2xl text-[#F3C64D] font-bold text-center mb-3 dir-rtl">${ayah}</p>
  <p class="text-xs sm:text-sm text-emerald-100 text-center italic">"${translation || ''}"</p>
</div>\n`;
      if (editorMode === 'visual' && contentEditableRef.current) {
        contentEditableRef.current.focus();
        document.execCommand('insertHTML', false, boxHtml);
        setContent(contentEditableRef.current.innerHTML);
      } else {
        setContent(prev => prev + '\n' + boxHtml);
      }
    }
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
      author: author.trim() || 'Noor-e-Quran Institute',
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

            {/* Rich Text Editor (React 19 Resilient) */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="block text-xs font-bold text-gray-700">
                  Article Body Content *
                </label>
                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setEditorMode('visual')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      editorMode === 'visual' ? 'bg-white text-[#064E3B] shadow-xs' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Visual Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorMode('code')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      editorMode === 'code' ? 'bg-white text-[#064E3B] shadow-xs' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    HTML / Markdown
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorMode('preview')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                      editorMode === 'preview' ? 'bg-[#064E3B] text-[#F3C64D] shadow-xs' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live Preview</span>
                  </button>
                </div>
              </div>

              {/* Toolbar */}
              {editorMode !== 'preview' && (
                <div className="flex flex-wrap items-center gap-1.5 p-2 bg-gray-50 border border-gray-300 rounded-t-xl border-b-0 text-gray-700 text-xs">
                  <button
                    type="button"
                    onClick={() => executeCommand('bold')}
                    title="Bold (Ctrl+B)"
                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <TextB className="w-4 h-4" weight="bold" />
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('italic')}
                    title="Italic (Ctrl+I)"
                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <TextItalic className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('underline')}
                    title="Underline (Ctrl+U)"
                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <TextUnderline className="w-4 h-4" />
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    type="button"
                    onClick={() => executeCommand('formatBlock', 'h2')}
                    title="Heading 2"
                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <TextHTwo className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('formatBlock', 'h3')}
                    title="Heading 3"
                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <TextHThree className="w-4 h-4" />
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    type="button"
                    onClick={() => executeCommand('insertUnorderedList')}
                    title="Bulleted List"
                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <ListBullets className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('insertOrderedList')}
                    title="Numbered List"
                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <ListNumbers className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('formatBlock', 'blockquote')}
                    title="Blockquote"
                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <Quotes className="w-4 h-4" />
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    type="button"
                    onClick={insertLinkPrompt}
                    title="Insert Link"
                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <LinkSimple className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={insertImagePrompt}
                    title="Insert Image"
                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={insertQuranBox}
                    title="Insert Quran Ayah / Arabic Box"
                    className="px-2 py-1 bg-emerald-100 hover:bg-emerald-200 text-[#064E3B] rounded-lg font-bold flex items-center gap-1 transition-colors cursor-pointer ml-auto"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>+ Arabic Ayah Box</span>
                  </button>
                </div>
              )}

              {/* Editor Surface */}
              <div className="bg-white rounded-b-xl border border-gray-300 overflow-hidden min-h-[320px] relative">
                {editorMode === 'visual' && (
                  <div
                    ref={contentEditableRef}
                    contentEditable
                    onInput={(e) => setContent(e.currentTarget.innerHTML)}
                    className="p-4 outline-none min-h-[320px] max-h-[600px] overflow-y-auto prose prose-emerald prose-sm sm:prose-base max-w-none prose-headings:text-[#064E3B] prose-headings:font-heading prose-headings:font-bold"
                    style={{ whiteSpace: 'pre-wrap' }}
                  />
                )}

                {editorMode === 'code' && (
                  <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Write article in HTML or markdown format..."
                    rows={16}
                    className="w-full p-4 font-mono text-xs text-gray-800 outline-none resize-y min-h-[320px] bg-gray-50/50"
                  />
                )}

                {editorMode === 'preview' && (
                  <div className="p-6 min-h-[320px] max-h-[600px] overflow-y-auto bg-[#FAFAF7]">
                    <div
                      className="prose prose-emerald prose-sm sm:prose-base max-w-none
                        prose-headings:text-[#064E3B] prose-headings:font-heading prose-headings:font-extrabold
                        prose-p:text-gray-700 prose-p:leading-relaxed
                        prose-a:text-[#064E3B] prose-a:font-semibold prose-a:underline
                        prose-img:rounded-xl prose-img:shadow-md
                        prose-strong:text-[#064E3B]
                        prose-blockquote:border-l-[#D4A72C] prose-blockquote:bg-emerald-50/50 prose-blockquote:rounded-r-xl prose-blockquote:py-1"
                      dangerouslySetInnerHTML={{ __html: content || '<p className="text-gray-400 italic">No content written yet. Switch to Visual Editor to write...</p>' }}
                    />
                  </div>
                )}
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
              <h2 className="text-lg font-heading font-extrabold text-[#064E3B]">
                Islamic Blog & Article CMS
              </h2>
              <p className="text-xs text-gray-500">
                Publish high-ranking SEO articles, Tajweed guides, and parenting advice for Noor-e-Quran Institute.
              </p>
            </div>
            <button
              onClick={handleCreateNew}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#064E3B] text-[#F3C64D] hover:bg-[#043629] transition-all shadow-sm flex items-center gap-1.5 cursor-pointer hover:scale-105"
            >
              <Plus className="w-4 h-4" weight="bold" />
              <span>Write New Article</span>
            </button>
          </div>

          {/* Posts Table */}
          {loading ? (
            <div className="py-12 text-center text-gray-400 text-xs">
              <ArrowsClockwise className="w-6 h-6 animate-spin mx-auto mb-2 text-[#064E3B]" />
              <span>Loading articles...</span>
            </div>
          ) : posts.length === 0 ? (
            <div className="py-12 text-center text-gray-400 space-y-3">
              <p className="text-xs">No blog articles published yet.</p>
              <button
                onClick={handleCreateNew}
                className="px-4 py-2 rounded-xl text-xs font-bold gold-gradient-btn text-[#032B21] shadow-xs cursor-pointer"
              >
                Write Your First Article
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="pb-3">Article</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Author</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {posts.map(post => (
                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-3">
                          {post.featuredImage ? (
                            <img src={post.featuredImage} alt={post.title} className="w-10 h-10 rounded-lg object-cover border border-gray-100 shrink-0" />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#064E3B] flex items-center justify-center font-bold shrink-0">
                              <BookOpen className="w-5 h-5" />
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-gray-900 line-clamp-1 block">{post.title}</span>
                            <span className="text-[10px] text-gray-400 font-mono block">/blog/{post.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 pr-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#064E3B] text-[10px] font-bold border border-emerald-100">
                          {post.category}
                        </span>
                      </td>
                      <td className="py-3.5 pr-4 text-gray-600">
                        {post.author}
                      </td>
                      <td className="py-3.5 pr-4">
                        {post.published !== false ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 text-[10px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Live
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-gray-400 text-[10px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {onViewPost && (
                            <button
                              onClick={() => onViewPost(post.slug)}
                              title="View Article"
                              className="p-1.5 text-gray-500 hover:text-[#064E3B] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleEdit(post)}
                            title="Edit Article"
                            className="p-1.5 text-gray-500 hover:text-emerald-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                          >
                            <PencilSimple className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            title="Delete Article"
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
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

export const BlogEditor: React.FC<BlogEditorProps> = (props) => {
  return (
    <BlogEditorErrorBoundary>
      <BlogEditorContent {...props} />
    </BlogEditorErrorBoundary>
  );
};
