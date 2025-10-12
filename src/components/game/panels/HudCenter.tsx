'use client';

import React, { useState } from 'react';
import { Group, Stack, Text, RingProgress, Collapse, Tooltip, ActionIcon } from '@mantine/core';
import { Card, Button, Badge } from '@/components/ui';
import { ChevronDown, ChevronUp, Dices, Coins, Hash, Heart, Plus, Minus } from 'lucide-react';
import { useGameStore } from '@/lib/store';

export interface HudCenterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

type GamePhase = 'UT' | 'UK' | 'D' | 'MP1' | 'BP' | 'MP2' | 'EP';

const GAME_PHASES: GamePhase[] = ['UT', 'UK', 'D', 'MP1', 'BP', 'MP2', 'EP'];

// Commander format starting life total
const STARTING_LIFE = 40;

/**
 * HudCenter - Central HUD component with game controls and status
 * Row 2 - Middle position
 * Dynamic content based on connected players
 */
export default function HudCenter({ className, ...props }: HudCenterProps) {
  const { players, gameState } = useGameStore();
  const [isDiceExpanded, setIsDiceExpanded] = useState(false);
  const [isLifeExpanded, setIsLifeExpanded] = useState(false);
  const [playerLifeTotals, setPlayerLifeTotals] = useState<Record<string, number>>({});

  // Get dynamic player colors (using a predefined set)
  const playerColors = ['blue', 'green', 'red', 'yellow', 'purple', 'orange'];
  
  // Map real players to display data
  const displayPlayers = players.map((player, index) => ({
    name: player.name,
    life: playerLifeTotals[player.name] || STARTING_LIFE,
    color: playerColors[index % playerColors.length]
  }));

  // Life total management
  const updateLifeTotal = (playerName: string, change: number) => {
    setPlayerLifeTotals(prev => ({
      ...prev,
      [playerName]: Math.max(0, (prev[playerName] || STARTING_LIFE) + change)
    }));
  };

  // Get current phase and turn from game state or default
  const currentPhase: GamePhase = 'MP1'; // TODO: Get from actual game state
  const currentTurn = gameState?.currentTurnIndex ? gameState.currentTurnIndex + 1 : 1;

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
        {/* Top Row: Phase Indicator, Turn Counter & Pass Turn Button */}
        <div className="flex items-center justify-between gap-4">
          {/* Phase Indicator - Only show current phase */}
          <div className="flex-1" role="status" aria-label="Current turn phase">
            <Text size="xs" c="dimmed" className="mb-1">
              Current Phase
            </Text>
            <Badge
              variant="primary"
              size="md"
              className="text-sm font-semibold"
              aria-label={`Current phase is ${currentPhase}`}
            >
              {currentPhase}
            </Badge>
          </div>

          {/* Turn Counter */}
          <div className="flex-shrink-0">
            <Tooltip label="Current Turn Number" position="top" withArrow>
              <div className="flex items-center gap-1 px-2 py-1 bg-slate-700/50 rounded-md border border-white/10">
                <Hash size={12} className="text-white/60" />
                <Text size="sm" className="font-mono font-bold text-white">
                  {currentTurn}
                </Text>
              </div>
            </Tooltip>
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

        {/* Middle Row: Life Summary Grid & Timer - Only Connected Players */}
        <div className="flex items-start justify-between gap-4">
          {/* Life Summary Grid - Dynamic based on connected players */}
          <div className="flex-1" role="region" aria-label="Player life totals">
            <Text size="xs" c="dimmed" className="mb-2">
              Life Totals ({displayPlayers.length} players)
            </Text>
            <div className={`grid gap-2 ${
              displayPlayers.length <= 2 ? 'grid-cols-2' : 
              displayPlayers.length <= 4 ? 'grid-cols-2' : 
              'grid-cols-3'
            }`}>
              {displayPlayers.map((player, idx) => (
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
                        size={28}
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
              <Text size="sm" className="font-mono font-bold" aria-label="0 minutes 0 seconds">
                00:00
              </Text>
            </Card>
          </div>
        </div>

        {/* Bottom Row: Collapsible Dice & Coin Tray */}
        <div role="region" aria-label="Dice and coin tray">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDiceExpanded(!isDiceExpanded)}
            className="w-full flex items-center justify-between p-2 text-xs"
            aria-expanded={isDiceExpanded}
            aria-controls="dice-tray-content"
          >
            <Group gap="xs">
              <Dices size={14} />
              <Coins size={14} />
              <Text size="xs">Dice & Coins</Text>
            </Group>
            {isDiceExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </Button>

          <Collapse in={isDiceExpanded}>
            <div id="dice-tray-content">
              <Card variant="glass" padding="sm" className="mt-2">
                <Stack gap="xs">
                {/* Dice & Coin Controls */}
                <Group gap="xs" role="group" aria-label="Dice and coin controls">
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled
                    className="text-xs"
                    aria-label="Roll d6 die (currently disabled)"
                  >
                    Roll d6
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled
                    className="text-xs"
                    aria-label="Roll d20 die (currently disabled)"
                  >
                    Roll d20
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled
                    className="text-xs"
                    aria-label="Flip coin (currently disabled)"
                  >
                    Flip Coin
                  </Button>
                </Group>

                {/* Roll History */}
                <div role="log" aria-label="Dice and coin history">
                  <Text size="xs" c="dimmed" className="mb-1">
                    Recent Rolls
                  </Text>
                  <Group gap="xs">
                    {/* Placeholder history chips */}
                    <Badge variant="info" size="sm" className="text-xs" aria-label="d6 roll: 4">
                      d6: 4
                    </Badge>
                    <Badge variant="info" size="sm" className="text-xs" aria-label="Coin flip: Heads">
                      🪙: H
                    </Badge>
                  </Group>
                </div>
                </Stack>
              </Card>
            </div>
          </Collapse>
        </div>

        {/* Life Controllers Accordion */}
        <div role="region" aria-label="Life total controllers">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsLifeExpanded(!isLifeExpanded)}
            className="w-full flex items-center justify-between"
            aria-expanded={isLifeExpanded}
            aria-controls="life-controllers"
          >
            <Group gap="xs">
              <Heart size={16} className="text-red-400" />
              <span>Life Controllers</span>
            </Group>
            {isLifeExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>

          <Collapse in={isLifeExpanded}>
            <div className="mt-2">
              <Card variant="glass" padding="sm">
                <Stack gap="md">
                  <Text size="xs" c="dimmed">
                    Adjust Player Life Totals
                  </Text>
                  
                  {displayPlayers.map((player) => (
                    <div key={player.name} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <div className={`w-3 h-3 rounded-full bg-${player.color}-500`}></div>
                        <Text size="sm" className="font-medium">{player.name}</Text>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <ActionIcon
                          variant="light"
                          color="red"
                          size="sm"
                          onClick={() => updateLifeTotal(player.name, -1)}
                          aria-label={`Decrease ${player.name}'s life by 1`}
                        >
                          <Minus size={12} />
                        </ActionIcon>
                        
                        <Text size="sm" className="font-mono font-bold min-w-8 text-center">
                          {player.life}
                        </Text>
                        
                        <ActionIcon
                          variant="light"
                          color="green"
                          size="sm"
                          onClick={() => updateLifeTotal(player.name, 1)}
                          aria-label={`Increase ${player.name}'s life by 1`}
                        >
                          <Plus size={12} />
                        </ActionIcon>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => updateLifeTotal(player.name, -5)}
                          className="text-xs"
                        >
                          -5
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => updateLifeTotal(player.name, 5)}
                          className="text-xs"
                        >
                          +5
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setPlayerLifeTotals({})}
                    className="text-xs"
                  >
                    Reset All Life (40)
                  </Button>
                </Stack>
              </Card>
            </div>
          </Collapse>
        </div>
      </div>
    </Card>
  );
}
