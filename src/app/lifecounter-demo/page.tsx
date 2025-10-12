'use client';

import { Stack, Text, Group } from '@mantine/core';
import LifeCounter from '@/components/game/LifeCounter';

/**
 * Demo page for LifeCounter component - showcasing reusable variants
 */
export default function LifeCounterDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <Text size="3xl" fw={700} c="white" mb="xl" ta="center">
          LifeCounter Component Demo
        </Text>
        
        <Text size="md" c="dimmed" mb="xl" ta="center">
          Reusable Mantine RingProgress variant with two sizes, themeable design, and truncation-safe names
        </Text>

        {/* Normal Size - Interactive */}
        <Stack gap="xl" mb="3xl">
          <div>
            <Text size="xl" fw={600} c="white" mb="md">
              Normal Size (Interactive)
            </Text>
            <Text size="sm" c="dimmed" mb="lg">
              Full-featured variant for self/onTurn players with interactive controls
            </Text>
            <Group gap="lg" justify="center">
              <LifeCounter
                playerName="Player 1"
                initialLife={40}
                isCurrentPlayer={true}
                size="normal"
                statusBadges={[
                  { label: '⚔️ 5 Cmdr Dmg', variant: 'warning' },
                  { label: '🪙 3 Tokens', variant: 'info' }
                ]}
              />
              <LifeCounter
                playerName="Opponent"
                initialLife={20}
                isCurrentPlayer={false}
                size="normal"
              />
              <LifeCounter
                playerName="Player with a Very Long Name That Should Truncate"
                initialLife={40}
                isCurrentPlayer={false}
                size="normal"
                statusBadges={[
                  { label: 'Monarch', variant: 'warning', color: '#FFD700' },
                  { label: 'The Ring', variant: 'info' }
                ]}
              />
            </Group>
          </div>

          {/* Small Size - Preview Mode */}
          <div>
            <Text size="xl" fw={600} c="white" mb="md">
              Small Size (Preview Mode)
            </Text>
            <Text size="sm" c="dimmed" mb="lg">
              Compact variant for opponent previews, non-interactive by default
            </Text>
            <Group gap="lg" justify="center">
              <LifeCounter
                playerName="Alice"
                initialLife={25}
                isCurrentPlayer={false}
                size="small"
              />
              <LifeCounter
                playerName="Bob"
                initialLife={15}
                isCurrentPlayer={false}
                size="small"
                statusBadges={[
                  { label: '⚔️ 10', variant: 'error' }
                ]}
              />
              <LifeCounter
                playerName="Charlie the Magnificent"
                initialLife={30}
                isCurrentPlayer={false}
                size="small"
                statusBadges={[
                  { label: '👑', variant: 'warning' }
                ]}
              />
              <LifeCounter
                playerName="Diana"
                initialLife={5}
                isCurrentPlayer={true}
                size="small"
              />
            </Group>
          </div>

          {/* Life Progression Examples */}
          <div>
            <Text size="xl" fw={600} c="white" mb="md">
              Life Percentage States
            </Text>
            <Text size="sm" c="dimmed" mb="lg">
              Color coding based on remaining life (Green → Yellow → Orange → Red)
            </Text>
            <Group gap="lg" justify="center">
              <LifeCounter
                playerName="Full Life"
                initialLife={40}
                size="small"
              />
              <LifeCounter
                playerName="Half Life"
                initialLife={20}
                size="small"
              />
              <LifeCounter
                playerName="Low Life"
                initialLife={20}
                size="small"
              />
              <LifeCounter
                playerName="Critical"
                initialLife={20}
                size="small"
              />
            </Group>
          </div>

          {/* Feature Highlights */}
          <div className="mt-12 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <Text size="xl" fw={600} c="white" mb="md">
              ✨ Component Features
            </Text>
            <Stack gap="sm">
              <Text size="sm" c="dimmed">
                ✅ <strong>Two size variants:</strong> &apos;small&apos; for previews, &apos;normal&apos; for interactive play
              </Text>
              <Text size="sm" c="dimmed">
                ✅ <strong>Mantine RingProgress:</strong> Visual life percentage with color coding
              </Text>
              <Text size="sm" c="dimmed">
                ✅ <strong>Truncation safe:</strong> Long player names truncate with ellipsis and show full name on hover
              </Text>
              <Text size="sm" c="dimmed">
                ✅ <strong>Optional status badges:</strong> Display commander damage, tokens, monarch status, etc.
              </Text>
              <Text size="sm" c="dimmed">
                ✅ <strong>Themeable:</strong> Integrates with tabletop theme tokens and Mantine design system
              </Text>
              <Text size="sm" c="dimmed">
                ✅ <strong>Interactive controls:</strong> Life adjustment buttons (±1, ±5), poison counters
              </Text>
              <Text size="sm" c="dimmed">
                ✅ <strong>Death states:</strong> Visual indicators for 0 life or 10 poison counters
              </Text>
              <Text size="sm" c="dimmed">
                ✅ <strong>Reusable:</strong> Exported from @/components/game for use anywhere
              </Text>
            </Stack>
          </div>

          {/* Usage Example */}
          <div className="mt-8 bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-emerald-500/20">
            <Text size="lg" fw={600} c="white" mb="md">
              📖 Usage Example
            </Text>
            <pre className="text-xs text-gray-300 overflow-x-auto">
              <code>{`import LifeCounter from '@/components/game/LifeCounter';

// Normal size with status badges
<LifeCounter
  playerName="Player 1"
  initialLife={40}
  isCurrentPlayer={true}
  size="normal"
  statusBadges={[
    { label: '⚔️ 5 Cmdr Dmg', variant: 'warning' },
    { label: '🪙 3 Tokens', variant: 'info' }
  ]}
/>

// Small preview mode
<LifeCounter
  playerName="Opponent"
  initialLife={20}
  size="small"
  interactive={false}
/>`}</code>
            </pre>
          </div>
        </Stack>
      </div>
    </div>
  );
}
