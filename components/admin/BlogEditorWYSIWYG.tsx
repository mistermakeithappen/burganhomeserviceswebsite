'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '@/styles/editor.css';
import ImageUploader from './ImageUploader';
import InfoTooltip from './InfoTooltip';
import { 
  FileText,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Calendar,
  Eye,
  Search,
  Clock,
  Bold,
  Italic,
  List,
  Link2,
  Heading2,
  Quote,
  Code,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sparkles,
  EyeOff,
  Upload
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import TextAlign from '@tiptap/extension-text-align';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url: string | null;
  author: string;
  category: string;
  tags: string[];
  meta_description: string;
  meta_keywords: string[];
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

// Menu Bar Component
const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
      <div className="px-6 py-2.5 flex items-center gap-1 flex-wrap">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors ${
          editor.isActive('heading', { level: 1 }) ? 'bg-indigo-100 text-indigo-600 shadow-sm' : 'text-gray-700'
        }`}
        title="Heading 1"
        type="button"
      >
        <span className="font-bold text-sm">H1</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors ${
          editor.isActive('heading', { level: 2 }) ? 'bg-indigo-100 text-indigo-600 shadow-sm' : 'text-gray-700'
        }`}
        title="Heading 2"
        type="button"
      >
        <span className="font-bold text-sm">H2</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors ${
          editor.isActive('heading', { level: 3 }) ? 'bg-indigo-100 text-indigo-600 shadow-sm' : 'text-gray-700'
        }`}
        title="Heading 3"
        type="button"
      >
        <span className="font-bold text-xs">H3</span>
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
          editor.isActive('bold') ? 'bg-indigo-100 text-indigo-600 shadow-sm' : 'text-gray-700'
        }`}
        title="Bold"
        type="button"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
          editor.isActive('italic') ? 'bg-indigo-100 text-indigo-600 shadow-sm' : 'text-gray-700'
        }`}
        title="Italic"
        type="button"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
          editor.isActive('code') ? 'bg-indigo-100 text-indigo-600 shadow-sm' : 'text-gray-700'
        }`}
        title="Code"
        type="button"
      >
        <Code className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
          editor.isActive('bulletList') ? 'bg-indigo-100 text-indigo-600 shadow-sm' : 'text-gray-700'
        }`}
        title="Bullet List"
        type="button"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
          editor.isActive('orderedList') ? 'bg-indigo-100 text-indigo-600 shadow-sm' : 'text-gray-700'
        }`}
        title="Numbered List"
        type="button"
      >
        <span className="font-mono text-xs">1.</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
          editor.isActive('blockquote') ? 'bg-indigo-100 text-indigo-600 shadow-sm' : 'text-gray-700'
        }`}
        title="Quote"
        type="button"
      >
        <Quote className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <button
        onClick={() => {
          const url = window.prompt('Enter URL:');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
          editor.isActive('link') ? 'bg-indigo-100 text-indigo-600 shadow-sm' : 'text-gray-700'
        }`}
        title="Add Link"
        type="button"
      >
        <Link2 className="w-4 h-4" />
      </button>
      <button
        onClick={() => {
          // Trigger the image uploader in the parent component
          const event = new CustomEvent('openImageUploader', { detail: { editor } });
          window.dispatchEvent(event);
        }}
        className="p-1.5 rounded hover:bg-gray-100"
        title="Add Image"
        type="button"
      >
        <Image className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
          editor.isActive({ textAlign: 'left' }) ? 'bg-indigo-100 text-indigo-600 shadow-sm' : 'text-gray-700'
        }`}
        title="Align Left"
        type="button"
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
          editor.isActive({ textAlign: 'center' }) ? 'bg-indigo-100 text-indigo-600 shadow-sm' : 'text-gray-700'
        }`}
        title="Align Center"
        type="button"
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
          editor.isActive({ textAlign: 'right' }) ? 'bg-indigo-100 text-indigo-600 shadow-sm' : 'text-gray-700'
        }`}
        title="Align Right"
        type="button"
      >
        <AlignRight className="w-4 h-4" />
      </button>
      </div>
    </div>
  );
};

export default function BlogEditorWYSIWYG() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isCreating || editingPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCreating, editingPost]);

  // Load posts and categories
  useEffect(() => {
    if (supabase) {
      loadData();
    } else {
      setError('Supabase client is not initialized. Please check your environment variables.');
      setLoading(false);
    }
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized. Please check your environment variables.');
      }

      // Load categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');
      
      if (categoriesError) {
        if (categoriesError.code === '42P01') {
          setError('Blog tables not found in database. Please run the blog setup SQL migration first.');
          setCategories([]);
          setPosts([]);
          return;
        }
        throw categoriesError;
      }
      setCategories(categoriesData || []);

      // Load posts
      const { data: postsData, error: postsError } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (postsError) {
        if (postsError.code === '42P01') {
          setError('Blog tables not found in database. Please run the blog setup SQL migration first.');
          setPosts([]);
          return;
        }
        throw postsError;
      }
      setPosts(postsData || []);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load blog data. Please check your database connection.');
    } finally {
      setLoading(false);
    }
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreatePost = async (newPost: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized');
      }
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([{
          ...newPost,
          published_at: newPost.status === 'published' ? new Date().toISOString() : null
        }])
        .select()
        .single();

      if (error) throw error;

      setPosts([data, ...posts]);
      setIsCreating(false);
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Failed to create blog post');
    }
  };

  const handleUpdatePost = async (id: string, updates: Partial<BlogPost>) => {
    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized');
      }
      // If changing to published and no published_at, set it
      if (updates.status === 'published' && !updates.published_at) {
        updates.published_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setPosts(posts.map(post => 
        post.id === id ? data : post
      ));
      setEditingPost(null);
    } catch (err) {
      console.error('Error updating post:', err);
      alert('Failed to update blog post');
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized');
      }
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete blog post');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-semibold mb-2">{error}</p>
          <button 
            onClick={loadData}
            className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Sparkles className="w-8 h-8" />
              Blog Content Studio
            </h2>
            <p className="text-indigo-100 mt-2">Create beautiful content with live editing</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Create Post
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            {['all', 'published', 'draft', 'archived'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === status
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Create/Edit Form Modal */}
      <AnimatePresence>
        {(isCreating || editingPost) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => {
              setIsCreating(false);
              setEditingPost(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <WYSIWYGForm
                post={editingPost ? posts.find(p => p.id === editingPost) : undefined}
                categories={categories}
                onSubmit={editingPost 
                  ? (updates) => handleUpdatePost(editingPost, updates)
                  : handleCreatePost
                }
                onCancel={() => {
                  setIsCreating(false);
                  setEditingPost(null);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
          >
            {post.featured_image_url && (
              <div className="relative h-48">
                <img
                  src={post.featured_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                    post.status === 'published' ? 'bg-green-500/90 text-white' :
                    post.status === 'draft' ? 'bg-gray-500/90 text-white' :
                    'bg-yellow-500/90 text-white'
                  }`}>
                    {post.status}
                  </span>
                </div>
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 line-clamp-2 mb-2">
                {post.title}
              </h3>
              
              {post.excerpt && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
              )}
              
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.published_at 
                    ? new Date(post.published_at).toLocaleDateString() 
                    : 'Not published'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {Math.ceil(post.content.split(' ').length / 200)} min
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                {post.status === 'published' && (
                  <button
                    onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                    className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1 text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                )}
                <button
                  onClick={() => setEditingPost(post.id)}
                  className="flex-1 bg-indigo-50 text-indigo-600 py-2 rounded-lg hover:bg-indigo-100 transition-colors flex items-center justify-center gap-1 text-sm font-medium"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No blog posts found</p>
          <p className="text-gray-400 text-sm mt-2">Create your first post to get started</p>
        </div>
      )}
    </div>
  );
}

// WYSIWYG Form Component
function WYSIWYGForm({ 
  post, 
  categories,
  onSubmit, 
  onCancel
}: {
  post?: BlogPost;
  categories: Category[];
  onSubmit: (post: any) => void;
  onCancel: () => void;
}) {
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [imageUploadTarget, setImageUploadTarget] = useState<'featured' | 'content' | null>(null);
  const [editorRef, setEditorRef] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    featured_image_url: post?.featured_image_url || '',
    author: post?.author || 'Burgan Home Services',
    category: post?.category || categories[0]?.name || '',
    tags: post?.tags?.join(', ') || '',
    meta_description: post?.meta_description || '',
    meta_keywords: post?.meta_keywords?.join(', ') || '',
    status: post?.status || 'draft' as BlogPost['status']
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        },
        paragraph: {
          HTMLAttributes: {
            class: null // Let CSS handle styling
          }
        },
        bulletList: {
          HTMLAttributes: {
            class: null
          }
        },
        orderedList: {
          HTMLAttributes: {
            class: null
          }
        },
        listItem: {
          HTMLAttributes: {
            class: null
          }
        },
        blockquote: {
          HTMLAttributes: {
            class: null
          }
        },
        codeBlock: {
          HTMLAttributes: {
            class: null
          }
        },
        hardBreak: {
          keepMarks: true
        }
      }),
      ImageExtension.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: null // Let CSS handle styling
        }
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: null // Let CSS handle styling
        }
      }),
      Placeholder.configure({
        placeholder: 'Start writing your blog post here...\n\nPress Enter to create a new paragraph, Shift+Enter for a line break.'
      }),
      Typography, // Smart quotes, dashes, etc.
      TextAlign.configure({
        types: ['heading', 'paragraph']
      })
    ],
    content: post?.content || '',
    editorProps: {
      attributes: {
        class: 'ProseMirror-content'
      },
      handleKeyDown: (view, event) => {
        // Allow Shift+Enter for hard breaks
        if (event.key === 'Enter' && event.shiftKey) {
          return false; // Let TipTap handle it
        }
      }
    },
    immediatelyRender: false // Fix SSR issue
  });

  // Listen for image upload requests from toolbar
  useEffect(() => {
    const handleOpenUploader = (event: CustomEvent) => {
      setEditorRef(event.detail?.editor);
      setImageUploadTarget('content');
      setShowImageUploader(true);
    };

    window.addEventListener('openImageUploader', handleOpenUploader as EventListener);
    return () => {
      window.removeEventListener('openImageUploader', handleOpenUploader as EventListener);
    };
  }, []);

  const handleImageUpload = (url: string) => {
    if (imageUploadTarget === 'featured') {
      setFormData({ ...formData, featured_image_url: url });
    } else if (imageUploadTarget === 'content') {
      // Use the stored editor reference or the current editor
      const targetEditor = editorRef || editor;
      if (targetEditor) {
        targetEditor.chain().focus().setImage({ src: url }).run();
      }
    }
    setShowImageUploader(false);
    setImageUploadTarget(null);
    setEditorRef(null);
  };

  // Auto-generate slug from title
  useEffect(() => {
    if (!post && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = editor?.getHTML() || '';
    onSubmit({
      ...formData,
      content,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      meta_keywords: formData.meta_keywords.split(',').map(keyword => keyword.trim()).filter(Boolean)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full bg-gray-50">
      {/* Premium Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {post ? 'Edit Post' : 'Create New Post'}
              </h3>
            </div>
            <button
              type="button"
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <span className="text-xs font-medium text-gray-600">
                Title
                <InfoTooltip content="Your blog title is the most important SEO element. Keep it under 60 characters, include your main keyword, and make it compelling to encourage clicks." />
              </span>
            </div>
            <input
              type="text"
              required
              placeholder="Enter your post title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full text-2xl font-bold text-gray-900 bg-transparent border-0 border-b-2 border-gray-200 pb-2 focus:border-indigo-500 focus:outline-none placeholder-gray-400"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.title.length}/60 characters
            </p>
          </div>
        </div>

        {/* Meta Information Bar */}
        <div className="px-6 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                <span className="inline-flex items-center">
                  Category
                  <InfoTooltip content="Choose the main topic category for better organization and SEO. This helps readers find related content." />
                </span>
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                <span className="inline-flex items-center">
                  Status
                  <InfoTooltip content="Draft: Work in progress. Published: Live on website. Archived: Hidden from public but saved." />
                </span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as BlogPost['status'] })}
                className="w-full px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="draft">📝 Draft</option>
                <option value="published">✅ Published</option>
                <option value="archived">📦 Archived</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                <span className="inline-flex items-center">
                  Author
                  <InfoTooltip content="The name that will appear as the post author. This helps build trust and authority with readers." />
                </span>
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Author name"
                className="w-full px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="mt-3">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              <span className="inline-flex items-center">
                Excerpt
                <InfoTooltip content="A brief 1-2 sentence summary that appears in search results and blog previews. This is crucial for SEO - it tells search engines and readers what your post is about. Keep it compelling and under 160 characters for best results." />
              </span>
            </label>
            <textarea
              placeholder="Brief excerpt or summary that will appear in search results..."
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              rows={2}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.excerpt.length}/160 characters
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <MenuBar editor={editor} />
      
      {/* Editor Content - Main Area */}
      <div className="flex-1 overflow-y-auto bg-white m-4 rounded-lg shadow-inner">
        <EditorContent editor={editor} className="h-full p-4" />
      </div>

      {/* Premium Footer */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="flex-1">
                <label className="text-xs font-medium text-gray-600">
                  <span className="inline-flex items-center">
                    Featured Image
                    <InfoTooltip content="The main image that appears at the top of your blog post and in social media shares. This is important for engagement - posts with images get 94% more views!" />
                  </span>
                </label>
                <div className="flex items-center gap-1 mt-1">
                  <input
                    type="url"
                    value={formData.featured_image_url}
                    onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
                    placeholder="Image URL or upload"
                    className="flex-1 px-3 py-1.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageUploadTarget('featured');
                      setShowImageUploader(true);
                    }}
                    className="p-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 rounded-lg transition-colors"
                    title="Upload image"
                  >
                    <Upload className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1">
                <label className="text-xs font-medium text-gray-600">
                  <span className="inline-flex items-center">
                    Tags
                    <InfoTooltip content="Keywords that help categorize your content. Use 3-5 relevant tags to improve SEO and help readers discover your post. Separate with commas." />
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="hvac, maintenance, tips"
                  className="w-full mt-1 px-3 py-1.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-md flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {post ? 'Update Post' : 'Create Post'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image Uploader Modal */}
      {showImageUploader && (
        <ImageUploader
          onUpload={handleImageUpload}
          onClose={() => {
            setShowImageUploader(false);
            setImageUploadTarget(null);
            setEditorRef(null);
          }}
        />
      )}
    </form>
  );
}