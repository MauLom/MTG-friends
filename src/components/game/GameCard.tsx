'use client';

import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/types/game';
import { Tooltip } from '@mantine/core';

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
  // Hand cards are larger for better visibility
  handWidth: 80,
  handHeight: 112,
} as const;

export default function GameCard({ card, zone }: GameCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Use larger dimensions for cards in hand
  const isInHand = zone === 'hand';
  const cardWidth = isInHand ? CARD_DIMENSIONS.handWidth : CARD_DIMENSIONS.width;
  const cardHeight = isInHand ? CARD_DIMENSIONS.handHeight : CARD_DIMENSIONS.height;

  // DnD Kit draggable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: card.id,
    data: {
      card,
      zone,
    },
  });

  // Simple style - no complex transforms or effects
  const style = {
    transform: CSS.Translate.toString(transform),
    width: `${cardWidth}px`,
    height: `${cardHeight}px`,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 9999 : 'auto', // Very high z-index when dragging
  };

  const handleDoubleClick = () => {
    // Toggle face up/down
    console.log('Toggle card face:', card.id);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const showImage = card.imageUrl && !imageError && !card.faceDown;

  // Build tooltip content for cards with oracle text
  const tooltipLabel = card.oracleText ? (
    <div>
      <div className="font-bold text-sm mb-1">{card.name}</div>
      {card.manaCost && (
        <div className="text-xs opacity-80 mb-1">Cost: {card.manaCost}</div>
      )}
      {card.type && (
        <div className="text-xs opacity-80 mb-2">{card.type}</div>
      )}
      <div className="text-xs">{card.oracleText}</div>
    </div>
  ) : null;

  return (
    <Tooltip
      label={tooltipLabel}
      position="right"
      withArrow
      disabled={!card.oracleText || isDragging}
      openDelay={300}
      styles={{
        tooltip: {
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          border: '1px solid rgba(75, 85, 99, 0.5)',
          maxWidth: '256px',
        },
      }}
    >
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        onDoubleClick={handleDoubleClick}
        className={`
          card bg-gradient-to-br from-slate-600 to-slate-700 
          border-2 border-slate-500 rounded-lg cursor-pointer 
          relative select-none overflow-hidden
          ${card.faceDown ? 'bg-gradient-to-br from-amber-800 to-amber-900 border-amber-600' : ''}
          ${zone === 'hand' ? 'hover:scale-105 transition-transform' : ''}
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
            width={cardWidth}
            height={cardHeight}
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
    </Tooltip>
  );
}