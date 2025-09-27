'use client';

import { useState } from 'react';
import { Card, Button, Badge } from '@/components/ui';

interface LifeCounterProps {
  playerName: string;
  initialLife?: number;
  isCurrentPlayer?: boolean;
  className?: string;
}

export default function LifeCounter({ 
  playerName, 
  initialLife = 20, 
  isCurrentPlayer = false,
  className = '' 
}: LifeCounterProps) {
  const [life, setLife] = useState(initialLife);
  const [poison, setPoison] = useState(0);

  const adjustLife = (amount: number) => {
    setLife(prev => Math.max(0, prev + amount));
  };

  const adjustPoison = (amount: number) => {
    setPoison(prev => Math.max(0, Math.min(10, prev + amount)));
  };

  const getLifeColor = () => {
    if (life <= 0) return 'text-red-500';
    if (life <= 5) return 'text-orange-500';
    if (life <= 10) return 'text-yellow-500';
    return 'text-green-400';
  };

  const getLifeGlow = () => {
    if (life <= 0) return 'shadow-red-500/50';
    if (life <= 5) return 'shadow-orange-500/50';
    if (life <= 10) return 'shadow-yellow-500/50';
    return 'shadow-green-400/50';
  };

  return (
    <Card 
      variant="glass" 
      padding="sm"
      className={`
        life-counter relative transition-all duration-300
        ${isCurrentPlayer ? 'ring-2 ring-primary-400 shadow-lg shadow-primary-400/25' : ''}
        hover:scale-105 ${className}
      `}
    >
      {/* Player Name */}
      <div className="text-center mb-2">
        <Badge 
          variant={isCurrentPlayer ? "primary" : "secondary"} 
          size="sm"
          className="text-xs"
        >
          {playerName}
        </Badge>
      </div>

      {/* Life Total - Circular Display */}
      <div className="relative flex justify-center mb-3">
        <div className={`
          w-16 h-16 rounded-full border-4 flex items-center justify-center
          transition-all duration-300 cursor-pointer
          ${getLifeColor()} border-current shadow-lg ${getLifeGlow()}
          hover:scale-110
        `}>
          <span className="text-xl font-bold">{life}</span>
        </div>
        
        {/* Life Change Buttons */}
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
      </div>

      {/* Quick Life Adjustment */}
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

      {/* Poison Counter */}
      {poison > 0 && (
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

      {/* Add Poison Button (when no poison) */}
      {poison === 0 && (
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