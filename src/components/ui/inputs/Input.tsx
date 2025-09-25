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
  styles,
  ...props
}: InputProps) {
  const customStyles = React.useMemo(() => {
    const baseStyles = styles || {};
    
    if (variant === 'glass') {
      return {
        ...baseStyles,
        input: {
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
        label: {
          color: 'rgba(255, 255, 255, 0.9)',
        },
        description: {
          color: 'rgba(255, 255, 255, 0.6)',
        },
        error: {
          color: '#f87171',
        },
      };
    }
    
    return {
      ...baseStyles,
      input: {
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
      label: {
        color: 'rgba(255, 255, 255, 0.9)',
      },
      description: {
        color: 'rgba(255, 255, 255, 0.6)',
      },
      error: {
        color: '#f87171',
      },
    };
  }, [styles, variant]);

  return (
    <TextInput
      label={label}
      error={error}
      description={helperText}
      size={sizeMap[size]}
      className={cn(className)}
      styles={customStyles}
      {...props}
    />
  );
}