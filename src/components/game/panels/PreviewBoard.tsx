'use client';

import React from 'react';
import { Text, Center } from '@mantine/core';
import { Card } from '@/components/ui';

export interface PreviewBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Position of the preview board (left or right)
   */
  position?: 'left' | 'right';
  className?: string;
}

/**
 * PreviewBoard - Shell component for previewing opponent/player boards
 * Row 2 - Side positions (left and right)
 * No logic implemented - purely structural
 */
export default function PreviewBoard({ 
  position = 'left', 
  className, 
  ...props 
}: PreviewBoardProps) {
  return (
    <Card 
      variant="glass" 
      padding="md" 
      className={className}
      {...props}
    >
      <Center className="h-full">
        <Text size="sm" c="dimmed">
          Preview Board
        </Text>
      </Center>
    </Card>
  );
}
