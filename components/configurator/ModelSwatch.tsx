'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Model {
  id: string;
  name: string;
  url: string;
  type: string;
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
  description: string;
  thumbnail: string | null;
}

interface ModelSwatchProps {
  model: Model;
  isSelected?: boolean;
  onClick?: () => void;
  /**
   * Callback when hover state changes, receives mouse position
   */
  onHoverChange?: (isHovering: boolean, position: { x: number; y: number }) => void;
}

/**
 * Get gradient colors for model based on its type
 */
export function getModelGradient(model: Model): string {
  const type = model.type.toLowerCase();
  
  if (type.includes('blank') || type.includes('white')) {
    // Blank/white models - clean white gradient
    return 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 50%, #E0E0E0 100%)';
  } else if (type.includes('sneaker')) {
    // Sneaker models - neutral gray-blue gradient
    return 'linear-gradient(135deg, #6B7280 0%, #9CA3AF 50%, #D1D5DB 100%)';
  } else if (type.includes('running')) {
    // Running shoes - dynamic blue gradient
    return 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #93C5FD 100%)';
  } else if (type.includes('basketball')) {
    // Basketball shoes - bold red-orange gradient
    return 'linear-gradient(135deg, #EF4444 0%, #F97316 50%, #FB923C 100%)';
  }
  
  // Default - neutral gradient
  return 'linear-gradient(135deg, #9CA3AF 0%, #D1D5DB 50%, #E5E7EB 100%)';
}

/**
 * Get icon for model type
 */
export function getModelIcon(model: Model): string {
  const type = model.type.toLowerCase();
  
  if (type.includes('blank') || type.includes('white')) {
    return '👟';
  } else if (type.includes('sneaker')) {
    return '👟';
  } else if (type.includes('running')) {
    return '🏃';
  } else if (type.includes('basketball')) {
    return '🏀';
  }
  
  return '👟';
}

/**
 * Compact circular model swatch - shows gradient thumbnail with icon
 */
export default function ModelSwatch({
  model,
  isSelected = false,
  onClick,
  onHoverChange,
}: ModelSwatchProps) {
  const gradient = getModelGradient(model);
  const icon = getModelIcon(model);

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
      title={model.name}
    >
      {/* Icon overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-xl pointer-events-none">
        {icon}
      </div>
      
      {/* Inner shadow for depth */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/20 pointer-events-none" />
      
      {/* Selected checkmark */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute inset-0 rounded-full flex items-center justify-center pointer-events-none z-10"
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

