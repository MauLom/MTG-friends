'use client';

import { useState } from 'react';
import { ActionIcon, Tooltip, Group } from '@mantine/core';
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
      <Tooltip 
        label={isExpanded ? 'Close interaction menu' : 'Open interaction menu'}
        position="right"
        withArrow
      >
        <ActionIcon
          onClick={toggleExpansion}
          variant="light"
          color="gray"
          size="xl"
          radius="xl"
          aria-label={isExpanded ? 'Close interaction menu' : 'Open interaction menu'}
          className={`
            transition-all duration-300 text-lg
            ${isExpanded ? 'rotate-90' : ''}
            hover:scale-110 shadow-lg
          `}
        >
          {isExpanded ? '✕' : '😊'}
        </ActionIcon>
      </Tooltip>

      {/* Expanded Emoji Grid */}
      {isExpanded && (
        <div className={`
          absolute top-14 left-0 z-50
          bg-black/80 backdrop-blur-md rounded-xl p-3 border border-white/20
          animate-scale-in shadow-xl
        `}>
          <Group gap="xs" justify="center">
            {INTERACTION_EMOJIS.map((emoji) => (
              <Tooltip
                key={emoji.key}
                label={emoji.label}
                position="bottom"
                withArrow
              >
                <ActionIcon
                  onClick={() => handleEmojiClick(emoji)}
                  variant={lastUsed === emoji.key ? 'filled' : 'light'}
                  color={lastUsed === emoji.key ? 'blue' : 'gray'}
                  size="lg"
                  radius="md"
                  aria-label={emoji.label}
                  className="text-lg transition-all duration-200 hover:scale-125"
                >
                  {emoji.emoji}
                </ActionIcon>
              </Tooltip>
            ))}
          </Group>
          
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