import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Portal | Burgan Home Services',
  description: 'Admin portal for managing Burgan Home Services gallery and content.',
  robots: 'noindex, nofollow' // Prevent search engines from indexing admin pages
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}