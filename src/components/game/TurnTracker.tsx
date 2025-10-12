'use client';

import { useState } from 'react';
import { Card, Button, Badge } from '@/components/ui';
import { track, getDeviceType } from '@/lib/telemetry';

interface TurnTrackerProps {
  className?: string;
}

type GamePhase = 'UT' | 'UK' | 'D' | 'MP1' | 'BP' | 'MP2' | 'EP';

const GAME_PHASES: { key: GamePhase; label: string; description: string }[] = [
  { key: 'UT', label: 'UT', description: 'Untap' },
  { key: 'UK', label: 'UK', description: 'Upkeep' },
  { key: 'D', label: 'D', description: 'Draw' },
  { key: 'MP1', label: 'MP1', description: 'Main Phase 1' },
  { key: 'BP', label: 'BP', description: 'Battle Phase' },
  { key: 'MP2', label: 'MP2', description: 'Main Phase 2' },
  { key: 'EP', label: 'EP', description: 'End Phase' },
];

export default function TurnTracker({ className = '' }: TurnTrackerProps) {
  const [currentPhase, setCurrentPhase] = useState<GamePhase>('UT');
  const [isMyTurn, setIsMyTurn] = useState(true);

  const handlePhaseClick = (phase: GamePhase) => {
    setCurrentPhase(phase);
  };

  const handlePassTurn = () => {
    setIsMyTurn(false);
    setCurrentPhase('UT');
    // TODO: Integrate with game state management
    setTimeout(() => setIsMyTurn(true), 2000); // Simulate opponent turn
  };

  return (
    <Card 
      variant="glass" 
      padding="md" 
      className={`turn-tracker relative ${className}`}
    >
      <div className="text-center mb-4">
        <Badge 
          variant={isMyTurn ? "primary" : "secondary"} 
          size="sm"
          className="mb-2"
        >
          {isMyTurn ? "Your Turn" : "Opponent's Turn"}
        </Badge>
        <h3 className="text-sm font-semibold text-white/90">Turn Control</h3>
      </div>

      {/* Phase Buttons */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {GAME_PHASES.map((phase) => (
          <Button
            key={phase.key}
            onClick={() => handlePhaseClick(phase.key)}
            onMouseEnter={() => {
              track('ui.turntracker.phase.hover', {
                phase: phase.key,
                device: getDeviceType(),
              });
            }}
            variant={currentPhase === phase.key ? "primary" : "secondary"}
            size="sm"
            disabled={!isMyTurn}
            className={`
              transition-all duration-300 text-xs
              ${currentPhase === phase.key && isMyTurn ? 
                'ring-2 ring-primary-400 glow-pulse' : 
                ''
              }
              ${!isMyTurn ? 'opacity-50' : 'hover:scale-105'}
            `}
          >
            {phase.label}
          </Button>
        ))}
      </div>

      {/* Pass Turn Button */}
      <Button
        onClick={handlePassTurn}
        variant="danger"
        size="sm"
        disabled={!isMyTurn}
        className={`
          w-full transition-all duration-300
          ${isMyTurn ? 
            'hover:scale-105 hover:shadow-lg hover:shadow-red-500/25' : 
            'opacity-50 cursor-not-allowed'
          }
        `}
      >
        PASS TURN
      </Button>

      {/* Current Phase Indicator */}
      {isMyTurn && (
        <div className="absolute -top-2 -right-2">
          <div className="w-4 h-4 bg-primary-500 rounded-full motion-safe:animate-ping"></div>
          <div className="absolute top-0 right-0 w-4 h-4 bg-primary-600 rounded-full"></div>
        </div>
      )}
    </Card>
  );
}