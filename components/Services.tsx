'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PaintBucket, 
  Hammer, 
  Home, 
  Droplets,
  Zap,
  Wrench,
  Building,
  TreePine,
  ChevronRight,
  CheckCircle
} from 'lucide-react';
import QuoteForm from '@/components/QuoteForm';

const services = [
  {
    id: 'painting',
    icon: PaintBucket,
    title: 'Painting Services',
    description: 'Interior & exterior painting with premium materials',
    features: ['Color Consultation', 'Surface Preparation', 'Premium Paints', 'Clean Finish'],
    popular: true
  },
  {
    id: 'handyman',
    icon: Hammer,
    title: 'Handyman Services',
    description: 'Your go-to for all home repairs and maintenance',
    features: ['TV Mounting', 'Furniture Assembly', 'Minor Repairs', 'Home Maintenance'],
    popular: true
  },
  {
    id: 'drywall',
    icon: Wrench,
    title: 'Drywall Services',
    description: 'Expert drywall repair and installation',
    features: ['Patch Repair', 'Water Damage', 'Texture Matching', 'New Installation']
  },
  {
    id: 'kitchen',
    icon: Home,
    title: 'Kitchen & Bath Remodeling',
    description: 'Transform your spaces with modern designs',
    features: ['Custom Cabinets', 'Countertops', 'Tile Work', 'Full Renovation'],
    popular: true
  },
  {
    id: 'roofing',
    icon: Building,
    title: 'Roofing Services',
    description: 'Repair and replacement with quality materials',
    features: ['Leak Repair', 'Shingle Replacement', 'Gutter Service', 'Storm Damage']
  },
  {
    id: 'deck',
    icon: TreePine,
    title: 'Deck & Outdoor',
    description: 'Build and repair outdoor living spaces',
    features: ['Deck Building', 'Fence Repair', 'Pressure Washing', 'Staining']
  },
  {
    id: 'siding',
    icon: Wrench,
    title: 'Siding Installation',
    description: 'Expert siding installation and repair services',
    features: ['Vinyl Siding', 'Fiber Cement', 'Wood Siding', 'Storm Damage']
  },
  {
    id: 'flooring',
    icon: Building,
    title: 'Flooring Services',
    description: 'Durable solutions for floors and surfaces',
    features: ['Hardwood', 'Luxury Vinyl', 'Tile Installation', 'Carpet']
  },
  {
    id: 'plumbing',
    icon: Droplets,
    title: 'Plumbing Services',
    description: 'Licensed professionals for all plumbing needs',
    features: ['Leak Repair', 'Fixture Updates', 'Water Heaters', 'Emergency Service']
  },
  {
    id: 'electrical',
    icon: Zap,
    title: 'Electrical Services',
    description: 'Safe and reliable electrical installations',
    features: ['Panel Upgrades', 'Outlet Installation', 'Lighting', 'EV Chargers']
  },
  {
    id: 'windows',
    icon: Home,
    title: 'Windows & Doors',
    description: 'Energy-efficient window and door replacement',
    features: ['Window Installation', 'Entry Doors', 'Patio Doors', 'Energy Savings']
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Complete Home Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            One call solves it all. Professional services for every aspect of your home.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all ${
                service.popular ? 'ring-2 ring-yellow-400' : ''
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <div className="mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => setSelectedService(service.id)}
                className="w-full bg-slate-900 text-white py-2 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center"
              >
                Get Quote
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Can't find what you need?</h3>
          <p className="mb-6">We offer custom solutions for unique projects. Tell us what you need!</p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Contact Us for Custom Work
          </button>
        </motion.div>
      </div>
      
      {/* Quote Form Modal */}
      {selectedService && (
        <QuoteForm 
          serviceId={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </section>
  );
}