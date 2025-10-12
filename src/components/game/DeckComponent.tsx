'use client';

import { useGameStore } from '@/lib/store';

interface DeckComponentProps {
  className?: string;
}

export default function DeckComponent({ className = '' }: DeckComponentProps) {
  const { currentDeck, drawCardFromDeck, gameReady } = useGameStore();

  console.log('Current Deck:', currentDeck);
  
  if (!currentDeck) {
    return (
      <div className={`deck-component opacity-50 ${className}`}>
        <div className="relative">
          <div className="w-12 h-16 bg-gray-600/30 rounded border-2 border-dashed border-gray-400/50 flex items-center justify-center">
            <span className="text-xs text-gray-400">No Deck</span>
          </div>
        </div>
      </div>
    );
  }

  // Calculate remaining cards in deck
  const totalCards = currentDeck.cards.reduce((sum, card) => sum + card.quantity, 0);
  const remainingCards = currentDeck.remainingCards || totalCards;

  const handleClick = () => {
    if (remainingCards > 0 && gameReady) {
      drawCardFromDeck();
    }
  };

  const canDraw = remainingCards > 0 && gameReady;

  return (
    <div 
      className={`deck-component cursor-pointer relative group ${
        !canDraw ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25'
      } transition-all duration-300 ${className}`}
      onClick={handleClick}
      title={canDraw ? `${currentDeck.name} - Click to draw card (${remainingCards} remaining)` : 'Cannot draw card'}
    >
      <div className="relative w-20 h-28 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300">
        {/* Magic card back */}
        <div className={`
          w-full h-full rounded-lg relative overflow-hidden transition-all duration-300
          ${canDraw 
            ? 'bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 border-2 border-amber-600' 
            : 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-2 border-gray-600'
          }
        `}>
          {/* Decorative pattern */}
          <div className="absolute inset-2 border border-amber-500 rounded-md opacity-60">
            <div className="absolute inset-1 border border-amber-400 rounded-sm opacity-40">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-amber-300 text-sm font-bold opacity-80">MTG</div>
              </div>
            </div>
          </div>
          
          {/* Draw indicator on hover */}
          {canDraw && (
            <div className="absolute inset-0 bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
              <div className="text-sm font-bold text-blue-100 bg-blue-600/80 px-2 py-1 rounded">DRAW</div>
            </div>
          )}
          
          {/* Card count indicator - more prominent and colored by remaining cards */}
          <div className={`
            absolute -top-2 -right-2 px-2 py-1 rounded-full border-2 text-sm font-bold shadow-lg transition-all duration-300 group-hover:scale-110
            ${remainingCards > 20 
              ? 'bg-green-600 text-white border-green-400' 
              : remainingCards > 5 
                ? 'bg-yellow-600 text-white border-yellow-400'
                : remainingCards > 0 
                  ? 'bg-orange-600 text-white border-orange-400'
                  : 'bg-red-600 text-white border-red-400'
            }
          `}>
            {remainingCards}
          </div>
          
          {/* Deck name tooltip */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/90 text-white text-xs px-3 py-1 rounded whitespace-nowrap pointer-events-none z-10">
            {currentDeck.name}
            {canDraw && <div className="text-blue-300">Click to draw card</div>}
          </div>
        </div>
      </div>
    </div>
  );
}