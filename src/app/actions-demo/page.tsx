'use client';

import { ActionsPanel } from '@/components/ui';
import { Text, Stack } from '@mantine/core';

/**
 * Demo page for ActionsPanel component
 */
export default function ActionsDemoPage() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Stack gap="xl" className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <Text size="2.5rem" fw={700} c="white" mb="md">
            Actions Panel Demo
          </Text>
          <Text size="lg" c="dimmed">
            Game control actions with keyboard shortcuts and disabled states
          </Text>
        </div>

        {/* Main ActionsPanel Demo */}
        <div className="max-w-5xl mx-auto w-full">
          <ActionsPanel />
        </div>

        {/* Feature highlights */}
        <div className="mt-16 p-8 bg-white/5 rounded-xl border border-white/10 max-w-5xl mx-auto">
          <Text size="xl" fw={600} c="white" mb="md">
            Actions Panel Features ✅
          </Text>
          <Stack gap="sm">
            <Text size="sm" c="dimmed">
              ✓ <strong>Back/Undo Button:</strong> Disabled state with keyboard shortcut hint (Ctrl+Z)
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Next Phase Button:</strong> Disabled based on phase readiness with shortcut (Space)
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Settings Button:</strong> Disabled state with keyboard shortcut hint (S)
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Concede Button:</strong> Disabled state with keyboard shortcut hint (Alt+C)
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Help Button:</strong> Disabled state with keyboard shortcut hint (?)
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Tooltips:</strong> All buttons have tooltips with keyboard shortcuts
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Clear Disabled States:</strong> Visual feedback for disabled buttons
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Mantine Components:</strong> Uses Button, Group, ActionIcon, Tooltip
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>No Logic Wired:</strong> Purely structural with placeholder states
            </Text>
          </Stack>
        </div>

        {/* Usage note */}
        <div className="mt-8 p-6 bg-blue-500/10 rounded-xl border border-blue-500/20 max-w-5xl mx-auto">
          <Text size="lg" fw={600} c="blue" mb="sm">
            💡 Usage Note
          </Text>
          <Text size="sm" c="dimmed">
            Hover over buttons to see tooltips with keyboard shortcuts. All buttons are currently 
            in disabled state to demonstrate the visual feedback. The Next Phase button reflects 
            phase readiness (placeholder state set to false).
          </Text>
        </div>
      </Stack>
    </div>
  );
}
