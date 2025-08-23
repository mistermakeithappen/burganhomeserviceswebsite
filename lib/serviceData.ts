export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  metaDescription: string;
  heroImage: string;
  icon: string;
  benefits: string[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  duration: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedServices: string[];
  keywords: string[];
  localKeywords?: string[];
  commonIssues?: string[];
  seasonalConsiderations?: string[];
}

export const servicesData: Record<string, ServiceData> = {
  'bathroom-remodeling': {
    id: 'bathroom-remodeling',
    slug: 'bathroom-remodeling',
    title: 'Professional Bathroom Remodeling Services',
    shortTitle: 'Bathroom Remodeling',
    description: 'Transform your bathroom into a luxurious retreat with our comprehensive remodeling services. From modern updates to complete renovations, we handle every aspect of your bathroom transformation.',
    metaDescription: 'Expert bathroom remodeling in Spokane, WA. Custom designs, quality materials, and professional installation. Get your free quote today!',
    heroImage: '/images/services/bathroom-remodeling-hero.jpg',
    icon: 'Bath',
    benefits: [
      'Increase home value by up to 70% of renovation cost',
      'Improve energy efficiency with modern fixtures',
      'Create a spa-like retreat in your home',
      'Enhance safety with accessibility features',
      'Maximize space with smart storage solutions',
      'Reduce water usage with eco-friendly fixtures'
    ],
    process: [
      {
        step: 1,
        title: 'Free Consultation',
        description: 'Meet with our design team to discuss your vision, needs, and budget'
      },
      {
        step: 2,
        title: 'Design & Planning',
        description: 'Create detailed 3D designs and select materials, fixtures, and finishes'
      },
      {
        step: 3,
        title: 'Preparation',
        description: 'Obtain permits, order materials, and prepare the workspace'
      },
      {
        step: 4,
        title: 'Demolition',
        description: 'Carefully remove old fixtures and prepare for new installation'
      },
      {
        step: 5,
        title: 'Installation',
        description: 'Install plumbing, electrical, tiles, fixtures, and finishing touches'
      },
      {
        step: 6,
        title: 'Final Inspection',
        description: 'Complete walkthrough and ensure everything meets your expectations'
      }
    ],
    priceRange: '$$$',
    duration: '2-4 weeks',
    faqs: [
      {
        question: 'How much does a bathroom remodel cost in Spokane?',
        answer: 'Bathroom remodeling costs in Spokane typically range from $5,000 for basic updates to $25,000+ for luxury renovations. The final cost depends on size, materials, and scope of work.'
      },
      {
        question: 'How long does a bathroom remodel take?',
        answer: 'Most bathroom remodels take 2-4 weeks, depending on the scope. Simple updates might take 1-2 weeks, while complete renovations can take 4-6 weeks.'
      },
      {
        question: 'Do I need permits for bathroom remodeling?',
        answer: 'Yes, permits are typically required for plumbing, electrical, and structural changes. We handle all permit applications and ensure code compliance.'
      },
      {
        question: 'Can I use my bathroom during renovation?',
        answer: 'For major renovations, the bathroom will be unusable. We can work in phases for homes with multiple bathrooms or set up temporary facilities if needed.'
      },
      {
        question: 'What\'s the ROI on bathroom remodeling?',
        answer: 'Bathroom remodels typically return 60-70% of the investment when selling your home, plus you enjoy the improved space while you live there.'
      }
    ],
    relatedServices: ['kitchen-remodeling', 'interior-painting', 'handyman-services'],
    keywords: ['bathroom remodel', 'bathroom renovation', 'shower installation', 'bathtub replacement', 'vanity installation', 'tile work'],
    localKeywords: ['Spokane bathroom contractor', 'bathroom remodeling near me', 'local bathroom renovation'],
    commonIssues: ['Water damage', 'Outdated fixtures', 'Poor ventilation', 'Limited storage', 'Accessibility concerns'],
    seasonalConsiderations: ['Best done in spring/summer when ventilation is easier', 'Winter projects may take longer due to drying times']
  },
  'kitchen-remodeling': {
    id: 'kitchen-remodeling',
    slug: 'kitchen-remodeling',
    title: 'Expert Kitchen Remodeling & Renovation Services',
    shortTitle: 'Kitchen Remodeling',
    description: 'Create your dream kitchen with our comprehensive remodeling services. From cabinet refacing to complete renovations, we bring your culinary space to life.',
    metaDescription: 'Professional kitchen remodeling in Spokane, WA. Custom cabinets, countertops, and modern designs. Transform your kitchen today!',
    heroImage: '/images/services/kitchen-remodeling-hero.jpg',
    icon: 'Kitchen',
    benefits: [
      'Increase home value by up to 80% of renovation cost',
      'Improve functionality with modern layouts',
      'Reduce energy costs with efficient appliances',
      'Create the perfect entertaining space',
      'Maximize storage with custom solutions',
      'Enhance safety with updated electrical and plumbing'
    ],
    process: [
      {
        step: 1,
        title: 'Initial Consultation',
        description: 'Discuss your vision, cooking habits, and budget requirements'
      },
      {
        step: 2,
        title: 'Design Development',
        description: 'Create layout plans, 3D renderings, and material selections'
      },
      {
        step: 3,
        title: 'Product Selection',
        description: 'Choose cabinets, countertops, appliances, and fixtures'
      },
      {
        step: 4,
        title: 'Demolition & Prep',
        description: 'Remove old kitchen and prepare for new installations'
      },
      {
        step: 5,
        title: 'Construction',
        description: 'Install cabinets, countertops, backsplash, and appliances'
      },
      {
        step: 6,
        title: 'Final Details',
        description: 'Complete finishing touches and final walkthrough'
      }
    ],
    priceRange: '$$$$',
    duration: '4-8 weeks',
    faqs: [
      {
        question: 'What is the average cost of kitchen remodeling in Spokane?',
        answer: 'Kitchen remodeling in Spokane ranges from $15,000 for minor updates to $75,000+ for luxury renovations. Most homeowners spend $25,000-$45,000 for a full remodel.'
      },
      {
        question: 'How long does a kitchen remodel take?',
        answer: 'A typical kitchen remodel takes 4-8 weeks. Minor updates might take 2-3 weeks, while major renovations can take 10-12 weeks.'
      },
      {
        question: 'Can I live in my home during kitchen renovation?',
        answer: 'Yes, we set up temporary kitchen facilities and work to minimize disruption. We can provide a microwave, mini-fridge setup to help during construction.'
      },
      {
        question: 'What permits are needed for kitchen remodeling?',
        answer: 'Permits are required for electrical, plumbing, and structural changes. We handle all permit applications and inspections for you.'
      },
      {
        question: 'Should I remodel or just reface my cabinets?',
        answer: 'Refacing costs 30-50% less than replacement and works well for solid cabinets. Full replacement is better for layout changes or damaged cabinets.'
      }
    ],
    relatedServices: ['bathroom-remodeling', 'interior-painting', 'handyman-services'],
    keywords: ['kitchen remodel', 'kitchen renovation', 'cabinet installation', 'countertop replacement', 'kitchen design', 'backsplash installation'],
    localKeywords: ['Spokane kitchen contractor', 'kitchen remodeling near me', 'local kitchen renovation'],
    commonIssues: ['Outdated layout', 'Insufficient storage', 'Poor lighting', 'Old appliances', 'Damaged countertops'],
    seasonalConsiderations: ['Year-round service', 'Holiday season may affect timeline', 'Spring/summer ideal for open-window ventilation']
  },
  'interior-painting': {
    id: 'interior-painting',
    slug: 'interior-painting',
    title: 'Professional Interior Painting Services',
    shortTitle: 'Interior Painting',
    description: 'Transform your home with our expert interior painting services. From single rooms to entire homes, we deliver flawless finishes that last.',
    metaDescription: 'Interior painting services in Spokane, WA. Professional painters, quality paints, and perfect finishes. Free estimates available!',
    heroImage: '/images/services/interior-painting-hero.jpg',
    icon: 'Paint',
    benefits: [
      'Instantly refresh and modernize any space',
      'Increase home value with professional finishes',
      'Protect walls from moisture and wear',
      'Improve indoor air quality with low-VOC paints',
      'Create custom moods with color psychology',
      'Cover imperfections and repair minor damage'
    ],
    process: [
      {
        step: 1,
        title: 'Color Consultation',
        description: 'Help select perfect colors for your space and lighting'
      },
      {
        step: 2,
        title: 'Preparation',
        description: 'Protect furniture, patch holes, sand, and prime surfaces'
      },
      {
        step: 3,
        title: 'Painting',
        description: 'Apply premium paints with professional techniques'
      },
      {
        step: 4,
        title: 'Detail Work',
        description: 'Cut in edges, paint trim, and ensure clean lines'
      },
      {
        step: 5,
        title: 'Cleanup',
        description: 'Remove tape, clean up, and return furniture'
      },
      {
        step: 6,
        title: 'Inspection',
        description: 'Final walkthrough and touch-ups as needed'
      }
    ],
    priceRange: '$$',
    duration: '1-5 days',
    faqs: [
      {
        question: 'How much does interior painting cost in Spokane?',
        answer: 'Interior painting in Spokane typically costs $2-4 per square foot or $200-800 per room, depending on wall condition, paint quality, and ceiling height.'
      },
      {
        question: 'How long does interior painting take?',
        answer: 'A single room takes 1-2 days. A whole house (2,500 sq ft) typically takes 3-5 days with a professional crew.'
      },
      {
        question: 'Do I need to move out during painting?',
        answer: 'No, we work room by room to minimize disruption. We use low-odor paints and ensure proper ventilation.'
      },
      {
        question: 'How often should I repaint my interior?',
        answer: 'Most rooms need repainting every 5-7 years. High-traffic areas like hallways and kids\' rooms may need it every 3-4 years.'
      },
      {
        question: 'What paint brands do you use?',
        answer: 'We use premium brands like Sherwin-Williams, Benjamin Moore, and Behr, choosing the best paint for each specific application.'
      }
    ],
    relatedServices: ['exterior-painting', 'trim-painting', 'handyman-services'],
    keywords: ['interior painting', 'house painting', 'wall painting', 'ceiling painting', 'paint contractor', 'room painting'],
    localKeywords: ['Spokane interior painter', 'house painting near me', 'local painting contractor'],
    commonIssues: ['Fading paint', 'Wall damage', 'Outdated colors', 'Peeling paint', 'Water stains'],
    seasonalConsiderations: ['Year-round service', 'Winter requires longer drying times', 'Spring/fall ideal for open-window ventilation']
  },
  'exterior-painting': {
    id: 'exterior-painting',
    slug: 'exterior-painting',
    title: 'Professional Exterior Painting Services',
    shortTitle: 'Exterior Painting',
    description: 'Protect and beautify your home with our expert exterior painting services. Weather-resistant finishes that enhance curb appeal and protect your investment.',
    metaDescription: 'Exterior painting services in Spokane, WA. Weather-resistant paints, expert preparation, and lasting protection. Get your free quote!',
    heroImage: '/images/services/exterior-painting-hero.jpg',
    icon: 'Home',
    benefits: [
      'Boost curb appeal and home value instantly',
      'Protect siding from weather and UV damage',
      'Prevent wood rot and moisture damage',
      'Seal gaps to improve energy efficiency',
      'Extend the life of your siding',
      'Create a fresh, updated appearance'
    ],
    process: [
      {
        step: 1,
        title: 'Inspection & Quote',
        description: 'Assess condition, measure surfaces, and provide detailed estimate'
      },
      {
        step: 2,
        title: 'Power Washing',
        description: 'Clean all surfaces to ensure proper paint adhesion'
      },
      {
        step: 3,
        title: 'Preparation',
        description: 'Scrape, sand, caulk, and prime all surfaces'
      },
      {
        step: 4,
        title: 'Painting',
        description: 'Apply high-quality exterior paint with proper techniques'
      },
      {
        step: 5,
        title: 'Trim Work',
        description: 'Paint doors, windows, shutters, and decorative elements'
      },
      {
        step: 6,
        title: 'Final Inspection',
        description: 'Complete walkthrough and perform any touch-ups'
      }
    ],
    priceRange: '$$$',
    duration: '3-7 days',
    faqs: [
      {
        question: 'How much does exterior painting cost in Spokane?',
        answer: 'Exterior painting in Spokane typically costs $3,000-8,000 for an average home. Price depends on size, stories, condition, and paint quality.'
      },
      {
        question: 'When is the best time for exterior painting in Spokane?',
        answer: 'Late spring through early fall (May-September) is ideal when temperatures are above 50°F and humidity is low.'
      },
      {
        question: 'How long does exterior paint last in Spokane weather?',
        answer: 'Quality exterior paint lasts 7-10 years on wood siding, 10-15 years on fiber cement, and 20+ years on stucco with proper maintenance.'
      },
      {
        question: 'Do you paint in rain or cold weather?',
        answer: 'We don\'t paint in rain or when temperatures are below 50°F. We monitor weather closely and schedule accordingly.'
      },
      {
        question: 'Should I pressure wash before painting?',
        answer: 'Yes, we always pressure wash as part of our prep work. It removes dirt, mildew, and loose paint for better adhesion.'
      }
    ],
    relatedServices: ['interior-painting', 'trim-painting', 'home-repairs'],
    keywords: ['exterior painting', 'house painting', 'siding painting', 'exterior paint', 'home painting', 'outdoor painting'],
    localKeywords: ['Spokane exterior painter', 'house painting near me', 'local exterior painting'],
    commonIssues: ['Peeling paint', 'Wood rot', 'Fading color', 'Mildew growth', 'Caulk failure'],
    seasonalConsiderations: ['Best in late spring to early fall', 'Avoid winter months', 'Schedule around Spokane\'s rainy season']
  },
  'handyman-services': {
    id: 'handyman-services',
    slug: 'handyman-services',
    title: 'Reliable Handyman Services',
    shortTitle: 'Handyman Services',
    description: 'Your one-stop solution for all home maintenance and repair needs. From quick fixes to complex projects, our skilled handymen handle it all.',
    metaDescription: 'Professional handyman services in Spokane, WA. Home repairs, maintenance, and improvements. Same-day service available!',
    heroImage: '/images/services/handyman-hero.jpg',
    icon: 'Tool',
    benefits: [
      'One call for multiple repair needs',
      'Save time with professional efficiency',
      'Prevent small issues from becoming costly repairs',
      'Maintain home value with regular upkeep',
      'Expert solutions for tricky problems',
      'Guaranteed workmanship on all repairs'
    ],
    process: [
      {
        step: 1,
        title: 'Service Request',
        description: 'Call or book online for your repair needs'
      },
      {
        step: 2,
        title: 'Assessment',
        description: 'Evaluate the repairs needed and provide estimate'
      },
      {
        step: 3,
        title: 'Scheduling',
        description: 'Book convenient time for service'
      },
      {
        step: 4,
        title: 'Repair Work',
        description: 'Complete all requested repairs efficiently'
      },
      {
        step: 5,
        title: 'Quality Check',
        description: 'Ensure all work meets our high standards'
      },
      {
        step: 6,
        title: 'Follow-up',
        description: 'Confirm satisfaction and provide maintenance tips'
      }
    ],
    priceRange: '$',
    duration: '1-4 hours typically',
    faqs: [
      {
        question: 'What is your handyman hourly rate in Spokane?',
        answer: 'Our handyman services are $75-125 per hour depending on the complexity of work. We also offer flat-rate pricing for common repairs.'
      },
      {
        question: 'What types of repairs do handymen handle?',
        answer: 'We handle drywall repair, fixture installation, minor plumbing/electrical, furniture assembly, painting touch-ups, door/window repairs, and much more.'
      },
      {
        question: 'Do you have a minimum service charge?',
        answer: 'Yes, we have a 2-hour minimum for handyman services to ensure we can provide quality work and cover travel time.'
      },
      {
        question: 'Can you help with honey-do lists?',
        answer: 'Absolutely! We specialize in completing multiple small tasks in one visit. Send us your list for an estimate.'
      },
      {
        question: 'Are your handymen licensed and insured?',
        answer: 'Yes, all our handymen are licensed, insured, and background-checked for your peace of mind.'
      }
    ],
    relatedServices: ['home-repairs', 'interior-painting', 'trim-painting'],
    keywords: ['handyman', 'home repairs', 'property maintenance', 'fix-it services', 'home improvement', 'general repairs'],
    localKeywords: ['Spokane handyman', 'handyman near me', 'local handyman services'],
    commonIssues: ['Leaky faucets', 'Squeaky doors', 'Drywall holes', 'Broken fixtures', 'Stuck windows'],
    seasonalConsiderations: ['Year-round service', 'Winter prep services', 'Spring maintenance packages']
  },
  'home-repairs': {
    id: 'home-repairs',
    slug: 'home-repairs',
    title: 'Comprehensive Home Repair Services',
    shortTitle: 'Home Repairs',
    description: 'Expert repair services for every part of your home. From emergency fixes to preventive maintenance, we keep your home in perfect condition.',
    metaDescription: 'Home repair services in Spokane, WA. Drywall, plumbing, electrical, and more. Fast, reliable repairs by licensed professionals.',
    heroImage: '/images/services/home-repairs-hero.jpg',
    icon: 'Wrench',
    benefits: [
      'Prevent costly damage with timely repairs',
      'Restore safety and functionality',
      'Maintain property value',
      'Extend the life of home systems',
      'Peace of mind with warranty coverage',
      '24/7 emergency repair availability'
    ],
    process: [
      {
        step: 1,
        title: 'Damage Assessment',
        description: 'Inspect and diagnose the problem thoroughly'
      },
      {
        step: 2,
        title: 'Repair Plan',
        description: 'Develop solution and provide transparent pricing'
      },
      {
        step: 3,
        title: 'Parts & Materials',
        description: 'Source quality materials for lasting repairs'
      },
      {
        step: 4,
        title: 'Repair Execution',
        description: 'Complete repairs with attention to detail'
      },
      {
        step: 5,
        title: 'Testing',
        description: 'Ensure repairs function properly'
      },
      {
        step: 6,
        title: 'Warranty',
        description: 'Provide warranty documentation for peace of mind'
      }
    ],
    priceRange: '$$',
    duration: 'Varies by repair',
    faqs: [
      {
        question: 'Do you offer emergency home repair services?',
        answer: 'Yes, we offer 24/7 emergency repairs for urgent issues like water leaks, electrical problems, and storm damage.'
      },
      {
        question: 'What home repairs are most common in Spokane?',
        answer: 'Common repairs include frozen pipe damage, roof leaks from snow, foundation cracks from soil movement, and weather-related siding damage.'
      },
      {
        question: 'How quickly can you respond to repair requests?',
        answer: 'Emergency repairs within 2-4 hours. Standard repairs typically scheduled within 24-48 hours.'
      },
      {
        question: 'Do you warranty your repair work?',
        answer: 'Yes, we provide a 1-year warranty on labor and pass through all manufacturer warranties on parts.'
      },
      {
        question: 'Can you repair damage for insurance claims?',
        answer: 'Yes, we work with all insurance companies and can help document damage for claims.'
      }
    ],
    relatedServices: ['handyman-services', 'interior-painting', 'exterior-painting'],
    keywords: ['home repair', 'house repair', 'property repair', 'damage repair', 'emergency repair', 'maintenance'],
    localKeywords: ['Spokane home repair', 'emergency repair near me', 'local repair services'],
    commonIssues: ['Water damage', 'Storm damage', 'Foundation issues', 'Roof leaks', 'Electrical problems'],
    seasonalConsiderations: ['Winter freeze damage', 'Spring storm repairs', 'Fall maintenance prep']
  },
  'trim-painting': {
    id: 'trim-painting',
    slug: 'trim-painting',
    title: 'Professional Trim & Molding Painting',
    shortTitle: 'Trim Painting',
    description: 'Precision trim painting that adds the perfect finishing touch to your home. Expert detail work on baseboards, crown molding, doors, and window frames.',
    metaDescription: 'Trim painting services in Spokane, WA. Baseboards, crown molding, doors, and windows. Precision work with perfect lines!',
    heroImage: '/images/services/trim-painting-hero.jpg',
    icon: 'Frame',
    benefits: [
      'Create striking contrast and definition',
      'Highlight architectural features',
      'Refresh rooms without full repainting',
      'Protect wood trim from moisture damage',
      'Increase home value with attention to detail',
      'Cover scratches, dings, and wear marks'
    ],
    process: [
      {
        step: 1,
        title: 'Detailed Inspection',
        description: 'Assess trim condition and measure linear feet'
      },
      {
        step: 2,
        title: 'Surface Preparation',
        description: 'Clean, sand, fill gaps, and prime surfaces'
      },
      {
        step: 3,
        title: 'Taping & Protection',
        description: 'Carefully mask walls and floors for clean lines'
      },
      {
        step: 4,
        title: 'Paint Application',
        description: 'Apply paint with brushes for smooth finish'
      },
      {
        step: 5,
        title: 'Detail Work',
        description: 'Ensure perfect lines and consistent coverage'
      },
      {
        step: 6,
        title: 'Cleanup & Inspection',
        description: 'Remove tape and perform final quality check'
      }
    ],
    priceRange: '$',
    duration: '1-3 days',
    faqs: [
      {
        question: 'How much does trim painting cost in Spokane?',
        answer: 'Trim painting typically costs $1-3 per linear foot or $200-600 per room, depending on trim complexity and condition.'
      },
      {
        question: 'Should trim be painted before or after walls?',
        answer: 'We typically paint trim after walls for the cleanest lines, but can accommodate either sequence based on your project.'
      },
      {
        question: 'What type of paint is best for trim?',
        answer: 'Semi-gloss or gloss enamel paints are best for trim. They\'re durable, washable, and create an attractive contrast with walls.'
      },
      {
        question: 'How long does trim paint last?',
        answer: 'Quality trim paint lasts 5-10 years in normal conditions. High-traffic areas like door frames may need touch-ups sooner.'
      },
      {
        question: 'Can you paint stained wood trim?',
        answer: 'Yes, we can paint over stained trim with proper preparation including cleaning, sanding, and priming for adhesion.'
      }
    ],
    relatedServices: ['interior-painting', 'exterior-painting', 'handyman-services'],
    keywords: ['trim painting', 'baseboard painting', 'crown molding', 'door painting', 'window trim', 'molding painting'],
    localKeywords: ['Spokane trim painter', 'trim painting near me', 'local detail painting'],
    commonIssues: ['Chipped paint', 'Nail holes', 'Gaps and cracks', 'Yellowing trim', 'Pet damage'],
    seasonalConsiderations: ['Year-round service', 'Ideal during interior painting projects', 'Quick refresh before holidays']
  }
};

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData[slug];
}

export function getAllServices(): ServiceData[] {
  return Object.values(servicesData);
}

export function getRelatedServices(serviceId: string): ServiceData[] {
  const service = servicesData[serviceId];
  if (!service) return [];
  
  return service.relatedServices
    .map(id => servicesData[id])
    .filter(Boolean);
}