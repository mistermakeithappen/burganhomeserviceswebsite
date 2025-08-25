'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#services', label: 'Services' },
    { href: '/blog', label: 'Blog' },
    { href: '/#gallery', label: 'Gallery' },
    { href: '/#testimonials', label: 'Reviews' },
    { href: '/#contact', label: 'Contact' },
    { href: '/admin', label: 'Admin', isAdmin: true },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return pathname === '/' && false;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Left: Hamburger Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-slate-900" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900" />
              )}
            </button>

            {/* Center: Logo */}
            <Link 
              href="/" 
              className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold text-slate-900 hover:text-yellow-600 transition-colors"
            >
              Burgan Home Services
            </Link>

            {/* Right: Call Button */}
            <motion.a
              href="tel:5099552545"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Call Now</span>
              <span className="sm:hidden">Call</span>
            </motion.a>
          </div>
        </div>
      </header>

      {/* Full Screen Slide Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Slide Menu */}
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[80vw] bg-white z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                {/* Menu Header */}
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">Menu</h2>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-slate-900" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                        isActive(link.href)
                          ? 'bg-yellow-400 text-slate-900'
                          : link.isAdmin
                          ? 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 text-sm'
                          : 'text-slate-700 hover:bg-gray-100 hover:text-slate-900'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Emergency Service Banner */}
                <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm font-semibold text-red-900 mb-2">
                    24/7 Emergency Service
                  </p>
                  <a
                    href="tel:5099552545"
                    className="flex items-center gap-2 text-red-600 font-bold hover:text-red-700 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    (509) 955-2545
                  </a>
                </div>

                {/* Business Info */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Hours</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Monday - Friday: 7AM - 8PM</p>
                    <p>Saturday - Sunday: 8AM - 6PM</p>
                    <p className="text-red-600 font-semibold">24/7 Emergency Service</p>
                  </div>
                </div>

                {/* Service Areas */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Service Areas</h3>
                  <p className="text-sm text-gray-600">
                    Spokane, Spokane Valley, Liberty Lake, Cheney, Deer Park, and surrounding areas
                  </p>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}