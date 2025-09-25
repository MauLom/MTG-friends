'use client';

import { useDrag } from 'react-dnd';
import { Card } from '@/types/game';

interface GameCardProps {
  card: Card;
  zone: string;
}

export default function GameCard({ card, zone }: GameCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: { id: card.id, from: zone },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDoubleClick = () => {
    // Toggle face up/down
    console.log('Toggle card face:', card.id);
  };

  return (
    <div
      ref={drag as any}
      onDoubleClick={handleDoubleClick}
      className={`card w-15 h-21 bg-gradient-to-br from-slate-600 to-slate-700 border-2 border-slate-500 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center text-xs text-center relative select-none ${
        isDragging ? 'opacity-50 rotate-2' : 'hover:scale-105 hover:shadow-lg hover:z-10 hover:-translate-y-1'
      } ${card.faceDown ? 'bg-gradient-to-br from-amber-800 to-amber-900' : ''}`}
    >
      <div className="card-name p-1 break-words leading-tight">
        {card.faceDown ? '???' : card.name}
      </div>
    </div>
  );
}