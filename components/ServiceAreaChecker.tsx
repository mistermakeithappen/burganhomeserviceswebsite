'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CheckCircle, XCircle, Loader, Search } from 'lucide-react';

export default function ServiceAreaChecker() {
  const [address, setAddress] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<'within' | 'outside' | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Burgan Home Services location
  const BURGAN_LOCATION = {
    lat: 47.6426,
    lng: -117.0689,
    address: '17606 E Montgomery Ave, Spokane Valley, WA 99016'
  };
  const SERVICE_RADIUS_MILES = 20;

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 3959; // Radius of Earth in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const checkServiceArea = async () => {
    if (!address.trim()) {
      setError('Please enter an address');
      return;
    }

    setIsChecking(true);
    setError(null);
    setResult(null);

    try {
      // Geocode the address using our API endpoint
      const response = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`);
      
      if (!response.ok) {
        throw new Error('Failed to verify address');
      }

      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        const distance = calculateDistance(
          BURGAN_LOCATION.lat,
          BURGAN_LOCATION.lng,
          location.lat,
          location.lng
        );

        setResult(distance <= SERVICE_RADIUS_MILES ? 'within' : 'outside');
      } else {
        setError('Could not find that address. Please check and try again.');
      }
    } catch (err) {
      setError('Unable to verify address. Please try again or call us at (509) 955-2545');
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkServiceArea();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address (e.g., 123 Main St, Spokane, WA)"
            className="w-full px-4 py-3 pl-12 pr-12 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400 text-lg text-gray-900"
            disabled={isChecking}
          />
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          {isChecking && (
            <Loader className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500 animate-spin" />
          )}
        </div>
        
        <button
          type="submit"
          disabled={isChecking}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isChecking ? (
            <>
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Check Service Availability
            </>
          )}
        </button>
      </form>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
        >
          {error}
        </motion.div>
      )}

      <AnimatePresence>
        {result === 'within' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-6 p-6 bg-green-50 border-2 border-green-500 rounded-xl"
          >
            <div className="flex items-start">
              <CheckCircle className="w-8 h-8 text-green-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-green-900 mb-2">
                  Great News! We Service Your Area
                </h3>
                <p className="text-green-700 mb-4">
                  Your address is within our service area. We can provide all our home services to your location with fast response times.
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      const quoteSection = document.getElementById('quote');
                      if (quoteSection) {
                        quoteSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors mr-3"
                  >
                    Get a Free Quote
                  </button>
                  <a
                    href="tel:5099552545"
                    className="inline-block bg-white hover:bg-gray-50 text-green-600 font-bold py-2 px-6 rounded-lg transition-colors border-2 border-green-600"
                  >
                    Call (509) 955-2545
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {result === 'outside' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-6 p-6 bg-yellow-50 border-2 border-yellow-500 rounded-xl"
          >
            <div className="flex items-start">
              <XCircle className="w-8 h-8 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-yellow-900 mb-2">
                  Outside Standard Service Area
                </h3>
                <p className="text-yellow-700 mb-4">
                  Your location appears to be outside our standard 20-mile service radius. However, we may still be able to help! 
                  We occasionally service areas beyond our standard range for certain projects.
                </p>
                <div className="space-y-2">
                  <p className="text-yellow-700 font-semibold">
                    Please call us to discuss your needs:
                  </p>
                  <a
                    href="tel:5099552545"
                    className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    <Phone className="w-5 h-5 inline mr-2" />
                    Call (509) 955-2545
                  </a>
                  <p className="text-sm text-yellow-600 mt-2">
                    Additional travel fees may apply for locations outside our standard service area.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service Area Information */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Our Standard Service Area:</h4>
        <p className="text-blue-700 text-sm">
          We provide fast, reliable service within a 20-mile radius of Spokane Valley, including:
        </p>
        <ul className="grid grid-cols-2 gap-1 mt-2 text-sm text-blue-600">
          <li>• Spokane</li>
          <li>• Spokane Valley</li>
          <li>• Liberty Lake</li>
          <li>• Cheney</li>
          <li>• Airway Heights</li>
          <li>• Deer Park</li>
          <li>• Medical Lake</li>
          <li>• Millwood</li>
        </ul>
      </div>
    </div>
  );
}

// Add missing Phone import
import { Phone } from 'lucide-react';