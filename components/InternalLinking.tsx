'use client';

import Link from 'next/link';
import { ChevronRight, MapPin, Wrench, TrendingUp } from 'lucide-react';
import { ServiceData } from '@/lib/serviceData';
import { LocationData } from '@/lib/locationData';

interface RelatedServicesProps {
  currentService: ServiceData;
  services: ServiceData[];
  location?: LocationData;
}

export function RelatedServices({ currentService, services, location }: RelatedServicesProps) {
  const relatedServices = services
    .filter(s => s.id !== currentService.id)
    .slice(0, 4);

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
        <Wrench className="w-5 h-5 mr-2 text-indigo-600" />
        Related Services {location && `in ${location.name}`}
      </h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {relatedServices.map(service => (
          <Link
            key={service.id}
            href={location ? `/${service.slug}-${location.slug}` : `/services/${service.slug}`}
            className="group flex items-center justify-between bg-white rounded-lg p-3 hover:shadow-md transition-all"
          >
            <span className="text-gray-700 group-hover:text-indigo-600 transition-colors">
              {service.shortTitle}
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}

interface NearbyLocationsProps {
  currentLocation: LocationData;
  locations: LocationData[];
  service?: ServiceData;
}

export function NearbyLocations({ currentLocation, locations, service }: NearbyLocationsProps) {
  const nearbyLocations = locations
    .filter(l => l.id !== currentLocation.id)
    .sort((a, b) => {
      const distA = Math.sqrt(
        Math.pow(a.coordinates.lat - currentLocation.coordinates.lat, 2) +
        Math.pow(a.coordinates.lng - currentLocation.coordinates.lng, 2)
      );
      const distB = Math.sqrt(
        Math.pow(b.coordinates.lat - currentLocation.coordinates.lat, 2) +
        Math.pow(b.coordinates.lng - currentLocation.coordinates.lng, 2)
      );
      return distA - distB;
    })
    .slice(0, 4);

  return (
    <div className="bg-blue-50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-blue-600" />
        Nearby Service Areas
      </h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {nearbyLocations.map(location => (
          <Link
            key={location.id}
            href={service ? `/${service.slug}-${location.slug}` : `/service-areas/${location.slug}`}
            className="group flex items-center justify-between bg-white rounded-lg p-3 hover:shadow-md transition-all"
          >
            <div>
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                {location.name}
              </span>
              <span className="text-xs text-gray-500 block">{location.responseTime}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}

interface PopularCombinationsProps {
  services: ServiceData[];
  locations: LocationData[];
}

export function PopularCombinations({ services, locations }: PopularCombinationsProps) {
  const popularCombos = [
    { service: 'bathroom-remodeling', location: 'spokane-wa' },
    { service: 'kitchen-remodeling', location: 'spokane-valley-wa' },
    { service: 'interior-painting', location: 'liberty-lake-wa' },
    { service: 'handyman-services', location: 'south-hill-spokane' },
  ];

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
        Popular Services by Location
      </h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {popularCombos.map(combo => {
          const service = services.find(s => s.slug === combo.service);
          const location = locations.find(l => l.slug === combo.location);
          if (!service || !location) return null;
          
          return (
            <Link
              key={`${combo.service}-${combo.location}`}
              href={`/${combo.service}-${combo.location}`}
              className="group bg-white rounded-lg p-3 hover:shadow-md transition-all"
            >
              <div className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                {service.shortTitle}
              </div>
              <div className="text-sm text-gray-600 flex items-center mt-1">
                <MapPin className="w-3 h-3 mr-1" />
                {location.name}, {location.stateAbbr}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}