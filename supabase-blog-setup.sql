-- Create blog posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  author TEXT DEFAULT 'Burgan Home Services',
  category TEXT NOT NULL,
  tags TEXT[],
  meta_description TEXT,
  meta_keywords TEXT[],
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog categories table
CREATE TABLE blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO blog_categories (name, slug, description) VALUES
  ('Home Improvement', 'home-improvement', 'Tips and guides for improving your home'),
  ('Maintenance Tips', 'maintenance-tips', 'Regular maintenance advice for homeowners'),
  ('DIY Guides', 'diy-guides', 'Do-it-yourself tutorials and instructions'),
  ('Seasonal Tips', 'seasonal-tips', 'Seasonal home care and preparation advice'),
  ('Project Showcases', 'project-showcases', 'Featured projects and transformations'),
  ('Industry News', 'industry-news', 'Latest news and trends in home services');

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS (Row Level Security) policies for blog_posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published blog posts
CREATE POLICY "Public can view published posts" ON blog_posts
  FOR SELECT USING (status = 'published');

-- Allow authenticated users to manage blog posts
CREATE POLICY "Authenticated can insert posts" ON blog_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update posts" ON blog_posts
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete posts" ON blog_posts
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can view all posts" ON blog_posts
  FOR SELECT USING (auth.role() = 'authenticated');

-- Set up RLS for blog_categories
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view categories" ON blog_categories
  FOR SELECT USING (true);

CREATE POLICY "Authenticated can manage categories" ON blog_categories
  FOR ALL USING (auth.role() = 'authenticated');

-- Storage policies for blog-images bucket
CREATE POLICY "Public can view blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update blog images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete blog images" ON storage.objects
  FOR DELETE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX blog_posts_published_at_idx ON blog_posts(published_at DESC) WHERE status = 'published';
CREATE INDEX blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX blog_posts_category_idx ON blog_posts(category);
CREATE INDEX blog_posts_status_idx ON blog_posts(status);
CREATE INDEX blog_posts_tags_idx ON blog_posts USING GIN(tags);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();