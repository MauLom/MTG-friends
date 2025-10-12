'use client';

import React from 'react';
import { Paper, PaperProps } from '@mantine/core';
import { cn } from '@/lib/utils';

export interface CardProps extends Omit<PaperProps, 'padding'> {
  variant?: 'default' | 'glass' | 'solid';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const paddingMap = {
  none: 0,
  sm: 'xs',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
};

export default function Card({
  variant = 'glass',
  padding = 'md',
  className,
  style,
  children,
  ...props
}: CardProps) {
  const customStyle = React.useMemo(() => {
    const baseStyle = style || {};
    
    if (variant === 'glass') {
      return {
        ...baseStyle,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: 'var(--card-shadow-idle)',
        position: 'relative' as const,
      };
    }
    
    if (variant === 'default') {
      return {
        ...baseStyle,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'var(--shadow-soft)',
      };
    }
    
    if (variant === 'solid') {
      return {
        ...baseStyle,
        backgroundColor: 'var(--mantine-color-dark-8)',
        border: '1px solid var(--mantine-color-dark-4)',
        boxShadow: 'var(--shadow-medium)',
      };
    }
    
    return baseStyle;
  }, [style, variant]);

  return (
    <Paper
      p={paddingMap[padding]}
      radius="xl"
      className={cn(
        'transition-all duration-300 tabletop-card',
        className
      )}
      style={customStyle}
      {...props}
    >
      {children}
    </Paper>
  );
}