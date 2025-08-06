'use client';

import { motion } from 'framer-motion';
import { Phone, Clock } from 'lucide-react';

export default function EmergencyBanner() {
  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-4 text-center"
    >
      <div className="container mx-auto flex items-center justify-center space-x-4 text-sm md:text-base">
        <Clock className="w-4 h-4 animate-pulse" />
        <span className="font-semibold">24/7 Emergency Service Available</span>
        <Phone className="w-4 h-4" />
        <a href="tel:509-955-2545" className="font-bold underline hover:no-underline">
          Call (509) 955-2545
        </a>
      </div>
    </motion.div>
  );
}