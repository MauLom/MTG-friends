'use client';

import { useGameStore } from '@/lib/store';

interface DeckComponentProps {
  className?: string;
}

export default function DeckComponent({ className = '' }: DeckComponentProps) {
  const { currentDeck, drawCardFromDeck } = useGameStore();

  console.log('Current Deck:', currentDeck);
  
  if (!currentDeck) {
    return null;
  }

  // Calculate remaining cards in deck
  const totalCards = currentDeck.cards.reduce((sum, card) => sum + card.quantity, 0);
  const remainingCards = currentDeck.remainingCards || totalCards;

  const handleClick = () => {
    if (remainingCards > 0) {
      drawCardFromDeck();
    }
  };

  return (
    <div 
      className={`deck-component cursor-pointer ${remainingCards === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} transition-all duration-300 ${className}`}
      onClick={handleClick}
      title={`${currentDeck.name} - ${remainingCards} cards remaining`}
    >
      <div className="relative w-20 h-28 bg-gradient-to-br from-amber-800 to-amber-900 border-2 border-amber-600 rounded-lg shadow-lg">
        {/* Magic card back pattern */}
        <div className="w-full h-full rounded-lg bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 relative overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-2 border border-amber-500 rounded-md opacity-60">
            <div className="absolute inset-1 border border-amber-400 rounded-sm opacity-40">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-amber-300 text-sm font-bold opacity-80">MTG</div>
              </div>
            </div>
          </div>
          
          {/* Card count indicator - make it more prominent */}
          <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-sm font-bold px-2 py-1 rounded-full border-2 border-white shadow-lg">
            {remainingCards}
          </div>
        </div>
      </div>
    </div>
  );
}