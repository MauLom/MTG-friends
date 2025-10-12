'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/lib/store';

export function useKeyboardShortcuts() {
  const { drawCardFromDeck, gameReady, currentDeck } = useGameStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in input/textarea
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Don't trigger if modifier keys are pressed (except specific combos)
      if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'd':
          event.preventDefault();
          if (gameReady && currentDeck) {
            drawCardFromDeck();
          }
          break;
        
        case ' ':
          event.preventDefault();
          // Space for next phase (placeholder for future implementation)
          console.log('Next phase shortcut (not implemented)');
          break;
        
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [drawCardFromDeck, gameReady, currentDeck]);
}

export default useKeyboardShortcuts;