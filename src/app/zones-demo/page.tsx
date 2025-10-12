'use client';

import { SelfBoard, OnTurnBoard } from '@/components/game/panels';
import { Text, Stack, Box } from '@mantine/core';

/**
 * Demo page for Zone Highlighting with data-zone attributes
 */
export default function ZonesDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <Stack gap="xl">
        {/* Info section */}
        <Box className="text-center">
          <Text size="xl" fw={700} c="white" mb="xs">
            Zone Highlighting Demo
          </Text>
          <Text size="sm" c="dimmed" mb="md">
            Hover over or focus zones to see the highlight effects
          </Text>
          <Text size="xs" c="dimmed">
            Each zone has a data-zone attribute: hand, battlefield, command, graveyard, exile
          </Text>
        </Box>

        {/* OnTurnBoard */}
        <Box>
          <Text size="md" fw={600} c="white" mb="sm">
            OnTurnBoard Component
          </Text>
          <OnTurnBoard />
        </Box>

        {/* SelfBoard */}
        <Box>
          <Text size="md" fw={600} c="white" mb="sm">
            SelfBoard Component
          </Text>
          <SelfBoard />
        </Box>

        {/* Instructions */}
        <Box className="p-4 bg-white/5 rounded-lg border border-white/10 max-w-4xl mx-auto">
          <Text size="sm" c="dimmed" className="text-center">
            <strong>Try this:</strong> Hover over any zone to see the highlight effect. 
            Press Tab to focus on zones using keyboard navigation. 
            Each zone will show a blue glow effect on hover/focus.
          </Text>
        </Box>
      </Stack>
    </div>
  );
}
