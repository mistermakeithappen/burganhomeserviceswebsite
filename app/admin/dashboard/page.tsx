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
  RefreshCw
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProjectUpload from '@/components/admin/ProjectUpload';
import ProjectList from '@/components/admin/ProjectList';
import { Project, getProjects, getSession, signOut } from '@/lib/supabase';

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<'projects' | 'upload'>('projects');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuthentication();
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
                <h1 className="text-2xl font-bold text-white">Gallery Manager</h1>
                <p className="text-blue-200">Burgan Home Services Admin</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={loadProjects}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                title="Refresh Projects"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              
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
        <div className="grid md:grid-cols-3 gap-6 mb-8">
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
                <p className="text-blue-200">Total Projects</p>
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
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Live</h3>
                <p className="text-blue-200">Gallery Status</p>
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
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mr-4">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Storage</h3>
                <p className="text-blue-200">Ready</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Error Message */}
        {loadError && (
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
        <div className="flex space-x-1 bg-white/10 backdrop-blur-lg rounded-xl p-1 mb-8 w-fit">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'projects'
                ? 'bg-yellow-400 text-slate-900'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <ImageIcon className="w-5 h-5 inline mr-2" />
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'upload'
                ? 'bg-yellow-400 text-slate-900'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Plus className="w-5 h-5 inline mr-2" />
            New Project
          </button>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'projects' ? (
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
          ) : (
            <ProjectUpload onSave={handleProjectSave} />
          )}
        </motion.div>
      </div>
    </div>
  );
}