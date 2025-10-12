'use client';

import React from 'react';
import { Box, Text } from '@mantine/core';
import { Card } from '@/components/ui';

export interface InfoPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * InfoPanel - Shell component for displaying game information
 * Row 1 - Left position
 * No logic implemented - purely structural
 */
export default function InfoPanel({ className, ...props }: InfoPanelProps) {
  return (
    <Card 
      variant="glass" 
      padding="md" 
      className={className}
      {...props}
    >
      <Box>
        <Text size="sm" c="dimmed">
          Info Panel
        </Text>
      </Box>
    </Card>
  );
}
