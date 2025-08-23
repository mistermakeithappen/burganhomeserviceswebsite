export interface LocationData {
  id: string;
  slug: string;
  name: string;
  state: string;
  stateAbbr: string;
  county: string;
  population: number;
  type: 'city' | 'suburb' | 'neighborhood';
  parentLocation?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distance: number; // miles from Spokane
  responseTime: string;
  serviceAvailability: 'primary' | 'secondary' | 'extended';
  localInsights: string[];
  popularServices: string[];
  landmarks: string[];
  zipCodes: string[];
  neighborhoods?: string[];
  description: string;
  metaDescription: string;
}

export const locationsData: Record<string, LocationData> = {
  'spokane': {
    id: 'spokane',
    slug: 'spokane-wa',
    name: 'Spokane',
    state: 'Washington',
    stateAbbr: 'WA',
    county: 'Spokane County',
    population: 230160,
    type: 'city',
    coordinates: {
      lat: 47.6587802,
      lng: -117.4260466
    },
    distance: 0,
    responseTime: '30-60 minutes',
    serviceAvailability: 'primary',
    localInsights: [
      'Historic homes from the early 1900s require specialized restoration techniques',
      'Four-season climate demands weather-resistant exterior materials',
      'Many Craftsman and Victorian homes with original wood trim',
      'Growing downtown condo market needs urban-appropriate services',
      'South Hill luxury homes often request premium finishes'
    ],
    popularServices: [
      'bathroom-remodeling',
      'kitchen-remodeling',
      'interior-painting',
      'exterior-painting'
    ],
    landmarks: [
      'Riverfront Park',
      'Gonzaga University',
      'Downtown Spokane',
      'Manito Park',
      'Spokane Falls'
    ],
    zipCodes: ['99201', '99202', '99203', '99204', '99205', '99207', '99208', '99209', '99210', '99212', '99213', '99214', '99216', '99217', '99218', '99219', '99220', '99223', '99224'],
    neighborhoods: [
      'South Hill',
      'North Side',
      'Downtown',
      'Browne\'s Addition',
      'West Central',
      'East Central',
      'Logan',
      'Nevada Heights',
      'Garland District',
      'Perry District',
      'Kendall Yards',
      'Peaceful Valley',
      'Hillyard',
      'Five Mile Prairie',
      'Indian Trail'
    ],
    description: 'Spokane is the largest city in Eastern Washington and the heart of the Inland Northwest. Known for its beautiful parks, historic architecture, and vibrant downtown, Spokane offers diverse housing from historic homes to modern developments.',
    metaDescription: 'Professional home services in Spokane, WA. Bathroom & kitchen remodeling, painting, repairs, and handyman services. Serving all Spokane neighborhoods since 1873.'
  },
  'spokane-valley': {
    id: 'spokane-valley',
    slug: 'spokane-valley-wa',
    name: 'Spokane Valley',
    state: 'Washington',
    stateAbbr: 'WA',
    county: 'Spokane County',
    population: 102976,
    type: 'suburb',
    coordinates: {
      lat: 47.6732281,
      lng: -117.2393748
    },
    distance: 10,
    responseTime: '45-75 minutes',
    serviceAvailability: 'primary',
    localInsights: [
      'Newer suburban homes built from 1980s onward',
      'Popular area for growing families needing home expansions',
      'Many ranch-style homes perfect for aging-in-place modifications',
      'Higher concentration of vinyl siding needing regular maintenance',
      'Proximity to Idaho brings competitive pricing expectations'
    ],
    popularServices: [
      'kitchen-remodeling',
      'bathroom-remodeling',
      'exterior-painting',
      'handyman-services'
    ],
    landmarks: [
      'Spokane Valley Mall',
      'Mirabeau Point Park',
      'CenterPlace Regional Event Center',
      'Valley Mission Park',
      'Dishman Hills Natural Area'
    ],
    zipCodes: ['99016', '99037', '99206', '99211', '99212', '99214', '99216'],
    description: 'Spokane Valley is the largest suburb of Spokane, offering suburban living with easy access to urban amenities. The area features newer homes, excellent schools, and abundant shopping, making it popular with families.',
    metaDescription: 'Home services in Spokane Valley, WA. Kitchen & bathroom remodeling, painting, and repairs. Trusted local contractor serving the Valley since 1873.'
  },
  'liberty-lake': {
    id: 'liberty-lake',
    slug: 'liberty-lake-wa',
    name: 'Liberty Lake',
    state: 'Washington',
    stateAbbr: 'WA',
    county: 'Spokane County',
    population: 12003,
    type: 'suburb',
    coordinates: {
      lat: 47.6631742,
      lng: -117.0855254
    },
    distance: 15,
    responseTime: '45-90 minutes',
    serviceAvailability: 'primary',
    localInsights: [
      'Rapidly growing community with many new construction homes',
      'Higher-end finishes expected in this affluent area',
      'Lake proximity requires moisture-resistant materials',
      'Tech worker population values modern, smart home features',
      'HOA communities with specific aesthetic requirements'
    ],
    popularServices: [
      'bathroom-remodeling',
      'kitchen-remodeling',
      'interior-painting',
      'trim-painting'
    ],
    landmarks: [
      'Liberty Lake Regional Park',
      'Pavillion Park',
      'Liberty Lake Golf Course',
      'Trailhead Golf Course',
      'HUB Sports Center'
    ],
    zipCodes: ['99016', '99019'],
    description: 'Liberty Lake is one of Washington\'s fastest-growing communities, known for its beautiful lake, outdoor recreation, and high quality of life. The area features newer, upscale homes and a strong sense of community.',
    metaDescription: 'Premium home services in Liberty Lake, WA. Luxury bathroom & kitchen remodeling, custom painting, and quality repairs. Your local contractor since 1873.'
  },
  'cheney': {
    id: 'cheney',
    slug: 'cheney-wa',
    name: 'Cheney',
    state: 'Washington',
    stateAbbr: 'WA',
    county: 'Spokane County',
    population: 13255,
    type: 'city',
    coordinates: {
      lat: 47.4873899,
      lng: -117.5757869
    },
    distance: 17,
    responseTime: '60-90 minutes',
    serviceAvailability: 'secondary',
    localInsights: [
      'College town with mix of student rentals and family homes',
      'Many properties need regular maintenance due to tenant turnover',
      'Historic downtown buildings requiring specialized restoration',
      'Growing retiree population seeking accessibility modifications',
      'Agricultural area homes often need weather protection'
    ],
    popularServices: [
      'handyman-services',
      'home-repairs',
      'interior-painting',
      'exterior-painting'
    ],
    landmarks: [
      'Eastern Washington University',
      'Turnbull National Wildlife Refuge',
      'Sutton Park',
      'Historic Downtown Cheney',
      'Fish Lake Trail'
    ],
    zipCodes: ['99004'],
    description: 'Cheney is home to Eastern Washington University and offers small-town charm with easy access to Spokane. The community features historic homes, student housing, and growing residential neighborhoods.',
    metaDescription: 'Reliable home services in Cheney, WA. Student housing repairs, home maintenance, painting, and remodeling. Serving EWU and Cheney residents since 1873.'
  },
  'airway-heights': {
    id: 'airway-heights',
    slug: 'airway-heights-wa',
    name: 'Airway Heights',
    state: 'Washington',
    stateAbbr: 'WA',
    county: 'Spokane County',
    population: 10757,
    type: 'suburb',
    coordinates: {
      lat: 47.6446442,
      lng: -117.5932756
    },
    distance: 10,
    responseTime: '45-75 minutes',
    serviceAvailability: 'primary',
    localInsights: [
      'Military families from Fairchild AFB need flexible scheduling',
      'Rapid growth bringing demand for home improvements',
      'Mix of manufactured homes and new construction',
      'Casino area development driving property upgrades',
      'Weather exposure on the West Plains requires durable materials'
    ],
    popularServices: [
      'home-repairs',
      'handyman-services',
      'exterior-painting',
      'bathroom-remodeling'
    ],
    landmarks: [
      'Fairchild Air Force Base',
      'Northern Quest Resort & Casino',
      'Sunset Park',
      'West Plains Athletic Complex',
      'Kalispel Golf and Country Club'
    ],
    zipCodes: ['99001', '99022'],
    description: 'Airway Heights serves the Fairchild Air Force Base community and has experienced rapid growth. The area offers affordable housing and is becoming a entertainment destination with casinos and recreation.',
    metaDescription: 'Home services in Airway Heights, WA. Military family friendly, flexible scheduling, quality repairs and remodeling. Serving Fairchild AFB area since 1873.'
  },
  'deer-park': {
    id: 'deer-park',
    slug: 'deer-park-wa',
    name: 'Deer Park',
    state: 'Washington',
    stateAbbr: 'WA',
    county: 'Spokane County',
    population: 4500,
    type: 'city',
    coordinates: {
      lat: 47.9543351,
      lng: -117.4768903
    },
    distance: 20,
    responseTime: '60-90 minutes',
    serviceAvailability: 'secondary',
    localInsights: [
      'Rural setting with larger properties and outbuildings',
      'Many older farmhouses needing restoration',
      'Harsh winters require weather-resistant improvements',
      'Growing bedroom community for Spokane workers',
      'Well water areas need specialized plumbing knowledge'
    ],
    popularServices: [
      'exterior-painting',
      'home-repairs',
      'handyman-services',
      'kitchen-remodeling'
    ],
    landmarks: [
      'Mix Park',
      'Deer Park Golf Club',
      'Historic Clayton',
      'Loon Lake',
      'Mt. Spokane State Park (nearby)'
    ],
    zipCodes: ['99006'],
    description: 'Deer Park offers rural living with small-town charm north of Spokane. The community features historic buildings, agricultural properties, and is gateway to outdoor recreation areas.',
    metaDescription: 'Home services in Deer Park, WA. Rural property repairs, farmhouse remodeling, weather protection, and maintenance. Your local contractor since 1873.'
  },
  'medical-lake': {
    id: 'medical-lake',
    slug: 'medical-lake-wa',
    name: 'Medical Lake',
    state: 'Washington',
    stateAbbr: 'WA',
    county: 'Spokane County',
    population: 4816,
    type: 'city',
    coordinates: {
      lat: 47.5682183,
      lng: -117.6821681
    },
    distance: 16,
    responseTime: '60-90 minutes',
    serviceAvailability: 'secondary',
    localInsights: [
      'Historic resort town with vintage homes',
      'Lake properties requiring moisture management',
      'State hospital staff housing needs regular maintenance',
      'Quiet community attracting retirees for downsizing',
      'Original wood siding common on older homes'
    ],
    popularServices: [
      'handyman-services',
      'interior-painting',
      'bathroom-remodeling',
      'home-repairs'
    ],
    landmarks: [
      'Medical Lake',
      'Eastern State Hospital',
      'Waterfront Park',
      'West Medical Lake',
      'Four Lakes area'
    ],
    zipCodes: ['99022'],
    description: 'Medical Lake is a historic resort town known for its mineral lake and quiet lifestyle. The community offers affordable housing and small-town atmosphere close to Spokane.',
    metaDescription: 'Home services in Medical Lake, WA. Lake home repairs, historic property restoration, painting, and remodeling. Trusted local contractor since 1873.'
  },
  'coeur-dalene': {
    id: 'coeur-dalene',
    slug: 'coeur-dalene-id',
    name: 'Coeur d\'Alene',
    state: 'Idaho',
    stateAbbr: 'ID',
    county: 'Kootenai County',
    population: 54628,
    type: 'city',
    coordinates: {
      lat: 47.6776832,
      lng: -116.7804664
    },
    distance: 33,
    responseTime: '75-120 minutes',
    serviceAvailability: 'extended',
    localInsights: [
      'Luxury lakefront properties requiring high-end finishes',
      'Resort town with seasonal vacation homes',
      'Log cabin and mountain home specialty work',
      'Rapid growth driving new construction support',
      'Idaho building codes differ from Washington'
    ],
    popularServices: [
      'kitchen-remodeling',
      'bathroom-remodeling',
      'interior-painting',
      'trim-painting'
    ],
    landmarks: [
      'Lake Coeur d\'Alene',
      'Coeur d\'Alene Resort',
      'Tubbs Hill',
      'Downtown Sherman Avenue',
      'North Idaho College'
    ],
    zipCodes: ['83814', '83815', '83816'],
    description: 'Coeur d\'Alene is a premier resort city on the shores of Lake Coeur d\'Alene. Known for luxury homes, outdoor recreation, and natural beauty, it attracts residents seeking an active, upscale lifestyle.',
    metaDescription: 'Premium home services in Coeur d\'Alene, ID. Luxury remodeling, custom painting, and quality repairs. Serving North Idaho since 1873.'
  },
  'post-falls': {
    id: 'post-falls',
    slug: 'post-falls-id',
    name: 'Post Falls',
    state: 'Idaho',
    stateAbbr: 'ID',
    county: 'Kootenai County',
    population: 38485,
    type: 'suburb',
    parentLocation: 'coeur-dalene',
    coordinates: {
      lat: 47.7176808,
      lng: -116.9515703
    },
    distance: 25,
    responseTime: '60-90 minutes',
    serviceAvailability: 'secondary',
    localInsights: [
      'Fastest growing city in North Idaho',
      'New subdivisions with modern home styles',
      'Spokane River properties need flood considerations',
      'Mix of Washington and Idaho workers',
      'Factory outlet area brings tourism and growth'
    ],
    popularServices: [
      'handyman-services',
      'interior-painting',
      'bathroom-remodeling',
      'kitchen-remodeling'
    ],
    landmarks: [
      'Falls Park',
      'Q\'emiln Park',
      'Spokane River',
      'Premium Outlets',
      'Treaty Rock'
    ],
    zipCodes: ['83854', '83877'],
    description: 'Post Falls is one of Idaho\'s fastest-growing cities, offering affordable housing between Spokane and Coeur d\'Alene. The community features new developments, river access, and excellent shopping.',
    metaDescription: 'Home services in Post Falls, ID. New home improvements, repairs, painting, and remodeling. Your trusted North Idaho contractor since 1873.'
  },
  'south-hill': {
    id: 'south-hill',
    slug: 'south-hill-spokane',
    name: 'South Hill',
    state: 'Washington',
    stateAbbr: 'WA',
    county: 'Spokane County',
    population: 45000,
    type: 'neighborhood',
    parentLocation: 'spokane',
    coordinates: {
      lat: 47.6287,
      lng: -117.4020
    },
    distance: 3,
    responseTime: '30-45 minutes',
    serviceAvailability: 'primary',
    localInsights: [
      'Historic Manito neighborhood with vintage Craftsman homes',
      'Cliff Park area features mid-century modern architecture',
      'Higher elevation brings unique drainage considerations',
      'Affluent area expecting premium service and materials',
      'Tree-lined streets require careful exterior painting'
    ],
    popularServices: [
      'kitchen-remodeling',
      'bathroom-remodeling',
      'interior-painting',
      'trim-painting'
    ],
    landmarks: [
      'Manito Park',
      'Cliff Park',
      'Lincoln Heights Shopping Center',
      'Comstock Park',
      'Rockwood Boulevard Historic District'
    ],
    zipCodes: ['99203', '99223', '99202'],
    description: 'Spokane\'s South Hill is known for its historic homes, tree-lined streets, and stunning city views. This affluent area features some of Spokane\'s most desirable neighborhoods and excellent schools.',
    metaDescription: 'Premium home services in South Hill Spokane. Historic home restoration, luxury remodeling, and expert painting. Your neighborhood contractor since 1873.'
  },
  'north-side': {
    id: 'north-side',
    slug: 'north-side-spokane',
    name: 'North Side',
    state: 'Washington',
    stateAbbr: 'WA',
    county: 'Spokane County',
    population: 55000,
    type: 'neighborhood',
    parentLocation: 'spokane',
    coordinates: {
      lat: 47.7001,
      lng: -117.4260
    },
    distance: 5,
    responseTime: '30-45 minutes',
    serviceAvailability: 'primary',
    localInsights: [
      'Mix of post-war and modern suburban homes',
      'Growing area with many young families',
      'Five Mile and Indian Trail luxury developments',
      'Nevada Heights working-class neighborhood values',
      'Garland District vintage homes and businesses'
    ],
    popularServices: [
      'handyman-services',
      'exterior-painting',
      'bathroom-remodeling',
      'home-repairs'
    ],
    landmarks: [
      'Garland District',
      'Audubon Park',
      'Shadle Park Shopping Center',
      'Franklin Park',
      'Dwight Merkel Sports Complex'
    ],
    zipCodes: ['99205', '99207', '99208', '99218'],
    description: 'Spokane\'s North Side offers diverse neighborhoods from historic Garland District to newer Five Mile Prairie developments. The area provides affordable family living with excellent amenities.',
    metaDescription: 'Home services in North Spokane. Reliable repairs, remodeling, painting for Nevada Heights, Garland, Five Mile areas. Local contractor since 1873.'
  },
  'kendall-yards': {
    id: 'kendall-yards',
    slug: 'kendall-yards-spokane',
    name: 'Kendall Yards',
    state: 'Washington',
    stateAbbr: 'WA',
    county: 'Spokane County',
    population: 3000,
    type: 'neighborhood',
    parentLocation: 'spokane',
    coordinates: {
      lat: 47.6666,
      lng: -117.4383
    },
    distance: 2,
    responseTime: '20-30 minutes',
    serviceAvailability: 'primary',
    localInsights: [
      'New urban village with modern sustainable homes',
      'Mix of condos, townhomes, and single-family',
      'Eco-conscious residents prefer green materials',
      'High-end finishes and contemporary design expected',
      'Centennial Trail access influences outdoor living spaces'
    ],
    popularServices: [
      'interior-painting',
      'bathroom-remodeling',
      'kitchen-remodeling',
      'handyman-services'
    ],
    landmarks: [
      'Centennial Trail',
      'Olmsted Brothers Green',
      'Gorge Park',
      'Monroe Street Bridge',
      'Kendall Yards Plaza'
    ],
    zipCodes: ['99201'],
    description: 'Kendall Yards is Spokane\'s premier urban village, offering sustainable living with modern amenities along the Spokane River. This walkable community features new construction and high-end finishes.',
    metaDescription: 'Modern home services in Kendall Yards Spokane. Contemporary remodeling, eco-friendly improvements, urban living solutions. Your local expert since 1873.'
  }
};

export function getLocationBySlug(slug: string): LocationData | undefined {
  return Object.values(locationsData).find(loc => loc.slug === slug);
}

export function getAllLocations(): LocationData[] {
  return Object.values(locationsData);
}

export function getPrimaryServiceAreas(): LocationData[] {
  return Object.values(locationsData).filter(loc => loc.serviceAvailability === 'primary');
}

export function getLocationsByType(type: 'city' | 'suburb' | 'neighborhood'): LocationData[] {
  return Object.values(locationsData).filter(loc => loc.type === type);
}

export function getNeighborhoods(cityId: string): LocationData[] {
  return Object.values(locationsData).filter(
    loc => loc.type === 'neighborhood' && loc.parentLocation === cityId
  );
}