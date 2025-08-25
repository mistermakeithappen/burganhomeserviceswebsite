'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Quote
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

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

export default function BlogPostEditor() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          // Table doesn't exist
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
          // Table doesn't exist
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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Blog Post Editor</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Post
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <div className="bg-indigo-50 rounded-lg px-4 py-2 w-full">
              <div className="text-sm text-gray-600">Total Posts</div>
              <div className="text-xl font-bold text-indigo-600">{filteredPosts.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingPost) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 rounded-lg p-6 mb-6"
        >
          <BlogForm
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
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    post.status === 'published' ? 'bg-green-100 text-green-700' :
                    post.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {post.status}
                  </span>
                </div>
                
                {post.excerpt && <p className="text-gray-600 mb-3">{post.excerpt}</p>}
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.published_at 
                      ? new Date(post.published_at).toLocaleDateString() 
                      : 'Not published'}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {Math.ceil(post.content.split(' ').length / 200)} min read
                  </span>
                  <span>{post.category}</span>
                </div>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map(tag => (
                      <span key={tag} className="bg-white px-2 py-1 rounded text-xs text-gray-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                {post.status === 'published' && (
                  <button
                    onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setEditingPost(post.id)}
                  className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No blog posts found</p>
        </div>
      )}
    </div>
  );
}

// Blog Form Component
function BlogForm({ 
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

  // Simple toolbar for content formatting
  const insertFormatting = (before: string, after: string = '') => {
    const textarea = document.getElementById('content-textarea') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    const newText = formData.content.substring(0, start) + before + selectedText + after + formData.content.substring(end);
    setFormData({ ...formData, content: newText });
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
        <textarea
          rows={2}
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          placeholder="Brief description of the blog post..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-2">
            <button
              type="button"
              onClick={() => insertFormatting('**', '**')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('*', '*')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('## ')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Heading"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('- ')}
              className="p-1 hover:bg-gray-200 rounded"
              title="List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('> ')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Quote"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('[', '](url)')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Link"
            >
              <Link2 className="w-4 h-4" />
            </button>
          </div>
          <textarea
            id="content-textarea"
            required
            rows={10}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write your blog post content here. Use markdown for formatting..."
            className="w-full px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
        <input
          type="url"
          value={formData.featured_image_url}
          onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">{formData.meta_description.length}/160 characters</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords (comma-separated)</label>
        <input
          type="text"
          value={formData.meta_keywords}
          onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
          placeholder="keyword1, keyword2, keyword3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-4 pt-4 border-t">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center"
        >
          <Save className="w-4 h-4 mr-2" />
          {post ? 'Update Post' : 'Create Post'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </button>
      </div>
    </form>
  );
}