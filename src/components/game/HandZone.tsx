'use client';

import { useDroppable } from '@dnd-kit/core';
import { useGameStore } from '@/lib/store';
import { Card } from '@/types/game';
import GameCard from './GameCard';
import { track, getDeviceType } from '@/lib/telemetry';

interface HandZoneProps {
  cards: Card[];
  className?: string;
}

export default function HandZone({ cards, className = '' }: HandZoneProps) {
  const { moveCard } = useGameStore();

  // DnD Kit droppable
  const { isOver, setNodeRef } = useDroppable({
    id: 'hand',
  });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    track('ui.zone.scroll', {
      zone: 'hand',
      scrollTop: e.currentTarget.scrollTop,
      scrollLeft: e.currentTarget.scrollLeft,
      device: getDeviceType(),
    });
  };

  return (
    <div
      ref={setNodeRef}
      className={`
        hand-zone relative group overflow-hidden
        bg-gradient-to-t from-blue-900/30 to-blue-800/20 
        rounded-t-2xl transition-all duration-300 backdrop-blur-sm
        
        ${className}
      `}
      style={{
        minHeight: '180px', // Increased to accommodate hover effects
        borderBottomLeftRadius: '0',
        borderBottomRightRadius: '0',
      }}
    >
      {/* Hand title - only show when hovering or when cards are present */}
      <div className={`
        absolute top-2 left-4 text-xs font-semibold text-blue-300/80 transition-opacity duration-300
        ${cards.length > 0 || isOver ? 'opacity-100' : 'opacity-60'}
      `}>
        Your Hand ({cards.length})
      </div>
      
      {/* Fan layout container */}
      <div 
        className="hand-fan-container absolute bottom-0 left-1/2 transform -translate-x-1/2 pb-4 pt-8"
        style={{
          width: '95%', // Increased from 80% to give more room for cards
          height: '160px', // Increased for hover effects
          perspective: '1000px',
        }}
        onScroll={handleScroll}
      >
        {cards.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full text-blue-300/40 text-sm">
            Cards in your hand will appear here
          </div>
        ) : (
          <div className="relative w-full h-full flex items-end justify-center">
            {cards.map((card, index) => {
              const totalCards = cards.length;
              const centerIndex = (totalCards - 1) / 2;
              const offsetFromCenter = index - centerIndex;
              
              // Calculate fan spread - INCREASED spacing for better visibility
              const baseSpacing = Math.max(15, Math.min(25, 300 / Math.max(totalCards - 1, 1))); // Dynamic spacing between 15-25px
              const maxSpread = Math.min(totalCards * baseSpacing, 300); // Max 300px spread
              const horizontalOffset = (offsetFromCenter * maxSpread) / Math.max(totalCards - 1, 1);
              
              // Calculate rotation - REDUCED rotation for better readability
              const maxRotation = Math.min(totalCards * 1.5, 20); // Reduced from 2 to 1.5, max 20 degrees
              const rotation = (offsetFromCenter * maxRotation) / Math.max(totalCards - 1, 1);
              
              // Calculate vertical offset - REDUCED arc for flatter fan
              const verticalOffset = Math.abs(offsetFromCenter) * 1; // Reduced from 2 to 1
              
              // Z-index for natural overlap - center cards on top
              const zIndex = totalCards - Math.abs(offsetFromCenter);

              return (
                <div
                  key={card.id}
                  className="absolute transition-all duration-300 hover:z-50 cursor-pointer"
                  style={{
                    transform: `
                      translateX(${horizontalOffset}px) 
                      translateY(${verticalOffset}px) 
                      rotate(${rotation}deg)
                      translateZ(0)
                    `,
                    transformOrigin: 'center bottom',
                    zIndex: zIndex,
                  }}
                >
                  <div className="hover:scale-105 hover:-translate-y-4 hover:rotate-0 transition-all duration-300 hover:z-50">
                    <div className="relative">
                      <GameCard 
                        card={card} 
                        zone="hand"
                      />
                      {/* Card preview on hover - improved visibility */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                        <div className="bg-black/95 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-white/20 shadow-lg max-w-xs">
                          <div className="font-semibold truncate">{card.name}</div>
                          {card.manaCost && <div className="text-blue-300 mt-1">{card.manaCost}</div>}
                          {card.type && <div className="text-gray-300 text-xs mt-1 truncate">{card.type}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}