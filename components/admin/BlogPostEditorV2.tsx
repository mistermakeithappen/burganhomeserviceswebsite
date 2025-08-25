'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Calendar,
  Tag,
  Eye,
  Search,
  Clock,
  Image,
  Bold,
  Italic,
  List,
  Link2,
  Heading2,
  Quote,
  Code,
  EyeOff,
  Upload,
  Sparkles,
  Palette,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ListOrdered,
  CheckSquare
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

export default function BlogPostEditorV2() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

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
          {error.includes('tables not found') && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-gray-700 mb-2">
                <strong>To fix this issue:</strong>
              </p>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                <li>Go to your Supabase dashboard</li>
                <li>Navigate to the SQL Editor</li>
                <li>Run the SQL migration from the file: <code className="bg-gray-100 px-1 py-0.5 rounded">supabase-blog-setup.sql</code></li>
                <li>Click the retry button below once complete</li>
              </ol>
            </div>
          )}
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
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Sparkles className="w-8 h-8" />
              Blog Content Studio
            </h2>
            <p className="text-indigo-100 mt-2">Create beautiful content that engages your audience</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Create Post
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <div className="text-2xl font-bold">{posts.filter(p => p.status === 'published').length}</div>
            <div className="text-sm text-indigo-100">Published</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <div className="text-2xl font-bold">{posts.filter(p => p.status === 'draft').length}</div>
            <div className="text-sm text-indigo-100">Drafts</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <div className="text-2xl font-bold">{categories.length}</div>
            <div className="text-sm text-indigo-100">Categories</div>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <div className="text-2xl font-bold">{posts.reduce((acc, post) => acc + (post.tags?.length || 0), 0)}</div>
            <div className="text-sm text-indigo-100">Total Tags</div>
          </div>
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

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <AlignLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Palette className="w-5 h-5" />
            </button>
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setIsCreating(false);
              setEditingPost(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <AdvancedBlogForm
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

      {/* Posts Grid/List */}
      <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all ${
              viewMode === 'list' ? 'flex' : ''
            }`}
          >
            {post.featured_image_url && (
              <div className={`relative ${viewMode === 'list' ? 'w-48' : 'h-48'}`}>
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
            
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
                  {post.title}
                </h3>
              </div>
              
              {post.excerpt && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
              )}
              
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
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
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
              </div>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-gray-400">+{post.tags.length - 3}</span>
                  )}
                </div>
              )}
              
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

// Advanced Blog Form with Live Preview
function AdvancedBlogForm({ 
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
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    featured_image_url: post?.featured_image_url || '',
    author: post?.author || 'Burgan Home Services',
    category: post?.category || categories[0]?.name || '',
    tags: post?.tags?.join(', ') || '',
    meta_description: post?.meta_description || '',
    meta_keywords: post?.meta_keywords?.join(', ') || '',
    status: post?.status || 'draft' as BlogPost['status']
  });

  const [showPreview, setShowPreview] = useState(true);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

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
    onSubmit({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      meta_keywords: formData.meta_keywords.split(',').map(keyword => keyword.trim()).filter(Boolean)
    });
  };

  // Enhanced toolbar functions
  const insertFormatting = (before: string, after: string = '', defaultText: string = '') => {
    const textarea = document.getElementById('content-textarea') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end) || defaultText;
    const newText = formData.content.substring(0, start) + before + selectedText + after + formData.content.substring(end);
    setFormData({ ...formData, content: newText });
    
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const insertTemplate = (template: string) => {
    const content = formData.content + (formData.content ? '\n\n' : '') + template;
    setFormData({ ...formData, content });
  };

  const templates = {
    intro: `## Introduction\n\nStart with a compelling hook that draws readers in...`,
    howTo: `## How to [Topic]\n\n### Step 1: [First Step]\n[Description of the first step]\n\n### Step 2: [Second Step]\n[Description of the second step]\n\n### Step 3: [Third Step]\n[Description of the third step]`,
    list: `## Top [Number] [Items]\n\n### 1. [First Item]\n[Description]\n\n### 2. [Second Item]\n[Description]\n\n### 3. [Third Item]\n[Description]`,
    comparison: `## [Item A] vs [Item B]: Which is Better?\n\n### [Item A]\n**Pros:**\n- Pro 1\n- Pro 2\n\n**Cons:**\n- Con 1\n- Con 2\n\n### [Item B]\n**Pros:**\n- Pro 1\n- Pro 2\n\n**Cons:**\n- Con 1\n- Con 2\n\n### Conclusion\n[Your recommendation]`
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-full">
      {/* Editor Side */}
      <div className="flex-1 flex flex-col border-r">
        <div className="p-6 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-slate-900">
              {post ? 'Edit Post' : 'Create New Post'}
            </h3>
            <button
              type="button"
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title and Slug */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                required
                placeholder="Post Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 text-lg font-semibold border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="url-slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
              <textarea
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief description that appears in blog listings..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Content Editor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('write')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      activeTab === 'write' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Write
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      activeTab === 'preview' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Preview
                  </button>
                </div>
              </div>

              {activeTab === 'write' ? (
                <>
                  {/* Enhanced Toolbar */}
                  <div className="border border-gray-200 rounded-t-lg bg-gray-50 p-2">
                    <div className="flex flex-wrap gap-1">
                      <button
                        type="button"
                        onClick={() => insertFormatting('**', '**', 'bold text')}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Bold"
                      >
                        <Bold className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('*', '*', 'italic text')}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Italic"
                      >
                        <Italic className="w-4 h-4" />
                      </button>
                      <div className="w-px bg-gray-300 mx-1" />
                      <button
                        type="button"
                        onClick={() => insertFormatting('## ', '', 'Heading')}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Heading 2"
                      >
                        <Heading2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('### ', '', 'Subheading')}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Heading 3"
                      >
                        <Type className="w-4 h-4" />
                      </button>
                      <div className="w-px bg-gray-300 mx-1" />
                      <button
                        type="button"
                        onClick={() => insertFormatting('- ', '', 'List item')}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Bullet List"
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('1. ', '', 'List item')}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Numbered List"
                      >
                        <ListOrdered className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('- [ ] ', '', 'Task')}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Checklist"
                      >
                        <CheckSquare className="w-4 h-4" />
                      </button>
                      <div className="w-px bg-gray-300 mx-1" />
                      <button
                        type="button"
                        onClick={() => insertFormatting('> ', '', 'Quote')}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Quote"
                      >
                        <Quote className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('`', '`', 'code')}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Inline Code"
                      >
                        <Code className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('[', '](url)', 'link text')}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Link"
                      >
                        <Link2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('![alt text](', ')', 'image-url.jpg')}
                        className="p-2 hover:bg-gray-200 rounded transition-colors"
                        title="Image"
                      >
                        <Image className="w-4 h-4" />
                      </button>
                      <div className="w-px bg-gray-300 mx-1" />
                      {/* Template Dropdown */}
                      <div className="relative group">
                        <button
                          type="button"
                          className="p-2 hover:bg-gray-200 rounded transition-colors flex items-center gap-1"
                          title="Templates"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span className="text-xs">Templates</span>
                        </button>
                        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                          <button
                            type="button"
                            onClick={() => insertTemplate(templates.intro)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                          >
                            Introduction
                          </button>
                          <button
                            type="button"
                            onClick={() => insertTemplate(templates.howTo)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                          >
                            How-To Guide
                          </button>
                          <button
                            type="button"
                            onClick={() => insertTemplate(templates.list)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                          >
                            Listicle
                          </button>
                          <button
                            type="button"
                            onClick={() => insertTemplate(templates.comparison)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                          >
                            Comparison
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <textarea
                    id="content-textarea"
                    required
                    rows={15}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your blog post content here. Use markdown for formatting..."
                    className="w-full px-4 py-3 border border-t-0 border-gray-200 rounded-b-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono text-sm"
                  />
                </>
              ) : (
                <div className="border border-gray-200 rounded-lg p-6 bg-white min-h-[400px]">
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {formData.content || '*Start writing to see preview...*'}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>

            {/* Meta Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
                <input
                  type="url"
                  value={formData.featured_image_url}
                  onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as BlogPost['status'] })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="home improvement, tips, maintenance"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description (SEO)</label>
              <textarea
                rows={2}
                value={formData.meta_description}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                placeholder="SEO description (160 chars max)"
                maxLength={160}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.meta_description.length}/160 characters</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {post ? 'Update Post' : 'Create Post'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Live Preview Side */}
      <div className="flex-1 bg-gray-50 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Live Preview</h3>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          
          {showPreview && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {formData.featured_image_url && (
                <div className="relative h-64">
                  <img
                    src={formData.featured_image_url}
                    alt={formData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">
                  {formData.title || 'Untitled Post'}
                </h1>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span>{formData.author}</span>
                  <span>•</span>
                  <span>{new Date().toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{Math.ceil((formData.content || '').split(' ').length / 200)} min read</span>
                </div>
                
                {formData.excerpt && (
                  <p className="text-lg text-gray-600 mb-6 font-medium">
                    {formData.excerpt}
                  </p>
                )}
                
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {formData.content || '*Start writing to see preview...*'}
                  </ReactMarkdown>
                </div>
                
                {formData.tags && (
                  <div className="mt-8 pt-8 border-t flex flex-wrap gap-2">
                    {formData.tags.split(',').map(tag => tag.trim()).filter(Boolean).map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}