'use client';

import { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
  content: string;
}

export default function InfoTooltip({ content }: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && buttonRef.current && tooltipRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      // Position tooltip above by default
      let top = buttonRect.top - tooltipRect.height - 8;
      let left = buttonRect.left + (buttonRect.width / 2) - (tooltipRect.width / 2);
      
      // If tooltip would go off top of screen, position below
      if (top < 10) {
        top = buttonRect.bottom + 8;
      }
      
      // Keep tooltip within viewport horizontally
      if (left < 10) {
        left = 10;
      } else if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
      }
      
      setPosition({ top, left });
    }
  }, [isVisible]);

  return (
    <>
      <div 
        ref={buttonRef}
        className="inline-flex items-center ml-1"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <Info className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 cursor-help transition-colors" />
      </div>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-[9999] pointer-events-none"
          style={{ top: `${position.top}px`, left: `${position.left}px` }}
        >
          <div className="bg-slate-900 text-white text-xs rounded-lg shadow-xl p-3 max-w-xs">
            <div className="leading-relaxed">
              {content}
            </div>
          </div>
        </div>
      )}
    </>
  );
}