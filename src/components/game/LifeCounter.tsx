'use client';

import { useState } from 'react';
import { RingProgress } from '@mantine/core';
import { Card, Button, Badge } from '@/components/ui';

export type LifeCounterSize = 'small' | 'normal';

export interface StatusBadge {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  color?: string;
}

interface LifeCounterProps {
  playerName: string;
  initialLife?: number;
  isCurrentPlayer?: boolean;
  className?: string;
  /** Size variant: 'small' for previews, 'normal' for self/onTurn */
  size?: LifeCounterSize;
  /** Optional status badges (e.g., commander damage, tokens, etc.) */
  statusBadges?: StatusBadge[];
  /** Show interactive controls (default: true for normal size, false for small) */
  interactive?: boolean;
}

export default function LifeCounter({ 
  playerName, 
  initialLife = 20, 
  isCurrentPlayer = false,
  className = '',
  size = 'normal',
  statusBadges = [],
  interactive
}: LifeCounterProps) {
  const [life, setLife] = useState(initialLife);
  const [poison, setPoison] = useState(0);

  // Default interactive based on size if not explicitly set
  const isInteractive = interactive ?? (size === 'normal');
  
  // Size configurations
  const sizeConfig = {
    small: {
      ringSize: 80,
      ringThickness: 8,
      fontSize: 'text-lg',
      nameFontSize: 'text-xs',
      padding: 'sm' as const,
      showQuickAdjust: false,
      showDetailedPoison: false,
    },
    normal: {
      ringSize: 120,
      ringThickness: 12,
      fontSize: 'text-2xl',
      nameFontSize: 'text-sm',
      padding: 'md' as const,
      showQuickAdjust: true,
      showDetailedPoison: true,
    },
  }[size];

  const adjustLife = (amount: number) => {
    if (!isInteractive) return;
    setLife(prev => Math.max(0, prev + amount));
  };

  const adjustPoison = (amount: number) => {
    if (!isInteractive) return;
    setPoison(prev => Math.max(0, Math.min(10, prev + amount)));
  };

  // Calculate life percentage for RingProgress (based on starting life)
  const lifePercentage = (life / initialLife) * 100;
  
  // Determine color based on life percentage
  const getLifeColor = () => {
    if (life <= 0) return 'red';
    if (life <= 5) return 'orange';
    if (life <= 10) return 'yellow';
    return 'green';
  };

  const getLifeThemeColor = () => {
    if (life <= 0) return 'text-red-500';
    if (life <= 5) return 'text-orange-500';
    if (life <= 10) return 'text-yellow-500';
    return 'text-green-400';
  };

  return (
    <Card 
      variant="glass" 
      padding={sizeConfig.padding}
      className={`
        life-counter relative transition-all duration-300
        ${isCurrentPlayer ? 'ring-2 ring-primary-400 shadow-lg shadow-primary-400/25' : ''}
        ${isInteractive ? 'hover:scale-105' : ''} ${className}
      `}
    >
      {/* Player Name with truncation safety */}
      <div className="text-center mb-2" title={playerName}>
        <Badge 
          variant={isCurrentPlayer ? "primary" : "secondary"} 
          size="sm"
          className={`${sizeConfig.nameFontSize} truncate max-w-full inline-block`}
        >
          {playerName}
        </Badge>
      </div>

      {/* Life Total - RingProgress Display */}
      <div className="relative flex justify-center mb-2">
        <RingProgress
          size={sizeConfig.ringSize}
          thickness={sizeConfig.ringThickness}
          roundCaps
          sections={[
            { value: Math.min(lifePercentage, 100), color: getLifeColor() }
          ]}
          label={
            <div className="text-center">
              <div className={`${sizeConfig.fontSize} font-bold ${getLifeThemeColor()}`}>
                {life}
              </div>
              {poison > 0 && (
                <div className="text-xs text-purple-400 mt-1">
                  ☠️ {poison}
                </div>
              )}
            </div>
          }
        />
        
        {/* Life Change Buttons - Only show if interactive and normal size */}
        {isInteractive && size === 'normal' && (
          <div className="absolute -top-1 -right-1 flex flex-col gap-1">
            <Button
              onClick={() => adjustLife(1)}
              variant="secondary"
              size="sm"
              className="w-6 h-6 p-0 text-xs bg-green-600/80 hover:bg-green-500/90"
            >
              +
            </Button>
            <Button
              onClick={() => adjustLife(-1)}
              variant="secondary"
              size="sm"
              className="w-6 h-6 p-0 text-xs bg-red-600/80 hover:bg-red-500/90"
            >
              -
            </Button>
          </div>
        )}
      </div>

      {/* Quick Life Adjustment - Only for normal size */}
      {isInteractive && sizeConfig.showQuickAdjust && (
        <div className="flex gap-1 justify-center mb-2">
          <Button
            onClick={() => adjustLife(-5)}
            variant="danger"
            size="sm"
            className="text-xs px-2 py-1 h-6"
          >
            -5
          </Button>
          <Button
            onClick={() => adjustLife(5)}
            variant="primary"
            size="sm"
            className="text-xs px-2 py-1 h-6"
          >
            +5
          </Button>
        </div>
      )}

      {/* Poison Counter - Detailed for normal, compact for small */}
      {isInteractive && poison > 0 && sizeConfig.showDetailedPoison && (
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-xs text-purple-400">Poison:</span>
            <Badge 
              variant="error" 
              size="sm"
              className="bg-purple-600/80"
            >
              {poison}
            </Badge>
          </div>
          <div className="flex gap-1 justify-center mt-1">
            <Button
              onClick={() => adjustPoison(-1)}
              variant="secondary"
              size="sm"
              className="w-4 h-4 p-0 text-xs"
            >
              -
            </Button>
            <Button
              onClick={() => adjustPoison(1)}
              variant="secondary"
              size="sm"
              className="w-4 h-4 p-0 text-xs"
            >
              +
            </Button>
          </div>
        </div>
      )}

      {/* Add Poison Button (when no poison) - Only for normal interactive */}
      {isInteractive && poison === 0 && size === 'normal' && (
        <div className="text-center">
          <Button
            onClick={() => adjustPoison(1)}
            variant="secondary"
            size="sm"
            className="text-xs px-2 py-1 h-5 bg-purple-600/20 hover:bg-purple-600/40"
          >
            +Poison
          </Button>
        </div>
      )}

      {/* Status Badges - Optional */}
      {statusBadges.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center mt-2">
          {statusBadges.map((badge, index) => (
            <Badge 
              key={index}
              variant={badge.variant || 'secondary'}
              size="sm"
              className="text-xs"
              style={badge.color ? { backgroundColor: badge.color } : undefined}
            >
              {badge.label}
            </Badge>
          ))}
        </div>
      )}

      {/* Death Indicator */}
      {(life <= 0 || poison >= 10) && (
        <div className="absolute inset-0 bg-red-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <Badge variant="error" className="animate-pulse">
            {life <= 0 ? 'DEAD' : 'POISONED'}
          </Badge>
        </div>
      )}
    </Card>
  );
}