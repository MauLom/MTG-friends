'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameZone from './GameZone';
import { useGameStore } from '@/lib/store';

export default function GameBoard() {
  const {
    playerHand,
    playerLibrary,
    playerGraveyard,  
    playerBattlefield,
    playerExile
  } = useGameStore();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="game-board flex-1 grid grid-rows-[auto_1fr_auto] p-4 gap-4">
        {/* Opponent's Area */}
        <div className="opponent-area">
          <GameZone
            id="opponent-hand"
            title="Opponent's Hand"
            cards={[]}
            className="min-h-20"
          />
        </div>

        {/* Battlefield */}
        <div className="battlefield flex-1">
          <GameZone
            id="battlefield"
            title="Battlefield"
            cards={playerBattlefield}
            className="min-h-40 flex-1"
          />
        </div>

        {/* Player's Area */}
        <div className="player-area grid grid-cols-[1fr_2fr] gap-4">
          <div className="player-zones flex flex-col gap-2">
            <GameZone
              id="graveyard"
              title="Graveyard"
              cards={playerGraveyard}
              className="min-h-20"
            />
            <GameZone
              id="library"
              title="Library"
              cards={playerLibrary}
              className="min-h-20"
            />
            <GameZone
              id="exile"
              title="Exile"
              cards={playerExile}
              className="min-h-20"
            />
          </div>
          <GameZone
            id="hand"
            title="Your Hand"
            cards={playerHand}
            className="min-h-20"
          />
        </div>
      </div>
    </DndProvider>
  );
}