'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Phone, 
  ChevronRight,
  Star,
  MapPin,
  Shield,
  Award,
  Users,
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ServiceData, getRelatedServices } from '@/lib/serviceData';
import { getPrimaryServiceAreas } from '@/lib/locationData';
import QuoteForm from '@/components/QuoteForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import { RelatedServices, NearbyLocations } from '@/components/InternalLinking';
import { getAllServices } from '@/lib/serviceData';
import { getAllLocations } from '@/lib/locationData';
import { 
  generateServiceSchema, 
  generateFAQSchema, 
  generateHowToSchema,
  generateBreadcrumbSchema,
  combineSchemas
} from '@/lib/schemaGenerator';

interface ServicePageTemplateProps {
  service: ServiceData;
  location?: any;
}

export default function ServicePageTemplate({ service, location }: ServicePageTemplateProps) {
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  const relatedServices = getRelatedServices(service.id);
  const primaryAreas = getPrimaryServiceAreas();
  const allServices = getAllServices();
  const allLocations = getAllLocations();

  // Generate schema markup
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: service.shortTitle, url: `/services/${service.slug}` }
  ];

  const schemas = combineSchemas(
    generateServiceSchema(service, location),
    generateFAQSchema(service.faqs),
    generateHowToSchema(service),
    generateBreadcrumbSchema(breadcrumbs)
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 lg:py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Breadcrumbs */}
              <div className="mb-6">
                <Breadcrumbs 
                  items={[
                    { label: 'Services', href: '/#services' },
                    { label: service.shortTitle }
                  ]}
                />
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                {service.title}
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                {service.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowQuoteForm(true)}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all inline-flex items-center justify-center"
                >
                  Get Free Quote
                  <Zap className="w-5 h-5 ml-2" />
                </motion.button>
                
                <motion.a
                  href="tel:5099552545"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-indigo-900 transition-all inline-flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  (509) 955-2545
                </motion.a>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{service.priceRange}</div>
                  <div className="text-sm text-blue-200">Price Range</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{service.duration}</div>
                  <div className="text-sm text-blue-200">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">5★</div>
                  <div className="text-sm text-blue-200">Rating</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <Image
                  src={service.heroImage}
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Trust Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-10 h-10 text-green-500" />
                  <div>
                    <div className="font-bold text-slate-900">Fully Insured</div>
                    <div className="text-sm text-gray-600">Licensed & Bonded</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Our {service.shortTitle} Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with Spokane&apos;s most trusted home service provider
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all"
              >
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <p className="text-gray-700">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Our {service.shortTitle} Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach to deliver exceptional results every time
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 mt-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-indigo-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about our {service.shortTitle.toLowerCase()} services
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            {service.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mb-4"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full bg-gray-50 hover:bg-gray-100 rounded-xl p-6 text-left transition-all"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900 pr-4">{faq.question}</h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </div>
                  {expandedFaq === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-gray-600 mt-4"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-indigo-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {service.shortTitle} Services Available Throughout Spokane
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Professional service in your neighborhood
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {primaryAreas.map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/${service.slug}-${area.slug}`}
                  className="block bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 hover:bg-white/20 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-yellow-400 transition-colors">
                        {area.name}
                      </h3>
                      <p className="text-blue-200 text-sm">{area.responseTime}</p>
                    </div>
                    <MapPin className="w-5 h-5 text-yellow-400" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services & Internal Linking */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            <RelatedServices 
              currentService={service} 
              services={allServices}
            />
            <NearbyLocations 
              currentLocation={allLocations[0]} 
              locations={allLocations}
              service={service}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your {service.shortTitle} Project?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get your free quote today and join thousands of satisfied customers
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQuoteForm(true)}
                className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
              >
                Get Free Quote
              </motion.button>
              
              <motion.a
                href="tel:5099552545"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-orange-500 transition-all inline-flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now: (509) 955-2545
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <QuoteForm 
          serviceId={service.id} 
          onClose={() => setShowQuoteForm(false)} 
        />
      )}
    </>
  );
}