'use client';

import React from 'react';
import { Stack as MantineStack, Group, StackProps as MantineStackProps, GroupProps } from '@mantine/core';
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
  none: 0,
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
};

const alignMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

const justifyMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
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
  if (direction === 'row') {
    return (
      <Group
        gap={spacingMap[spacing]}
        align={alignMap[align] as GroupProps['align']}
        justify={justifyMap[justify] as GroupProps['justify']}
        wrap={wrap ? 'wrap' : 'nowrap'}
        className={cn(className)}
        {...props}
      >
        {children}
      </Group>
    );
  }

  return (
    <MantineStack
      gap={spacingMap[spacing]}
      align={alignMap[align] as MantineStackProps['align']}
      justify={justifyMap[justify] as MantineStackProps['justify']}
      className={cn(className)}
      {...props}
    >
      {children}
    </MantineStack>
  );
}