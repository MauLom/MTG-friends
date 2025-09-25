'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/lib/store';
import { useSocket } from '@/hooks/useSocket';
import ConnectionScreen from '@/components/ConnectionScreen';
import GameScreen from '@/components/game/GameScreen';
import StatusMessages from '@/components/ui/StatusMessages';

export default function Home() {
  const { currentScreen } = useGameStore();
  const socket = useSocket();

  return (
    <div id="app" className="w-full h-screen">
      {currentScreen === 'connection' && <ConnectionScreen />}
      {currentScreen === 'game' && <GameScreen />}
      <StatusMessages />
    </div>
  );
}