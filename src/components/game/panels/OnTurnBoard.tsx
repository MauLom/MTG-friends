'use client';

import React from 'react';
import { Box, Text, SimpleGrid } from '@mantine/core';
import { Card } from '@/components/ui';

export interface OnTurnBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

// Zone types for OnTurnBoard
const ZONES = [
  { id: 'hand', label: 'Hand' },
  { id: 'battlefield', label: 'Battlefield' },
  { id: 'command', label: 'Command' },
  { id: 'graveyard', label: 'Graveyard' },
  { id: 'exile', label: 'Exile' },
] as const;

// Shared zone styling
const ZONE_CLASSES = 'drop-zone p-3 rounded-lg border-2 border-dashed border-white/20 bg-white/5 min-h-[80px] flex items-center justify-center';

/**
 * OnTurnBoard - Shell component for turn tracking display
 * Row 1 - Middle position
 * No logic implemented - purely structural
 * Zones are defined with data-zone attributes for future DnD integration
 */
export default function OnTurnBoard({ className, ...props }: OnTurnBoardProps) {
  return (
    <Card 
      variant="glass" 
      padding="md" 
      className={className}
      role="region"
      aria-label="On-Turn Board"
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
