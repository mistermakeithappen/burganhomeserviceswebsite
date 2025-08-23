import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LocationServicePageTemplate from '@/components/templates/LocationServicePageTemplate';
import { getServiceBySlug, getAllServices } from '@/lib/serviceData';
import { getLocationBySlug, getAllLocations } from '@/lib/locationData';

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

function parseSlug(slug: string[]): { service?: string; location?: string } | null {
  if (slug.length !== 1) return null;
  
  const fullSlug = slug[0];
  
  // Try to match pattern: service-location-state
  // e.g., bathroom-remodeling-spokane-wa
  const services = getAllServices();
  const locations = getAllLocations();
  
  for (const service of services) {
    for (const location of locations) {
      const expectedSlug = `${service.slug}-${location.slug}`;
      if (fullSlug === expectedSlug) {
        return { service: service.slug, location: location.slug };
      }
    }
  }
  
  return null;
}

export async function generateStaticParams() {
  const services = getAllServices();
  const locations = getAllLocations();
  const paths = [];
  
  // Generate paths for top priority combinations
  const priorityServices = ['bathroom-remodeling', 'kitchen-remodeling', 'interior-painting', 'exterior-painting', 'handyman-services'];
  const priorityLocations = ['spokane-wa', 'spokane-valley-wa', 'liberty-lake-wa', 'south-hill-spokane', 'north-side-spokane'];
  
  for (const serviceSlug of priorityServices) {
    for (const locationSlug of priorityLocations) {
      paths.push({
        slug: [`${serviceSlug}-${locationSlug}`]
      });
    }
  }
  
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  
  if (!parsed || !parsed.service || !parsed.location) {
    return {
      title: 'Page Not Found',
    };
  }
  
  const service = getServiceBySlug(parsed.service);
  const location = getLocationBySlug(parsed.location);
  
  if (!service || !location) {
    return {
      title: 'Page Not Found',
    };
  }
  
  const title = `${service.shortTitle} in ${location.name}, ${location.stateAbbr} | Burgan Home Services`;
  const description = `Professional ${service.shortTitle.toLowerCase()} services in ${location.name}, ${location.stateAbbr}. ${location.responseTime} response time. Licensed, insured, and trusted since 1873. Call (509) 955-2545 for free quote!`;
  
  return {
    title,
    description,
    keywords: [
      ...service.keywords,
      `${service.shortTitle} ${location.name}`,
      `${service.shortTitle} ${location.name} ${location.stateAbbr}`,
      `${location.name} ${service.shortTitle}`,
      ...service.localKeywords || []
    ].join(', '),
    openGraph: {
      title,
      description,
      url: `https://burganhomeservices.com/${service.slug}-${location.slug}`,
      siteName: 'Burgan Home Services',
      images: [
        {
          url: service.heroImage,
          width: 1200,
          height: 630,
          alt: `${service.shortTitle} in ${location.name}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [service.heroImage],
    },
    alternates: {
      canonical: `https://burganhomeservices.com/${service.slug}-${location.slug}`,
    },
  };
}

export default async function LocationServicePage({ params }: Props) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  
  if (!parsed || !parsed.service || !parsed.location) {
    notFound();
  }
  
  const service = getServiceBySlug(parsed.service);
  const location = getLocationBySlug(parsed.location);
  
  if (!service || !location) {
    notFound();
  }
  
  return <LocationServicePageTemplate service={service} location={location} />;
}