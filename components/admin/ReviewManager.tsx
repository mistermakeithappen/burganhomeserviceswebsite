'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Calendar,
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';
import { getAllLocations } from '@/lib/locationData';
import { getAllServices } from '@/lib/serviceData';

interface Review {
  id: string;
  customerName: string;
  rating: number;
  text: string;
  serviceId: string;
  locationId: string;
  date: string;
  verified: boolean;
  featured: boolean;
  response?: string;
}

export default function ReviewManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  
  const locations = getAllLocations();
  const services = getAllServices();

  // Load reviews from localStorage
  useEffect(() => {
    const storedReviews = localStorage.getItem('reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      // Initialize with sample reviews
      const sampleReviews: Review[] = [
        {
          id: '1',
          customerName: 'Sarah Johnson',
          rating: 5,
          text: 'Excellent work on our kitchen remodel. Professional, on time, and within budget. The team was respectful of our home and cleaned up thoroughly each day.',
          serviceId: 'kitchen-remodeling',
          locationId: 'spokane',
          date: '2025-01-15',
          verified: true,
          featured: true
        },
        {
          id: '2',
          customerName: 'Mike Thompson',
          rating: 5,
          text: 'Best contractor in Spokane Valley! They painted our entire house and did an amazing job. Very detail-oriented and professional.',
          serviceId: 'interior-painting',
          locationId: 'spokane-valley',
          date: '2025-01-10',
          verified: true,
          featured: false
        },
        {
          id: '3',
          customerName: 'Emily Davis',
          rating: 5,
          text: 'Very happy with our bathroom renovation in Liberty Lake. The team was professional and the results are beautiful.',
          serviceId: 'bathroom-remodeling',
          locationId: 'liberty-lake',
          date: '2025-01-05',
          verified: true,
          featured: true
        }
      ];
      setReviews(sampleReviews);
      localStorage.setItem('reviews', JSON.stringify(sampleReviews));
    }
  }, []);

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem('reviews', JSON.stringify(reviews));
    }
  }, [reviews]);

  // Filter reviews
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          review.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = filterLocation === 'all' || review.locationId === filterLocation;
    const matchesService = filterService === 'all' || review.serviceId === filterService;
    const matchesRating = filterRating === 'all' || review.rating.toString() === filterRating;
    
    return matchesSearch && matchesLocation && matchesService && matchesRating;
  });

  const handleAddReview = (newReview: Omit<Review, 'id'>) => {
    const review: Review = {
      ...newReview,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([review, ...reviews]);
    setIsAddingReview(false);
  };

  const handleUpdateReview = (id: string, updates: Partial<Review>) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, ...updates } : review
    ));
    setEditingReview(null);
  };

  const handleDeleteReview = (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(review => review.id !== id));
    }
  };

  const toggleFeatured = (id: string) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, featured: !review.featured } : review
    ));
  };

  const toggleVerified = (id: string) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, verified: !review.verified } : review
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Review Management</h2>
        <button
          onClick={() => setIsAddingReview(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Review
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Locations</option>
              {locations.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Services</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>{service.shortTitle}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">{reviews.length}</div>
          <div className="text-sm text-gray-600">Total Reviews</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0).toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {reviews.filter(r => r.verified).length}
          </div>
          <div className="text-sm text-gray-600">Verified</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">
            {reviews.filter(r => r.featured).length}
          </div>
          <div className="text-sm text-gray-600">Featured</div>
        </div>
      </div>

      {/* Add Review Form */}
      {isAddingReview && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 rounded-lg p-6 mb-6"
        >
          <ReviewForm
            onSubmit={handleAddReview}
            onCancel={() => setIsAddingReview(false)}
            locations={locations}
            services={services}
          />
        </motion.div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-50 rounded-lg p-6"
          >
            {editingReview === review.id ? (
              <ReviewForm
                review={review}
                onSubmit={(updates) => handleUpdateReview(review.id, updates)}
                onCancel={() => setEditingReview(null)}
                locations={locations}
                services={services}
              />
            ) : (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{review.customerName}</h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      {review.verified && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      )}
                      {review.featured && (
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {locations.find(l => l.id === review.locationId)?.name}
                      </span>
                      <span>
                        {services.find(s => s.id === review.serviceId)?.shortTitle}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleVerified(review.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        review.verified ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}
                      title="Toggle Verified"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleFeatured(review.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        review.featured ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'
                      }`}
                      title="Toggle Featured"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingReview(review.id)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{review.text}</p>
                {review.response && (
                  <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
                    <p className="text-sm font-medium text-gray-700 mb-1">Business Response:</p>
                    <p className="text-gray-600 text-sm">{review.response}</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No reviews found matching your filters</p>
        </div>
      )}
    </div>
  );
}

// Review Form Component
function ReviewForm({ 
  review, 
  onSubmit, 
  onCancel,
  locations,
  services
}: {
  review?: Review;
  onSubmit: (review: any) => void;
  onCancel: () => void;
  locations: any[];
  services: any[];
}) {
  const [formData, setFormData] = useState({
    customerName: review?.customerName || '',
    rating: review?.rating || 5,
    text: review?.text || '',
    serviceId: review?.serviceId || services[0]?.id || '',
    locationId: review?.locationId || locations[0]?.id || '',
    verified: review?.verified || false,
    featured: review?.featured || false,
    response: review?.response || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
          <input
            type="text"
            required
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className="focus:outline-none"
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
          <select
            value={formData.serviceId}
            onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {services.map(service => (
              <option key={service.id} value={service.id}>{service.shortTitle}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select
            value={formData.locationId}
            onChange={(e) => setFormData({ ...formData, locationId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {locations.map(loc => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Review Text</label>
        <textarea
          required
          rows={4}
          value={formData.text}
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Business Response (Optional)</label>
        <textarea
          rows={3}
          value={formData.response}
          onChange={(e) => setFormData({ ...formData, response: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Thank you for your review..."
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.verified}
            onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Verified Customer</span>
        </label>
        
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Featured Review</span>
        </label>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center"
        >
          <Save className="w-4 h-4 mr-2" />
          {review ? 'Update Review' : 'Add Review'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </button>
      </div>
    </form>
  );
}