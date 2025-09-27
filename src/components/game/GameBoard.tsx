'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameZone from './GameZone';
import PlayerZone from './PlayerZone';
import TurnTracker from './TurnTracker';
import MenuPanel from './MenuPanel';
import InteractionIcons from './InteractionIcons';
import { useGameStore } from '@/lib/store';

export default function GameBoard() {
  const {
    playerName,
    playerHand,
    playerGraveyard,  
    playerBattlefield,
    playerExile,
    players
  } = useGameStore();

  // Mock opponent data - in real app this would come from game state
  const opponents = players.filter(p => p.name !== playerName);
  const mockOpponentData = {
    hand: [], // Opponents' hands are hidden
    graveyard: [],
    exile: [],
    battlefield: []
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="game-board relative h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background pattern for tabletop feel */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),rgba(255,255,255,0.02))]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
        </div>

        {/* Top UI Layer */}
        <div className="absolute top-4 left-4 right-4 z-40 flex justify-between items-start">
          {/* Top Left - Interaction Icons */}
          <InteractionIcons />
          
          {/* Top Right - Menu Panel */}
          <MenuPanel />
        </div>

        {/* Opponents Area - Top */}
        <div className="absolute top-16 left-4 right-4 z-30">
          <div className="flex gap-4 justify-center">
            {opponents.map((opponent) => (
              <PlayerZone
                key={opponent.socketId}
                playerName={opponent.name}
                isOpponent={true}
                hand={mockOpponentData.hand}
                graveyard={mockOpponentData.graveyard}
                exile={mockOpponentData.exile}
                battlefield={mockOpponentData.battlefield}
                className="max-w-xs"
              />
            ))}
            {opponents.length === 0 && (
              <div className="text-center text-white/50 py-8">
                <p className="text-sm">Waiting for opponents...</p>
              </div>
            )}
          </div>
        </div>

        {/* Central Battlefield */}
        <div className="absolute top-32 left-4 right-4 bottom-48 z-20">
          <div className="h-full flex items-center justify-center">
            {/* Central Turn Tracker */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
              <TurnTracker />
            </div>

            {/* Main Battlefield Zone */}
            <GameZone
              id="battlefield"
              title="Battlefield"
              cards={playerBattlefield}
              className={`
                w-full h-full 
                bg-gradient-to-br from-emerald-900/10 via-slate-800/20 to-emerald-900/10
                backdrop-blur-sm border-2 border-emerald-500/20
                shadow-2xl shadow-emerald-500/10
                hover:border-emerald-400/30 hover:shadow-emerald-400/20
                transition-all duration-500
              `}
            />
          </div>
        </div>

        {/* Current Player Area - Bottom */}
        <div className="absolute bottom-4 left-4 right-4 z-30">
          <PlayerZone
            playerName={playerName || 'You'}
            isCurrentPlayer={true}
            hand={playerHand}
            graveyard={playerGraveyard}
            exile={playerExile}
            battlefield={[]} // Player's creatures are on the main battlefield
          />
        </div>

        {/* Ambient lighting effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle glow from center */}
          <div className="absolute top-1/2 left-1/2 w-96 h-96 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-blue-500/5 to-transparent rounded-full blur-3xl"></div>
          
          {/* Corner highlights */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-radial from-purple-500/5 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-orange-500/5 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-radial from-green-500/5 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-radial from-red-500/5 to-transparent rounded-full blur-2xl"></div>
        </div>
      </div>
    </DndProvider>
  );
}