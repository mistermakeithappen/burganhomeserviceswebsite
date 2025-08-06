'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { 
  Clock, 
  DollarSign, 
  Shield, 
  Users, 
  Award, 
  Wrench,
  CheckCircle,
  PhoneCall,
  Star,
  Home,
  Zap
} from 'lucide-react';

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={containerRef} className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-400 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="inline-flex items-center bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-2 mb-6"
          >
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-yellow-400 font-semibold">150+ Years of Excellence</span>
          </motion.div>
          
          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Spokane</span><br />
            Chooses Burgan
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            From the horse-and-buggy days to smart homes, we've been your neighbors' trusted choice since 1873
          </p>
        </motion.div>

        {/* Main Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mr-4">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Since 1873</h3>
                  <p className="text-blue-200">Five Generations Strong</p>
                </div>
              </div>
              
              <p className="text-blue-100 text-lg leading-relaxed mb-6">
                What started as a small family carpentry shop has grown into Spokane's most trusted home services company. 
                We've weathered recessions, world wars, and economic booms - always staying true to our commitment to quality and integrity.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">50,000+</div>
                  <div className="text-sm text-blue-200">Homes Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">5</div>
                  <div className="text-sm text-blue-200">Generations</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                icon: Shield,
                title: "Fully Protected",
                desc: "$2M Insurance Coverage",
                stat: "100%",
                statLabel: "Insured Projects"
              },
              {
                icon: Clock,
                title: "Always On Time",
                desc: "Punctual & Professional",
                stat: "98%",
                statLabel: "On-Time Rate"
              },
              {
                icon: Award,
                title: "Quality Guaranteed", 
                desc: "5-Year Workmanship Warranty",
                stat: "5⭐",
                statLabel: "Average Rating"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-yellow-400/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{item.title}</h4>
                      <p className="text-blue-200 text-sm">{item.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-400">{item.stat}</div>
                    <div className="text-xs text-blue-300">{item.statLabel}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Interactive Promise Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">Our Promise to Every Spokane Family</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Transparent Pricing",
                promise: "No hidden fees, ever",
                guarantee: "Price Match Guarantee",
                color: "from-green-400 to-emerald-500"
              },
              {
                icon: PhoneCall,
                title: "24/7 Emergency",
                promise: "Always here when you need us",
                guarantee: "60-Minute Response",
                color: "from-red-400 to-pink-500"
              },
              {
                icon: Users,
                title: "Family Values",
                promise: "Treating your home like our own",
                guarantee: "Personal Relationship",
                color: "from-blue-400 to-indigo-500"
              }
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, rotateY: 90 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="relative group"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 group-hover:border-white/40 transition-all h-full">
                  <div className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white mb-3">{card.title}</h4>
                  <p className="text-blue-200 mb-6 text-lg">{card.promise}</p>
                  
                  <div className="mt-auto">
                    <div className={`inline-flex items-center bg-gradient-to-r ${card.color} px-4 py-2 rounded-full`}>
                      <CheckCircle className="w-4 h-4 text-white mr-2" />
                      <span className="text-white font-semibold text-sm">{card.guarantee}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-12 shadow-2xl"
        >
          <Wrench className="w-20 h-20 text-white mx-auto mb-6" />
          <h3 className="text-4xl font-bold text-white mb-4">Ready to Join 50,000+ Happy Neighbors?</h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the Burgan difference that Spokane families have trusted for over a century
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
            >
              Get Your Free Quote
              <Zap className="w-5 h-5 inline ml-2" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-orange-500 transition-all"
            >
              Call (509) 955-2545
              <PhoneCall className="w-5 h-5 inline ml-2" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}