'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  /**
   * Button variant style
   */
  variant?: 'primary' | 'secondary' | 'ghost';
  
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Button content
   */
  children: ReactNode;
  
  /**
   * Whether the button is in a loading state
   */
  isLoading?: boolean;
  
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  
  /**
   * Icon to display before the text
   */
  icon?: ReactNode;
  
  /**
   * Icon to display after the text
   */
  iconRight?: ReactNode;
  
  /**
   * Full width button
   */
  fullWidth?: boolean;
}

/**
 * Button Component - Styled button with variants and animations
 * 
 * Variants:
 * - primary: Gradient background with white text
 * - secondary: Glassmorphic with border
 * - ghost: Transparent with hover background
 * 
 * Features:
 * - Smooth hover and active animations
 * - Loading state support
 * - Icon support (left and right)
 * - Responsive sizing
 * - Full width option
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  disabled = false,
  icon,
  iconRight,
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 ease-out-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-accent-blue-500 to-accent-blue-600 text-white hover:from-accent-blue-600 hover:to-accent-blue-500 focus:ring-accent-blue-500/50 shadow-lg hover:shadow-xl',
    secondary: 'glass-dark border border-slate-700/50 text-white hover:border-slate-600/50 hover:bg-slate-800/90 focus:ring-slate-500/50',
    ghost: 'text-slate-300 hover:text-white hover:bg-slate-800/50 focus:ring-slate-500/50',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-body-s',
    md: 'px-6 py-3 text-body-m',
    lg: 'px-8 py-4 text-body-l',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const buttonClasses = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    widthClass,
    className
  );
  
  return (
    <motion.button
      className={buttonClasses}
      whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {icon && !isLoading && <span className="mr-2">{icon}</span>}
      {children}
      {iconRight && !isLoading && <span className="ml-2">{iconRight}</span>}
    </motion.button>
  );
}

