'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Star, 
  Clock,
  Phone,
  Globe,
  Camera,
  BarChart,
  TrendingUp,
  Users,
  MessageSquare,
  Calendar,
  Settings,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';

interface BusinessInfo {
  name: string;
  address: string;
  phone: string;
  website: string;
  hours: Record<string, { open: string; close: string; closed: boolean }>;
  description: string;
  categories: string[];
  attributes: string[];
  photos: string[];
}

interface GMBStats {
  views: number;
  searches: number;
  calls: number;
  directions: number;
  websiteClicks: number;
  photosViews: number;
}

export default function GoogleBusinessManager() {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    name: 'Burgan Home Services',
    address: '123 Main Street, Spokane, WA 99201',
    phone: '(509) 955-2545',
    website: 'https://burganhomeservices.com',
    hours: {
      Monday: { open: '07:00', close: '18:00', closed: false },
      Tuesday: { open: '07:00', close: '18:00', closed: false },
      Wednesday: { open: '07:00', close: '18:00', closed: false },
      Thursday: { open: '07:00', close: '18:00', closed: false },
      Friday: { open: '07:00', close: '18:00', closed: false },
      Saturday: { open: '08:00', close: '16:00', closed: false },
      Sunday: { open: '00:00', close: '00:00', closed: true }
    },
    description: 'Professional home services contractor in Spokane, WA. Specializing in painting, remodeling, roofing, handyman services, and more. Serving families since 1873.',
    categories: ['General Contractor', 'Painter', 'Bathroom Remodeler', 'Kitchen Remodeler', 'Handyman'],
    attributes: [
      'Wheelchair accessible',
      'Free estimates',
      'Licensed & insured',
      'Emergency services',
      'Senior discounts',
      'Military discounts'
    ],
    photos: []
  });

  const [stats, setStats] = useState<GMBStats>({
    views: 15234,
    searches: 8921,
    calls: 523,
    directions: 312,
    websiteClicks: 1247,
    photosViews: 4521
  });

  const [posts, setPosts] = useState([
    {
      id: '1',
      type: 'update',
      title: 'Spring Special: 20% Off Interior Painting',
      content: 'Book your interior painting project this spring and save 20%! Limited time offer.',
      date: '2025-01-20',
      cta: 'Get Quote',
      ctaUrl: '/services/interior-painting'
    },
    {
      id: '2',
      type: 'event',
      title: 'Home Improvement Workshop',
      content: 'Join us for a free DIY home improvement workshop this Saturday!',
      date: '2025-01-25',
      cta: 'Register',
      ctaUrl: '/events'
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const storedInfo = localStorage.getItem('gmbBusinessInfo');
    if (storedInfo) {
      setBusinessInfo(JSON.parse(storedInfo));
    }
  }, []);

  // Save changes
  const handleSave = () => {
    localStorage.setItem('gmbBusinessInfo', JSON.stringify(businessInfo));
    setIsEditing(false);
  };

  // Simulate GMB sync
  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      // Update stats with random changes to simulate sync
      setStats({
        views: stats.views + Math.floor(Math.random() * 100),
        searches: stats.searches + Math.floor(Math.random() * 50),
        calls: stats.calls + Math.floor(Math.random() * 10),
        directions: stats.directions + Math.floor(Math.random() * 5),
        websiteClicks: stats.websiteClicks + Math.floor(Math.random() * 20),
        photosViews: stats.photosViews + Math.floor(Math.random() * 30)
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Google My Business Integration</h2>
            <p className="text-gray-600 mt-1">Manage your Google Business Profile to improve local SEO</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync with GMB'}
            </button>
            <a
              href="https://business.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
            >
              Open GMB
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Connection Status */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
          <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
          <div className="flex-1">
            <p className="text-green-900 font-medium">Connected to Google My Business</p>
            <p className="text-green-700 text-sm">Last synced: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Performance Metrics (Last 30 Days)</h3>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-blue-50 rounded-lg p-4 text-center"
          >
            <BarChart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{stats.views.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Profile Views</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-green-50 rounded-lg p-4 text-center"
          >
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{stats.searches.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Searches</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-yellow-50 rounded-lg p-4 text-center"
          >
            <Phone className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">{stats.calls}</div>
            <div className="text-sm text-gray-600">Phone Calls</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-purple-50 rounded-lg p-4 text-center"
          >
            <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{stats.directions}</div>
            <div className="text-sm text-gray-600">Directions</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-indigo-50 rounded-lg p-4 text-center"
          >
            <Globe className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-indigo-600">{stats.websiteClicks}</div>
            <div className="text-sm text-gray-600">Website Clicks</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-pink-50 rounded-lg p-4 text-center"
          >
            <Camera className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-pink-600">{stats.photosViews.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Photo Views</div>
          </motion.div>
        </div>
      </div>

      {/* Business Information */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">Business Information</h3>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center ${
              isEditing 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isEditing ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Settings className="w-4 h-4 mr-2" />
                Edit Info
              </>
            )}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
            <input
              type="text"
              value={businessInfo.name}
              onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={businessInfo.phone}
              onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              value={businessInfo.address}
              onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="url"
              value={businessInfo.website}
              onChange={(e) => setBusinessInfo({ ...businessInfo, website: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Business Description</label>
          <textarea
            rows={3}
            value={businessInfo.description}
            onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
            disabled={!isEditing}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-50"
          />
        </div>

        {/* Business Hours */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Business Hours</label>
          <div className="grid gap-2">
            {Object.entries(businessInfo.hours).map(([day, hours]) => (
              <div key={day} className="flex items-center gap-4">
                <span className="w-24 text-sm font-medium">{day}</span>
                {hours.closed ? (
                  <span className="text-sm text-gray-500">Closed</span>
                ) : (
                  <span className="text-sm">
                    {hours.open} - {hours.close}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Attributes */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Business Attributes</label>
          <div className="flex flex-wrap gap-2">
            {businessInfo.attributes.map((attr) => (
              <span key={attr} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {attr}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* GMB Posts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">Google Posts</h3>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
            Create Post
          </button>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900">{post.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{post.content}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs text-gray-500">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-medium">
                      {post.type}
                    </span>
                    {post.cta && (
                      <span className="text-xs text-indigo-600 font-medium">
                        CTA: {post.cta}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Tips */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">GMB SEO Best Practices</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Complete Your Profile</p>
              <p className="text-sm text-gray-600">Fill out every section for maximum visibility</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Add Photos Regularly</p>
              <p className="text-sm text-gray-600">Businesses with photos get 42% more direction requests</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Respond to Reviews</p>
              <p className="text-sm text-gray-600">Reply to all reviews within 24-48 hours</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Post Weekly Updates</p>
              <p className="text-sm text-gray-600">Keep your profile active with regular posts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}