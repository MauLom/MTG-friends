'use client';

import TurnTracker from '@/components/game/TurnTracker';
import { Text, Stack } from '@mantine/core';
import { Card } from '@/components/ui';

/**
 * Demo page for TurnTracker with tabletop theme enhancements
 */
export default function TurnTrackerDemoPage() {
  return (
    <div className="min-h-screen p-8">
      <Stack gap="xl" className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Text size="2.5rem" fw={700} c="white" mb="md">
            Turn Tracker - Tabletop Theme Demo
          </Text>
          <Text size="lg" c="dimmed">
            Showcasing enhanced glow pulse animations and hover effects
          </Text>
        </div>

        {/* Main TurnTracker Demo */}
        <div className="max-w-md mx-auto w-full">
          <TurnTracker />
        </div>

        {/* Feature highlights */}
        <div className="mt-16 max-w-3xl mx-auto">
          <Card variant="glass" padding="lg">
            <Text size="xl" fw={600} c="white" mb="md">
              Tabletop Theme Features ✅
            </Text>
            <Stack gap="sm">
              <Text size="sm" c="dimmed">
                ✓ <strong>Enhanced Background:</strong> Dark gradient with subtle radial overlay and texture
              </Text>
              <Text size="sm" c="dimmed">
                ✓ <strong>Card Hover Glow:</strong> Smooth glow effect on card wrappers with drop shadows
              </Text>
              <Text size="sm" c="dimmed">
                ✓ <strong>Active Phase Glow Pulse:</strong> Pulsing glow animation on the active phase button
              </Text>
              <Text size="sm" c="dimmed">
                ✓ <strong>Turn Indicator Animation:</strong> Ping animation on the turn indicator dot
              </Text>
              <Text size="sm" c="dimmed">
                ✓ <strong>Reduced Motion Support:</strong> All animations respect prefers-reduced-motion
              </Text>
              <Text size="sm" c="dimmed">
                ✓ <strong>Glass Reflections:</strong> Subtle reflection gradient overlays on glass surfaces
              </Text>
              <Text size="sm" c="dimmed">
                ✓ <strong>CSS Custom Properties:</strong> Theme tokens for consistent styling (see THEME_TOKENS.md)
              </Text>
            </Stack>

            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <Text size="sm" fw={600} c="yellow" mb="xs">
                💡 Accessibility Note
              </Text>
              <Text size="xs" c="dimmed">
                If you have "Reduce Motion" enabled in your OS settings, animations will be
                simplified or disabled. The glow pulse becomes static, and hover transforms
                are removed while maintaining the visual glow effects.
              </Text>
            </div>
          </Card>
        </div>

        {/* CSS Tokens Reference */}
        <div className="mt-8 max-w-3xl mx-auto">
          <Card variant="default" padding="lg">
            <Text size="lg" fw={600} c="white" mb="md">
              CSS Custom Properties Used
            </Text>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text size="xs" c="dimmed" mb="xs" fw={600}>Surface Colors:</Text>
                <Text size="xs" c="dimmed" className="font-mono">--tabletop-bg-start</Text>
                <Text size="xs" c="dimmed" className="font-mono">--tabletop-bg-end</Text>
                <Text size="xs" c="dimmed" className="font-mono">--tabletop-surface</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed" mb="xs" fw={600}>Glow Colors:</Text>
                <Text size="xs" c="dimmed" className="font-mono">--glow-primary</Text>
                <Text size="xs" c="dimmed" className="font-mono">--glow-primary-strong</Text>
                <Text size="xs" c="dimmed" className="font-mono">--glow-accent</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed" mb="xs" fw={600}>Shadow Depths:</Text>
                <Text size="xs" c="dimmed" className="font-mono">--shadow-soft</Text>
                <Text size="xs" c="dimmed" className="font-mono">--shadow-medium</Text>
                <Text size="xs" c="dimmed" className="font-mono">--shadow-deep</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed" mb="xs" fw={600}>Card Shadows:</Text>
                <Text size="xs" c="dimmed" className="font-mono">--card-shadow-idle</Text>
                <Text size="xs" c="dimmed" className="font-mono">--card-shadow-hover</Text>
              </div>
            </div>
            <Text size="xs" c="dimmed" mt="md">
              📖 Full documentation available in <code className="text-primary-400">THEME_TOKENS.md</code>
            </Text>
          </Card>
        </div>
      </Stack>
    </div>
  );
}
