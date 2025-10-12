'use client';

import React from 'react';
import { Group, Stack, Text, RingProgress } from '@mantine/core';
import { Card, Button, Badge } from '@/components/ui';

export interface HudCenterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

type GamePhase = 'UT' | 'UK' | 'D' | 'MP1' | 'BP' | 'MP2' | 'EP';

const GAME_PHASES: GamePhase[] = ['UT', 'UK', 'D', 'MP1', 'BP', 'MP2', 'EP'];

// Commander format starting life total
const STARTING_LIFE = 40;

// Mock player data for scaffolding (3-6 players)
// Colors correspond to Mantine's color system
const MOCK_PLAYERS = [
  { name: 'Player 1', life: STARTING_LIFE, color: 'blue' },
  { name: 'Player 2', life: STARTING_LIFE, color: 'green' },
  { name: 'Player 3', life: STARTING_LIFE, color: 'red' },
  { name: 'Player 4', life: STARTING_LIFE, color: 'yellow' },
];

/**
 * HudCenter - Central HUD component with game controls and status
 * Row 2 - Middle position
 * Scaffolding only - no business logic implemented
 * 
 * Features:
 * - Turn/Phase indicator
 * - PASS TURN button (disabled)
 * - Life summary grid
 * - Dice tray UI
 * - Timer display
 */
export default function HudCenter({ className, ...props }: HudCenterProps) {
  return (
    <Card 
      variant="glass" 
      padding="md" 
      className={className}
      role="region"
      aria-label="HUD Center"
      {...props}
    >
      <div className="space-y-4">
        {/* Top Row: Phase Indicator & Pass Turn Button */}
        <div className="flex items-center justify-between gap-4">
          {/* Phase Indicator */}
          <div className="flex-1" role="status" aria-label="Current turn phase">
            <Text size="xs" c="dimmed" className="mb-2">
              Turn Phase
            </Text>
            <Group gap="xs">
              {GAME_PHASES.map((phase) => (
                <Badge
                  key={phase}
                  variant="secondary"
                  size="sm"
                  className="text-xs"
                  aria-label={`Phase ${phase}`}
                >
                  {phase}
                </Badge>
              ))}
            </Group>
          </div>

          {/* Pass Turn Button */}
          <Button
            variant="danger"
            size="sm"
            disabled
            className="opacity-50 cursor-not-allowed"
            aria-label="Pass turn (currently disabled)"
          >
            PASS TURN
          </Button>
        </div>

        {/* Middle Row: Life Summary Grid & Timer */}
        <div className="flex items-start justify-between gap-4">
          {/* Life Summary Grid */}
          <div className="flex-1" role="region" aria-label="Player life totals">
            <Text size="xs" c="dimmed" className="mb-2">
              Life Totals
            </Text>
            <div className="grid grid-cols-2 gap-2">
              {MOCK_PLAYERS.map((player, idx) => (
                <Card
                  key={idx}
                  variant="glass"
                  padding="sm"
                  className="transition-all duration-300 hover:scale-105"
                  role="status"
                  aria-label={`${player.name} has ${player.life} life`}
                >
                  <Group gap="xs" className="justify-between">
                    <div className="flex items-center gap-2">
                      <RingProgress
                        size={32}
                        thickness={3}
                        sections={[{ value: (player.life / STARTING_LIFE) * 100, color: player.color }]}
                        label={
                          <Text size="xs" className="font-bold text-center" aria-hidden="true">
                            {player.life}
                          </Text>
                        }
                        aria-hidden="true"
                      />
                      <Text size="xs" className="font-semibold" aria-hidden="true">
                        {player.name}
                      </Text>
                    </div>
                    {/* Placeholder for Commander Damage Badges */}
                    <div className="flex gap-1">
                      <Badge
                        variant="secondary"
                        size="sm"
                        className="text-xs opacity-50"
                      >
                        C
                      </Badge>
                    </div>
                  </Group>
                </Card>
              ))}
            </div>
          </div>

          {/* Timer */}
          <div className="flex-shrink-0" role="timer" aria-label="Game timer">
            <Text size="xs" c="dimmed" className="mb-2">
              Timer
            </Text>
            <Card variant="glass" padding="sm" className="text-center">
              <Text size="xl" className="font-mono font-bold" aria-label="0 minutes 0 seconds">
                00:00
              </Text>
            </Card>
          </div>
        </div>

        {/* Bottom Row: Dice Tray */}
        <div role="region" aria-label="Dice tray">
          <Text size="xs" c="dimmed" className="mb-2">
            Dice Tray
          </Text>
          <Card variant="glass" padding="sm">
            <Stack gap="xs">
              {/* Dice Controls */}
              <Group gap="xs" role="group" aria-label="Dice controls">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled
                  className="text-xs"
                  aria-label="Add d6 die (currently disabled)"
                >
                  Add d6
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled
                  className="text-xs"
                  aria-label="Add d20 die (currently disabled)"
                >
                  Add d20
                </Button>
              </Group>

              {/* Dice History Chips */}
              <div role="log" aria-label="Dice roll history">
                <Text size="xs" c="dimmed" className="mb-1">
                  History
                </Text>
                <Group gap="xs">
                  {/* Placeholder history chips */}
                  <Badge variant="info" size="sm" className="text-xs" aria-label="d6 roll: 4">
                    d6: 4
                  </Badge>
                  <Badge variant="info" size="sm" className="text-xs" aria-label="d20 roll: 15">
                    d20: 15
                  </Badge>
                  <Badge variant="secondary" size="sm" className="text-xs opacity-50" aria-label="Empty slot">
                    Empty
                  </Badge>
                </Group>
              </div>
            </Stack>
          </Card>
        </div>
      </div>
    </Card>
  );
}
