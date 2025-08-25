'use client';

import { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
  className?: string;
}

export default function Tooltip({ content, className = '' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className={`text-indigo-500 hover:text-indigo-700 transition-colors ${className}`}
      >
        <HelpCircle className="w-4 h-4" />
      </button>
      
      {isVisible && (
        <div className="absolute z-50 left-full top-1/2 transform -translate-y-1/2 ml-2">
          <div className="relative bg-gray-900 text-white text-sm rounded-lg shadow-2xl p-3 max-w-sm w-64">
            <div className="absolute right-full top-1/2 transform -translate-y-1/2">
              <div className="border-8 border-transparent border-r-gray-900"></div>
            </div>
            <div className="font-normal leading-relaxed">
              {content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}