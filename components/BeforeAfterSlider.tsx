'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'BEFORE',
  afterLabel = 'AFTER',
  initialPosition = 50,
  onDragStart,
  onDragEnd
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    onDragStart?.();
    handleMouseMove(e);
  };

  const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    onDragEnd?.();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    onDragStart?.();
    handleTouchMove(e);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    onDragEnd?.();
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMouseMove(e);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      onDragEnd?.();
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-lg cursor-col-resize select-none group"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt="After"
          className="w-full h-full object-cover"
          draggable={false}
        />
        
        {/* After Label */}
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt="Before"
          className="w-full h-full object-cover"
          draggable={false}
        />
        
        {/* Before Label */}
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Line and Handle */}
      <div 
        className="absolute top-0 bottom-0 z-20"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Vertical Line - full height */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg left-1/2 transform -translate-x-1/2"></div>
        
        {/* Slider Handle - with line going through it */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Handle background circle */}
          <motion.div 
            className="relative w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center cursor-col-resize group-hover:scale-110 transition-transform border-2 border-white"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              boxShadow: '0 4px 12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.1)'
            }}
          >
            {/* Line continuation through handle */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-300 transform -translate-x-1/2"></div>
            
            {/* Arrow icons */}
            <div className="flex items-center z-10 relative bg-white rounded-full p-1">
              <ChevronLeft className="w-3 h-3 text-gray-600 -mr-0.5" />
              <ChevronRight className="w-3 h-3 text-gray-600 -ml-0.5" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Instruction Text (appears on hover) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isDragging ? 0 : 1, y: isDragging ? 10 : 0 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
      >
        Drag to compare
      </motion.div>

      {/* Touch Instructions for Mobile */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none md:hidden">
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: isDragging ? 0 : 0.8 }}
          className="bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm"
        >
          Swipe to compare
        </motion.div>
      </div>
    </div>
  );
}