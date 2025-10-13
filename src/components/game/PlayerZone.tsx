'use client';

import { useDroppable } from '@dnd-kit/core';
import { Card } from '@/components/ui';
import GameZone from './GameZone';
import HandZone from './HandZone';
import BattlefieldZone from './BattlefieldZone';
import DeckComponent from './DeckComponent';
import GameCard from './GameCard';
import { Card as CardType } from '@/types/game';

interface PlayerZoneProps {
  playerName: string;
  isCurrentPlayer?: boolean;
  isOpponent?: boolean;
  hand: CardType[];
  graveyard: CardType[];
  exile: CardType[];
  battlefield: CardType[];
  library: CardType[]; // Current deck/library cards
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
  library,
  className = ''
}: PlayerZoneProps) {
  
  // Droppable zones for the new areas
  const { setNodeRef: setDeckRef, isOver: isDeckOver } = useDroppable({
    id: 'library',
  });
  
  const { setNodeRef: setGraveyardRef, isOver: isGraveyardOver } = useDroppable({
    id: 'graveyard',
  });
  
  const { setNodeRef: setExileRef, isOver: isExileOver } = useDroppable({
    id: 'exile',
  });
  
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
          {/* Player Name */}
          <div className="flex-shrink-0">
            <span className="text-sm font-semibold text-white">{playerName}</span>
          </div>
          
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
                <span className="text-xs text-gray-300">{library.length}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Opponent's battlefield area - if they have creatures */}
        {battlefield.length > 0 && (
          <div className="mt-2">
            <BattlefieldZone
              cards={battlefield}
              playerName={playerName}
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
      <div className="grid grid-rows-[1fr_160px] gap-4 h-full">
        {/* Top row - Battlefield */}
        <BattlefieldZone
          cards={battlefield}
          playerName={playerName}
          className="flex-1"
        />
        
        {/* Bottom row - Hand area with 3 columns layout */}
        <div className="player-hand-area grid grid-cols-4 gap-4 h-40">
          {/* Column 1 (25%) - Empty for now */}
          <div className="col-span-1 flex items-center justify-center">
            <div className="text-white/30 text-xs text-center">
              <div className="mb-2">⚡</div>
              <div>Future<br/>Actions</div>
            </div>
          </div>
          
          {/* Column 2 (50%) - Hand Zone */}
          <div className="col-span-2 relative">
            <div className="player-info text-center mb-2">
              <div className="text-sm font-semibold text-white">{playerName}</div>
              <div className="text-xs text-white/70">
                Cards in hand: {hand.length}
              </div>
            </div>
            <HandZone
              cards={hand}
              className="relative h-full"
            />
          </div>
          
          {/* Column 3 (25%) - Deck, Graveyard, Exile */}
          <div className="col-span-1 grid grid-cols-3 gap-2 items-center">
            {/* Deck with card back image */}
            <div className="text-center">
              <span className="text-xs text-white/70 block mb-1">Deck ({library.length})</span>
              <div 
                ref={setDeckRef}
                className={`
                  relative cursor-pointer transition-all duration-200
                  ${isDeckOver ? 'scale-105 ring-2 ring-blue-400 shadow-lg shadow-blue-400/50' : ''}
                `}
              >
                <img 
                  src="https://backs.scryfall.io/small/2/2/222b7a3b-2321-4d4c-af19-19338b134971.jpg" 
                  alt="Card Back" 
                  className="w-12 h-16 rounded border-2 border-blue-400/50" 
                  width={80} 
                  height={110} 
                />
             
              </div>
            </div>
            
            {/* Graveyard */}
            <div className="text-center">
              <span className="text-xs text-white/70 block mb-1">GY</span>
              <div 
                ref={setGraveyardRef}
                className={`
                  w-12 h-16 rounded cursor-pointer transition-all duration-200 relative overflow-hidden
                  ${isGraveyardOver ? 'scale-105 ring-2 ring-purple-400 shadow-lg shadow-purple-400/50' : ''}
                  ${graveyard.length > 0 ? 'border-2 border-purple-400/50' : 'border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10'}
                `}
              >
                {graveyard.length > 0 ? (
                  <>
                    {/* Show the last card in graveyard */}
                    <div className="absolute inset-0">
                      <GameCard 
                        card={graveyard[graveyard.length - 1]} 
                        zone="graveyard"
                      />
                    </div>
                    {/* Card count badge */}
                    <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs px-1 rounded-bl z-10">
                      {graveyard.length}
                    </div>
                  </>
                ) : (
                  <span className="text-sm font-semibold text-purple-300">0</span>
                )}
              </div>
            </div>
            
            {/* Exile */}
            <div className="text-center">
              <span className="text-xs text-white/70 block mb-1">Exile</span>
              <div 
                ref={setExileRef}
                className={`
                  w-12 h-16 rounded cursor-pointer transition-all duration-200 relative overflow-hidden
                  ${isExileOver ? 'scale-105 ring-2 ring-orange-400 shadow-lg shadow-orange-400/50' : ''}
                  ${exile.length > 0 ? 'border-2 border-orange-400/50' : 'border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10'}
                `}
              >
                {exile.length > 0 ? (
                  <>
                    {/* Show the last card in exile */}
                    <div className="absolute inset-0">
                      <GameCard 
                        card={exile[exile.length - 1]} 
                        zone="exile"
                      />
                    </div>
                    {/* Card count badge */}
                    <div className="absolute top-0 right-0 bg-orange-600 text-white text-xs px-1 rounded-bl z-10">
                      {exile.length}
                    </div>
                  </>
                ) : (
                  <span className="text-sm font-semibold text-orange-300">0</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}