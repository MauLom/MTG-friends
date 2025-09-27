'use client';

import { useGameStore } from '@/lib/store';
import { Button, Badge, Card } from '@/components/ui';

export default function GameHeader() {
  const { currentRoom, players, gameState, drawCardFromDeck, gameReady, currentDeck } = useGameStore();

  const drawCard = () => {
    drawCardFromDeck();
  };

  const drawMultipleCards = (count: number) => {
    for (let i = 0; i < count; i++) {
      // Add a small delay between draws to make it feel more natural
      setTimeout(() => {
        drawCardFromDeck();
      }, i * 150); // 150ms delay between each card
    }
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
    <Card 
      variant="glass" 
      padding="md" 
      className="flex justify-between items-center border-b border-white/10"
    >
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-white/70">Room:</span>
          <Badge variant="primary" size="sm">
            {currentRoom}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-white/70">Players:</span>
          <Badge variant="secondary" size="sm">
            {players.length}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-white/70">Phase:</span>
          <Badge variant="info" size="sm">
            {gameState?.phase || 'waiting'}
          </Badge>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={drawCard}
          variant="primary"
          size="sm"
          disabled={!gameReady || !currentDeck}
        >
          Draw Card
        </Button>
        <Button
          onClick={() => drawMultipleCards(7)}
          variant="secondary"
          size="sm"
          disabled={!gameReady || !currentDeck}
        >
          Draw Opening Hand (7)
        </Button>
        <Button
          onClick={shuffleLibrary}
          variant="secondary"
          size="sm"
          disabled={!gameReady}
        >
          Shuffle Library
        </Button>
        <Button
          onClick={resetGame}
          variant="danger"
          size="sm"
        >
          Reset Game
        </Button>
      </div>
    </Card>
  );
}