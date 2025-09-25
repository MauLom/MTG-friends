'use client';

import { useDrag } from 'react-dnd';
import { Card } from '@/types/game';
import { useState } from 'react';

interface GameCardProps {
  card: Card;
  zone: string;
}

export default function GameCard({ card, zone }: GameCardProps) {
  const [imageError, setImageError] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
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

  const handleImageError = () => {
    setImageError(true);
  };

  const showImage = card.imageUrl && !imageError && !card.faceDown;

  return (
    <div className="relative">
      <div
        ref={drag as any}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`card w-15 h-21 bg-gradient-to-br from-slate-600 to-slate-700 border-2 border-slate-500 rounded-lg cursor-pointer transition-all duration-300 relative select-none overflow-hidden ${
          isDragging ? 'opacity-50 rotate-2' : 'hover:scale-105 hover:shadow-lg hover:z-10 hover:-translate-y-1'
        } ${card.faceDown ? 'bg-gradient-to-br from-amber-800 to-amber-900' : ''}`}
      >
        {showImage ? (
          <img
            src={card.imageUrl}
            alt={card.name}
            className="w-full h-full object-cover rounded-lg"
            onError={handleImageError}
          />
        ) : (
          <div className="card-name p-1 break-words leading-tight text-xs text-center flex items-center justify-center h-full">
            {card.faceDown ? '???' : card.name}
          </div>
        )}
      </div>
      
      {/* Tooltip for card details */}
      {showTooltip && !isDragging && card.oracleText && (
        <div className="absolute z-50 bg-gray-900 text-white p-3 rounded-lg shadow-lg max-w-64 -top-2 left-full ml-2 border border-gray-600">
          <div className="font-bold text-sm mb-1">{card.name}</div>
          {card.manaCost && (
            <div className="text-xs text-gray-300 mb-1">Cost: {card.manaCost}</div>
          )}
          {card.type && (
            <div className="text-xs text-gray-300 mb-2">{card.type}</div>
          )}
          <div className="text-xs">{card.oracleText}</div>
        </div>
      )}
    </div>
  );
}