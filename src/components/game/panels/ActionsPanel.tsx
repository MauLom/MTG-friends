'use client';

import React from 'react';
import { Box, Text } from '@mantine/core';
import { Card } from '@/components/ui';

export interface ActionsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * ActionsPanel - Shell component for game actions
 * Row 1 - Right position
 * No logic implemented - purely structural
 */
export default function ActionsPanel({ className, ...props }: ActionsPanelProps) {
  return (
    <Card 
      variant="glass" 
      padding="md" 
      className={className}
      {...props}
    >
      <Box>
        <Text size="sm" c="dimmed">
          Actions Panel
        </Text>
      </Box>
    </Card>
  );
}
