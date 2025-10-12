'use client';

import InteractionIcons from '@/components/game/InteractionIcons';
import { Text, Stack, Paper } from '@mantine/core';

/**
 * Demo page for InteractionIcons component
 */
export default function InteractionDemoPage() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Stack gap="xl" className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <Text size="2.5rem" fw={700} c="white" mb="md">
            Interaction Icons Demo
          </Text>
          <Text size="lg" c="dimmed">
            Emoji/hand gesture interactions using Mantine ActionIcon and Tooltip
          </Text>
        </div>

        {/* Main InteractionIcons Demo */}
        <div className="max-w-5xl mx-auto w-full">
          <Paper
            shadow="md"
            radius="xl"
            p="xl"
            className="bg-white/5 border border-white/10"
          >
            <Text size="lg" fw={600} c="white" mb="lg">
              Try the Interaction Icons
            </Text>
            <Text size="sm" c="dimmed" mb="xl">
              Click the emoji button in the top-left to expand the menu. Hover over icons to see tooltips.
              All icons are keyboard accessible (use Tab to navigate).
            </Text>
            
            {/* Demo area with InteractionIcons positioned top-left */}
            <div className="relative min-h-[300px] bg-slate-800/50 rounded-lg border border-white/10 p-4">
              <InteractionIcons />
              
              <div className="mt-20 text-center">
                <Text size="sm" c="dimmed">
                  Open the browser console to see interaction events being logged
                </Text>
              </div>
            </div>
          </Paper>
        </div>

        {/* Feature highlights */}
        <div className="mt-16 p-8 bg-white/5 rounded-xl border border-white/10 max-w-5xl mx-auto">
          <Text size="xl" fw={600} c="white" mb="md">
            Interaction Icons Features ✅
          </Text>
          <Stack gap="sm">
            <Text size="sm" c="dimmed">
              ✓ <strong>Mantine ActionIcon:</strong> All emoji buttons use Mantine ActionIcon component
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Mantine Tooltip:</strong> All icons have proper Mantine tooltips with arrows
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Keyboard Accessible:</strong> All icons are keyboard reachable via Tab navigation
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>UI Event Logging:</strong> All interactions emit console.log events (no network yet)
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Visual Feedback:</strong> Last used emoji is highlighted and shown in badge
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Auto-collapse:</strong> Menu automatically collapses after emoji selection
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>8 Interaction Emojis:</strong> Thumbs Up/Down, Thinking, Nervous, Celebration, Frustrated, Good Game, Lightning Fast
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Quick Actions:</strong> Pass Priority and OK buttons included in expanded menu
            </Text>
          </Stack>
        </div>

        {/* Usage note */}
        <div className="mt-8 p-6 bg-blue-500/10 rounded-xl border border-blue-500/20 max-w-5xl mx-auto">
          <Text size="lg" fw={600} c="blue" mb="sm">
            💡 Usage Note
          </Text>
          <Text size="sm" c="dimmed">
            This component is designed for top-left positioning in the game interface. 
            All emoji interactions are logged to the console for now. Network functionality 
            will be added later to send interactions to other players.
          </Text>
        </div>

        {/* Keyboard accessibility info */}
        <div className="mt-8 p-6 bg-green-500/10 rounded-xl border border-green-500/20 max-w-5xl mx-auto">
          <Text size="lg" fw={600} c="green" mb="sm">
            ⌨️ Keyboard Navigation
          </Text>
          <Stack gap="xs">
            <Text size="sm" c="dimmed">
              <strong>Tab:</strong> Move focus to toggle button
            </Text>
            <Text size="sm" c="dimmed">
              <strong>Enter/Space:</strong> Activate the focused button
            </Text>
            <Text size="sm" c="dimmed">
              <strong>Tab (when expanded):</strong> Navigate through all emoji icons
            </Text>
            <Text size="sm" c="dimmed">
              All ActionIcon components support proper ARIA labels for screen readers
            </Text>
          </Stack>
        </div>
      </Stack>
    </div>
  );
}
