'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column';
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  children: React.ReactNode;
}

const spacingMap = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

export default function Stack({
  direction = 'column',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className,
  children,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        'flex',
        direction === 'row' ? 'flex-row' : 'flex-col',
        spacingMap[spacing],
        alignMap[align],
        justifyMap[justify],
        wrap && 'flex-wrap',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}