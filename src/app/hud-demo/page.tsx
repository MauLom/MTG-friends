'use client';

import { HudCenter } from '@/components/ui';
import { Text, Stack } from '@mantine/core';

/**
 * Demo page for HudCenter component scaffolding
 */
export default function HudDemoPage() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Stack gap="xl" className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <Text size="2.5rem" fw={700} c="white" mb="md">
            HUD Center Scaffolding Demo
          </Text>
          <Text size="lg" c="dimmed">
            Central HUD with Turn/Phase indicator, Life summary, Dice tray, and Timer
          </Text>
        </div>

        {/* Main HudCenter Demo */}
        <div className="max-w-5xl mx-auto w-full">
          <HudCenter />
        </div>

        {/* Feature highlights */}
        <div className="mt-16 p-8 bg-white/5 rounded-xl border border-white/10 max-w-5xl mx-auto">
          <Text size="xl" fw={600} c="white" mb="md">
            HUD Center Features (Scaffolding Only) ✅
          </Text>
          <Stack gap="sm">
            <Text size="sm" c="dimmed">
              ✓ <strong>Turn/Phase Indicator:</strong> UT, UK, D, MP1, BP, MP2, EP badges
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>PASS TURN Button:</strong> Disabled state (no business logic)
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Life Summary Grid:</strong> 2x2 grid with life totals for 4 players (scales to 3-6)
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Commander Damage Placeholders:</strong> Badge slots for future commander damage tracking
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Timer Display:</strong> mm:ss format (00:00 placeholder)
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Dice Tray UI:</strong> Add d6/d20 buttons (disabled) and history chips
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Compact Layout:</strong> Clear visual hierarchy, works well at 3-6 players
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Mantine Components:</strong> Uses Card, Group, Badge, Button, RingProgress
            </Text>
          </Stack>
        </div>
      </Stack>
    </div>
  );
}
