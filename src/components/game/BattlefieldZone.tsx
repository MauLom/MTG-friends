'use client';

import { useState, useRef, useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useGameStore } from '@/lib/store';
import { Card } from '@/types/game';
import GameCard from './GameCard';

interface BattlefieldZoneProps {
  cards: Card[];
  playerName: string;
  className?: string;
}

interface CardPosition {
  id: string;
  x: number;
  y: number;
  zIndex: number;
}

export default function BattlefieldZone({ cards, playerName, className = '' }: BattlefieldZoneProps) {
  const [cardPositions, setCardPositions] = useState<CardPosition[]>([]);
  const battlefieldRef = useRef<HTMLDivElement>(null);

  // Simple droppable - no complex effects
  const { isOver, setNodeRef } = useDroppable({
    id: 'battlefield',
  });

  // Listen for card repositioning events (simplified)
  useEffect(() => {
    const handleRepositionCard = (event: CustomEvent) => {
      const { cardId, deltaX, deltaY } = event.detail;
      setCardPositions(prev => 
        prev.map(pos => 
          pos.id === cardId 
            ? { ...pos, x: pos.x + deltaX, y: pos.y + deltaY, zIndex: pos.zIndex + 1 }
            : pos
        )
      );
    };

    const element = battlefieldRef.current;
    if (element) {
      element.addEventListener('repositionCard' as any, handleRepositionCard);
      element.setAttribute('data-zone', 'battlefield');
      
      return () => {
        element.removeEventListener('repositionCard' as any, handleRepositionCard);
      };
    }
  }, []);

  // Initialize positions for new cards (simplified)
  useEffect(() => {
    cards.forEach(card => {
      if (!cardPositions.find(pos => pos.id === card.id)) {
        const x = Math.random() * 300 + 50;
        const y = Math.random() * 150 + 50;
        
        setCardPositions(prev => [...prev, {
          id: card.id,
          x,
          y,
          zIndex: prev.length + 1
        }]);
      }
    });
    
    // Remove positions for cards that are no longer in battlefield
    setCardPositions(prev => 
      prev.filter(pos => cards.find(card => card.id === pos.id))
    );
  }, [cards]);

  // Combined ref function
  const setCombinedRef = (element: HTMLDivElement) => {
    battlefieldRef.current = element;
    setNodeRef(element);
  };

  return (
    <div
      ref={setCombinedRef}
      className={`
        battlefield-zone relative 
        bg-green-900/20 border-2 border-dashed border-green-400/30 
        rounded-xl transition-colors
        ${isOver ? 'border-green-400 bg-green-400/20' : ''} 
        ${className}
      `}
      style={{ minHeight: '200px' }}
    >
      {/* Simple title */}
      <div className="absolute top-3 left-4 text-sm text-green-300/80 z-50">
        Battlefield ({cards.length})
      </div>
      
      {/* Cards with absolute positioning */}
      <div className="absolute inset-0 mt-12">
        {cards.map((card) => {
          const position = cardPositions.find(p => p.id === card.id);
          const { x, y, zIndex } = position || { x: 50, y: 50, zIndex: 1 };
          
          return (
            <div
              key={card.id}
              className="absolute"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                zIndex: zIndex,
              }}
            >
              <GameCard 
                card={card} 
                zone="battlefield"
              />
            </div>
          );
        })}
        
        {/* Simple empty state */}
        {cards.length === 0 && !isOver && (
          <div className="absolute inset-0 flex items-center justify-center text-green-300/40">
            <div className="text-sm">Drop cards here to play</div>
          </div>
        )}
      </div>
    </div>
  );
}