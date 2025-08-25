-- Drop existing policies first
DROP POLICY IF EXISTS "Public can view blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can delete blog images" ON storage.objects;

-- Then create new policies
CREATE POLICY "Public can view blog images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload blog images" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'blog-images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update blog images" 
ON storage.objects FOR UPDATE 
USING (
  bucket_id = 'blog-images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete blog images" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'blog-images' 
  AND auth.role() = 'authenticated'
);