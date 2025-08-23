import { Metadata } from 'next';
import ServiceAreasHub from '@/components/ServiceAreasHub';

export const metadata: Metadata = {
  title: 'Service Areas | Burgan Home Services - Spokane & Surrounding Areas',
  description: 'Burgan Home Services proudly serves Spokane, Spokane Valley, Liberty Lake, Cheney, and surrounding areas. Professional home services with fast response times throughout Eastern Washington and North Idaho.',
  keywords: 'Spokane service areas, home services near me, contractors Spokane Valley, Liberty Lake handyman, Cheney home repair, Airway Heights contractor, Deer Park painting, Medical Lake remodeling',
  openGraph: {
    title: 'Service Areas - Spokane & Surrounding Communities',
    description: 'Professional home services throughout the greater Spokane area. Find our services in your neighborhood.',
    url: 'https://burganhomeservices.com/service-areas',
    siteName: 'Burgan Home Services',
    images: [
      {
        url: '/images/spokane-map.jpg',
        width: 1200,
        height: 630,
        alt: 'Burgan Home Services Coverage Map',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://burganhomeservices.com/service-areas',
  },
};

export default function ServiceAreasPage() {
  return <ServiceAreasHub />;
}