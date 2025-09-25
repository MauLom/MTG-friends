'use client';

import { useGameStore } from '@/lib/store';

export default function GameHeader() {
  const { currentRoom, players, gameState } = useGameStore();

  const drawCard = () => {
    // Placeholder for draw card functionality
    console.log('Draw card');
  };

  const shuffleLibrary = () => {
    // Placeholder for shuffle library functionality
    console.log('Shuffle library');
  };

  const resetGame = () => {
    // Placeholder for reset game functionality
    console.log('Reset game');
  };

  return (
    <div className="game-header flex justify-between items-center p-4 bg-black/30 border-b border-white/10">
      <div className="room-info flex items-center space-x-6">
        <span className="text-sm opacity-80">
          Room: <span className="font-mono font-semibold">{currentRoom}</span>
        </span>
        <span className="text-sm opacity-80">
          Players: {players.length}
        </span>
        <span className="text-sm opacity-80">
          Phase: <span className="capitalize">{gameState?.phase}</span>
        </span>
      </div>

      <div className="game-controls flex gap-3">
        <button
          onClick={drawCard}
          className="btn small bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Draw Card
        </button>
        <button
          onClick={shuffleLibrary}
          className="btn small bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Shuffle Library
        </button>
        <button
          onClick={resetGame}
          className="btn small danger bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}