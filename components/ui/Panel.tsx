'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PanelProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /**
   * Panel content
   */
  children: ReactNode;
  
  /**
   * Panel title (optional)
   */
  title?: string;
  
  /**
   * Panel description/subtitle (optional)
   */
  description?: string;
  
  /**
   * Whether to show a divider at the bottom
   */
  divider?: boolean;
  
  /**
   * Panel padding size
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Panel Component - Section wrapper with optional title and description
 * 
 * Features:
 * - Clean section separation
 * - Optional title and description
 * - Spacing management
 * - Optional divider
 * - Smooth fade-in animation
 * 
 * Used for organizing content in sidebars and panels
 */
export default function Panel({
  children,
  title,
  description,
  divider = false,
  padding = 'none',
  className,
  ...props
}: PanelProps) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const dividerClass = divider ? 'border-b border-slate-700/50 pb-6 mb-6' : '';
  
  const panelClasses = cn(
    'space-y-4',
    paddings[padding],
    dividerClass,
    className
  );
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.0, 0, 0.2, 1] }}
      className={panelClasses}
      {...props}
    >
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h3 className="text-heading-m font-semibold text-white">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-body-s text-slate-400">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </motion.div>
  );
}

