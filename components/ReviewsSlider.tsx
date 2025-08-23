'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'Spokane, WA',
    rating: 5,
    text: 'Burgan Home Services transformed our outdated kitchen into a modern masterpiece. Professional and exceeded expectations!',
    service: 'Kitchen Remodeling',
    avatar: 'SJ'
  },
  {
    id: 2,
    name: 'Michael Chen', 
    location: 'Spokane Valley, WA',
    rating: 5,
    text: 'Quick roof repair after wind storm. Dealt with insurance directly. Stress-free from start to finish!',
    service: 'Roof Repair',
    avatar: 'MC'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    location: 'Coeur d\'Alene, ID', 
    rating: 5,
    text: 'Painted our entire house interior in 3 days. Clean, efficient, stunning results. Will use again!',
    service: 'Interior Painting',
    avatar: 'ER'
  },
  {
    id: 4,
    name: 'David Thompson',
    location: 'Post Falls, ID',
    rating: 5,
    text: 'Beautiful deck that became our favorite spot. Quality materials, expert craftsmanship, finished early.',
    service: 'Deck Building', 
    avatar: 'DT'
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    location: 'Liberty Lake, WA',
    rating: 5,
    text: 'Emergency plumbing on Sunday - came within an hour! Fixed quickly, fair price. Lifesavers!',
    service: 'Emergency Plumbing',
    avatar: 'LA'
  },
  {
    id: 6,
    name: 'Robert Martinez',
    location: 'Spokane, WA', 
    rating: 5,
    text: 'Complete bathroom renovation done perfectly. Helped with design, magazine-worthy result!',
    service: 'Bathroom Remodel',
    avatar: 'RM'
  },
  {
    id: 7,
    name: 'Jennifer Walsh',
    location: 'Cheney, WA',
    rating: 5,
    text: 'Exterior painting transformed our home\'s curb appeal. Neighbors keep asking who did the work!',
    service: 'Exterior Painting',
    avatar: 'JW'
  },
  {
    id: 8,
    name: 'Thomas Brown',
    location: 'Spokane, WA',
    rating: 5,
    text: 'Drywall repair after water damage looked perfect. You can\'t even tell there was ever an issue.',
    service: 'Drywall Repair',
    avatar: 'TB'
  },
  {
    id: 9,
    name: 'Karen Mitchell',
    location: 'Spokane Valley, WA',
    rating: 5,
    text: 'Had them install new flooring throughout our main floor. The crew was respectful of our home and cleaned up each day. Love the results!',
    service: 'Flooring Installation',
    avatar: 'KM'
  },
  {
    id: 10,
    name: 'Steve Johnson',
    location: 'Liberty Lake, WA',
    rating: 5,
    text: 'Our fence was falling apart and these guys rebuilt it in 2 days. Fair price and solid work. Neighbors have been asking for their number.',
    service: 'Fence Repair',
    avatar: 'SJ'
  },
  {
    id: 11,
    name: 'Amanda Wright',
    location: 'Coeur d\'Alene, ID',
    rating: 5,
    text: 'Finally got our basement finished! The team worked around our schedule and our kids loved watching the progress. Highly recommend.',
    service: 'Basement Remodeling',
    avatar: 'AW'
  },
  {
    id: 12,
    name: 'Mark Stevens',
    location: 'Post Falls, ID',
    rating: 5,
    text: 'Needed siding replacement after hail damage. Insurance covered it and they handled all the paperwork. Made a stressful situation easy.',
    service: 'Siding Replacement',
    avatar: 'MS'
  },
  {
    id: 13,
    name: 'Rebecca Torres',
    location: 'Spokane, WA',
    rating: 5,
    text: 'They remodeled our master bedroom and added a walk-in closet. The space feels twice as big now. Amazing what good design can do!',
    service: 'Bedroom Remodel',
    avatar: 'RT'
  },
  {
    id: 14,
    name: 'Jim Patterson',
    location: 'Cheney, WA',
    rating: 5,
    text: 'Had them repair our garage door and service the opener. Same day service and very reasonable price. Will definitely call them again.',
    service: 'Garage Door Repair',
    avatar: 'JP'
  },
  {
    id: 15,
    name: 'Michelle Davis',
    location: 'Spokane Valley, WA',
    rating: 4,
    text: 'Painted our living room and dining room. Took a bit longer than expected but the quality is excellent. Very neat and professional.',
    service: 'Interior Painting',
    avatar: 'MD'
  },
  {
    id: 16,
    name: 'Tony Russo',
    location: 'Spokane, WA',
    rating: 5,
    text: 'These guys know what they\'re doing. Fixed our leaky shower that three other contractors couldn\'t figure out. Problem solved!',
    service: 'Plumbing Repair',
    avatar: 'TR'
  },
  {
    id: 17,
    name: 'Jennifer Clark',
    location: 'Liberty Lake, WA',
    rating: 5,
    text: 'Updated our kitchen cabinets and countertops. Didn\'t want a full remodel and they worked with our budget perfectly. Kitchen looks brand new.',
    service: 'Kitchen Update',
    avatar: 'JC'
  },
  {
    id: 18,
    name: 'Paul Henderson',
    location: 'Post Falls, ID',
    rating: 5,
    text: 'Roof started leaking during last winter\'s storms. They came out in the rain to tarp it and fixed it properly when weather cleared. Lifesavers!',
    service: 'Emergency Roof Repair',
    avatar: 'PH'
  },
  {
    id: 19,
    name: 'Sandra Lopez',
    location: 'Coeur d\'Alene, ID',
    rating: 5,
    text: 'Converted our unused dining room into a home office. Perfect timing with everyone working from home now. They really listened to our needs.',
    service: 'Room Conversion',
    avatar: 'SL'
  },
  {
    id: 20,
    name: 'Derek Miller',
    location: 'Spokane, WA',
    rating: 5,
    text: 'Had them install tile in our entryway and powder room. Messy job but they protected everything and cleaned up perfectly. Beautiful work.',
    service: 'Tile Installation',
    avatar: 'DM'
  },
  {
    id: 21,
    name: 'Carol Thompson',
    location: 'Spokane Valley, WA',
    rating: 5,
    text: 'Our front porch was sagging and looked terrible. They rebuilt it and added some nice touches. Now it\'s the envy of the neighborhood!',
    service: 'Porch Renovation',
    avatar: 'CT'
  },
  {
    id: 22,
    name: 'Brian Wilson',
    location: 'Cheney, WA',
    rating: 4,
    text: 'Installed gutters on our new shop building. Competitive price and they came when they said they would. Good honest work.',
    service: 'Gutter Installation',
    avatar: 'BW'
  },
  {
    id: 23,
    name: 'Tracy Moore',
    location: 'Liberty Lake, WA',
    rating: 5,
    text: 'We wanted to add a mudroom off our garage. They made it happen and it\'s perfect for our family with three kids. So much more organized now!',
    service: 'Room Addition',
    avatar: 'TM'
  },
  {
    id: 24,
    name: 'Greg Foster',
    location: 'Spokane, WA',
    rating: 5,
    text: 'Electrical work can be scary but these guys know their stuff. Updated our panel and added outlets in the garage. Everything up to code.',
    service: 'Electrical Work',
    avatar: 'GF'
  },
  {
    id: 25,
    name: 'Lisa Baker',
    location: 'Post Falls, ID',
    rating: 5,
    text: 'Bathroom renovation was our first big home project. They walked us through everything and were so patient with all our questions. Love it!',
    service: 'Bathroom Renovation',
    avatar: 'LB'
  },
  {
    id: 26,
    name: 'Dan Cooper',
    location: 'Coeur d\'Alene, ID',
    rating: 5,
    text: 'Storm knocked down part of our fence and damaged the neighbor\'s too. They coordinated with both of us and got everything fixed quickly.',
    service: 'Storm Damage Repair',
    avatar: 'DC'
  },
  {
    id: 27,
    name: 'Nancy Phillips',
    location: 'Spokane Valley, WA',
    rating: 5,
    text: 'They installed new windows throughout our house. What a difference in our heating bills! Professional crew and great follow-up service.',
    service: 'Window Installation',
    avatar: 'NP'
  },
  {
    id: 28,
    name: 'Chris Evans',
    location: 'Spokane, WA',
    rating: 5,
    text: 'Hired them to build custom shelving in our garage. They took the time to understand exactly what we needed. Perfect storage solution!',
    service: 'Custom Carpentry',
    avatar: 'CE'
  }
];

export default function ReviewsSlider() {
  // Create extended array for seamless looping
  const extendedReviews = [...reviews, ...reviews];
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "50px" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
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
            animate={!prefersReducedMotion && isInView ? {
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
              width: `${extendedReviews.length * 400}px`,
              willChange: isInView ? 'transform' : 'auto'
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