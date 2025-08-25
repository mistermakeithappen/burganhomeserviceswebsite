'use client';

import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { uploadImage } from '@/lib/supabase';

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  onClose?: () => void;
  bucketName?: string;
}

export default function ImageUploader({ 
  onUpload, 
  onClose,
  bucketName = 'blog-images' 
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleFile(files[0]);
    } else {
      setError('Please drop an image file');
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setError(null);
    setIsUploading(true);

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      // Generate unique filename
      const timestamp = Date.now();
      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${timestamp}-${cleanName}`;

      // Upload to Supabase
      const publicUrl = await uploadImage(file, bucketName, fileName);
      
      // Return the URL to parent component
      onUpload(publicUrl);
      
      // Reset state after short delay
      setTimeout(() => {
        setPreview(null);
        setIsUploading(false);
        if (onClose) onClose();
      }, 500);
    } catch (err) {
      setIsUploading(false);
      setError(err instanceof Error ? err.message : 'Upload failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Upload Image</h3>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded"
              disabled={isUploading}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {preview ? (
            <div className="space-y-4">
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 mx-auto rounded"
              />
              {isUploading && (
                <div className="flex items-center justify-center gap-2 text-indigo-600">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Uploading...</span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                {isDragging ? (
                  <Upload className="w-12 h-12 text-indigo-500" />
                ) : (
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                )}
              </div>
              
              <div>
                <p className="text-gray-600 mb-2">
                  {isDragging
                    ? 'Drop your image here'
                    : 'Drag and drop an image here, or'}
                </p>
                
                <label className="inline-block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <span className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded cursor-pointer transition-colors">
                    Browse Files
                  </span>
                </label>
              </div>
              
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}