'use client';

import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Card content
   */
  children: ReactNode;
  
  /**
   * Card variant style
   */
  variant?: 'default' | 'elevated' | 'flat';
  
  /**
   * Whether the card has hover effects
   */
  hoverable?: boolean;
  
  /**
   * Card padding size
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  
  /**
   * Whether to show a border
   */
  bordered?: boolean;
}

/**
 * Card Component - Glassmorphic card container
 * 
 * Variants:
 * - default: Standard glassmorphic card
 * - elevated: Higher elevation with stronger shadow
 * - flat: Minimal styling, no shadow
 * 
 * Features:
 * - Glassmorphic background
 * - Hover effects (optional)
 * - Smooth animations
 * - Customizable padding
 * - Border options
 */
export default function Card({
  children,
  variant = 'default',
  hoverable = false,
  padding = 'md',
  bordered = true,
  className,
  ...props
}: CardProps) {
  const baseStyles = 'rounded-2xl transition-all duration-200';
  
  const variants = {
    default: 'glass-card-dark shadow-lg',
    elevated: 'glass-card-dark shadow-xl',
    flat: 'bg-slate-800/50',
  };
  
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const borderClass = bordered ? 'border border-slate-700/50' : '';
  const hoverClass = hoverable 
    ? 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer' 
    : '';
  
  const cardClasses = cn(
    baseStyles,
    variants[variant],
    paddings[padding],
    borderClass,
    hoverClass,
    className
  );
  
  const motionProps = hoverable 
    ? {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
      }
    : {};
  
  if (hoverable) {
    const { style, ...restProps } = props;
    return (
      <motion.div 
        className={cardClasses} 
        {...motionProps} 
        {...(restProps as any)}
        style={style as any}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
}

