'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameZone from './GameZone';
import DeckComponent from './DeckComponent';
import { useGameStore } from '@/lib/store';

export default function GameBoard() {
  const {
    playerHand,
    playerGraveyard,  
    playerBattlefield,
    playerExile
  } = useGameStore();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="game-board flex-1 grid grid-rows-[1fr_auto] p-4 gap-4">
        {/* Main Battlefield Area - Open space for card interaction */}
        <div className="battlefield-container flex-1 grid grid-rows-[auto_1fr] gap-4">
          {/* Opponent's area at the top */}
          <div className="opponent-area">
            <GameZone
              id="opponent-battlefield"
              title="Opponent's Area"
              cards={[]}
              className="min-h-32 bg-white/5"
            />
          </div>
          
          {/* Main battlefield - large open area */}
          <div className="main-battlefield flex-1">
            <GameZone
              id="battlefield"
              title="Battlefield"
              cards={playerBattlefield}
              className="min-h-80 flex-1 bg-gradient-to-b from-white/5 to-white/10"
            />
          </div>
        </div>

        {/* Player's Bottom Area - 3 zones + hand */}
        <div className="player-area grid grid-cols-[auto_1fr_auto] gap-4 items-end">
          {/* Left side - 3 key zones */}
          <div className="player-zones flex gap-4">
            <div className="deck-area">
              <h3 className="text-sm font-semibold mb-2 text-white/80 text-center">Deck</h3>
              <DeckComponent className="w-fit" />
            </div>
            <GameZone
              id="graveyard"
              title="Graveyard"
              cards={playerGraveyard}
              className="w-20 min-h-28"
            />
            <GameZone
              id="exile"
              title="Exile"
              cards={playerExile}
              className="w-20 min-h-28"
            />
          </div>
          
          {/* Center - Player's hand */}
          <GameZone
            id="hand"
            title="Your Hand"
            cards={playerHand}
            className="min-h-28 flex-1"
          />
          
          {/* Right side - spacer for balance */}
          <div className="w-20"></div>
        </div>
      </div>
    </DndProvider>
  );
}