'use client';

import { Card } from '@/components/ui';
import GameZone from './GameZone';
import DeckComponent from './DeckComponent';
import LifeCounter from './LifeCounter';
import { Card as GameCard } from '@/types/game';

interface PlayerZoneProps {
  playerName: string;
  isCurrentPlayer?: boolean;
  isOpponent?: boolean;
  hand: GameCard[];
  graveyard: GameCard[];
  exile: GameCard[];
  battlefield: GameCard[];
  className?: string;
}

export default function PlayerZone({
  playerName,
  isCurrentPlayer = false,
  isOpponent = false,
  hand,
  graveyard,
  exile,
  battlefield,
  className = ''
}: PlayerZoneProps) {
  
  if (isOpponent) {
    // Opponent layout - compact, top/corner positioning
    return (
      <Card
        variant="glass"
        padding="sm"
        className={`
          player-zone opponent-zone transition-all duration-300
          ${className}
        `}
      >
        <div className="flex items-center gap-3">
          {/* Life Counter */}
          <LifeCounter 
            playerName={playerName}
            className="flex-shrink-0"
          />
          
          {/* Compact zones */}
          <div className="flex gap-2 flex-1">
            {/* Hand - face down cards */}
            <div className="text-center">
              <span className="text-xs text-white/70 block mb-1">Hand</span>
              <div className="w-8 h-12 bg-blue-600/30 rounded border border-blue-400/50 flex items-center justify-center">
                <span className="text-xs text-blue-300">{hand.length}</span>
              </div>
            </div>
            
            {/* Graveyard */}
            <div className="text-center">
              <span className="text-xs text-white/70 block mb-1">GY</span>
              <div className={`
                w-8 h-12 rounded border-2 border-dashed border-white/20
                ${graveyard.length > 0 ? 'bg-purple-600/30 border-purple-400/50' : 'bg-white/5'}
                flex items-center justify-center transition-colors
              `}>
                <span className="text-xs text-white/70">{graveyard.length}</span>
              </div>
            </div>
            
            {/* Exile */}
            <div className="text-center">
              <span className="text-xs text-white/70 block mb-1">Ex</span>
              <div className={`
                w-8 h-12 rounded border-2 border-dashed border-white/20
                ${exile.length > 0 ? 'bg-orange-600/30 border-orange-400/50' : 'bg-white/5'}
                flex items-center justify-center transition-colors
              `}>
                <span className="text-xs text-white/70">{exile.length}</span>
              </div>
            </div>
            
            {/* Library */}
            <div className="text-center">
              <span className="text-xs text-white/70 block mb-1">Lib</span>
              <div className="w-8 h-12 bg-gray-600/30 rounded border border-gray-400/50 flex items-center justify-center">
                <span className="text-xs text-gray-300">52</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Opponent's battlefield area - if they have creatures */}
        {battlefield.length > 0 && (
          <div className="mt-2">
            <GameZone
              id={`${playerName}-battlefield`}
              title="Battlefield"
              cards={battlefield}
              className="min-h-16 bg-white/5"
            />
          </div>
        )}
      </Card>
    );
  }

  // Current player layout - full featured, bottom of screen
  return (
    <Card
      variant="glass"
      padding="md"
      className={`
        player-zone current-player-zone transition-all duration-300
        ${isCurrentPlayer ? 'ring-2 ring-primary-400/50 shadow-lg shadow-primary-400/25' : ''}
        ${className}
      `}
    >
      <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-end">
        {/* Left side - Library and utility zones */}
        <div className="player-zones flex gap-3">
          <div className="deck-area text-center">
            <h4 className="text-sm font-semibold mb-2 text-white/80">Library</h4>
            <DeckComponent className="w-fit" />
          </div>
          
          <div className="utility-zones flex gap-2">
            <GameZone
              id="graveyard"
              title="Graveyard"
              cards={graveyard}
              className="w-20 min-h-28 hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
            />
            <GameZone
              id="exile"
              title="Exile"
              cards={exile}
              className="w-20 min-h-28 hover:shadow-lg hover:shadow-orange-500/25 transition-shadow"
            />
          </div>
        </div>
        
        {/* Center - Player's hand */}
        <GameZone
          id="hand"
          title="Your Hand"
          cards={hand}
          className="min-h-32 flex-1 bg-gradient-to-t from-blue-900/20 to-blue-800/10 hover:shadow-lg hover:shadow-blue-500/25 transition-shadow"
        />
        
        {/* Right side - Life counter and player info */}
        <div className="player-info flex flex-col items-center gap-2">
          <LifeCounter 
            playerName={playerName}
            isCurrentPlayer={isCurrentPlayer}
          />
          
          {/* Additional player status */}
          <div className="text-center">
            <div className="text-xs text-white/70">
              Cards in hand: {hand.length}
            </div>
            <div className="text-xs text-white/50">
              Library: {/* TODO: Connect to library count */}52
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}