'use client';

import { useGameStore } from '@/lib/store';
import GameHeader from './GameHeader';
import PlayersArea from './PlayersArea';
import GameBoard from './GameBoard';
import Chat from './Chat';

export default function GameScreen() {
  const { currentRoom, players, gameState } = useGameStore();

  if (!currentRoom || !gameState) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading game...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen grid grid-rows-[auto_auto_1fr_auto] grid-areas-[header_players_board_chat]">
      {/*<GameHeader />*/}
      <PlayersArea />
      <GameBoard />
      {/* <Chat /> */}
    </div>
  );
}