'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'Spokane, WA',
    rating: 5,
    text: 'Burgan Home Services transformed our outdated kitchen into a modern masterpiece. Their attention to detail and professionalism exceeded our expectations. Highly recommend!',
    service: 'Kitchen Remodeling',
    image: 'SJ'
  },
  {
    name: 'Michael Chen',
    location: 'Spokane Valley, WA',
    rating: 5,
    text: 'After the wind storm, they repaired our roof quickly and dealt with insurance directly. Stress-free experience from start to finish. True professionals!',
    service: 'Roof Repair',
    image: 'MC'
  },
  {
    name: 'Emily Rodriguez',
    location: 'Coeur d\'Alene, ID',
    rating: 5,
    text: 'They painted our entire house interior in just 3 days. Clean, efficient, and the results are stunning. Will definitely use them again!',
    service: 'Interior Painting',
    image: 'ER'
  },
  {
    name: 'David Thompson',
    location: 'Post Falls, ID',
    rating: 5,
    text: 'Built us a beautiful deck that has become our favorite spot. Quality materials, expert craftsmanship, and finished ahead of schedule.',
    service: 'Deck Building',
    image: 'DT'
  },
  {
    name: 'Lisa Anderson',
    location: 'Liberty Lake, WA',
    rating: 5,
    text: 'Emergency plumbing issue on a Sunday - they came within an hour! Fixed the problem quickly and charged a fair price. Lifesavers!',
    service: 'Plumbing',
    image: 'LA'
  },
  {
    name: 'Robert Martinez',
    location: 'Spokane, WA',
    rating: 5,
    text: 'Complete bathroom renovation done perfectly. They helped with design choices and the result is magazine-worthy. Couldn\'t be happier!',
    service: 'Bathroom Remodel',
    image: 'RM'
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real reviews from real customers. See why families trust us with their homes.
          </p>
          
          <div className="flex items-center justify-center mt-6 space-x-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-slate-900">4.9/5</span>
            <span className="text-gray-600">from 500+ reviews</span>
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 relative hover:shadow-2xl transition-shadow"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-200" />
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-gray-600">{testimonial.service}</span>
              </div>
              
              <p className="text-gray-700 italic">&ldquo;{testimonial.text}&rdquo;</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors">
            Read More Reviews
          </button>
        </motion.div>
      </div>
    </section>
  );
}