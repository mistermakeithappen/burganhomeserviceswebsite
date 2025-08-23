'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  MapPin, 
  Clock, 
  Users, 
  ChevronRight,
  Phone,
  Home,
  Building,
  Trees,
  Mountain,
  Star,
  Shield,
  Zap,
  Search
} from 'lucide-react';
import { getAllLocations, getLocationsByType } from '@/lib/locationData';
import { getAllServices } from '@/lib/serviceData';

export default function ServiceAreasHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'city' | 'suburb' | 'neighborhood'>('all');
  
  const allLocations = getAllLocations();
  const services = getAllServices();
  
  // Filter locations based on search and type
  const filteredLocations = allLocations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          location.zipCodes.some(zip => zip.includes(searchQuery));
    const matchesType = selectedType === 'all' || location.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Group locations by type for display
  const cities = filteredLocations.filter(loc => loc.type === 'city');
  const suburbs = filteredLocations.filter(loc => loc.type === 'suburb');
  const neighborhoods = filteredLocations.filter(loc => loc.type === 'neighborhood');

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 lg:py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-2 mb-6"
            >
              <MapPin className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-yellow-400 font-semibold">Serving 50+ Mile Radius</span>
            </motion.div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Service Areas
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Professional home services throughout Spokane, Eastern Washington, and North Idaho. 
              Find quality contractors in your neighborhood with fast response times.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by city, neighborhood, or ZIP code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="text-3xl font-bold text-yellow-400">{allLocations.length}+</div>
                <div className="text-blue-200">Service Areas</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="text-3xl font-bold text-yellow-400">30-90min</div>
                <div className="text-blue-200">Response Time</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="text-3xl font-bold text-yellow-400">24/7</div>
                <div className="text-blue-200">Emergency Service</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="text-3xl font-bold text-yellow-400">5★</div>
                <div className="text-blue-200">Average Rating</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {(['all', 'city', 'suburb', 'neighborhood'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedType === type
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type === 'all' ? 'All Areas' : type.charAt(0).toUpperCase() + type.slice(1) + 's'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Primary Service Areas - Cities */}
      {cities.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center bg-indigo-100 rounded-full px-4 py-2 mb-4">
                <Building className="w-5 h-5 text-indigo-600 mr-2" />
                <span className="text-indigo-600 font-semibold">Major Cities</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Primary Service Cities
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Full service coverage with fastest response times
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">
                          {location.name}, {location.stateAbbr}
                        </h3>
                        <p className="text-gray-600">{location.county}</p>
                      </div>
                      <div className="bg-indigo-100 rounded-lg p-2">
                        <MapPin className="w-6 h-6 text-indigo-600" />
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Population</span>
                        <span className="font-semibold">{location.population.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Response Time</span>
                        <span className="font-semibold text-green-600">{location.responseTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Distance</span>
                        <span className="font-semibold">{location.distance} miles</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-2">Popular Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {location.popularServices.slice(0, 3).map(serviceId => {
                          const service = services.find(s => s.id === serviceId);
                          return service ? (
                            <Link
                              key={serviceId}
                              href={`/${service.slug}-${location.slug}`}
                              className="bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 px-3 py-1 rounded-full text-xs font-medium transition-colors"
                            >
                              {service.shortTitle}
                            </Link>
                          ) : null;
                        })}
                      </div>
                    </div>
                    
                    <Link
                      href={`/${services[0].slug}-${location.slug}`}
                      className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                    >
                      View {location.name} Services
                      <ChevronRight className="w-4 h-4 inline ml-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Suburbs */}
      {suburbs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center bg-green-100 rounded-full px-4 py-2 mb-4">
                <Home className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-green-600 font-semibold">Suburban Areas</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Suburban Communities
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Quality service for growing communities
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {suburbs.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all"
                >
                  <MapPin className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {location.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{location.stateAbbr}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <span>{location.responseTime}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 text-gray-400 mr-2" />
                      <span>{location.population.toLocaleString()} residents</span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/${services[0].slug}-${location.slug}`}
                    className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center"
                  >
                    Explore Services
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Neighborhoods */}
      {neighborhoods.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center bg-purple-100 rounded-full px-4 py-2 mb-4">
                <Trees className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-purple-600 font-semibold">Neighborhoods</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Spokane Neighborhoods
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your trusted neighborhood contractor
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {neighborhoods.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Link
                    href={`/${services[0].slug}-${location.slug}`}
                    className="block bg-white hover:bg-purple-50 rounded-lg p-4 hover:shadow-md transition-all group"
                  >
                    <h3 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">
                      {location.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{location.responseTime}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services by Area Grid */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-indigo-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Find Services in Your Area
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Select your location and service for detailed information
            </p>
          </motion.div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Popular Service + Location Combinations */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
                <div className="space-y-3">
                  {[
                    { service: 'bathroom-remodeling', location: 'spokane-wa', label: 'Bathroom Remodeling in Spokane' },
                    { service: 'kitchen-remodeling', location: 'spokane-valley-wa', label: 'Kitchen Remodeling in Spokane Valley' },
                    { service: 'interior-painting', location: 'liberty-lake-wa', label: 'Interior Painting in Liberty Lake' },
                    { service: 'handyman-services', location: 'south-hill-spokane', label: 'Handyman Services on South Hill' },
                    { service: 'exterior-painting', location: 'north-side-spokane', label: 'Exterior Painting on North Side' },
                  ].map((combo) => (
                    <Link
                      key={`${combo.service}-${combo.location}`}
                      href={`/${combo.service}-${combo.location}`}
                      className="block bg-white/5 hover:bg-white/10 rounded-lg px-4 py-3 text-white hover:text-yellow-400 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span>{combo.label}</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Coverage Info */}
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Coverage Information</h3>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Shield className="w-5 h-5 text-green-400 mr-2" />
                      <span className="text-white font-semibold">Primary Service Areas</span>
                    </div>
                    <p className="text-blue-200 text-sm">
                      30-60 minute response time. Same-day service available.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 text-yellow-400 mr-2" />
                      <span className="text-white font-semibold">Secondary Areas</span>
                    </div>
                    <p className="text-blue-200 text-sm">
                      60-90 minute response time. Next-day service guaranteed.
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Zap className="w-5 h-5 text-red-400 mr-2" />
                      <span className="text-white font-semibold">Emergency Service</span>
                    </div>
                    <p className="text-blue-200 text-sm">
                      24/7 emergency response for urgent repairs in all areas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
              Can&apos;t Find Your Area?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              We&apos;re constantly expanding our service areas. Call us to check availability in your location.
            </p>
            
            <motion.a
              href="tel:5099552545"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center bg-white text-orange-500 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
            >
              <Phone className="w-6 h-6 mr-3" />
              Call (509) 955-2545
            </motion.a>
            
            <p className="text-white/80 mt-6">
              Available 24/7 for emergency services
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}