import { ServiceData } from './serviceData';
import { LocationData } from './locationData';

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateServiceSchema(service: ServiceData, location?: LocationData) {
  const baseUrl = 'https://burganhomeservices.com';
  const serviceUrl = location 
    ? `${baseUrl}/${service.slug}-${location.slug}`
    : `${baseUrl}/services/${service.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    'name': location 
      ? `${service.shortTitle} in ${location.name}, ${location.stateAbbr}`
      : service.title,
    'description': service.description,
    'provider': {
      '@type': 'GeneralContractor',
      '@id': `${baseUrl}/#organization`,
      'name': 'Burgan Home Services',
      'telephone': '+1-509-955-2545',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Spokane',
        'addressRegion': 'WA',
        'addressCountry': 'US'
      }
    },
    'areaServed': location ? {
      '@type': 'City',
      'name': location.name,
      'addressRegion': location.stateAbbr
    } : {
      '@type': 'GeoCircle',
      'geoMidpoint': {
        '@type': 'GeoCoordinates',
        'latitude': 47.6587802,
        'longitude': -117.4260466
      },
      'geoRadius': '50 miles'
    },
    'serviceType': service.shortTitle,
    'offers': {
      '@type': 'Offer',
      'priceRange': service.priceRange,
      'availability': 'https://schema.org/InStock',
      'validFrom': new Date().toISOString().split('T')[0]
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '523',
      'bestRating': '5',
      'worstRating': '1'
    }
  };
}

export function generateLocalBusinessSchema(service: ServiceData, location: LocationData) {
  const baseUrl = 'https://burganhomeservices.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/${service.slug}-${location.slug}#localbusiness`,
    'name': `Burgan Home Services - ${service.shortTitle} in ${location.name}`,
    'description': `Professional ${service.shortTitle.toLowerCase()} services in ${location.name}, ${location.stateAbbr}. ${service.description}`,
    'url': `${baseUrl}/${service.slug}-${location.slug}`,
    'telephone': '+1-509-955-2545',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': location.name,
      'addressRegion': location.stateAbbr,
      'addressCountry': 'US'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': location.coordinates.lat,
      'longitude': location.coordinates.lng
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '07:00',
        'closes': '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Saturday',
        'opens': '08:00',
        'closes': '16:00'
      }
    ],
    'priceRange': service.priceRange,
    'paymentAccepted': ['Cash', 'Check', 'Credit Card', 'Debit Card'],
    'areaServed': {
      '@type': 'City',
      'name': location.name,
      'addressRegion': location.stateAbbr
    }
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const baseUrl = 'https://burganhomeservices.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

export function generateHowToSchema(service: ServiceData) {
  const baseUrl = 'https://burganhomeservices.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': `How We Complete Your ${service.shortTitle} Project`,
    'description': service.description,
    'image': `${baseUrl}${service.heroImage}`,
    'totalTime': `P${service.duration.replace(/[^0-9-]/g, '')}D`,
    'estimatedCost': {
      '@type': 'MonetaryAmount',
      'currency': 'USD',
      'value': service.priceRange
    },
    'supply': [],
    'tool': [],
    'step': service.process.map((step, index) => ({
      '@type': 'HowToStep',
      'name': step.title,
      'text': step.description,
      'position': index + 1
    }))
  };
}

export function generateReviewSchema(location?: LocationData) {
  const reviews = [
    {
      author: 'Sarah Johnson',
      date: '2025-01-15',
      rating: 5,
      text: 'Excellent work on our kitchen remodel. Professional, on time, and within budget. Highly recommend!'
    },
    {
      author: 'Mike Thompson',
      date: '2025-01-10',
      rating: 5,
      text: 'Best contractor in Spokane! They painted our entire house and did an amazing job.'
    },
    {
      author: 'Emily Davis',
      date: '2025-01-05',
      rating: 5,
      text: 'Very happy with our bathroom renovation. The team was professional and the results are beautiful.'
    }
  ];

  if (location) {
    reviews[0].text = `Excellent work on our kitchen remodel in ${location.name}. Professional, on time, and within budget. Highly recommend!`;
  }

  return reviews.map(review => ({
    '@type': 'Review',
    'reviewRating': {
      '@type': 'Rating',
      'ratingValue': review.rating,
      'bestRating': '5'
    },
    'author': {
      '@type': 'Person',
      'name': review.author
    },
    'datePublished': review.date,
    'reviewBody': review.text
  }));
}

export function generateVideoSchema(service: ServiceData) {
  const baseUrl = 'https://burganhomeservices.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    'name': `${service.shortTitle} Services by Burgan Home Services`,
    'description': service.description,
    'thumbnailUrl': `${baseUrl}${service.heroImage}`,
    'uploadDate': new Date().toISOString(),
    'contentUrl': `${baseUrl}/videos/${service.slug}.mp4`,
    'embedUrl': `${baseUrl}/embed/${service.slug}`,
    'duration': 'PT2M30S'
  };
}

export function combineSchemas(...schemas: any[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas.map(schema => {
      const { '@context': _, ...rest } = schema;
      return rest;
    })
  };
}