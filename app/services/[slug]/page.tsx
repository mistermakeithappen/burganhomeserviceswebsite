import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import { getServiceBySlug, getAllServices } from '@/lib/serviceData';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  
  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} | Burgan Home Services`,
    description: service.metaDescription,
    keywords: service.keywords.join(', '),
    openGraph: {
      title: service.title,
      description: service.metaDescription,
      url: `https://burganhomeservices.com/services/${service.slug}`,
      siteName: 'Burgan Home Services',
      images: [
        {
          url: service.heroImage,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.title,
      description: service.metaDescription,
      images: [service.heroImage],
    },
    alternates: {
      canonical: `https://burganhomeservices.com/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServicePageTemplate service={service} />;
}