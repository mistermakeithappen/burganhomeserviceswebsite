'use client';

import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [showAdminHint, setShowAdminHint] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-end">
          <Link
            href="/admin"
            onMouseEnter={() => setShowAdminHint(true)}
            onMouseLeave={() => setShowAdminHint(false)}
            className="relative group"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-lg flex items-center justify-center transition-all duration-200"
            >
              <Settings className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
            </motion.div>
            
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.9 }}
              animate={{ 
                opacity: showAdminHint ? 1 : 0, 
                y: showAdminHint ? 0 : 5,
                scale: showAdminHint ? 1 : 0.9
              }}
              className="absolute top-full right-0 mt-2 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none"
            >
              Admin
            </motion.div>
          </Link>
        </div>
      </div>
    </header>
  );
}