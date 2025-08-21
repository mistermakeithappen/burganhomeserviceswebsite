'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

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
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setHasInteracted(true);
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
    e.preventDefault();
    setIsDragging(true);
    setHasInteracted(true);
    onDragStart?.();
    touchStartX.current = e.touches[0].clientX;
    handleTouchMove(e);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    e.preventDefault();
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
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

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging && containerRef.current) {
        e.preventDefault();
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percentage);
      }
    };

    const handleGlobalTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        onDragEnd?.();
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      document.addEventListener('touchend', handleGlobalTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, onDragEnd]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-lg cursor-col-resize select-none group"
      style={{ 
        touchAction: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src={afterImage}
            alt="After"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            draggable={false}
            priority
            quality={90}
          />
        </div>
        
        {/* After Label */}
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          willChange: 'clip-path'
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src={beforeImage}
            alt="Before"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            draggable={false}
            priority
            quality={90}
          />
        </div>
        
        {/* Before Label */}
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Line and Handle */}
      <div 
        className="absolute top-0 bottom-0 z-20"
        style={{ 
          left: `${sliderPosition}%`, 
          transform: 'translateX(-50%)',
          willChange: 'left'
        }}
      >
        {/* Vertical Line - full height */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg left-1/2 transform -translate-x-1/2"></div>
        
        {/* Slider Handle - with line going through it */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Handle background circle */}
          <motion.div 
            className="relative w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-col-resize group-hover:scale-110 transition-transform border-2 border-white"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              boxShadow: '0 4px 12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.1)',
              willChange: 'transform'
            }}
          >
            {/* Line continuation through handle */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-300 transform -translate-x-1/2"></div>
            
            {/* Arrow icons */}
            <div className="flex items-center z-10 relative bg-white rounded-full p-1">
              <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 text-gray-600 -mr-0.5" />
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-gray-600 -ml-0.5" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Instruction Text (appears on hover on desktop) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isDragging ? 0 : 1, y: isDragging ? 10 : 0 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block"
      >
        Drag to compare
      </motion.div>

      {/* Touch Instructions for Mobile - only show if not interacted */}
      {!hasInteracted && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none md:hidden">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isDragging ? 0 : 0.8 }}
            exit={{ opacity: 0 }}
            className="bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm"
          >
            Swipe to compare
          </motion.div>
        </div>
      )}
    </div>
  );
}