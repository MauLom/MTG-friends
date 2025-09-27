'use client';

import { useState } from 'react';
import { Button, Badge } from '@/components/ui';

interface InteractionIconsProps {
  className?: string;
}

const INTERACTION_EMOJIS = [
  { emoji: '👍', label: 'Thumbs Up', key: 'thumbs-up' },
  { emoji: '👎', label: 'Thumbs Down', key: 'thumbs-down' },
  { emoji: '🤔', label: 'Thinking', key: 'thinking' },
  { emoji: '😅', label: 'Nervous', key: 'nervous' },
  { emoji: '🎉', label: 'Celebration', key: 'celebration' },
  { emoji: '😤', label: 'Frustrated', key: 'frustrated' },
  { emoji: '🤝', label: 'Good Game', key: 'good-game' },
  { emoji: '⚡', label: 'Lightning Fast', key: 'fast' },
];

export default function InteractionIcons({ className = '' }: InteractionIconsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lastUsed, setLastUsed] = useState<string | null>(null);

  const handleEmojiClick = (emoji: typeof INTERACTION_EMOJIS[0]) => {
    setLastUsed(emoji.key);
    // TODO: Send emoji to other players via socket
    console.log(`Sent emoji: ${emoji.emoji} (${emoji.label})`);
    
    // Auto-collapse after selection
    setTimeout(() => {
      setIsExpanded(false);
    }, 1000);
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`interaction-icons relative ${className}`}>
      {/* Main Toggle Button */}
      <Button
        onClick={toggleExpansion}
        variant="secondary"
        size="sm"
        className={`
          transition-all duration-300 text-lg w-12 h-12 rounded-full
          ${isExpanded ? 'bg-primary-600/80 rotate-90' : 'bg-white/10 hover:bg-white/20'}
          hover:scale-110 shadow-lg
        `}
      >
        {isExpanded ? '✕' : '😊'}
      </Button>

      {/* Expanded Emoji Grid */}
      {isExpanded && (
        <div className={`
          absolute top-14 left-0 z-50
          bg-black/80 backdrop-blur-md rounded-xl p-3 border border-white/20
          animate-scale-in shadow-xl
        `}>
          <div className="grid grid-cols-4 gap-2">
            {INTERACTION_EMOJIS.map((emoji) => (
              <button
                key={emoji.key}
                onClick={() => handleEmojiClick(emoji)}
                className={`
                  w-10 h-10 text-lg transition-all duration-200 rounded-lg
                  ${lastUsed === emoji.key ? 'ring-2 ring-primary-400 bg-primary-600/30' : 'bg-white/10'}
                  hover:scale-125 hover:bg-white/20
                `}
                title={emoji.label}
              >
                {emoji.emoji}
              </button>
            ))}
          </div>
          
          {/* Quick Actions */}
          <div className="border-t border-white/20 mt-3 pt-2">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="primary"
                size="sm"
                className="text-xs px-2 py-1"
                onClick={() => console.log('Priority passed')}
              >
                Pass Priority
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="text-xs px-2 py-1"
                onClick={() => console.log('OK clicked')}
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Emoji Indicator */}
      {lastUsed && !isExpanded && (
        <div className="absolute -top-1 -right-1">
          <Badge 
            variant="primary" 
            size="sm"
            className="w-6 h-6 p-0 text-xs animate-bounce"
          >
            {INTERACTION_EMOJIS.find(e => e.key === lastUsed)?.emoji}
          </Badge>
        </div>
      )}
    </div>
  );
}