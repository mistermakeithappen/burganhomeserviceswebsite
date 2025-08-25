'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Star, Shield, Award, Users } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white overflow-hidden pt-24">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      
      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">Licensed & Insured</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Your <span className="text-yellow-400">Contractor</span> for Life
            </h1>
            
            <p className="text-xl mb-8 text-gray-300">
              Professional home services you can trust. From minor repairs to major renovations, 
              we handle it all with excellence and integrity.
            </p>
            
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="ml-2 font-semibold">5.0</span>
                <span className="ml-2 text-gray-400">150+ Reviews</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-yellow-400 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center hover:bg-yellow-300 transition-colors"
              >
                Get Free Quote
                <ChevronRight className="ml-2 w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const gallerySection = document.getElementById('gallery');
                  if (gallerySection) {
                    gallerySection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-slate-900 transition-colors"
              >
                View Our Work
              </motion.button>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-yellow-400">20+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">10K+</div>
                <div className="text-sm text-gray-400">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">100%</div>
                <div className="text-sm text-gray-400">Satisfaction</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8 aspect-square">
              <Image 
                src="https://storage.googleapis.com/msgsndr/VgOeEyKgYl9vAS8IcFLx/media/67e444242be3f74115223ec7.svg"
                alt="Burgan Home Services Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-4 text-center">
              <div className="flex items-center justify-center space-x-3">
                <Users className="w-8 h-8 text-indigo-600" />
                <div>
                  <div className="font-bold text-slate-900">Serving Spokane Since 1873</div>
                  <div className="text-sm text-gray-600">Family Owned Business</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}