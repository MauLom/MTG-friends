'use client';

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { useState } from 'react';
import GameZone from './GameZone';
import PlayerZone from './PlayerZone';
import MenuPanel from './MenuPanel';
import InteractionIcons from './InteractionIcons';
import ActionsPanel from './panels/ActionsPanel';
import CardNotification from './CardNotification';
import { HudCenter } from '@/components/ui';
import { useGameStore } from '@/lib/store';
import useKeyboardShortcuts from '@/hooks/useKeyboardShortcuts';
import { Card } from '@/types/game';

export default function GameBoard() {
  const {
    playerName,
    playerHand,
    playerGraveyard,  
    playerBattlefield,
    playerExile,
    playerLibrary,
    players,
    gameState,
    moveCard
  } = useGameStore();

  // Enable keyboard shortcuts
  useKeyboardShortcuts();

  // Configure sensors for better touch and mouse support
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement required before drag starts
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    // Basic setup - no overlay needed
    console.log('Drag started:', event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event;
    
    if (over) {
      const cardId = active.id as string;
      const targetZone = over.id as string;
      
      // Determine source zone
      let sourceZone = '';
      if (playerHand.find(card => card.id === cardId)) sourceZone = 'hand';
      else if (playerBattlefield.find(card => card.id === cardId)) sourceZone = 'battlefield';
      else if (playerGraveyard.find(card => card.id === cardId)) sourceZone = 'graveyard';
      else if (playerExile.find(card => card.id === cardId)) sourceZone = 'exile';
      
      // Handle battlefield repositioning
      if (sourceZone === 'battlefield' && targetZone === 'battlefield') {
        // This is a repositioning within the battlefield
        // We'll let the BattlefieldZone handle the position update
        // through a custom event or callback
        const battlefieldElement = document.querySelector('[data-zone="battlefield"]') as HTMLElement;
        if (battlefieldElement && delta) {
          const customEvent = new CustomEvent('repositionCard', {
            detail: { cardId, deltaX: delta.x, deltaY: delta.y }
          });
          battlefieldElement.dispatchEvent(customEvent);
        }
      } else if (sourceZone && sourceZone !== targetZone) {
        // This is a zone change
        moveCard(cardId, sourceZone, targetZone);
      }
    }
  };

  // Get opponents and current turn player
  const opponents = players.filter(p => p.name !== playerName);
  const currentTurnPlayer = gameState?.currentTurnIndex !== undefined ? 
    players[gameState.currentTurnIndex] : 
    null;
  
  // Mock opponent data - in real app this would come from game state
  const mockOpponentData = {
    hand: [], // Opponents' hands are hidden
    graveyard: [],
    exile: [],
    battlefield: [],
    library: Array(60).fill(null).map((_, i) => ({ 
      id: `mock-library-${i}`,
      name: 'Unknown Card',
      faceDown: true
    }))
  };

  // Split opponents for left and right columns (max 2 each)
  const leftOpponents = opponents.slice(0, 2);
  const rightOpponents = opponents.slice(2, 4);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Card draw notification */}
      <CardNotification />
      
      <div className="game-board h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background pattern for tabletop feel */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),rgba(255,255,255,0.02))]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
        </div>

        {/* Main Grid Layout: 3 rows x 3 columns with custom proportions */}
        <div className="grid h-full gap-2 p-2" style={{
          gridTemplateRows: '1fr 2fr 1fr', // Top/Bottom smaller, Middle larger
          gridTemplateColumns: '10% 80% 10%' // For rows 1&3: narrow sides, wide center
        }}>
          
          {/* ========== ROW 1: TOP ========== */}
          {/* Top Left - Platform Actions */}
          <div className="flex flex-col justify-start items-start gap-2">
            <InteractionIcons />
          </div>

          {/* Top Center - Current Turn Player (80% width) */}
          <div className="flex justify-center items-start">
            {currentTurnPlayer ? (
              <div className="current-turn-area w-full">
                <PlayerZone
                  playerName={currentTurnPlayer.name}
                  isOpponent={currentTurnPlayer.name !== playerName}
                  hand={playerHand}
                  graveyard={playerGraveyard}
                  exile={playerExile}
                  battlefield={playerBattlefield}
                  library={playerLibrary}
                  className="max-w-4xl mx-auto" // Larger since we have 80% width
                />
              </div>
            ) : (
              <div className="text-center text-white/50 p-4">
                <p className="text-sm">No active turn</p>
              </div>
            )}
          </div>

          {/* Top Right - Platform Actions */}
          <div className="flex flex-col justify-start items-end gap-2">
            <MenuPanel />
          </div>

          {/* ========== ROW 2: MIDDLE (Override grid for 33-33-33) ========== */}
          {/* We'll use a subgrid here to override the 10-80-10 for this row */}
          <div className="col-span-3 grid grid-cols-3 gap-2">
            {/* Middle Left - Opponents (33%) */}
            <div className="flex flex-col justify-center gap-4 p-2">
              {leftOpponents.map((opponent) => (
                <div key={opponent.socketId} className="opponent-area">
                  <PlayerZone
                    playerName={opponent.name}
                    isOpponent={true}
                    hand={mockOpponentData.hand} // Hidden from view, just count
                    graveyard={mockOpponentData.graveyard}
                    exile={mockOpponentData.exile}
                    battlefield={mockOpponentData.battlefield} // Their personal board (visible)
                    library={mockOpponentData.library}
                    className="scale-90 origin-center" // Slightly larger than before
                  />
                </div>
              ))}
              {leftOpponents.length === 0 && (
                <div className="text-center text-white/30 p-4">
                  <p className="text-xs">No opponents</p>
                </div>
              )}
            </div>

            {/* Middle Center - Game Info Hub (HUD only) */}
            <div className="flex flex-col justify-center items-center relative">
              {/* HUD Center - Now includes phase tracking and turn counter */}
              <HudCenter />
            </div>

            {/* Middle Right - Opponents (33%) */}
            <div className="flex flex-col justify-center gap-4 p-2">
              {rightOpponents.map((opponent) => (
                <div key={opponent.socketId} className="opponent-area">
                  <PlayerZone
                    playerName={opponent.name}
                    isOpponent={true}
                    hand={mockOpponentData.hand} // Hidden from view, just count
                    graveyard={mockOpponentData.graveyard}
                    exile={mockOpponentData.exile}
                    battlefield={mockOpponentData.battlefield} // Their personal board (visible)
                    library={mockOpponentData.library}
                    className="scale-90 origin-center" // Slightly larger than before
                  />
                </div>
              ))}
              {rightOpponents.length === 0 && (
                <div className="text-center text-white/30 p-4">
                  <p className="text-xs">No opponents</p>
                </div>
              )}
            </div>
          </div>

          {/* ========== ROW 3: BOTTOM ========== */}
          {/* Bottom Left - Game Actions */}
          <div className="flex flex-col justify-end items-start">
            <ActionsPanel />
          </div>

          {/* Bottom Center - Current Player (80% width) */}
          <div className="flex justify-center items-end">
            <div className="current-player-area w-full">
              <PlayerZone
                playerName={playerName || 'You'}
                isCurrentPlayer={true}
                hand={playerHand} // Solo el jugador actual ve su mano
                graveyard={playerGraveyard}
                exile={playerExile}
                battlefield={playerBattlefield} // Su tablero personal donde baja cartas
                library={playerLibrary}
                className="w-full max-w-6xl mx-auto" // Take full advantage of the 80% width
              />
            </div>
          </div>

          {/* Bottom Right - Game Actions */}
          <div className="flex flex-col justify-end items-end">
            {/* TODO: Add game-specific actions like Pass Turn, Priority, etc */}
            <div className="text-white/30 text-xs p-2">
              Game Actions
            </div>
          </div>

        </div>
      </div>
    </DndContext>
  );
}