'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Star,
  Shield,
  Award,
  ChevronRight
} from 'lucide-react';
import { getAllServices } from '@/lib/serviceData';
import { getAllLocations } from '@/lib/locationData';

export default function Footer() {
  const services = getAllServices();
  const locations = getAllLocations();
  
  // Get primary services and locations for footer
  const primaryServices = services.slice(0, 6);
  const primaryLocations = locations.filter(loc => loc.type === 'city').slice(0, 5);
  const neighborhoods = locations.filter(loc => loc.type === 'neighborhood').slice(0, 4);

  return (
    <footer className="bg-slate-900 text-white">
      {/* Trust Badges */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-400" />
              <div>
                <div className="font-semibold">Fully Insured</div>
                <div className="text-sm text-gray-400">$2M Coverage</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-yellow-400" />
              <div>
                <div className="font-semibold">Since 1873</div>
                <div className="text-sm text-gray-400">150+ Years</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-orange-400" />
              <div>
                <div className="font-semibold">5-Star Rated</div>
                <div className="text-sm text-gray-400">150+ Reviews</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-400" />
              <div>
                <div className="font-semibold">24/7 Service</div>
                <div className="text-sm text-gray-400">Emergency Ready</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Burgan Home Services</h3>
            <p className="text-gray-400 mb-6">
              Spokane&apos;s most trusted home service provider since 1873. Family-owned, fully insured, and committed to excellence.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-yellow-400 transition-colors group">
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-slate-900" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-yellow-400 transition-colors group">
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-slate-900" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-yellow-400 transition-colors group">
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-slate-900" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-yellow-400 transition-colors group">
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-slate-900" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Our Services</h4>
            <ul className="space-y-2">
              {primaryServices.map(service => (
                <li key={service.id}>
                  <Link 
                    href={`/services/${service.slug}`}
                    className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/#services"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors font-semibold"
                >
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Service Areas</h4>
            <ul className="space-y-2">
              {primaryLocations.map(location => (
                <li key={location.id}>
                  <Link 
                    href={`/handyman-services-${location.slug}`}
                    className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {location.name}, {location.stateAbbr}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/service-areas"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors font-semibold"
                >
                  All Service Areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Neighborhoods */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Spokane Neighborhoods</h4>
            <ul className="space-y-2">
              {neighborhoods.map(location => (
                <li key={location.id}>
                  <Link 
                    href={`/handyman-services-${location.slug}`}
                    className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Get In Touch</h4>
            <div className="space-y-3">
              <a 
                href="tel:5099552545"
                className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>(509) 955-2545</span>
              </a>
              <a 
                href="mailto:infoburganhomeservices@gmail.com"
                className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>infoburganhomeservices@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <div>
                  <p>PO BOX 71</p>
                  <p>Greenacres, WA 99016</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Clock className="w-5 h-5" />
                <div>
                  <p>Mon-Fri: 7AM - 8PM</p>
                  <p>Sat-Sun: 8AM - 6PM</p>
                  <p className="text-yellow-400">24/7 Emergency</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Service + Location Combinations */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <h4 className="text-lg font-semibold mb-4 text-yellow-400">Popular Services by Location</h4>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
            {[
              { service: 'bathroom-remodeling', location: 'spokane-wa', label: 'Bathroom Remodeling in Spokane' },
              { service: 'kitchen-remodeling', location: 'spokane-valley-wa', label: 'Kitchen Remodeling in Spokane Valley' },
              { service: 'interior-painting', location: 'liberty-lake-wa', label: 'Interior Painting in Liberty Lake' },
              { service: 'handyman-services', location: 'south-hill-spokane', label: 'Handyman Services on South Hill' },
              { service: 'exterior-painting', location: 'north-side-spokane', label: 'Exterior Painting on North Side' },
              { service: 'trim-painting', location: 'cheney-wa', label: 'Trim Painting in Cheney' },
              { service: 'home-repairs', location: 'deer-park-wa', label: 'Home Repairs in Deer Park' },
              { service: 'bathroom-remodeling', location: 'south-hill-spokane', label: 'Bathroom Remodeling on South Hill' },
            ].map((combo, index) => (
              <Link
                key={index}
                href={`/${combo.service}-${combo.location}`}
                className="text-sm text-gray-500 hover:text-yellow-400 transition-colors"
              >
                {combo.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 Burgan Home Services. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-yellow-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-yellow-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap.xml" className="text-gray-500 hover:text-yellow-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}