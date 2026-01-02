'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Background {
  id: string;
  name: string;
  url: string;
  thumbnail: string | null;
  description: string;
}

interface BackgroundSwatchProps {
  background: Background;
  isSelected?: boolean;
  onClick?: () => void;
  /**
   * Callback when hover state changes, receives mouse position
   */
  onHoverChange?: (isHovering: boolean, position: { x: number; y: number }) => void;
}

/**
 * Get gradient colors for background based on its type/name
 */
export function getBackgroundGradient(background: Background): string {
  const name = background.name.toLowerCase();
  
  if (name.includes('brown')) {
    // Brown photo studio - warm brown gradient
    return 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)';
  } else if (name.includes('hard light') || name.includes('cyclorama')) {
    // Hard light cyclorama - bright white/light gradient
    return 'linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 50%, #D3D3D3 100%)';
  } else if (name.includes('broadway') || name.includes('hall')) {
    // Broadway hall - warm neutral gradient
    return 'linear-gradient(135deg, #D4AF8C 0%, #E6D3B8 50%, #F5E6D3 100%)';
  } else if (name.includes('studio')) {
    // Generic studio - neutral gray gradient
    return 'linear-gradient(135deg, #708090 0%, #87CEEB 50%, #B0C4DE 100%)';
  }
  
  // Default - neutral gradient
  return 'linear-gradient(135deg, #9CA3AF 0%, #D1D5DB 50%, #E5E7EB 100%)';
}

/**
 * Compact circular background swatch - shows gradient thumbnail
 */
export default function BackgroundSwatch({
  background,
  isSelected = false,
  onClick,
  onHoverChange,
}: BackgroundSwatchProps) {
  const gradient = getBackgroundGradient(background);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onHoverChange) {
      const rect = e.currentTarget.getBoundingClientRect();
      onHoverChange(true, {
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }
  };

  const handleMouseLeave = () => {
    if (onHoverChange) {
      onHoverChange(false, { x: 0, y: 0 });
    }
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative w-12 h-12 rounded-full transition-all duration-300',
        'border-2 shadow-lg overflow-hidden',
        isSelected
          ? 'border-accent-blue-500 ring-4 ring-accent-blue-500/30 shadow-xl shadow-accent-blue-500/40'
          : 'border-slate-700/50 hover:border-accent-blue-500/60 hover:shadow-xl hover:shadow-accent-blue-500/20'
      )}
      style={{ background: gradient }}
      title={background.name}
    >
      {/* Inner shadow for depth */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/20 pointer-events-none" />
      
      {/* Selected checkmark */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute inset-0 rounded-full flex items-center justify-center pointer-events-none"
        >
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-3 h-3 text-accent-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </motion.div>
      )}

      {/* Hover ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/30 pointer-events-none"
        initial={{ opacity: 0, scale: 1 }}
        whileHover={{ opacity: 1, scale: 1.2 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
}

