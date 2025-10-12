/**
 * PreviewBoard Component Usage Examples
 * 
 * This file demonstrates the miniature mode feature with scaling and expand.
 */

import PreviewBoard from './PreviewBoard';
import { Text, Stack, Group, Badge } from '@mantine/core';

/**
 * Example 1: Basic Miniature Mode (default)
 */
export function MiniaturePreviewBoardExample() {
  return (
    <div className="h-screen p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
        <PreviewBoard position="left">
          <Stack gap="md" p="lg">
            <Text size="xl" fw={700} c="white">Opponent 1</Text>
            <Group>
              <Badge variant="light" color="blue">Life: 20</Badge>
              <Badge variant="light" color="green">Cards: 7</Badge>
            </Group>
            <Text size="sm" c="dimmed">
              This is a preview of an opponent&apos;s board state. 
              Hover to see preview, click to expand.
            </Text>
          </Stack>
        </PreviewBoard>

        <PreviewBoard position="right">
          <Stack gap="md" p="lg">
            <Text size="xl" fw={700} c="white">Opponent 2</Text>
            <Group>
              <Badge variant="light" color="blue">Life: 18</Badge>
              <Badge variant="light" color="green">Cards: 5</Badge>
            </Group>
            <Text size="sm" c="dimmed">
              Click to see full board details in an expanded modal view.
            </Text>
          </Stack>
        </PreviewBoard>
      </div>
    </div>
  );
}

/**
 * Example 2: Custom Scale (75%)
 */
export function CustomScaleExample() {
  return (
    <div className="h-screen p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-2xl mx-auto">
        <PreviewBoard position="left" scale={0.75}>
          <Stack gap="md" p="lg">
            <Text size="xl" fw={700} c="white">Custom Scale 75%</Text>
            <Text size="sm" c="dimmed">
              This preview uses a larger scale (75%) for better readability.
              Font size remains legible after scaling.
            </Text>
            <Group>
              <Badge color="cyan">Scaled</Badge>
              <Badge color="violet">Interactive</Badge>
            </Group>
          </Stack>
        </PreviewBoard>
      </div>
    </div>
  );
}

/**
 * Example 3: Disabled Miniature Mode
 */
export function NoMiniatureExample() {
  return (
    <div className="h-screen p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-2xl mx-auto">
        <PreviewBoard position="left" miniature={false}>
          <Stack gap="md" p="lg">
            <Text size="xl" fw={700} c="white">Full Size Mode</Text>
            <Text size="sm" c="dimmed">
              Miniature mode is disabled. No scaling or expand functionality.
            </Text>
          </Stack>
        </PreviewBoard>
      </div>
    </div>
  );
}

/**
 * Example 4: Rich Content Preview
 */
export function RichContentExample() {
  return (
    <div className="h-screen p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
        <PreviewBoard position="left" scale={0.6}>
          <Stack gap="sm" p="md">
            <Text size="lg" fw={600} c="white">Player: John</Text>
            <Group gap="xs">
              <Badge size="sm" variant="filled" color="red">❤️ 15/20</Badge>
              <Badge size="sm" variant="filled" color="blue">🃏 6</Badge>
              <Badge size="sm" variant="filled" color="gray">⚰️ 3</Badge>
            </Group>
            <Text size="xs" c="dimmed" lineClamp={2}>
              Creatures: 3 • Artifacts: 2 • Enchantments: 1
            </Text>
            <Text size="xs" c="yellow" fw={500}>
              ⚠️ Hovering scales to 70%, click to expand to 100%
            </Text>
          </Stack>
        </PreviewBoard>

        <PreviewBoard position="right" scale={0.65}>
          <Stack gap="sm" p="md">
            <Text size="lg" fw={600} c="white">Player: Sarah</Text>
            <Group gap="xs">
              <Badge size="sm" variant="filled" color="red">❤️ 20/20</Badge>
              <Badge size="sm" variant="filled" color="blue">🃏 7</Badge>
              <Badge size="sm" variant="filled" color="gray">⚰️ 1</Badge>
            </Group>
            <Text size="xs" c="dimmed" lineClamp={2}>
              Creatures: 4 • Lands: 8 • Instants ready
            </Text>
            <Text size="xs" c="green" fw={500}>
              ✓ Smooth transitions with no layout shift
            </Text>
          </Stack>
        </PreviewBoard>
      </div>
    </div>
  );
}
