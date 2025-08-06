'use client';

import { motion } from 'framer-motion';
import { Shield, Award, Clock, Users, CheckCircle, Star } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: 'Fully Licensed & Insured',
    description: '$2M General Liability Coverage'
  },
  {
    icon: Award,
    title: 'BBB A+ Rated',
    description: 'Accredited Business Since 2010'
  },
  {
    icon: Clock,
    title: '150+ Years Experience',
    description: 'Serving families since 1873'
  },
  {
    icon: Users,
    title: '10,000+ Happy Customers',
    description: '98% Customer Satisfaction Rate'
  },
  {
    icon: CheckCircle,
    title: 'Satisfaction Guaranteed',
    description: '100% Money-Back Guarantee'
  },
  {
    icon: Star,
    title: 'Award Winning Service',
    description: 'Best Contractor 2023'
  }
];

export default function TrustBadges() {
  return (
    <section className="py-16 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <badge.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{badge.title}</h3>
              <p className="text-xs text-gray-600">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}