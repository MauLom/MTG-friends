'use client';

import { GameStage } from '@/components/ui';
import { Text, Stack, Badge, Group } from '@mantine/core';

/**
 * Demo page for GameStage responsive behavior
 */
export default function GameStageDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Stack gap="xl" className="h-screen">
        {/* Info section */}
        <div className="p-4 text-center">
          <Text size="xl" fw={700} c="white" mb="xs">
            GameStage Responsive Behavior Demo
          </Text>
          <Text size="sm" c="dimmed">
            Resize your browser to see the responsive layout changes
          </Text>
          <Group justify="center" mt="md">
            <Badge color="blue" size="lg">Desktop ≥768px: 3 columns</Badge>
            <Badge color="green" size="lg">Tablet 640-767px: 2 columns</Badge>
            <Badge color="orange" size="lg">Mobile &lt;640px: Single column</Badge>
          </Group>
        </div>

        {/* GameStage with labeled content */}
        <div className="flex-1">
          <GameStage
            info={
              <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-500/30 h-full flex items-center justify-center">
                <Text size="sm" c="white" fw={600}>📊 Info Panel</Text>
              </div>
            }
            onTurn={
              <div className="p-4 bg-green-900/30 rounded-lg border border-green-500/30 h-full flex items-center justify-center">
                <Text size="lg" c="white" fw={600}>🎯 Turn Tracker (Priority)</Text>
              </div>
            }
            actions={
              <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30 h-full flex items-center justify-center">
                <Text size="sm" c="white" fw={600}>⚡ Actions Panel</Text>
              </div>
            }
            hudCenter={
              <div className="p-4 bg-yellow-900/30 rounded-lg border border-yellow-500/30 h-full flex items-center justify-center">
                <Stack gap="xs" align="center">
                  <Text size="xl" c="white" fw={700}>🎮 HUD Center</Text>
                  <Text size="xs" c="dimmed">(Battlefield)</Text>
                </Stack>
              </div>
            }
            prevLeft={
              <div className="p-4 bg-red-900/30 rounded-lg border border-red-500/30 h-full flex items-center justify-center">
                <Text size="sm" c="white" fw={600}>👤 Preview Left</Text>
              </div>
            }
            prevRight={
              <div className="p-4 bg-cyan-900/30 rounded-lg border border-cyan-500/30 h-full flex items-center justify-center">
                <Text size="sm" c="white" fw={600}>👤 Preview Right</Text>
              </div>
            }
            self={
              <div className="p-4 bg-emerald-900/30 rounded-lg border border-emerald-500/30 h-full flex items-center justify-center">
                <Text size="lg" c="white" fw={700}>🃏 Your Player Zone (Self)</Text>
              </div>
            }
          />
        </div>

        {/* Instructions */}
        <div className="p-4 bg-white/5 rounded-lg border border-white/10 max-w-4xl mx-auto">
          <Text size="xs" c="dimmed" className="text-center">
            <strong>Mobile Order:</strong> HUD → OnTurn → Actions → Self → Previews → Info | 
            <strong> Tablet:</strong> OnTurn full width, Actions/Info side-by-side | 
            <strong> Desktop:</strong> Info | OnTurn | Actions (3 columns)
          </Text>
        </div>
      </Stack>
    </div>
  );
}
