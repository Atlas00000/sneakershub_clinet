'use client';

import { LabelHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Label text
   */
  children: ReactNode;
  
  /**
   * Whether the field is required (shows asterisk)
   */
  required?: boolean;
  
  /**
   * Label size
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Whether the label has an error state
   */
  error?: boolean;
}

/**
 * Label Component - Form label with consistent styling
 * 
 * Features:
 * - Consistent typography
 * - Required field indicator
 * - Error state support
 * - Responsive sizing
 * - Accessibility-friendly
 */
export default function Label({
  children,
  required = false,
  size = 'md',
  error = false,
  className,
  ...props
}: LabelProps) {
  const sizes = {
    sm: 'text-body-s',
    md: 'text-body-m',
    lg: 'text-body-l',
  };
  
  const colorClass = error ? 'text-error' : 'text-slate-300';
  
  const labelClasses = cn(
    'block font-medium',
    sizes[size],
    colorClass,
    className
  );
  
  return (
    <label className={labelClasses} {...props}>
      {children}
      {required && (
        <span className="text-error ml-1" aria-label="required">
          *
        </span>
      )}
    </label>
  );
}

