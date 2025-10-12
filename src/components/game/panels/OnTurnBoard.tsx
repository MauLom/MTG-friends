'use client';

import React from 'react';
import { Text, Center } from '@mantine/core';
import { Card } from '@/components/ui';

export interface OnTurnBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * OnTurnBoard - Shell component for turn tracking display
 * Row 1 - Middle position
 * No logic implemented - purely structural
 */
export default function OnTurnBoard({ className, ...props }: OnTurnBoardProps) {
  return (
    <Card 
      variant="glass" 
      padding="md" 
      className={className}
      {...props}
    >
      <Center>
        <Text size="sm" c="dimmed">
          On Turn Board
        </Text>
      </Center>
    </Card>
  );
}
