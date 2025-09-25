'use client';

import React from 'react';
import { Badge as MantineBadge, BadgeProps as MantineBadgeProps } from '@mantine/core';
import { cn } from '@/lib/utils';

export interface BadgeProps extends Omit<MantineBadgeProps, 'variant' | 'size' | 'color'> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const colorMap = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'green',
  warning: 'yellow',
  error: 'red',
  info: 'blue',
};

const sizeMap = {
  sm: 'xs' as const,
  md: 'sm' as const,
  lg: 'md' as const,
};

export default function Badge({
  variant = 'primary',
  size = 'md',
  className,
  style,
  children,
  ...props
}: BadgeProps) {
  const customStyle = React.useMemo(() => {
    const baseStyle = style || {};
    
    return {
      ...baseStyle,
      backdropFilter: 'blur(10px)',
    };
  }, [style]);

  return (
    <MantineBadge
      variant="light"
      color={colorMap[variant]}
      size={sizeMap[size]}
      radius="xl"
      className={cn(className)}
      style={customStyle}
      {...props}
    >
      {children}
    </MantineBadge>
  );
}