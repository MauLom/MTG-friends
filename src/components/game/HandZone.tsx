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
        hand-zone relative group
        bg-gradient-to-t from-blue-900/30 to-blue-800/20 
        border-2 border-dashed border-blue-400/30 
        rounded-t-2xl transition-all duration-300 backdrop-blur-sm
        ${isOver ? 
          'border-blue-400 bg-blue-400/20 shadow-lg shadow-blue-400/25 scale-[1.02]' : 
          'hover:border-blue-400/50 hover:bg-blue-400/10 hover:shadow-lg hover:shadow-blue-400/10'
        } 
        ${className}
      `}
      style={{
        minHeight: '160px', // Increased for larger cards
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
        className="hand-fan-container absolute bottom-0 left-1/2 transform -translate-x-1/2 pb-4"
        style={{
          width: '100%',
          height: '140px', // Increased for larger cards
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
              
              // Calculate fan spread - wider spread with more cards
              const maxSpread = Math.min(totalCards * 8, 120); // Max 120px spread
              const horizontalOffset = (offsetFromCenter * maxSpread) / Math.max(totalCards - 1, 1);
              
              // Calculate rotation - cards at edges are more rotated
              const maxRotation = Math.min(totalCards * 2, 25); // Max 25 degrees
              const rotation = (offsetFromCenter * maxRotation) / Math.max(totalCards - 1, 1);
              
              // Calculate vertical offset - create slight arc
              const verticalOffset = Math.abs(offsetFromCenter) * 2;
              
              // Z-index for natural overlap
              const zIndex = totalCards - Math.abs(offsetFromCenter);

              return (
                <div
                  key={card.id}
                  className="absolute transition-all duration-300 hover:z-50"
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
                  <div className="hover:scale-125 hover:-translate-y-8 transition-all duration-200 hover:z-50">
                    <div className="relative">
                      <GameCard 
                        card={card} 
                        zone="hand"
                      />
                      {/* Card preview on hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <div className="bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {card.name}
                          {card.manaCost && <div className="text-blue-300">{card.manaCost}</div>}
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