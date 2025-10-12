'use client';

import React from 'react';
import { Box, Text, SimpleGrid } from '@mantine/core';
import { Card } from '@/components/ui';

export interface OnTurnBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

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
        {/* Hand Zone */}
        <Box
          data-zone="hand"
          className="p-3 rounded-lg border-2 border-dashed border-white/20 bg-white/5 min-h-[80px] flex items-center justify-center"
          tabIndex={0}
          role="region"
          aria-label="Hand zone"
        >
          <Text size="xs" c="dimmed">Hand</Text>
        </Box>

        {/* Battlefield Zone */}
        <Box
          data-zone="battlefield"
          className="p-3 rounded-lg border-2 border-dashed border-white/20 bg-white/5 min-h-[80px] flex items-center justify-center"
          tabIndex={0}
          role="region"
          aria-label="Battlefield zone"
        >
          <Text size="xs" c="dimmed">Battlefield</Text>
        </Box>

        {/* Command Zone */}
        <Box
          data-zone="command"
          className="p-3 rounded-lg border-2 border-dashed border-white/20 bg-white/5 min-h-[80px] flex items-center justify-center"
          tabIndex={0}
          role="region"
          aria-label="Command zone"
        >
          <Text size="xs" c="dimmed">Command</Text>
        </Box>

        {/* Graveyard Zone */}
        <Box
          data-zone="graveyard"
          className="p-3 rounded-lg border-2 border-dashed border-white/20 bg-white/5 min-h-[80px] flex items-center justify-center"
          tabIndex={0}
          role="region"
          aria-label="Graveyard zone"
        >
          <Text size="xs" c="dimmed">Graveyard</Text>
        </Box>

        {/* Exile Zone */}
        <Box
          data-zone="exile"
          className="p-3 rounded-lg border-2 border-dashed border-white/20 bg-white/5 min-h-[80px] flex items-center justify-center"
          tabIndex={0}
          role="region"
          aria-label="Exile zone"
        >
          <Text size="xs" c="dimmed">Exile</Text>
        </Box>
      </SimpleGrid>
    </Card>
  );
}
