import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://burganhomeservices.com'),
  title: 'Burgan Home Services - Your Contractor for Life | Spokane WA',
  description: 'Professional home services in Spokane. Painting, handyman, remodeling, roofing, and more. Serving families since 1873. Call 509-955-2545 for free estimates.',
  keywords: 'Spokane contractor, home services, painting, remodeling, roofing, handyman, Burgan Home Services',
  authors: [{ name: 'Burgan Home Services' }],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
      { url: '/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Burgan Home Services - Your Contractor for Life',
    description: 'Professional home services in Spokane. Painting, handyman, remodeling, roofing, and more. Serving families since 1873.',
    url: 'https://burganhomeservices.com',
    siteName: 'Burgan Home Services',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Burgan Home Services - Your Contractor for Life',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Burgan Home Services - Your Contractor for Life',
    description: 'Professional home services in Spokane. Painting, handyman, remodeling, roofing, and more.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google50519d600c9e2ae0',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <GoogleAnalytics />
        {children}
        <Footer />
      </body>
    </html>
  )
}