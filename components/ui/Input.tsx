'use client';

import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Input label (optional, use with Label component for better control)
   */
  label?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Helper text to display below input
   */
  helperText?: string;
  
  /**
   * Icon to display on the left side
   */
  icon?: ReactNode;
  
  /**
   * Icon to display on the right side
   */
  iconRight?: ReactNode;
  
  /**
   * Input size
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Full width input
   */
  fullWidth?: boolean;
}

/**
 * Input Component - Glassmorphic input field with focus states
 * 
 * Features:
 * - Glassmorphic background
 * - Focus ring with accent color
 * - Error states
 * - Icon support (left and right)
 * - Helper text support
 * - Smooth transitions
 * - Responsive sizing
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      iconRight,
      size = 'md',
      fullWidth = false,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'glass-dark border-2 rounded-xl transition-all duration-200 ease-out-smooth focus:outline-none focus:ring-2 focus:ring-accent-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-900';
    
    const sizes = {
      sm: 'px-3 py-2 text-body-s',
      md: 'px-4 py-3 text-body-m',
      lg: 'px-5 py-4 text-body-l',
    };
    
    const borderColor = error
      ? 'border-error focus:border-error focus:ring-error/50'
      : 'border-slate-700/50 focus:border-accent-blue-500/50';
    
    const widthClass = fullWidth ? 'w-full' : '';
    
    const inputClasses = cn(
      baseStyles,
      sizes[size],
      borderColor,
      widthClass,
      icon && 'pl-10',
      iconRight && 'pr-10',
      'text-white placeholder:text-slate-500',
      className
    );
    
    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {label && (
          <label className="block text-body-s font-medium text-slate-300">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={inputClasses}
            {...props}
          />
          {iconRight && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              {iconRight}
            </div>
          )}
        </div>
        {error && (
          <p className="text-body-s text-error">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-body-s text-slate-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

