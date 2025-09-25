'use client';

import { useGameStore } from '@/lib/store';

export default function PlayersArea() {
  const { players } = useGameStore();

  return (
    <div className="players-area p-4 bg-black/20">
      <div className="flex flex-wrap gap-3">
        {players.map((player) => (
          <div
            key={player.socketId}
            className="bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm border border-white/20"
          >
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="font-medium">{player.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}