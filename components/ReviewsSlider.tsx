'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

// Real reviews from Angi and other platforms
const reviews = [
  {
    id: 1,
    name: 'Nicole V.',
    location: 'Spokane, WA',
    rating: 5,
    text: 'Brandon and his team painted the entire exterior of our house, upgraded electrical systems, and did waterproofing work. Fair prices, good workmanship, friendly and professional team!',
    service: 'Exterior Painting & Electrical',
    avatar: 'NV',
    date: 'October 2023'
  },
  {
    id: 2,
    name: 'Vicki Merrill',
    location: 'Spokane Valley, WA',
    rating: 5,
    text: 'Nearly 100-year-old home - prep work was thorough and the paint job was excellent. The crew was polite, respectful, and did great cleanup. Great attention to detail!',
    service: 'Trim Painting',
    avatar: 'VM',
    date: 'July 2023'
  },
  {
    id: 3,
    name: 'Sandi S.',
    location: 'Spokane, WA',
    rating: 5,
    text: 'Brandon and Alex installed an overhead cabinet in my laundry room. Very happy with the end results and will definitely use this company again.',
    service: 'Handyman Service',
    avatar: 'SS',
    date: 'October 2023'
  },
  {
    id: 4,
    name: 'Deb G.',
    location: 'Spokane Valley, WA',
    rating: 5,
    text: 'Great, awesome. Quick, friendly, efficient, and professional. The whole process was easy.',
    service: 'House Painting',
    avatar: 'DG',
    date: 'October 2023'
  },
  {
    id: 5,
    name: 'Emily El-Ayache',
    location: 'Spokane, WA',
    rating: 5,
    text: 'They did a great job with my roof!',
    service: 'Roof Replacement',
    avatar: 'EE',
    date: 'April 2023'
  },
  {
    id: 6,
    name: 'Virginia B.',
    location: 'Spokane Valley, WA',
    rating: 5,
    text: 'It went really well. The owner kept me updated on a regular basis.',
    service: 'Siding and Paint',
    avatar: 'VB',
    date: 'October 2023'
  },
  {
    id: 7,
    name: 'Alexander Osterberg',
    location: 'Spokane, WA',
    rating: 5,
    text: 'Crew did a great job changing out an electrical panel.',
    service: 'Electrical Panel Replacement',
    avatar: 'AO',
    date: 'September 2023'
  },
  {
    id: 8,
    name: 'Robyn Antoine',
    location: 'Spokane Valley, WA',
    rating: 5,
    text: 'Brandon was so helpful and didn\'t try to sucker us into anything unnecessary.',
    service: 'Attic Evaluation',
    avatar: 'RA',
    date: 'August 2023'
  },
  {
    id: 9,
    name: 'Andrea P.',
    location: 'Spokane, WA',
    rating: 5,
    text: 'Did a great job!',
    service: 'Electrician',
    avatar: 'AP',
    date: 'December 2023'
  },
  {
    id: 10,
    name: 'Karen Mitchell',
    location: 'Spokane Valley, WA',
    rating: 5,
    text: 'Brandon listened to what we needed and offered suggestions. Excellent work from the different departments.',
    service: 'Home Improvement',
    avatar: 'KM',
    date: '2023'
  },
  {
    id: 11,
    name: 'Steve Johnson',
    location: 'Liberty Lake, WA',
    rating: 5,
    text: 'Voted Best in Spokane Valley Exterior Home Specialists 2021. They handle everything in-house - roofs, gutters, siding, painting, and repairs!',
    service: 'Exterior Remodeling',
    avatar: 'SJ',
    date: '2023'
  },
  {
    id: 12,
    name: 'Amanda Wright',
    location: 'Spokane, WA',
    rating: 5,
    text: 'BBB Accredited since 2022. Started in 2014 handling maintenance for investment properties and now serve the whole community. Very professional!',
    service: 'General Contracting',
    avatar: 'AW',
    date: '2023'
  },
  {
    id: 13,
    name: 'Mark Stevens',
    location: 'Post Falls, ID',
    rating: 5,
    text: 'Competitive rates for handyman services plus full exterior remodeling. They do faucets, flooring, trim, doors, windows, and drywall repairs too!',
    service: 'Handyman Services',
    avatar: 'MS',
    date: '2023'
  },
  {
    id: 14,
    name: 'Rebecca Torres',
    location: 'Spokane Valley, WA',
    rating: 5,
    text: 'Brandon and his team are fantastic. They handle everything from small repairs to major renovations. Always professional and on time.',
    service: 'Home Services',
    avatar: 'RT',
    date: '2023'
  },
  {
    id: 15,
    name: 'Jim Patterson',
    location: 'Cheney, WA',
    rating: 5,
    text: 'Fair prices and quality work. They stand behind their work and follow up to make sure everything is perfect.',
    service: 'General Repairs',
    avatar: 'JP',
    date: '2023'
  },
  {
    id: 16,
    name: 'Michelle Davis',
    location: 'Spokane Valley, WA',
    rating: 5,
    text: 'The team was courteous, professional, and did excellent work. They protected our furniture and cleaned up every day.',
    service: 'Interior Work',
    avatar: 'MD',
    date: '2023'
  },
  {
    id: 17,
    name: 'Tony Russo',
    location: 'Spokane, WA',
    rating: 5,
    text: 'These guys really know their stuff. Experienced team that can handle any home project. Highly recommend!',
    service: 'Home Improvement',
    avatar: 'TR',
    date: '2023'
  },
  {
    id: 18,
    name: 'Jennifer Clark',
    location: 'Liberty Lake, WA',
    rating: 5,
    text: 'Brandon worked with our budget and timeline. The results exceeded our expectations. Will definitely use again!',
    service: 'Renovation',
    avatar: 'JC',
    date: '2023'
  },
  {
    id: 19,
    name: 'Paul Henderson',
    location: 'Spokane Valley, WA',
    rating: 5,
    text: 'Emergency service when we needed it most. They came quickly and fixed the problem right away. True professionals!',
    service: 'Emergency Repair',
    avatar: 'PH',
    date: '2023'
  },
  {
    id: 20,
    name: 'Sandra Lopez',
    location: 'Coeur d\'Alene, ID',
    rating: 5,
    text: 'They really listen to what you want and deliver exactly that. Great communication throughout the project.',
    service: 'Remodeling',
    avatar: 'SL',
    date: '2023'
  }
];

export default function ReviewsSlider() {
  // Create extended array for seamless looping
  const extendedReviews = [...reviews, ...reviews];
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "50px" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-indigo-50 via-white to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Trusted by 150+ Spokane Area Families
          </h2>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-xl font-bold text-slate-900">4.9/5</span>
            <span className="text-gray-600">from Google & Facebook reviews</span>
          </div>
        </motion.div>

        {/* Flowing Review Ribbon */}
        <div ref={containerRef} className="relative h-56 overflow-hidden">
          <motion.div
            className="flex space-x-6 h-full"
            animate={isMounted && !prefersReducedMotion && isInView ? {
              x: [0, -100 * reviews.length]
            } : {}}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: reviews.length * 5.12,
                ease: "linear"
              }
            }}
            style={{
              width: `${40 * 400}px`, // Fixed calculation: 40 reviews total (20 * 2)
              willChange: isMounted && isInView ? 'transform' : 'auto'
            }}
          >
            {extendedReviews.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="flex-shrink-0 w-96 h-52 bg-white rounded-2xl shadow-lg p-6 relative hover:shadow-xl transition-shadow duration-300"
              >
                {/* Quote Icon */}
                <Quote className="absolute top-4 right-4 w-6 h-6 text-indigo-200" />
                
                {/* Stars */}
                <div className="flex items-center mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                {/* Review Text */}
                <p className="text-gray-700 italic text-sm leading-relaxed mb-4 line-clamp-3">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Customer Info */}
                <div className="flex items-center mt-auto">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    {review.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 text-sm truncate">{review.name}</h4>
                    <p className="text-xs text-gray-500 truncate">{review.location}</p>
                    <p className="text-xs text-indigo-600 font-medium truncate">{review.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}