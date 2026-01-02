'use client';

import { motion } from 'framer-motion';
import { ComponentType } from '@/types/models';
import { cn } from '@/lib/utils';
import { ComponentIcons } from './ComponentIcons';

/**
 * Get gradient colors for component type
 */
export function getComponentGradient(componentType: ComponentType): string {
  switch (componentType) {
    case ComponentType.UPPER:
      return 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #93C5FD 100%)';
    case ComponentType.SOLE:
      return 'linear-gradient(135deg, #6B7280 0%, #9CA3AF 50%, #D1D5DB 100%)';
    case ComponentType.MIDSOLE:
      return 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 50%, #D1D5DB 100%)';
    case ComponentType.OUTSOLE:
      return 'linear-gradient(135deg, #1F2937 0%, #374151 50%, #4B5563 100%)';
    case ComponentType.LACES:
      return 'linear-gradient(135deg, #EF4444 0%, #F97316 50%, #FB923C 100%)';
    case ComponentType.TONGUE:
      return 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 50%, #C4B5FD 100%)';
    case ComponentType.HEEL_TAB:
      return 'linear-gradient(135deg, #EC4899 0%, #F472B6 50%, #F9A8D4 100%)';
    case ComponentType.EYELETS:
      return 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #FCD34D 100%)';
    case ComponentType.LOGO:
      return 'linear-gradient(135deg, #10B981 0%, #34D399 50%, #6EE7B7 100%)';
    case ComponentType.LINING:
      return 'linear-gradient(135deg, #6366F1 0%, #818CF8 50%, #A5B4FC 100%)';
    default:
      return 'linear-gradient(135deg, #9CA3AF 0%, #D1D5DB 50%, #E5E7EB 100%)';
  }
}

interface ComponentSwatchProps {
  componentType: ComponentType;
  isSelected?: boolean;
  count?: number;
  onClick?: () => void;
  /**
   * Callback when hover state changes, receives mouse position
   */
  onHoverChange?: (isHovering: boolean, position: { x: number; y: number }) => void;
}

/**
 * Compact circular component swatch - shows gradient background only
 */
export default function ComponentSwatch({
  componentType,
  isSelected = false,
  count,
  onClick,
  onHoverChange,
}: ComponentSwatchProps) {
  const gradient = getComponentGradient(componentType);
  const icon = ComponentIcons[componentType];

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
    >
      {/* Icon overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-xl pointer-events-none z-0">
        {icon}
      </div>
      
      {/* Inner shadow for depth */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/20 pointer-events-none" />
      
      {/* Count badge */}
      {count !== undefined && count > 1 && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent-blue-500 rounded-full border-2 border-charcoal-900 shadow-lg flex items-center justify-center z-10">
          <span className="text-[10px] font-bold text-white">{count}</span>
        </div>
      )}
      
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

