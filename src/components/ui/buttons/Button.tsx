'use client';

import React from 'react';
import { Button as MantineButton } from '@mantine/core';
import { cn } from '@/lib/utils';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const variantMap = {
  primary: 'filled' as const,
  secondary: 'light' as const,
  danger: 'filled' as const,
  success: 'filled' as const,
  ghost: 'subtle' as const,
};

const colorMap = {
  primary: 'primary',
  secondary: 'secondary',
  danger: 'red',
  success: 'green',
  ghost: 'gray',
};

const sizeMap = {
  sm: 'sm' as const,
  md: 'md' as const,
  lg: 'lg' as const,
};

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className,
  style,
  children,
  onClick,
  type = 'button',
}: ButtonProps) {
  const isDisabled = disabled || isLoading;
  
  // Create custom style for gradient variants
  const customStyle = React.useMemo(() => {
    const baseStyle = style || {};
    
    if (variant === 'primary') {
      return {
        ...baseStyle,
        background: 'linear-gradient(45deg, var(--mantine-color-primary-6), var(--mantine-color-secondary-6))',
        backgroundSize: '200% 200%',
        transition: 'all 300ms ease',
        '&:hover:not(:disabled)': {
          backgroundPosition: '100% 0',
          transform: 'scale(1.05)',
        },
        '&:active:not(:disabled)': {
          transform: 'scale(0.95)',
        },
      };
    }
    
    if (variant === 'danger') {
      return {
        ...baseStyle,
        background: 'linear-gradient(45deg, #ef4444, #dc2626)',
        '&:hover:not(:disabled)': {
          background: 'linear-gradient(45deg, #dc2626, #b91c1c)',
          transform: 'scale(1.05)',
        },
        '&:active:not(:disabled)': {
          transform: 'scale(0.95)',
        },
      };
    }
    
    if (variant === 'success') {
      return {
        ...baseStyle,
        background: 'linear-gradient(45deg, #10b981, #059669)',
        '&:hover:not(:disabled)': {
          background: 'linear-gradient(45deg, #059669, #047857)',
          transform: 'scale(1.05)',
        },
        '&:active:not(:disabled)': {
          transform: 'scale(0.95)',
        },
      };
    }
    
    return baseStyle;
  }, [style, variant]);

  return (
    <MantineButton
      variant={variantMap[variant]}
      color={colorMap[variant]}
      size={sizeMap[size]}
      loading={isLoading}
      disabled={isDisabled}
      type={type}
      onClick={onClick}
      className={cn(
        'transition-all duration-300',
        variant === 'secondary' && 'backdrop-blur-sm border border-white/30',
        variant === 'ghost' && 'border border-transparent hover:border-white/20',
        className
      )}
      style={customStyle}
    >
      {children}
    </MantineButton>
  );
}