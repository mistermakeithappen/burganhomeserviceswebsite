'use client';

import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Shield, 
  Clock, 
  CheckCircle2,
  Award,
  Users,
  Sparkles,
  TrendingDown
} from 'lucide-react';

export default function TransparentPricing() {
  const features = [
    {
      icon: DollarSign,
      title: 'Under $75/Hour',
      description: 'Honest, upfront pricing that beats the competition'
    },
    {
      icon: Shield,
      title: '100% Satisfaction Guarantee',
      description: "Not happy? We'll make it right or your money back"
    },
    {
      icon: Clock,
      title: 'No Hidden Fees',
      description: 'The price we quote is the price you pay, period'
    },
    {
      icon: Award,
      title: 'Licensed & Insured',
      description: 'Fully protected work with certified professionals'
    }
  ];

  const benefits = [
    'Free detailed estimates before any work begins',
    'Price matching on comparable services',
    'Senior and military discounts available',
    'Flexible payment options to fit your budget',
    'Transparent invoicing with itemized breakdowns',
    'No surprise charges or last-minute add-ons'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Two Column Layout - Text Left, Price Right */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16 py-8">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left lg:pl-8"
          >
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <TrendingDown className="w-4 h-4" />
              TRANSPARENT PRICING
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Finally, A Contractor You Can{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Trust With Your Budget
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-6">
              We&apos;re revolutionizing home services with honest, transparent pricing. 
            </p>
            
            <p className="text-lg text-gray-600 mb-8">
              <span className="font-bold text-slate-900">Less than $75/hour</span> for professional work? 
              Yes, it&apos;s real. No other contracting company is this transparent. 
              We believe in fair pricing that respects both your budget and the quality of work you deserve.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <span className="text-gray-700 font-semibold">No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <span className="text-gray-700 font-semibold">Free Estimates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <span className="text-gray-700 font-semibold">Price Match Guarantee</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Big Price Display */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center lg:justify-center lg:pr-8"
          >
            <div className="relative">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
              
              <div className="relative bg-white rounded-3xl shadow-2xl p-12 lg:p-16 border-4 border-indigo-100">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-2xl text-gray-500">Starting at just</span>
                  </div>
                  <div className="flex items-baseline justify-center">
                    <span className="text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                      $75
                    </span>
                    <span className="text-4xl text-gray-600 ml-3">/hr</span>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="text-green-600 font-semibold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      All-inclusive pricing
                    </div>
                    <div className="text-yellow-600 font-semibold flex items-center justify-center gap-2">
                      <Award className="w-5 h-5" />
                      Best value guarantee
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <button 
                    onClick={() => {
                      const servicesSection = document.getElementById('services');
                      if (servicesSection) {
                        servicesSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl text-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all"
                  >
                    Get Your Free Quote
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Benefits List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-10 lg:p-16"
        >
          <div className="flex items-center justify-center gap-3 mb-10">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 text-center">
              Why We&apos;re Different
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-4 p-2"
              >
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-lg">{benefit}</span>
              </motion.div>
            ))}
          </div>

          {/* Trust Statement */}
          <div className="mt-12 p-8 lg:p-10 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
              <Users className="w-12 h-12 text-indigo-600 flex-shrink-0" />
              <div>
                <h4 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3">
                  Join 3500+ Happy Homeowners
                </h4>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto md:mx-0">
                  We&apos;ve built our reputation on trust, quality, and unbeatable value. 
                  Our transparent pricing model means you&apos;ll never worry about surprise costs again.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}