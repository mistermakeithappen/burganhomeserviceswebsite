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
  MapPin,
  Tag,
  Eye,
  Search,
  Filter,
  Globe,
  Clock
} from 'lucide-react';
import { getAllLocations } from '@/lib/locationData';
import { getAllServices } from '@/lib/serviceData';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  status: 'draft' | 'published' | 'scheduled';
  locationIds: string[];
  serviceIds: string[];
  tags: string[];
  featuredImage?: string;
  metaDescription: string;
  readTime: number;
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published' | 'scheduled'>('all');
  
  const locations = getAllLocations();
  const services = getAllServices();

  // Load posts from localStorage
  useEffect(() => {
    const storedPosts = localStorage.getItem('blogPosts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      // Initialize with sample posts
      const samplePosts: BlogPost[] = [
        {
          id: '1',
          title: 'Top 5 Kitchen Remodeling Trends in Spokane for 2025',
          slug: 'kitchen-remodeling-trends-spokane-2025',
          excerpt: 'Discover the latest kitchen design trends taking over Spokane homes this year.',
          content: 'Full article content here...',
          author: 'Burgan Team',
          publishDate: '2025-01-20',
          status: 'published',
          locationIds: ['spokane', 'spokane-valley'],
          serviceIds: ['kitchen-remodeling'],
          tags: ['kitchen', 'remodeling', 'trends', '2025'],
          metaDescription: 'Explore 2025\'s top kitchen remodeling trends in Spokane. From smart appliances to sustainable materials.',
          readTime: 5
        },
        {
          id: '2',
          title: 'Winter Home Maintenance Checklist for Liberty Lake Residents',
          slug: 'winter-maintenance-liberty-lake',
          excerpt: 'Essential winter prep tips to protect your Liberty Lake home from harsh weather.',
          content: 'Full article content here...',
          author: 'Burgan Team',
          publishDate: '2025-01-15',
          status: 'published',
          locationIds: ['liberty-lake'],
          serviceIds: ['handyman-services', 'home-repairs'],
          tags: ['winter', 'maintenance', 'Liberty Lake'],
          metaDescription: 'Winter home maintenance guide for Liberty Lake. Protect your home from freezing temperatures and snow damage.',
          readTime: 7
        }
      ];
      setPosts(samplePosts);
      localStorage.setItem('blogPosts', JSON.stringify(samplePosts));
    }
  }, []);

  // Save posts to localStorage
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('blogPosts', JSON.stringify(posts));
    }
  }, [posts]);

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreatePost = (newPost: Omit<BlogPost, 'id'>) => {
    const post: BlogPost = {
      ...newPost,
      id: Date.now().toString(),
      slug: newPost.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      readTime: Math.ceil(newPost.content.split(' ').length / 200)
    };
    setPosts([post, ...posts]);
    setIsCreating(false);
  };

  const handleUpdatePost = (id: string, updates: Partial<BlogPost>) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, ...updates } : post
    ));
    setEditingPost(null);
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Blog Content Manager</h2>
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
              <option value="scheduled">Scheduled</option>
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
            onSubmit={editingPost 
              ? (updates) => handleUpdatePost(editingPost, updates)
              : handleCreatePost
            }
            onCancel={() => {
              setIsCreating(false);
              setEditingPost(null);
            }}
            locations={locations}
            services={services}
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
                
                <p className="text-gray-600 mb-3">{post.excerpt}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.publishDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime} min read
                  </span>
                  {post.locationIds.length > 0 && (
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {post.locationIds.map(id => 
                        locations.find(l => l.id === id)?.name
                      ).filter(Boolean).join(', ')}
                    </span>
                  )}
                </div>
                
                {post.tags.length > 0 && (
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
                <button
                  onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
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
  onSubmit, 
  onCancel,
  locations,
  services
}: {
  post?: BlogPost;
  onSubmit: (post: any) => void;
  onCancel: () => void;
  locations: any[];
  services: any[];
}) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    author: post?.author || 'Burgan Team',
    publishDate: post?.publishDate || new Date().toISOString().split('T')[0],
    status: post?.status || 'draft' as BlogPost['status'],
    locationIds: post?.locationIds || [],
    serviceIds: post?.serviceIds || [],
    tags: post?.tags.join(', ') || '',
    metaDescription: post?.metaDescription || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
        <input
          type="text"
          required
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <textarea
          required
          rows={8}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
          <input
            type="date"
            value={formData.publishDate}
            onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
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
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Locations</label>
          <select
            multiple
            value={formData.locationIds}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, option => option.value);
              setFormData({ ...formData, locationIds: selected });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            size={4}
          >
            {locations.map(loc => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Related Services</label>
          <select
            multiple
            value={formData.serviceIds}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, option => option.value);
              setFormData({ ...formData, serviceIds: selected });
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            size={4}
          >
            {services.map(service => (
              <option key={service.id} value={service.id}>{service.shortTitle}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="winter, maintenance, tips"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
        <textarea
          rows={2}
          value={formData.metaDescription}
          onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-4">
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