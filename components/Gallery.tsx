'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, RefreshCw } from 'lucide-react';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { Project, getProjects } from '@/lib/supabase';
import Image from 'next/image';


export default function Gallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      setLoadError('');
      
      // Try to load projects from Supabase
      const supabaseProjects = await getProjects();
      
      // Only use real projects from database, no fallback to defaults
      setProjects(supabaseProjects);
      
      // Generate categories only from real projects that exist
      const projectCategories = Array.from(new Set(supabaseProjects.map(p => p.category)));
      const uniqueCategories = supabaseProjects.length > 0 ? ['All', ...projectCategories] : [];
      setCategories(uniqueCategories);
      
      // Auto-select first category if current selection doesn't exist
      if (!uniqueCategories.includes(selectedCategory)) {
        setSelectedCategory(uniqueCategories[0] || 'All');
      }
      
    } catch (error) {
      console.error('Failed to load projects from Supabase:', error);
      setLoadError('Gallery unavailable - database connection failed');
      
      // No fallback - keep projects empty if database fails
      setProjects([]);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  if (isLoading) {
    return (
      <section id="gallery" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <RefreshCw className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading gallery...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Don't render the section at all if there are no projects
  if (projects.length === 0) {
    return null;
  }

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Before & After Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the incredible transformations we've completed for Spokane area homeowners
          </p>
          
          {loadError && (
            <div className="mt-4 text-sm text-amber-600 bg-amber-50 px-4 py-2 rounded-lg inline-block">
              {loadError}
            </div>
          )}
        </motion.div>
        
        {/* Only show category filters if there are categories to show */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
        
        {/* Show message when selected category has no projects */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">No projects in this category yet</h3>
            <p className="text-gray-600">Try selecting a different category or check back later.</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                delay: index * 0.05,
                duration: 0.3
              }}
              className="group cursor-pointer"
              style={{ willChange: 'opacity, transform' }}
              onClick={(e) => {
                if (!isDragging) {
                  setSelectedProject(project);
                }
              }}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <div className="aspect-[4/3] relative">
                  {/* Interactive Before/After Preview */}
                  <div className="absolute inset-0">
                    <BeforeAfterSlider
                      beforeImage={project.before_image_url}
                      afterImage={project.after_image_url}
                      beforeLabel="BEFORE"
                      afterLabel="AFTER"
                      initialPosition={50}
                      onDragStart={() => setIsDragging(true)}
                      onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
                    />
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-yellow-400 mb-1">{project.category}</p>
                          <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                          <p className="text-sm opacity-90">{project.location}</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <Maximize2 className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        )}
        
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
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{selectedProject.title}</h3>
                    <div className="flex items-center space-x-2 text-gray-600 mt-1">
                      <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-semibold">
                        {selectedProject.category}
                      </span>
                      <span>•</span>
                      <span>{selectedProject.location}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="p-6">
                  {selectedProject.description && (
                    <p className="text-gray-600 mb-6 text-lg">{selectedProject.description}</p>
                  )}
                  
                  <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                    <BeforeAfterSlider
                      beforeImage={selectedProject.before_image_url}
                      afterImage={selectedProject.after_image_url}
                      beforeLabel="BEFORE"
                      afterLabel="AFTER"
                      initialPosition={20}
                    />
                  </div>
                  
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors">
                      Get a Similar Quote
                    </button>
                    <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors">
                      View More Projects
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}