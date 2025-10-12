'use client';

import React from 'react';
import { Box, Text, SimpleGrid } from '@mantine/core';
import { Card } from '@/components/ui';
import { ZONES, ZONE_CLASSES } from '@/constants/zones';

export interface SelfBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * SelfBoard - Shell component for the current player's board
 * Row 3 - Full width bottom position
 * No logic implemented - purely structural
 * Zones are defined with data-zone attributes for future DnD integration
 */
export default function SelfBoard({ className, ...props }: SelfBoardProps) {
  return (
    <Card 
      variant="glass" 
      padding="md" 
      className={className}
      role="region"
      aria-label="Self Board"
      {...props}
    >
      <SimpleGrid cols={5} spacing="xs">
        {ZONES.map((zone) => (
          <Box
            key={zone.id}
            data-zone={zone.id}
            className={ZONE_CLASSES}
            tabIndex={0}
            role="region"
            aria-label={`${zone.label} zone`}
          >
            <Text size="xs" c="dimmed">{zone.label}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Card>
  );
}
