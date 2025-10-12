'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/lib/store';

interface CardNotificationProps {
  className?: string;
}

export default function CardNotification({ className = '' }: CardNotificationProps) {
  const { playerHand } = useGameStore();
  const [lastHandCount, setLastHandCount] = useState(0);
  const [notification, setNotification] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false
  });

  useEffect(() => {
    const currentHandCount = playerHand.length;
    
    if (currentHandCount > lastHandCount) {
      const cardsDrawn = currentHandCount - lastHandCount;
      const lastCard = playerHand[playerHand.length - 1];
      
      setNotification({
        message: cardsDrawn === 1 
          ? `Drew: ${lastCard?.name || 'Unknown Card'}` 
          : `Drew ${cardsDrawn} cards`,
        visible: true
      });

      // Hide notification after 3 seconds
      const timer = setTimeout(() => {
        setNotification(prev => ({ ...prev, visible: false }));
      }, 3000);

      return () => clearTimeout(timer);
    }
    
    setLastHandCount(currentHandCount);
  }, [playerHand, lastHandCount]);

  if (!notification.visible) return null;

  return (
    <div className={`
      fixed top-20 right-4 z-50 
      bg-green-600/90 text-white px-4 py-2 rounded-lg shadow-lg 
      border border-green-400 backdrop-blur-sm
      animate-in slide-in-from-right duration-300
      ${className}
    `}>
      <div className="flex items-center gap-2">
        <div className="text-green-200">🎴</div>
        <div className="text-sm font-medium">{notification.message}</div>
      </div>
    </div>
  );
}