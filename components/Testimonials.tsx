'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

// Actual customer testimonials from Angi and review platforms
const testimonials = [
  {
    name: 'Nicole V.',
    location: 'Spokane, WA',
    rating: 5,
    text: 'Brandon and his team painted the entire exterior of our house, upgraded electrical systems, and did waterproofing work. Fair prices, good workmanship, friendly and professional team!',
    service: 'Exterior Painting & Electrical',
    image: 'NV'
  },
  {
    name: 'Vicki Merrill',
    location: 'Spokane Valley, WA',
    rating: 5,
    text: 'Nearly 100-year-old home - prep work was thorough and the paint job was excellent. The crew was polite, respectful, and did great cleanup. Great attention to detail!',
    service: 'Trim Painting',
    image: 'VM'
  },
  {
    name: 'Sandi S.',
    location: 'Spokane, WA',
    rating: 5,
    text: 'Brandon and Alex installed an overhead cabinet in my laundry room. Very happy with the end results and will definitely use this company again.',
    service: 'Handyman Service',
    image: 'SS'
  },
  {
    name: 'Deb G.',
    location: 'Spokane Valley, WA',
    rating: 5,
    text: 'Great, awesome. Quick, friendly, efficient, and professional. The whole process was easy.',
    service: 'House Painting',
    image: 'DG'
  },
  {
    name: 'Robyn Antoine',
    location: 'Spokane Valley, WA',
    rating: 5,
    text: 'Brandon was so helpful and didn\'t try to sucker us into anything unnecessary.',
    service: 'Attic Evaluation',
    image: 'RA'
  },
  {
    name: 'Alexander Osterberg',
    location: 'Spokane, WA',
    rating: 5,
    text: 'Crew did a great job changing out an electrical panel.',
    service: 'Electrical Panel',
    image: 'AO'
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
            <span className="text-gray-600">from 150+ reviews</span>
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
          <a 
            href="https://www.google.com/search?q=burgan+home+services+spokane+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors">
            Read More Reviews
          </a>
        </motion.div>
      </div>
    </section>
  );
}