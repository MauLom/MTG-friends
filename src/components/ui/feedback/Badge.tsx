'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const badgeVariants = {
  primary: 'bg-primary-500/20 text-primary-200 border-primary-500/30',
  secondary: 'bg-secondary-500/20 text-secondary-200 border-secondary-500/30',
  success: 'bg-success-500/20 text-success-200 border-success-500/30',
  warning: 'bg-warning-500/20 text-warning-200 border-warning-500/30',
  error: 'bg-error-500/20 text-error-200 border-error-500/30',
  info: 'bg-blue-500/20 text-blue-200 border-blue-500/30',
};

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

export default function Badge({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        // Base styles
        'inline-flex items-center font-medium rounded-full border backdrop-blur-sm',
        // Variant styles
        badgeVariants[variant],
        // Size styles
        badgeSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}