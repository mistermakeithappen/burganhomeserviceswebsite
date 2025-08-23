/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Image as ImageIcon, 
  Crop,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { uploadImage, createProject } from '@/lib/supabase';

// Define crop types for react-image-crop v11
interface Crop {
  x: number;
  y: number;
  width: number;
  height: number;
  unit: 'px' | '%';
}

interface PixelCrop extends Crop {
  unit: 'px';
}

interface ProjectUploadProps {
  onSave: (project: any) => void;
}

export default function ProjectUpload({ onSave }: ProjectUploadProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    description: ''
  });
  
  const [beforeImage, setBeforeImage] = useState<string>('');
  const [afterImage, setAfterImage] = useState<string>('');
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [beforeCrop, setBeforeCrop] = useState<Crop | undefined>();
  const [afterCrop, setAfterCrop] = useState<Crop | undefined>();
  const [cropMode, setCropMode] = useState<'before' | 'after' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');
  
  const beforeFileRef = useRef<HTMLInputElement>(null);
  const afterFileRef = useRef<HTMLInputElement>(null);
  const beforeImgRef = useRef<HTMLImageElement>(null);
  const afterImgRef = useRef<HTMLImageElement>(null);

  const categories = [
    'Kitchen Remodel',
    'Bathroom Remodel', 
    'Exterior Painting',
    'Interior Painting',
    'Deck Building',
    'Roof Replacement',
    'Flooring',
    'Drywall Repair',
    'Siding Installation'
  ];

  const handleFileUpload = (type: 'before' | 'after', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (type === 'before') {
        setBeforeImage(result);
        setBeforeFile(file);
      } else {
        setAfterImage(result);
        setAfterFile(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent, type: 'before' | 'after') => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(type, file);
    }
  };

  const getCroppedImg = useCallback((
    image: HTMLImageElement,
    crop: PixelCrop
  ): Promise<File> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Canvas is empty');
        }
        const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
        resolve(file);
      }, 'image/jpeg', 0.95);
    });
  }, []);

  const applyCrop = async (type: 'before' | 'after') => {
    const imgRef = type === 'before' ? beforeImgRef : afterImgRef;
    const crop = type === 'before' ? beforeCrop : afterCrop;
    
    if (!imgRef.current || !crop) return;

    try {
      setIsProcessing(true);
      const croppedFile = await getCroppedImg(imgRef.current, crop as PixelCrop);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === 'before') {
          setBeforeImage(result);
          setBeforeFile(croppedFile);
          setBeforeCrop(undefined);
        } else {
          setAfterImage(result);
          setAfterFile(croppedFile);
          setAfterCrop(undefined);
        }
      };
      reader.readAsDataURL(croppedFile);
      
      setCropMode(null);
    } catch (error) {
      console.error('Error cropping image:', error);
      setUploadStatus('error');
      setUploadMessage('Error cropping image');
    } finally {
      setIsProcessing(false);
    }
  };

  const generateFileName = (prefix: string, originalName: string) => {
    const timestamp = Date.now();
    const extension = originalName.split('.').pop();
    return `${prefix}-${timestamp}.${extension}`;
  };

  const handleSave = async () => {
    if (!beforeFile || !afterFile || !formData.title || !formData.category) {
      setUploadStatus('error');
      setUploadMessage('Please fill in all required fields and upload both images');
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      // Upload images to Supabase Storage
      const beforeFileName = generateFileName('before', beforeFile.name);
      const afterFileName = generateFileName('after', afterFile.name);

      const [beforeImageUrl, afterImageUrl] = await Promise.all([
        uploadImage(beforeFile, 'project-images', beforeFileName),
        uploadImage(afterFile, 'project-images', afterFileName)
      ]);

      // Create project in database
      const project = await createProject({
        title: formData.title,
        category: formData.category,
        location: formData.location,
        description: formData.description,
        before_image_url: beforeImageUrl,
        after_image_url: afterImageUrl
      });

      setUploadStatus('success');
      setUploadMessage('Project uploaded successfully!');

      // Call the parent callback
      onSave(project);

      // Reset form after a delay
      setTimeout(() => {
        setFormData({ title: '', category: '', location: '', description: '' });
        setBeforeImage('');
        setAfterImage('');
        setBeforeFile(null);
        setAfterFile(null);
        setUploadStatus('idle');
        setUploadMessage('');
      }, 2000);

    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      setUploadMessage(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Project Details Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Project Details</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-semibold mb-2">Project Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="e.g., Modern Kitchen Transformation"
            />
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="e.g., Spokane, WA"
            />
          </div>
          
          <div>
            <label className="block text-white font-semibold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Brief description of the project..."
            />
          </div>
        </div>
      </motion.div>

      {/* Image Upload Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Before Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <div className="w-6 h-6 bg-red-500 rounded mr-2"></div>
            Before Image
          </h3>
          
          {!beforeImage ? (
            <div
              onDrop={(e) => handleDrop(e, 'before')}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => beforeFileRef.current?.click()}
              className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center cursor-pointer hover:border-yellow-400 transition-colors"
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-white mb-2">Drop image here or click to upload</p>
              <p className="text-gray-400 text-sm">JPG, PNG up to 10MB</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cropMode === 'before' ? (
                <div className="space-y-4">
                  <ReactCrop
                    crop={beforeCrop}
                    onChange={(c) => setBeforeCrop(c ? { ...c, unit: c.unit || '%' } : undefined)}
                    aspect={4/3}
                  >
                    <img
                      ref={beforeImgRef}
                      src={beforeImage}
                      alt="Before crop"
                      className="max-w-full rounded-lg"
                    />
                  </ReactCrop>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => applyCrop('before')}
                      disabled={isProcessing}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                      {isProcessing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                      Apply
                    </button>
                    <button
                      onClick={() => setCropMode(null)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <img src={beforeImage} alt="Before" className="w-full rounded-lg" />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCropMode('before')}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                      <Crop className="w-4 h-4 mr-2" />
                      Crop & Align
                    </button>
                    <button
                      onClick={() => beforeFileRef.current?.click()}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Replace
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <input
            ref={beforeFileRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload('before', file);
            }}
            className="hidden"
          />
        </motion.div>

        {/* After Image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <div className="w-6 h-6 bg-green-500 rounded mr-2"></div>
            After Image
          </h3>
          
          {!afterImage ? (
            <div
              onDrop={(e) => handleDrop(e, 'after')}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => afterFileRef.current?.click()}
              className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center cursor-pointer hover:border-yellow-400 transition-colors"
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-white mb-2">Drop image here or click to upload</p>
              <p className="text-gray-400 text-sm">JPG, PNG up to 10MB</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cropMode === 'after' ? (
                <div className="space-y-4">
                  <ReactCrop
                    crop={afterCrop}
                    onChange={(c) => setAfterCrop(c ? { ...c, unit: c.unit || '%' } : undefined)}
                    aspect={4/3}
                  >
                    <img
                      ref={afterImgRef}
                      src={afterImage}
                      alt="After crop"
                      className="max-w-full rounded-lg"
                    />
                  </ReactCrop>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => applyCrop('after')}
                      disabled={isProcessing}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                      {isProcessing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                      Apply
                    </button>
                    <button
                      onClick={() => setCropMode(null)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <img src={afterImage} alt="After" className="w-full rounded-lg" />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCropMode('after')}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                      <Crop className="w-4 h-4 mr-2" />
                      Crop & Align
                    </button>
                    <button
                      onClick={() => afterFileRef.current?.click()}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Replace
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <input
            ref={afterFileRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload('after', file);
            }}
            className="hidden"
          />
        </motion.div>
      </div>

      {/* Status Messages */}
      {uploadStatus !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-lg p-4 flex items-start ${
            uploadStatus === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}
        >
          {uploadStatus === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
          )}
          <div>
            <p className={`font-semibold ${uploadStatus === 'success' ? 'text-green-800' : 'text-red-800'}`}>
              {uploadStatus === 'success' ? 'Success!' : 'Error'}
            </p>
            <p className={`text-sm ${uploadStatus === 'success' ? 'text-green-700' : 'text-red-700'}`}>
              {uploadMessage}
            </p>
          </div>
        </motion.div>
      )}

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <button
          onClick={handleSave}
          disabled={!beforeFile || !afterFile || !formData.title || !formData.category || isUploading}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
        >
          {isUploading ? (
            <>
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              Uploading to Supabase...
            </>
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" />
              Save Project
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
}