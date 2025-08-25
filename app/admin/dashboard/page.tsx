'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Upload, 
  Image as ImageIcon, 
  Edit, 
  Trash2, 
  LogOut,
  Save,
  Eye,
  Settings,
  RefreshCw,
  Star,
  MapPin,
  Globe,
  FileText,
  BarChart,
  Users,
  Search
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProjectUpload from '@/components/admin/ProjectUpload';
import ProjectList from '@/components/admin/ProjectList';
import ReviewManager from '@/components/admin/ReviewManager';
import GoogleBusinessManager from '@/components/admin/GoogleBusinessManager';
import BlogEditorWYSIWYG from '@/components/admin/BlogEditorWYSIWYG';
import SEODashboard from '@/components/admin/SEODashboard';
import { Project, getProjects, getSession, signOut } from '@/lib/supabase';

type TabType = 'projects' | 'upload' | 'reviews' | 'gmb' | 'blog' | 'seo';

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const checkAuthentication = async () => {
    try {
      const session = await getSession();
      if (!session) {
        router.push('/admin');
        return;
      }
      setIsAuthenticated(true);
      loadProjects();
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/admin');
    }
  };

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      setLoadError('');
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Failed to load projects:', error);
      setLoadError(error instanceof Error ? error.message : 'Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/admin');
    } catch (error) {
      console.error('Logout failed:', error);
      // Force logout even if Supabase call fails
      router.push('/admin');
    }
  };

  const handleProjectSave = (project: Project) => {
    setProjects(prev => [project, ...prev]);
    setActiveTab('projects');
  };

  const handleProjectDelete = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'projects' as TabType, label: 'Gallery', icon: ImageIcon, count: projects.length },
    { id: 'upload' as TabType, label: 'Upload', icon: Plus },
    { id: 'reviews' as TabType, label: 'Reviews', icon: Star },
    { id: 'gmb' as TabType, label: 'Google Business', icon: Globe },
    { id: 'blog' as TabType, label: 'Blog', icon: FileText },
    { id: 'seo' as TabType, label: 'SEO Tools', icon: Search }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-blue-200">Burgan Home Services Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {activeTab === 'projects' && (
                <button
                  onClick={loadProjects}
                  disabled={isLoading}
                  className="flex items-center space-x-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                  title="Refresh Projects"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              )}
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{projects.length}</h3>
                <p className="text-blue-200">Projects</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mr-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">4.9</h3>
                <p className="text-blue-200">Avg Rating</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">12+</h3>
                <p className="text-blue-200">Service Areas</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mr-4">
                <BarChart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Live</h3>
                <p className="text-blue-200">SEO Status</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Error Message */}
        {loadError && activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-8"
          >
            <p className="text-red-300">
              <strong>Error:</strong> {loadError}
            </p>
            <p className="text-red-300/80 text-sm mt-1">
              Make sure your Supabase configuration is correct in your .env.local file.
            </p>
          </motion.div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1 bg-white/10 backdrop-blur-lg rounded-xl p-1 mb-8 w-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all flex items-center ${
                  activeTab === tab.id
                    ? 'bg-yellow-400 text-slate-900'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="ml-2">({tab.count})</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'projects' && (
            isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
              </div>
            ) : (
              <ProjectList 
                projects={projects} 
                onDelete={handleProjectDelete}
              />
            )
          )}
          
          {activeTab === 'upload' && (
            <ProjectUpload onSave={handleProjectSave} />
          )}
          
          {activeTab === 'reviews' && (
            <ReviewManager />
          )}
          
          {activeTab === 'gmb' && (
            <GoogleBusinessManager />
          )}
          
          {activeTab === 'blog' && (
            <BlogEditorWYSIWYG />
          )}
          
          {activeTab === 'seo' && (
            <SEODashboard />
          )}
        </motion.div>
      </div>
    </div>
  );
}