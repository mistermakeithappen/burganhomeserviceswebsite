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
  ChevronUp,
  Home,
  Navigation
} from 'lucide-react';
import { ServiceData, getRelatedServices, getAllServices } from '@/lib/serviceData';
import { LocationData, getAllLocations } from '@/lib/locationData';
import QuoteForm from '@/components/QuoteForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import { RelatedServices, NearbyLocations } from '@/components/InternalLinking';
import { 
  generateServiceSchema,
  generateLocalBusinessSchema,
  generateFAQSchema, 
  generateHowToSchema,
  generateBreadcrumbSchema,
  generateReviewSchema,
  combineSchemas
} from '@/lib/schemaGenerator';

interface LocationServicePageTemplateProps {
  service: ServiceData;
  location: LocationData;
}

export default function LocationServicePageTemplate({ service, location }: LocationServicePageTemplateProps) {
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  const relatedServices = getRelatedServices(service.id);
  const nearbyLocations = getAllLocations().filter(
    loc => loc.id !== location.id && loc.distance <= location.distance + 10
  ).slice(0, 4);
  const allServices = getAllServices();
  const allLocations = getAllLocations();

  // Generate location-specific content
  const locationTitle = `${service.shortTitle} in ${location.name}, ${location.stateAbbr}`;
  const heroTitle = location.type === 'neighborhood' 
    ? `Professional ${service.shortTitle} in ${location.name} Spokane`
    : `Expert ${service.shortTitle} Services in ${location.name}, ${location.stateAbbr}`;
    
  // Customize FAQs with location
  const localizedFaqs = service.faqs.map(faq => ({
    ...faq,
    question: faq.question.replace('Spokane', location.name),
    answer: faq.answer.replace('Spokane', location.name)
  }));

  // Generate schema markup
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: service.shortTitle, url: `/services/${service.slug}` },
    { name: location.name, url: `/${service.slug}-${location.slug}` }
  ];

  const schemas = combineSchemas(
    generateServiceSchema(service, location),
    generateLocalBusinessSchema(service, location),
    generateFAQSchema(localizedFaqs),
    generateBreadcrumbSchema(breadcrumbs)
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      
      {/* Hero Section with Location Focus */}
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
                    { label: service.shortTitle, href: `/services/${service.slug}` },
                    { label: location.name }
                  ]}
                />
              </div>
              
              {/* Location Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-4 py-2 mb-4"
              >
                <MapPin className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-yellow-400 font-semibold">Serving {location.name}</span>
              </motion.div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                {heroTitle}
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                {service.description} Proudly serving {location.name} and surrounding areas with {location.responseTime} response time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowQuoteForm(true)}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all inline-flex items-center justify-center"
                >
                  Get Free {location.name} Quote
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
              
              {/* Location-Specific Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{location.responseTime}</div>
                  <div className="text-sm text-blue-200">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{location.distance}mi</div>
                  <div className="text-sm text-blue-200">From Spokane</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">5★</div>
                  <div className="text-sm text-blue-200">Local Rating</div>
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
                  alt={`${service.shortTitle} in ${location.name}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Location Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <Navigation className="w-10 h-10 text-indigo-500" />
                  <div>
                    <div className="font-bold text-slate-900">{location.name}</div>
                    <div className="text-sm text-gray-600">{location.county}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Local Insights Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Why {location.name} Residents Choose Burgan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Local expertise tailored to {location.name}&apos;s unique needs
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Local {location.name} Insights
                </h3>
                <ul className="space-y-3">
                  {location.localInsights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{insight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              {location.landmarks.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    Serving Near {location.name} Landmarks
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {location.landmarks.map((landmark) => (
                      <span key={landmark} className="bg-white px-3 py-1 rounded-full text-sm text-gray-600">
                        {landmark}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6">
                {location.name} Service Coverage
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-blue-200">Response Time</span>
                  <span className="font-bold text-yellow-400">{location.responseTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-200">Service Area</span>
                  <span className="font-bold text-yellow-400 capitalize">{location.serviceAvailability}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-200">Population Served</span>
                  <span className="font-bold text-yellow-400">{location.population.toLocaleString()}</span>
                </div>
                {location.zipCodes.length > 0 && (
                  <div>
                    <span className="text-blue-200 block mb-2">ZIP Codes Served</span>
                    <div className="flex flex-wrap gap-2">
                      {location.zipCodes.slice(0, 6).map(zip => (
                        <span key={zip} className="bg-white/10 px-2 py-1 rounded text-xs">
                          {zip}
                        </span>
                      ))}
                      {location.zipCodes.length > 6 && (
                        <span className="bg-white/10 px-2 py-1 rounded text-xs">
                          +{location.zipCodes.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQuoteForm(true)}
                className="w-full bg-yellow-400 text-slate-900 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
              >
                Schedule {location.name} Service
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Our {service.shortTitle} Process in {location.name}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional service tailored to {location.name} homes
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location-Specific FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              {location.name} {service.shortTitle} FAQs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Common questions from {location.name} homeowners
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            {localizedFaqs.map((faq, index) => (
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

      {/* Nearby Areas Section */}
      {nearbyLocations.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-slate-900 to-indigo-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Also Serving Nearby Areas
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                {service.shortTitle} services available throughout the region
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {nearbyLocations.map((nearbyLocation, index) => (
                <motion.div
                  key={nearbyLocation.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/${service.slug}-${nearbyLocation.slug}`}
                    className="block bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all group"
                  >
                    <MapPin className="w-8 h-8 text-yellow-400 mb-3" />
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {nearbyLocation.name}
                    </h3>
                    <p className="text-blue-200 text-sm mb-3">
                      {nearbyLocation.distance} miles • {nearbyLocation.responseTime}
                    </p>
                    <div className="flex items-center text-yellow-400 font-semibold text-sm">
                      View Services
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Services & Nearby Locations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            <RelatedServices 
              currentService={service} 
              services={allServices}
              location={location}
            />
            <NearbyLocations 
              currentLocation={location} 
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
              Ready for {service.shortTitle} in {location.name}?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied {location.name} customers. Get your free quote today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQuoteForm(true)}
                className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
              >
                Get {location.name} Quote
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
            
            <p className="text-white/80 mt-6 text-sm">
              Serving {location.name} with {location.responseTime} response time
            </p>
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