/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit, Eye, Calendar, MapPin, Tag } from 'lucide-react';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { Project, deleteProject, deleteImage } from '@/lib/supabase';

interface ProjectListProps {
  projects: Project[];
  onDelete: (id: string) => void;
}

export default function ProjectList({ projects, onDelete }: ProjectListProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const extractFileName = (url: string) => {
    return url.split('/').pop() || '';
  };

  const handleDelete = async (project: Project) => {
    if (!confirm(`Are you sure you want to delete "${project.title}"?`)) {
      return;
    }

    setIsDeleting(project.id);

    try {
      // Extract file names from URLs for cleanup
      const beforeFileName = extractFileName(project.before_image_url);
      const afterFileName = extractFileName(project.after_image_url);

      // Delete from database first
      await deleteProject(project.id);

      // Clean up images from storage
      if (beforeFileName) {
        try {
          await deleteImage('project-images', beforeFileName);
        } catch (error) {
          console.warn('Failed to delete before image:', error);
        }
      }

      if (afterFileName) {
        try {
          await deleteImage('project-images', afterFileName);
        } catch (error) {
          console.warn('Failed to delete after image:', error);
        }
      }

      onDelete(project.id);
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete project. Please try again.');
    } finally {
      setIsDeleting(null);
    }
  };

  if (projects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 text-center"
      >
        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Eye className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">No Projects Yet</h3>
        <p className="text-blue-200 mb-6">Start by uploading your first before & after project</p>
      </motion.div>
    );
  }

  return (
    <>
      <div className="grid gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden hover:border-yellow-400/30 transition-all"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-blue-200">
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      {project.category}
                    </div>
                    {project.location && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {project.location}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(project.created_at)}
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-blue-100 mt-2">{project.description}</p>
                  )}
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 rounded-lg transition-colors"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project)}
                    disabled={isDeleting === project.id}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete"
                  >
                    {isDeleting === project.id ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-red-300 border-t-transparent rounded-full"
                      />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-red-300 mb-2">Before</h4>
                  <img 
                    src={project.before_image_url} 
                    alt="Before" 
                    className="w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = '/api/placeholder/300/200';
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-green-300 mb-2">After</h4>
                  <img 
                    src={project.after_image_url} 
                    alt="After" 
                    className="w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = '/api/placeholder/300/200';
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-blue-200 mt-1">
                      <span>{selectedProject.category}</span>
                      {selectedProject.location && <span>• {selectedProject.location}</span>}
                      <span>• {formatDate(selectedProject.created_at)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {selectedProject.description && (
                  <p className="text-blue-100 mb-6">{selectedProject.description}</p>
                )}
                
                <div className="aspect-video rounded-lg overflow-hidden">
                  <BeforeAfterSlider
                    beforeImage={selectedProject.before_image_url}
                    afterImage={selectedProject.after_image_url}
                    beforeLabel="BEFORE"
                    afterLabel="AFTER"
                  />
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-blue-200 text-sm">
                    Drag the slider to see the transformation
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}