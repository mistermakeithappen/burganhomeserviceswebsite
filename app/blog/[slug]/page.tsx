import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  Calendar, 
  Clock, 
  ArrowLeft,
  ArrowRight,
  User,
  BookOpen
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  if (!supabase) {
    return {
      title: 'Blog | Burgan Home Services',
    };
  }
  
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!post) {
    return {
      title: 'Post Not Found | Burgan Home Services',
    };
  }

  return {
    title: `${post.title} | Burgan Home Services`,
    description: post.meta_description || post.excerpt || post.content.substring(0, 160),
    keywords: post.meta_keywords?.join(', '),
    openGraph: {
      title: post.title,
      description: post.meta_description || post.excerpt,
      images: post.featured_image_url ? [post.featured_image_url] : [],
    },
  };
}

async function getBlogPost(slug: string) {
  if (!supabase) return null;
  
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !post) {
    return null;
  }

  return post;
}

async function getRelatedPosts(category: string, currentSlug: string) {
  if (!supabase) return [];
  
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .eq('category', category)
    .neq('slug', currentSlug)
    .order('published_at', { ascending: false })
    .limit(3);

  return posts || [];
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.category, post.slug);
  const readingTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <>
      <Header />
      
      <article className="min-h-screen bg-white">
        {/* Hero Section with Better Design */}
        <section className="relative bg-slate-900 text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative">
            <div className="container mx-auto px-6 md:px-8 lg:px-12 pt-32 pb-16">
              <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-slate-400 text-sm mb-8">
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                  <span>/</span>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                  <span>/</span>
                  <span className="text-white">{post.category}</span>
                </nav>

                {/* Post Meta */}
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500 text-slate-900">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-4 text-sm text-slate-300">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.published_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {readingTime} min read
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {post.content.split(' ').length.toLocaleString()} words
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  {post.title}
                </h1>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-xl text-slate-300 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                {/* Author */}
                <div className="flex items-center gap-4 mt-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-slate-900 font-bold text-lg">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-white">Written by</p>
                    <p className="text-slate-300">{post.author}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.featured_image_url && (
          <section className="relative -mt-8 mb-12 md:mb-16">
            <div className="container mx-auto px-6 md:px-8 lg:px-12">
              <div className="max-w-5xl mx-auto">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={post.featured_image_url}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1280px) 100vw, 1280px"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-6 md:px-8 lg:px-12">
            <div className="max-w-3xl mx-auto">
              {/* Article Content */}
              <div className="prose prose-lg md:prose-xl prose-slate max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({children}) => (
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-10 mb-4">
                        {children}
                      </h2>
                    ),
                    h2: ({children}) => (
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">
                        {children}
                      </h3>
                    ),
                    h3: ({children}) => (
                      <h4 className="text-lg md:text-xl font-semibold text-slate-800 mt-6 mb-3">
                        {children}
                      </h4>
                    ),
                    p: ({children}) => (
                      <p className="text-base md:text-lg leading-relaxed text-slate-700 mb-6">
                        {children}
                      </p>
                    ),
                    ul: ({children}) => (
                      <ul className="my-6 space-y-3">
                        {children}
                      </ul>
                    ),
                    ol: ({children}) => (
                      <ol className="my-6 space-y-3">
                        {children}
                      </ol>
                    ),
                    li: ({children}) => (
                      <li className="text-base md:text-lg text-slate-700 leading-relaxed pl-2">
                        <span className="text-yellow-500 font-bold mr-2">•</span>
                        {children}
                      </li>
                    ),
                    blockquote: ({children}) => (
                      <blockquote className="relative my-10 pl-8 pr-4 py-4 bg-slate-50 border-l-4 border-yellow-500 rounded-r-lg">
                        <div className="absolute -left-3 top-4 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl font-serif">"</span>
                        </div>
                        <div className="text-xl italic text-slate-700 ml-4">
                          {children}
                        </div>
                      </blockquote>
                    ),
                    code: ({className, children, ...props}) => {
                      const match = /language-(\w+)/.exec(className || '');
                      const isInline = !match;
                      return isInline ? (
                        <code className="bg-slate-100 text-pink-600 px-2 py-1 rounded text-base font-mono" {...props}>
                          {children}
                        </code>
                      ) : (
                        <div className="my-8 rounded-xl overflow-hidden shadow-lg">
                          <div className="bg-slate-800 px-4 py-2 text-slate-400 text-sm font-mono">
                            {match ? match[1] : 'code'}
                          </div>
                          <pre className="bg-slate-900 text-slate-100 p-6 overflow-x-auto">
                            <code className="text-sm font-mono leading-relaxed" {...props}>
                              {children}
                            </code>
                          </pre>
                        </div>
                      );
                    },
                    a: ({href, children}) => (
                      <a 
                        href={href} 
                        className="text-yellow-600 hover:text-yellow-700 underline underline-offset-4 font-medium transition-colors" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    img: ({src, alt}) => (
                      <figure className="my-10">
                        <img 
                          src={src} 
                          alt={alt} 
                          className="w-full rounded-xl shadow-xl" 
                        />
                        {alt && (
                          <figcaption className="text-center text-sm text-slate-500 mt-3 italic">
                            {alt}
                          </figcaption>
                        )}
                      </figure>
                    ),
                    hr: () => (
                      <hr className="my-12 border-slate-200" />
                    ),
                    table: ({children}) => (
                      <div className="my-8 overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({children}) => (
                      <th className="px-6 py-3 bg-slate-50 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                        {children}
                      </th>
                    ),
                    td: ({children}) => (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t-2 border-slate-100">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                    Tagged With
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="container mx-auto px-6 md:px-8 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Start Your Home Project?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied homeowners who trust Burgan Home Services for quality work and exceptional service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-lg transition-all transform hover:scale-105 shadow-xl"
                >
                  Get Your Free Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-all"
                >
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="py-16 md:py-20 bg-slate-50">
            <div className="container mx-auto px-6 md:px-8 lg:px-12">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    Continue Reading
                  </h2>
                  <p className="text-lg text-slate-600">
                    Explore more insights and tips from our experts
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="group"
                    >
                      <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        {relatedPost.featured_image_url ? (
                          <div className="relative h-56 overflow-hidden bg-slate-100">
                            <Image
                              src={relatedPost.featured_image_url}
                              alt={relatedPost.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        ) : (
                          <div className="h-56 bg-gradient-to-br from-slate-700 to-slate-900" />
                        )}
                        
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-semibold text-yellow-600 uppercase tracking-wider">
                              {relatedPost.category}
                            </span>
                            <span className="text-xs text-slate-500">
                              {new Date(relatedPost.published_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                            {relatedPost.title}
                          </h3>
                          
                          {relatedPost.excerpt && (
                            <p className="text-slate-600 line-clamp-2 text-sm">
                              {relatedPost.excerpt}
                            </p>
                          )}
                          
                          <div className="mt-4 flex items-center text-yellow-600 font-semibold text-sm">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </article>

      <Footer />
    </>
  );
}