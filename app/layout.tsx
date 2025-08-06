import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Burgan Home Services - Your Contractor for Life',
  description: 'Professional home services in Spokane. Painting, handyman, remodeling, roofing, and more. Serving families since 1873.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}