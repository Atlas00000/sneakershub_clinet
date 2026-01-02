'use client';

import { motion } from 'framer-motion';
import { Material } from '@/types/materials';
import { cn } from '@/lib/utils';

interface MaterialSwatchProps {
  material: Material;
  isSelected?: boolean;
  onClick?: () => void;
  /**
   * Callback when hover state changes, receives mouse position
   */
  onHoverChange?: (isHovering: boolean, position: { x: number; y: number }) => void;
}

/**
 * Compact circular material swatch - shows color thumbnail only
 */
export default function MaterialSwatch({
  material,
  isSelected = false,
  onClick,
  onHoverChange,
}: MaterialSwatchProps) {
  const color = material.properties.color || '#cccccc';
  const colorValue = typeof color === 'string' ? color : `#${color.getHexString()}`;

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
        'border-2 shadow-lg',
        isSelected
          ? 'border-accent-blue-500 ring-4 ring-accent-blue-500/30 shadow-xl shadow-accent-blue-500/40'
          : 'border-slate-700/50 hover:border-accent-blue-500/60 hover:shadow-xl hover:shadow-accent-blue-500/20'
      )}
      style={{ backgroundColor: colorValue }}
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

      {/* Premium indicator - small dot */}
      {material.premium && !isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-accent-violet-500 to-accent-violet-600 rounded-full border-2 border-charcoal-900 shadow-lg"
        />
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
