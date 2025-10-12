'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/lib/store';

export default function GameHelp() {
  const { playerHand, gameReady, currentDeck } = useGameStore();
  const [showDeckHelp, setShowDeckHelp] = useState(false);

  useEffect(() => {
    // Show deck help if user has few cards and hasn't learned about deck interaction
    if (gameReady && currentDeck && playerHand.length < 3) {
      const hasSeenDeckHelp = localStorage.getItem('mtg-deck-help-seen');
      if (!hasSeenDeckHelp) {
        setShowDeckHelp(true);
      }
    }
  }, [gameReady, currentDeck, playerHand.length]);

  const dismissDeckHelp = () => {
    setShowDeckHelp(false);
    localStorage.setItem('mtg-deck-help-seen', 'true');
  };

  if (!showDeckHelp) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <div className="bg-blue-600/90 text-white p-4 rounded-lg shadow-lg border border-blue-400 backdrop-blur-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-sm mb-2">🎴 Draw Cards</h3>
            <p className="text-xs text-blue-100 mb-3">
              Click on your library (deck) to draw cards, or press <kbd className="bg-blue-500/50 px-1 rounded">D</kbd> key
            </p>
            <button
              onClick={dismissDeckHelp}
              className="text-xs bg-blue-500 hover:bg-blue-400 px-2 py-1 rounded transition-colors"
            >
              Got it!
            </button>
          </div>
          <button
            onClick={dismissDeckHelp}
            className="text-blue-200 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}