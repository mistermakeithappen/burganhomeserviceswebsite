import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

// Simple auth token - in production, use environment variable
const WEBHOOK_SECRET = process.env.BLOG_WEBHOOK_SECRET || 'your-secret-token-here';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${WEBHOOK_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    const { title, content, category, excerpt, tags, status = 'published' } = body;
    
    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, and category are required' },
        { status: 400 }
      );
    }

    // Generate slug from title if not provided
    const slug = body.slug || generateSlug(title);
    
    // Prepare blog post data
    const blogPost = {
      title,
      slug,
      content,
      category,
      excerpt: excerpt || content.substring(0, 200) + '...',
      tags: tags || [],
      author: body.author || 'Burgan Home Services',
      featured_image_url: body.featured_image_url || null,
      meta_description: body.meta_description || excerpt || content.substring(0, 160),
      meta_keywords: body.meta_keywords || tags || [],
      status,
      published_at: status === 'published' ? new Date().toISOString() : null,
    };

    // Insert into Supabase
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([blogPost])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      
      // Handle duplicate slug error
      if (error.code === '23505' && error.message.includes('slug')) {
        // Try with a timestamp suffix
        blogPost.slug = `${slug}-${Date.now()}`;
        
        const { data: retryData, error: retryError } = await supabase
          .from('blog_posts')
          .insert([blogPost])
          .select()
          .single();
          
        if (retryError) {
          return NextResponse.json(
            { error: 'Failed to create blog post', details: retryError.message },
            { status: 500 }
          );
        }
        
        return NextResponse.json({
          success: true,
          message: 'Blog post created successfully',
          data: retryData,
          url: `https://burganhomeservices.com/blog/${retryData.slug}`
        });
      }
      
      return NextResponse.json(
        { error: 'Failed to create blog post', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully',
      data,
      url: `https://burganhomeservices.com/blog/${data.slug}`
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint for testing
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Blog webhook endpoint is active',
    usage: {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer your-secret-token-here',
        'Content-Type': 'application/json'
      },
      body: {
        required: {
          title: 'Blog post title',
          content: 'Blog post content (supports markdown)',
          category: 'Category name (e.g., Home Improvement)'
        },
        optional: {
          slug: 'custom-url-slug',
          excerpt: 'Short description',
          tags: ['tag1', 'tag2'],
          author: 'Author name',
          featured_image_url: 'https://example.com/image.jpg',
          meta_description: 'SEO description',
          meta_keywords: ['keyword1', 'keyword2'],
          status: 'published | draft | archived'
        }
      }
    },
    categories: [
      'Home Improvement',
      'Maintenance Tips',
      'DIY Guides',
      'Seasonal Tips',
      'Project Showcases',
      'Industry News'
    ]
  });
}