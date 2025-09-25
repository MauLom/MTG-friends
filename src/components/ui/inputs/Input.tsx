'use client';

import React from 'react';
import { TextInput, TextInputProps } from '@mantine/core';
import { cn } from '@/lib/utils';

export interface InputProps extends Omit<TextInputProps, 'variant' | 'size'> {
  variant?: 'default' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  helperText?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const sizeMap = {
  sm: 'sm' as const,
  md: 'md' as const,
  lg: 'xl' as const,
};

export default function Input({
  label,
  error,
  helperText,
  variant = 'glass',
  size = 'md',
  className,
  style,
  ...props
}: InputProps) {
  const customStyle = React.useMemo(() => {
    const baseStyle = style || {};
    
    if (variant === 'glass') {
      return {
        ...baseStyle,
        '& .mantine-TextInput-input': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white',
          '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.5)',
          },
          '&:focus': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderColor: 'var(--mantine-color-primary-4)',
          },
        },
        '& .mantine-TextInput-label': {
          color: 'rgba(255, 255, 255, 0.9)',
        },
      };
    }
    
    return {
      ...baseStyle,
      '& .mantine-TextInput-input': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        color: 'white',
        '&::placeholder': {
          color: 'rgba(255, 255, 255, 0.6)',
        },
        '&:focus': {
          borderColor: 'var(--mantine-color-primary-4)',
        },
      },
      '& .mantine-TextInput-label': {
        color: 'rgba(255, 255, 255, 0.9)',
      },
    };
  }, [style, variant]);

  return (
    <TextInput
      label={label}
      error={error}
      description={helperText}
      size={sizeMap[size]}
      className={cn(className)}
      style={customStyle}
      {...props}
    />
  );
}