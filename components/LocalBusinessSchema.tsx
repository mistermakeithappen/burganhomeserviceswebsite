export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": "https://burganhomeservices.com/#organization",
    "name": "Burgan Home Services",
    "alternateName": "Burgan Home Services LLC",
    "description": "Professional home services contractor in Spokane, WA. Specializing in painting, remodeling, roofing, handyman services, and more. Serving families since 1873. Licensed, bonded, and insured.",
    "url": "https://burganhomeservices.com",
    "telephone": "+1-509-955-2545",
    "email": "info@burganhomeservices.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main Street",
      "addressLocality": "Spokane",
      "addressRegion": "WA",
      "postalCode": "99201",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "47.6587802",
      "longitude": "-117.4260466"
    },
    "image": [
      "https://burganhomeservices.com/images/hero-1920x1080.jpg",
      "https://burganhomeservices.com/images/logo-square.jpg",
      "https://burganhomeservices.com/images/team-photo.jpg"
    ],
    "logo": {
      "@type": "ImageObject",
      "url": "https://burganhomeservices.com/images/logo.png",
      "width": 600,
      "height": 200
    },
    "sameAs": [
      "https://www.facebook.com/burganhomeservices",
      "https://www.instagram.com/burganhomeservices",
      "https://www.youtube.com/@burganhomeservices",
      "https://www.linkedin.com/company/burgan-home-services",
      "https://nextdoor.com/pages/burgan-home-services-spokane-wa"
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "16:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "00:00",
        "closes": "00:00",
        "description": "Emergency services available"
      }
    ],
    "priceRange": "$$-$$$",
    "paymentAccepted": ["Cash", "Check", "Credit Card", "Debit Card", "PayPal", "Venmo"],
    "currenciesAccepted": "USD",
    "areaServed": [
      {
        "@type": "City",
        "name": "Spokane",
        "addressRegion": "WA"
      },
      {
        "@type": "City",
        "name": "Spokane Valley",
        "addressRegion": "WA"
      },
      {
        "@type": "City",
        "name": "Liberty Lake",
        "addressRegion": "WA"
      },
      {
        "@type": "City",
        "name": "Cheney",
        "addressRegion": "WA"
      },
      {
        "@type": "City",
        "name": "Airway Heights",
        "addressRegion": "WA"
      },
      {
        "@type": "City",
        "name": "Medical Lake",
        "addressRegion": "WA"
      },
      {
        "@type": "City",
        "name": "Deer Park",
        "addressRegion": "WA"
      },
      {
        "@type": "City",
        "name": "Coeur d'Alene",
        "addressRegion": "ID"
      },
      {
        "@type": "City",
        "name": "Post Falls",
        "addressRegion": "ID"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "47.6587802",
        "longitude": "-117.4260466"
      },
      "geoRadius": "50 miles"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Home Services",
      "itemListElement": [
        {
          "@type": "Service",
          "name": "Interior Painting",
          "description": "Professional interior painting services for homes and businesses"
        },
        {
          "@type": "Service",
          "name": "Exterior Painting",
          "description": "Weather-resistant exterior painting and staining services"
        },
        {
          "@type": "Service",
          "name": "Kitchen Remodeling",
          "description": "Complete kitchen renovation and remodeling services"
        },
        {
          "@type": "Service",
          "name": "Bathroom Remodeling",
          "description": "Bathroom renovation, updates, and accessibility modifications"
        },
        {
          "@type": "Service",
          "name": "Roofing Services",
          "description": "Roof repair, replacement, and maintenance services"
        },
        {
          "@type": "Service",
          "name": "Handyman Services",
          "description": "General home repairs and maintenance services"
        },
        {
          "@type": "Service",
          "name": "Flooring Installation",
          "description": "Hardwood, laminate, tile, and carpet installation"
        },
        {
          "@type": "Service",
          "name": "Deck Building",
          "description": "Custom deck design, building, and repair services"
        },
        {
          "@type": "Service",
          "name": "Siding Installation",
          "description": "Vinyl, fiber cement, and wood siding installation"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "523",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah Johnson"
        },
        "datePublished": "2025-01-15",
        "reviewBody": "Excellent work on our kitchen remodel. Professional, on time, and within budget. Highly recommend!"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Mike Thompson"
        },
        "datePublished": "2025-01-10",
        "reviewBody": "Best contractor in Spokane! They painted our entire house and did an amazing job."
      }
    ],
    "founder": {
      "@type": "Person",
      "name": "John Burgan",
      "jobTitle": "Founder"
    },
    "foundingDate": "1873",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": 25
    },
    "slogan": "Your Contractor for Life",
    "award": [
      "Best of Spokane 2024 - Home Services",
      "BBB A+ Rating",
      "Angie's List Super Service Award 2023",
      "HomeAdvisor Elite Service Professional"
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Spokane Home Builders Association"
      },
      {
        "@type": "Organization",
        "name": "Greater Spokane Valley Chamber of Commerce"
      },
      {
        "@type": "Organization",
        "name": "National Association of the Remodeling Industry"
      }
    ],
    "knowsAbout": [
      "Home Renovation",
      "Interior Design",
      "Construction",
      "Painting",
      "Roofing",
      "Plumbing",
      "Electrical Work",
      "Carpentry",
      "Home Maintenance"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "license",
        "name": "General Contractor License",
        "issuedBy": {
          "@type": "Organization",
          "name": "Washington State Department of Labor & Industries"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "certification",
        "name": "EPA RRP Certification",
        "issuedBy": {
          "@type": "Organization",
          "name": "Environmental Protection Agency"
        }
      }
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "name": "Free In-Home Consultation",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Complimentary consultation and project estimate"
      },
      {
        "@type": "Offer",
        "name": "Senior Citizen Discount",
        "description": "10% discount for seniors 65 and older"
      },
      {
        "@type": "Offer",
        "name": "Military Discount",
        "description": "10% discount for active military and veterans"
      }
    ],
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": "https://burganhomeservices.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      {
        "@type": "ReserveAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://burganhomeservices.com/schedule",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform"
          ]
        },
        "result": {
          "@type": "Reservation",
          "name": "Schedule Consultation"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}