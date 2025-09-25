'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}

const inputVariants = {
  default: 'bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-primary-400 focus:ring-primary-400/30',
  glass: 'bg-glass-light backdrop-blur-sm border-white/20 text-white placeholder-white/50 focus:border-primary-400 focus:ring-primary-400/30 focus:bg-glass-medium',
};

const inputSizes = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-base rounded-lg',
  lg: 'px-4 py-3 text-lg rounded-xl',
};

export default function Input({
  label,
  error,
  helperText,
  variant = 'glass',
  size = 'md',
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const hasError = Boolean(error);

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-white/90"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          // Base styles
          'w-full border transition-all duration-200 focus:outline-none focus:ring-2',
          // Variant styles
          inputVariants[variant],
          // Size styles
          inputSizes[size],
          // Error state
          hasError && 'border-error-400 focus:border-error-400 focus:ring-error-400/30',
          className
        )}
        {...props}
      />
      {(error || helperText) && (
        <div className="text-sm">
          {error ? (
            <span className="text-error-400">{error}</span>
          ) : (
            <span className="text-white/60">{helperText}</span>
          )}
        </div>
      )}
    </div>
  );
}