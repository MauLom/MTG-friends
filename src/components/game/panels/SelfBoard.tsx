'use client';

import React from 'react';
import { Box, Text } from '@mantine/core';
import { Card } from '@/components/ui';

export interface SelfBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * SelfBoard - Shell component for the current player's board
 * Row 3 - Full width bottom position
 * No logic implemented - purely structural
 */
export default function SelfBoard({ className, ...props }: SelfBoardProps) {
  return (
    <Card 
      variant="glass" 
      padding="md" 
      className={className}
      {...props}
    >
      <Box>
        <Text size="sm" c="dimmed">
          Self Board
        </Text>
      </Box>
    </Card>
  );
}
