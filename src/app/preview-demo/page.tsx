'use client';

import { PreviewBoard } from '@/components/ui';
import { Text, Stack, Group, Badge } from '@mantine/core';

/**
 * Demo page for PreviewBoard miniature mode feature
 */
export default function PreviewDemoPage() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Stack gap="xl" className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <Text size="2.5rem" fw={700} c="white" mb="md">
            PreviewBoard Miniature Mode Demo
          </Text>
          <Text size="lg" c="dimmed">
            Hover over boards to see preview, click to expand to full view
          </Text>
        </div>

        {/* Example with scaled boards side by side */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <Text size="sm" c="dimmed" mb="sm" ta="center">
              Left Position (65% scale)
            </Text>
            <PreviewBoard position="left" scale={0.65}>
              <Stack gap="md" p="lg">
                <Text size="xl" fw={700} c="white">Opponent 1</Text>
                <Group>
                  <Badge variant="filled" color="red">❤️ Life: 15</Badge>
                  <Badge variant="filled" color="blue">🃏 Hand: 6</Badge>
                  <Badge variant="filled" color="gray">⚰️ Grave: 3</Badge>
                </Group>
                <div className="space-y-2">
                  <Text size="sm" c="dimmed">
                    <strong>Battlefield:</strong>
                  </Text>
                  <Text size="xs" c="dimmed">
                    • 3 Creatures (2 tapped)
                  </Text>
                  <Text size="xs" c="dimmed">
                    • 5 Lands (4 tapped)
                  </Text>
                  <Text size="xs" c="dimmed">
                    • 1 Artifact
                  </Text>
                </div>
                <Text size="xs" c="yellow" fw={500} mt="md">
                  💡 Hover to preview at 75%, click to expand!
                </Text>
              </Stack>
            </PreviewBoard>
          </div>

          <div>
            <Text size="sm" c="dimmed" mb="sm" ta="center">
              Right Position (65% scale)
            </Text>
            <PreviewBoard position="right" scale={0.65}>
              <Stack gap="md" p="lg">
                <Text size="xl" fw={700} c="white">Opponent 2</Text>
                <Group>
                  <Badge variant="filled" color="red">❤️ Life: 20</Badge>
                  <Badge variant="filled" color="blue">🃏 Hand: 7</Badge>
                  <Badge variant="filled" color="gray">⚰️ Grave: 1</Badge>
                </Group>
                <div className="space-y-2">
                  <Text size="sm" c="dimmed">
                    <strong>Battlefield:</strong>
                  </Text>
                  <Text size="xs" c="dimmed">
                    • 4 Creatures (all untapped)
                  </Text>
                  <Text size="xs" c="dimmed">
                    • 8 Lands (2 tapped)
                  </Text>
                  <Text size="xs" c="dimmed">
                    • 2 Enchantments
                  </Text>
                </div>
                <Text size="xs" c="green" fw={500} mt="md">
                  ✓ Smooth scaling with no layout shift
                </Text>
              </Stack>
            </PreviewBoard>
          </div>
        </div>

        {/* Example with different scale */}
        <div className="mt-12">
          <Text size="sm" c="dimmed" mb="sm" ta="center">
            Custom Scale (75%) - Better Readability
          </Text>
          <div className="max-w-2xl mx-auto">
            <PreviewBoard position="left" scale={0.75}>
              <Stack gap="md" p="xl">
                <Text size="2xl" fw={700} c="white">Player Board Preview</Text>
                <Text size="md" c="dimmed">
                  This board uses a 75% scale for improved legibility.
                  All text remains clearly readable (≥11-12px after scaling).
                </Text>
                <Group gap="md">
                  <Badge size="lg" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                    Scaled Content
                  </Badge>
                  <Badge size="lg" variant="gradient" gradient={{ from: 'purple', to: 'pink' }}>
                    Interactive
                  </Badge>
                  <Badge size="lg" variant="gradient" gradient={{ from: 'green', to: 'teal' }}>
                    Accessible
                  </Badge>
                </Group>
              </Stack>
            </PreviewBoard>
          </div>
        </div>

        {/* Example with disabled miniature mode */}
        <div className="mt-12">
          <Text size="sm" c="dimmed" mb="sm" ta="center">
            Miniature Mode Disabled (100% scale, no interaction)
          </Text>
          <div className="max-w-2xl mx-auto">
            <PreviewBoard position="left" miniature={false}>
              <Stack gap="md" p="lg">
                <Text size="xl" fw={700} c="white">Full Size Mode</Text>
                <Text size="sm" c="dimmed">
                  When miniature mode is disabled, the board displays at full size
                  with no scaling or expand functionality.
                </Text>
              </Stack>
            </PreviewBoard>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="mt-16 p-8 bg-white/5 rounded-xl border border-white/10">
          <Text size="xl" fw={600} c="white" mb="md">
            Features Implemented ✅
          </Text>
          <Stack gap="sm">
            <Text size="sm" c="dimmed">
              ✓ <strong>Miniature scaling:</strong> Content scaled to 60-75% using CSS transform
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Preserved legibility:</strong> Font sizes remain ≥11-12px after scaling
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Hover preview:</strong> Desktop hover scales to +10% (e.g., 65% → 75%)
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Click to expand:</strong> Modal opens with 100% scale read-only view
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Smooth transitions:</strong> 300ms cubic-bezier animation
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>No layout shift:</strong> CSS transform used instead of layout properties
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Accessible focus trapping:</strong> Mantine Modal with built-in accessibility
            </Text>
            <Text size="sm" c="dimmed">
              ✓ <strong>Mobile support:</strong> Touch/tap to expand works on mobile devices
            </Text>
          </Stack>
        </div>
      </Stack>
    </div>
  );
}
