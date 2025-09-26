'use client';

import { useDrop } from 'react-dnd';
import { useGameStore } from '@/lib/store';
import { Card } from '@/types/game';
import GameCard from './GameCard';

interface GameZoneProps {
  id: string;
  title: string;
  cards: Card[];
  className?: string;
}

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
      className={`zone bg-white/5 border-2 border-dashed border-white/20 rounded-xl p-4 transition-all duration-300 ${
        isOver ? 'border-indigo-400 bg-indigo-400/10' : 'hover:border-white/40 hover:bg-white/8'
      } ${className}`}
    >
      <h3 className="text-sm font-semibold mb-2 text-white/80">{title}</h3>
      <div className={`card-container ${id === 'hand' ? 'flex flex-nowrap gap-1 overflow-x-auto' : 'flex flex-wrap gap-2'} min-h-[60px]`}>
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