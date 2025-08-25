'use client';

import { useState } from 'react';
import {
  Copy,
  Twitter,
  Facebook,
  Linkedin,
  Heart,
  Bookmark
} from 'lucide-react';

interface SocialShareSidebarProps {
  title: string;
  slug: string;
}

export default function SocialShareSidebar({ title, slug }: SocialShareSidebarProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/blog/${slug}`;
    }
    return `https://burganhomeservices.com/blog/${slug}`;
  };

  const handleCopyLink = async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const url = getShareUrl();
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-32 flex flex-col items-center gap-4">
        <button
          onClick={handleCopyLink}
          className={`p-3 rounded-full transition-all hover:scale-110 ${
            copied 
              ? 'bg-green-100 text-green-600' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
          title={copied ? 'Copied!' : 'Copy link'}
        >
          <Copy className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className="p-3 bg-gray-100 hover:bg-blue-100 rounded-full transition-all hover:scale-110 text-gray-600 hover:text-blue-500"
          title="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleShare('facebook')}
          className="p-3 bg-gray-100 hover:bg-blue-100 rounded-full transition-all hover:scale-110 text-gray-600 hover:text-blue-600"
          title="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="p-3 bg-gray-100 hover:bg-blue-100 rounded-full transition-all hover:scale-110 text-gray-600 hover:text-blue-700"
          title="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </button>
        <div className="w-px h-8 bg-gray-300" />
        <button 
          onClick={() => setLiked(!liked)}
          className={`p-3 rounded-full transition-all hover:scale-110 ${
            liked 
              ? 'bg-red-100 text-red-500' 
              : 'bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-500'
          }`}
          title={liked ? 'Liked' : 'Like this post'}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
        </button>
        <button 
          onClick={() => setBookmarked(!bookmarked)}
          className={`p-3 rounded-full transition-all hover:scale-110 ${
            bookmarked 
              ? 'bg-yellow-100 text-yellow-600' 
              : 'bg-gray-100 hover:bg-yellow-100 text-gray-600 hover:text-yellow-600'
          }`}
          title={bookmarked ? 'Bookmarked' : 'Bookmark this post'}
        >
          <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>
    </aside>
  );
}