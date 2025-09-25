'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'solid';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const cardVariants = {
  default: 'bg-white/5 border border-white/10 backdrop-blur-sm',
  glass: 'bg-glass-light border border-white/20 backdrop-blur-lg',
  solid: 'bg-gray-800 border border-gray-700',
};

const cardPadding = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

export default function Card({
  variant = 'glass',
  padding = 'md',
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        // Base styles
        'rounded-xl transition-all duration-300',
        // Variant styles
        cardVariants[variant],
        // Padding styles
        cardPadding[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}