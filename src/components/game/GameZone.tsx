'use client';

import { useDrop } from 'react-dnd';
import { useGameStore } from '@/lib/store';
import { Card } from '@/types/game';
import GameCard, { CARD_DIMENSIONS } from './GameCard';

interface GameZoneProps {
  id: string;
  title: string;
  cards: Card[];
  className?: string;
}

/**
 * Virtualization-ready zone constants
 * These values define predictable container heights for virtualization libraries
 * like react-virtualized or react-virtuoso to calculate scroll and windowing
 */
const ZONE_LAYOUT = {
  minHeight: 60, // Minimum container height for empty zones
  cardHeight: CARD_DIMENSIONS.height, // 84px - standard card height
  cardWidth: CARD_DIMENSIONS.width, // 60px - standard card width
  gap: 8, // Gap between cards in pixels (gap-2 = 0.5rem = 8px)
  handGap: 4, // Smaller gap for hand zone (gap-1 = 0.25rem = 4px)
  padding: 16, // Zone padding (p-4 = 1rem = 16px)
} as const;

export default function GameZone({ id, title, cards, className = '' }: GameZoneProps) {
  const { moveCard } = useGameStore();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'card',
    drop: (item: { id: string; from: string }) => {
      if (item.from !== id) {
        moveCard(item.id, item.from, id);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop as any}
      className={`
        zone relative group
        bg-white/5 border-2 border-dashed border-white/20 rounded-xl p-4 
        transition-all duration-300 backdrop-blur-sm
        ${isOver ? 
          'border-indigo-400 bg-indigo-400/10 shadow-lg shadow-indigo-400/25 scale-[1.02]' : 
          'hover:border-white/40 hover:bg-white/8 hover:shadow-lg hover:shadow-white/10'
        } 
        ${className}
      `}
    >
      <h3 className={`
        text-sm font-semibold mb-2 text-white/80 transition-colors duration-300
        ${isOver ? 'text-indigo-300' : 'group-hover:text-white/90'}
      `}>
        {title}
      </h3>
      
      {/* 
        VIRTUALIZATION BOUNDARY: This container is where react-virtualized or react-virtuoso would be integrated
        Current implementation renders all cards, but the structure is ready for windowing
        
        Key integration points:
        1. Replace this div with <VirtualizedList> or <Virtuoso>
        2. Use ZONE_LAYOUT constants for itemSize calculations
        3. Pass cards array as data prop
        4. Render GameCard as itemContent/rowRenderer
        5. For hand zone: use horizontal scrolling mode with overscan
        6. For battlefield/graveyard: use grid layout with calculated row heights
        
        Example with react-virtuoso:
        <Virtuoso
          data={cards}
          itemContent={(index, card) => <GameCard key={card.id} card={card} zone={id} />}
          style={{ height: 'auto', minHeight: `${ZONE_LAYOUT.minHeight}px` }}
        />
      */}
      <div 
        className={`card-container ${id === 'hand' ? 'flex flex-nowrap gap-1 overflow-x-auto' : 'flex flex-wrap gap-2'}`}
        style={{ minHeight: `${ZONE_LAYOUT.minHeight}px` }}
      >
        {cards.map((card) => (
          <GameCard key={card.id} card={card} zone={id} />
        ))}
        {cards.length === 0 && (
          <div className="flex items-center justify-center w-full h-full text-white/40 text-sm">
            Drop cards here
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Export layout constants for use in virtualization implementations
 * These constants ensure consistent sizing across the application
 */
export { ZONE_LAYOUT };