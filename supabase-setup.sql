-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  description TEXT,
  before_image_url TEXT NOT NULL,
  after_image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true);

-- Set up RLS (Row Level Security) policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to projects
CREATE POLICY "Public can view projects" ON projects
  FOR SELECT USING (true);

-- Allow authenticated users to insert projects (admin only)
CREATE POLICY "Authenticated can insert projects" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update projects (admin only)
CREATE POLICY "Authenticated can update projects" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete projects (admin only)
CREATE POLICY "Authenticated can delete projects" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');

-- Storage policies for project-images bucket
CREATE POLICY "Public can view images" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated can upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete images" ON storage.objects
  FOR DELETE USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- Create an index for better performance
CREATE INDEX projects_created_at_idx ON projects(created_at DESC);
CREATE INDEX projects_category_idx ON projects(category);