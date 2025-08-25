import { Metadata } from 'next';
import { getSupabaseClient } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import NewsletterForm from '@/components/NewsletterForm';

export const metadata: Metadata = {
  title: 'Blog | Home Improvement Tips & Guides | Burgan Home Services',
  description: 'Expert home improvement tips, maintenance guides, and project showcases from Burgan Home Services in Spokane, WA.',
};

async function getBlogPosts() {
  const supabase = getSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client is not initialized');
    return [];
  }
  
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return posts || [];
}

async function getCategories() {
  const supabase = getSupabaseClient();
  
  if (!supabase) {
    console.warn('Supabase client is not initialized');
    return [];
  }
  
  const { data: categories, error } = await supabase
    .from('blog_categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return categories || [];
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getCategories()
  ]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 pt-28">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Home Improvement Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Expert tips, guides, and insights from Spokane&apos;s trusted home service professionals
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {posts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  Coming Soon!
                </h2>
                <p className="text-gray-600">
                  We&apos;re working on bringing you valuable home improvement content. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid gap-8">
                {posts.map((post: any) => (
                  <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    {post.featured_image_url && (
                      <Link href={`/blog/${post.slug}`}>
                        <div className="relative h-64 md:h-80">
                          <Image
                            src={post.featured_image_url}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.published_at).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {Math.ceil(post.content.split(' ').length / 200)} min read
                        </span>
                        {post.category && (
                          <span className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            {post.category}
                          </span>
                        )}
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-3">
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="text-slate-900 hover:text-yellow-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      
                      {post.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-semibold"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Categories */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-slate-900">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category: any) => (
                    <li key={category.id}>
                      <Link
                        href={`/blog/category/${category.slug}`}
                        className="text-gray-600 hover:text-yellow-600 transition-colors"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Need Help With Your Project?</h3>
                <p className="mb-4">
                  Get a free quote from Spokane&apos;s most trusted home service professionals.
                </p>
                <Link
                  href="/#contact"
                  className="inline-block bg-white text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get Free Quote
                </Link>
              </div>

              {/* Newsletter Signup */}
              <NewsletterForm />
            </div>
          </aside>
        </div>
      </div>
    </div>
    </>
  );
}