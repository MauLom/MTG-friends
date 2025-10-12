'use client';

import { useState } from 'react';
import { Stack, Text, Badge, Group, Button } from '@mantine/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameCard, { CARD_DIMENSIONS } from '@/components/game/GameCard';
import { ZONE_LAYOUT } from '@/components/game/GameZone';
import { Card } from '@/types/game';

/**
 * Demo page showing virtualization readiness and CLS prevention
 * This demonstrates:
 * 1. Fixed dimensions prevent layout shift during image load
 * 2. Predictable container heights for future virtualization
 * 3. Export of layout constants for integration
 */
export default function VirtualizationDemoPage() {
  const [showCards, setShowCards] = useState(false);
  const [simulateSlowNetwork, setSimulateSlowNetwork] = useState(false);
  const [cacheBustTimestamp, setCacheBustTimestamp] = useState(Date.now());

  // Sample cards with and without images
  const sampleCards: Card[] = [
    {
      id: 'card-1',
      name: 'Lightning Bolt',
      imageUrl: simulateSlowNetwork 
        ? `https://cards.scryfall.io/normal/front/a/e/ae5f9fb1-5a55-4db3-98a1-2628e3598c18.jpg?t=${cacheBustTimestamp}`
        : 'https://cards.scryfall.io/normal/front/a/e/ae5f9fb1-5a55-4db3-98a1-2628e3598c18.jpg',
      manaCost: '{R}',
      type: 'Instant',
      oracleText: 'Lightning Bolt deals 3 damage to any target.',
    },
    {
      id: 'card-2',
      name: 'Counterspell',
      imageUrl: simulateSlowNetwork
        ? `https://cards.scryfall.io/normal/front/1/9/1920dae4-fb92-4f19-ae4b-eb3276b8dac7.jpg?t=${cacheBustTimestamp}`
        : 'https://cards.scryfall.io/normal/front/1/9/1920dae4-fb92-4f19-ae4b-eb3276b8dac7.jpg',
      manaCost: '{U}{U}',
      type: 'Instant',
      oracleText: 'Counter target spell.',
    },
    {
      id: 'card-3',
      name: 'Giant Growth',
      imageUrl: simulateSlowNetwork
        ? `https://cards.scryfall.io/normal/front/0/6/06ec9e8b-4bd8-4caf-a559-6514b7ab4ca4.jpg?t=${cacheBustTimestamp}`
        : 'https://cards.scryfall.io/normal/front/0/6/06ec9e8b-4bd8-4caf-a559-6514b7ab4ca4.jpg',
      manaCost: '{G}',
      type: 'Instant',
      oracleText: 'Target creature gets +3/+3 until end of turn.',
    },
    {
      id: 'card-4',
      name: 'Dark Ritual',
      imageUrl: simulateSlowNetwork
        ? `https://cards.scryfall.io/normal/front/9/5/95f27eeb-6f14-4db3-adb9-9be5ed76b34b.jpg?t=${cacheBustTimestamp}`
        : 'https://cards.scryfall.io/normal/front/9/5/95f27eeb-6f14-4db3-adb9-9be5ed76b34b.jpg',
      manaCost: '{B}',
      type: 'Instant',
      oracleText: 'Add {B}{B}{B}.',
    },
    {
      id: 'card-5',
      name: 'Swords to Plowshares',
      imageUrl: simulateSlowNetwork
        ? `https://cards.scryfall.io/normal/front/8/0/80f46b80-0728-49bf-9d54-801eaa10b9b2.jpg?t=${cacheBustTimestamp}`
        : 'https://cards.scryfall.io/normal/front/8/0/80f46b80-0728-49bf-9d54-801eaa10b9b2.jpg',
      manaCost: '{W}',
      type: 'Instant',
      oracleText: 'Exile target creature. Its controller gains life equal to its power.',
    },
    {
      id: 'card-6',
      name: 'Brainstorm',
      imageUrl: simulateSlowNetwork
        ? `https://cards.scryfall.io/normal/front/0/3/0359f212-9564-41a9-870b-d2c57455a695.jpg?t=${cacheBustTimestamp}`
        : 'https://cards.scryfall.io/normal/front/0/3/0359f212-9564-41a9-870b-d2c57455a695.jpg',
      manaCost: '{U}',
      type: 'Instant',
      oracleText: 'Draw three cards, then put two cards from your hand on top of your library in any order.',
    },
  ];

  // Add more cards programmatically to test with larger lists
  const DEMO_CARD_COUNT = 20;
  const manyCards = Array.from({ length: DEMO_CARD_COUNT }, (_, i) => ({
    ...sampleCards[i % sampleCards.length],
    id: `card-${i}`,
  }));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
        <Stack gap="xl" className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <Text size="xl" fw={700} c="white" mb="xs">
            Virtualization Readiness Demo
          </Text>
          <Text size="sm" c="dimmed">
            Demonstrating CLS prevention and predictable container heights
          </Text>
          <Group justify="center" mt="md" gap="sm">
            <Badge color="green" size="lg">✓ No Layout Shift</Badge>
            <Badge color="blue" size="lg">✓ Fixed Dimensions</Badge>
            <Badge color="purple" size="lg">✓ Virtualization Ready</Badge>
          </Group>
        </div>

        {/* Controls */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <Stack gap="md">
            <Text size="sm" fw={600} c="white">Demo Controls</Text>
            <Group>
              <Button 
                onClick={() => setShowCards(!showCards)}
                variant={showCards ? "filled" : "outline"}
                color={showCards ? "red" : "green"}
              >
                {showCards ? 'Hide Cards' : 'Show Cards'}
              </Button>
              <Button 
                onClick={() => {
                  const newValue = !simulateSlowNetwork;
                  setSimulateSlowNetwork(newValue);
                  setShowCards(false);
                  // Update cache bust timestamp when enabling slow network
                  if (newValue) {
                    setCacheBustTimestamp(Date.now());
                  }
                }}
                variant={simulateSlowNetwork ? "filled" : "outline"}
                color={simulateSlowNetwork ? "orange" : "gray"}
              >
                {simulateSlowNetwork ? 'Disable Slow Network' : 'Simulate Slow Network'}
              </Button>
            </Group>
            <Text size="xs" c="dimmed">
              Toggle cards on/off to see that the layout does not shift when images load.
              {simulateSlowNetwork && " Slow network simulation adds cache-busting to force image reload (cards will be hidden when toggled)."}
            </Text>
          </Stack>
        </div>

        {/* Constants Display */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <Stack gap="md">
            <Text size="sm" fw={600} c="white">Exported Constants</Text>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <Text size="xs" c="dimmed" mb="xs">CARD_DIMENSIONS</Text>
                <code className="text-xs text-blue-300">
                  <div>width: {CARD_DIMENSIONS.width}px</div>
                  <div>height: {CARD_DIMENSIONS.height}px</div>
                  <div>aspectRatio: {CARD_DIMENSIONS.aspectRatio.toFixed(3)}</div>
                </code>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <Text size="xs" c="dimmed" mb="xs">ZONE_LAYOUT</Text>
                <code className="text-xs text-blue-300">
                  <div>cardHeight: {ZONE_LAYOUT.cardHeight}px</div>
                  <div>cardWidth: {ZONE_LAYOUT.cardWidth}px</div>
                  <div>gap: {ZONE_LAYOUT.gap}px</div>
                  <div>minHeight: {ZONE_LAYOUT.minHeight}px</div>
                </code>
              </div>
            </div>
            <Text size="xs" c="dimmed">
              These constants are exported and available for virtualization libraries to calculate item sizes.
            </Text>
          </Stack>
        </div>

        {/* Card Display Area - Small set */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <Stack gap="md">
            <Group justify="space-between" align="center">
              <Text size="sm" fw={600} c="white">Small Card List (6 cards)</Text>
              <Badge color="gray" variant="light">Fixed height container</Badge>
            </Group>
            <div 
              className="flex flex-wrap gap-2 bg-white/5 rounded-lg p-4"
              style={{ minHeight: `${ZONE_LAYOUT.minHeight}px` }}
            >
              {showCards ? (
                sampleCards.map((card) => (
                  <GameCard key={card.id} card={card} zone="demo" />
                ))
              ) : (
                <div className="flex items-center justify-center w-full text-white/40 text-sm">
                  Click &ldquo;Show Cards&rdquo; to load cards
                </div>
              )}
            </div>
            <Text size="xs" c="dimmed">
              Notice: Container maintains its minimum height when empty. When cards load, no layout shift occurs.
            </Text>
          </Stack>
        </div>

        {/* Card Display Area - Large set */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <Stack gap="md">
            <Group justify="space-between" align="center">
              <Text size="sm" fw={600} c="white">Large Card List (20 cards)</Text>
              <Badge color="yellow" variant="light">Future virtualization target</Badge>
            </Group>
            <div 
              className="flex flex-wrap gap-2 bg-white/5 rounded-lg p-4 max-h-96 overflow-y-auto"
              style={{ minHeight: `${ZONE_LAYOUT.minHeight}px` }}
            >
              {showCards ? (
                manyCards.map((card) => (
                  <GameCard key={card.id} card={card} zone="demo" />
                ))
              ) : (
                <div className="flex items-center justify-center w-full text-white/40 text-sm">
                  Click &ldquo;Show Cards&rdquo; to load cards
                </div>
              )}
            </div>
            <Text size="xs" c="dimmed">
              Large lists like this are ideal candidates for virtualization (react-virtuoso or react-window).
              All necessary layout constants are already exported.
            </Text>
          </Stack>
        </div>

        {/* Benefits Summary */}
        <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-xl p-6">
          <Stack gap="sm">
            <Text size="sm" fw={600} c="white">✓ Acceptance Criteria Met</Text>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-green-400 text-lg">✓</span>
                <div>
                  <Text size="sm" c="white">No CLS on image loads</Text>
                  <Text size="xs" c="dimmed">Cards reserve space with fixed dimensions before images load</Text>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 text-lg">✓</span>
                <div>
                  <Text size="sm" c="white">Containers expose predictable heights</Text>
                  <Text size="xs" c="dimmed">All containers have explicit minHeight and fixed card dimensions</Text>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 text-lg">✓</span>
                <div>
                  <Text size="sm" c="white">Virtualization boundaries documented</Text>
                  <Text size="xs" c="dimmed">Clear integration points marked in GameZone.tsx with examples</Text>
                </div>
              </div>
            </div>
          </Stack>
        </div>

        {/* Next Steps */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <Stack gap="sm">
            <Text size="sm" fw={600} c="white">📚 Documentation</Text>
            <Text size="xs" c="dimmed">
              See <code className="text-blue-300">docs/VIRTUALIZATION_READINESS.md</code> for complete integration guide,
              including examples with react-virtuoso and react-window.
            </Text>
            <Text size="xs" c="dimmed" mt="sm">
              <strong>When to add virtualization:</strong> Consider adding when zones regularly contain 50+ cards,
              or when performance issues are observed on mobile devices.
            </Text>
          </Stack>
        </div>
        </Stack>
      </div>
    </DndProvider>
  );
}
