'use client';

import { useDrag } from 'react-dnd';
import { Card } from '@/types/game';
import { useState } from 'react';

interface GameCardProps {
  card: Card;
  zone: string;
}

/**
 * Card dimensions constants for consistent sizing and aspect ratio preservation
 * These fixed dimensions prevent Cumulative Layout Shift (CLS) during image loading
 * and are essential for virtualization list calculations
 */
export const CARD_DIMENSIONS = {
  width: 60,
  height: 84,
  aspectRatio: 60 / 84, // ~0.714 (standard MTG card aspect ratio)
} as const;

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
      {/* 
        Fixed-size card container with aspect ratio box to prevent CLS
        The explicit dimensions ensure predictable layout before and after image load
        This structure is virtualization-ready: each card has a known, fixed height
      */}
      <div
        ref={drag as any}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{ 
          width: `${CARD_DIMENSIONS.width}px`, 
          height: `${CARD_DIMENSIONS.height}px` 
        }}
        className={`
          card bg-gradient-to-br from-slate-600 to-slate-700 
          border-2 border-slate-500 rounded-lg cursor-pointer 
          transition-all duration-300 relative select-none overflow-hidden
          ${isDragging ? 
            'opacity-50 rotate-2 scale-95' : 
            'hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/25 hover:z-10 hover:-translate-y-2 hover:border-blue-400/50'
          } 
          ${card.faceDown ? 'bg-gradient-to-br from-amber-800 to-amber-900 border-amber-600' : ''}
          ${!isDragging ? 'hover:ring-2 hover:ring-blue-400/30' : ''}
        `}
      >
        {/* 
          Aspect ratio box ensures consistent dimensions even before image loads
          This prevents layout shift (CLS) when images are lazy-loaded or slow to fetch
        */}
        {showImage ? (
          <img
            src={card.imageUrl}
            alt={card.name}
            width={CARD_DIMENSIONS.width}
            height={CARD_DIMENSIONS.height}
            className="object-cover rounded-lg w-full h-full"
            onError={handleImageError}
          />
        ) : (
          <div 
            className="card-name p-1 break-words leading-tight text-xs text-center flex items-center justify-center w-full h-full"
          >
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