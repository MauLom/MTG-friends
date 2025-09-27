'use client';

import { useState } from 'react';
import { Card, Button, Badge } from '@/components/ui';
import { useGameStore } from '@/lib/store';

interface MenuPanelProps {
  className?: string;
}

type PanelView = 'menu' | 'log' | 'settings';

export default function MenuPanel({ className = '' }: MenuPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<PanelView>('menu');
  const { 
    currentRoom, 
    players, 
    gameState,
    drawCardFromDeck,
    gameReady,
    currentDeck
  } = useGameStore();

  const gameLog = [
    { id: 1, message: 'TestPlayer joined the game', timestamp: new Date(), type: 'info' },
    { id: 2, message: 'Deck "Test Deck with Card Images" imported', timestamp: new Date(), type: 'success' },
    { id: 3, message: 'Game started', timestamp: new Date(), type: 'info' },
  ];

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const renderMenuContent = () => {
    switch (currentView) {
      case 'menu':
        return (
          <div className="space-y-3">
            <div className="text-center">
              <h3 className="text-sm font-semibold text-white/90 mb-2">Game Menu</h3>
            </div>
            
            <div className="space-y-2">
              <Button
                onClick={() => drawCardFromDeck()}
                variant="primary"
                size="sm"
                disabled={!gameReady || !currentDeck}
                className="w-full text-xs"
              >
                Draw Card
              </Button>
              
              <Button
                onClick={() => {
                  for (let i = 0; i < 7; i++) {
                    setTimeout(() => drawCardFromDeck(), i * 150);
                  }
                }}
                variant="secondary"
                size="sm"
                disabled={!gameReady || !currentDeck}
                className="w-full text-xs"
              >
                Draw Opening Hand
              </Button>
              
              <Button
                variant="secondary"
                size="sm"
                className="w-full text-xs"
              >
                Shuffle Library
              </Button>
              
              <Button
                variant="danger"
                size="sm"
                className="w-full text-xs"
              >
                Mulligan
              </Button>
            </div>
            
            <div className="border-t border-white/10 pt-2">
              <Button
                onClick={() => setCurrentView('log')}
                variant="secondary"
                size="sm"
                className="w-full text-xs"
              >
                View Game Log
              </Button>
              
              <Button
                onClick={() => setCurrentView('settings')}
                variant="secondary"
                size="sm"
                className="w-full text-xs mt-1"
              >
                Settings
              </Button>
            </div>
          </div>
        );
        
      case 'log':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white/90">Game Log</h3>
              <Button
                onClick={() => setCurrentView('menu')}
                variant="secondary"
                size="sm"
                className="text-xs px-2 py-1"
              >
                Back
              </Button>
            </div>
            
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {gameLog.map((entry) => (
                <div key={entry.id} className="text-xs">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={entry.type === 'success' ? 'primary' : entry.type === 'error' ? 'error' : 'secondary'}
                      size="sm"
                      className="text-xs"
                    >
                      {entry.type}
                    </Badge>
                    <span className="text-white/70 text-xs">
                      {entry.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-white/90 mt-1">{entry.message}</p>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'settings':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white/90">Settings</h3>
              <Button
                onClick={() => setCurrentView('menu')}
                variant="secondary"
                size="sm"
                className="text-xs px-2 py-1"
              >
                Back
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="text-xs">
                <span className="text-white/70">Auto-pass Priority:</span>
                <div className="flex gap-1 mt-1">
                  <Button variant="primary" size="sm" className="text-xs flex-1">On</Button>
                  <Button variant="secondary" size="sm" className="text-xs flex-1">Off</Button>
                </div>
              </div>
              
              <div className="text-xs">
                <span className="text-white/70">Sound Effects:</span>
                <div className="flex gap-1 mt-1">
                  <Button variant="primary" size="sm" className="text-xs flex-1">On</Button>
                  <Button variant="secondary" size="sm" className="text-xs flex-1">Off</Button>
                </div>
              </div>
              
              <div className="text-xs">
                <span className="text-white/70">Card Animations:</span>
                <div className="flex gap-1 mt-1">
                  <Button variant="primary" size="sm" className="text-xs flex-1">On</Button>
                  <Button variant="secondary" size="sm" className="text-xs flex-1">Off</Button>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className={`menu-panel relative ${className}`}>
      {/* Toggle Button */}
      <Button
        onClick={togglePanel}
        variant="secondary"
        size="sm"
        className={`
          transition-all duration-300 text-xs
          ${isOpen ? 'bg-primary-600/80' : 'bg-white/10'}
          hover:scale-105
        `}
      >
        {isOpen ? '✕' : '☰'}
      </Button>
      
      {/* Panel Content */}
      {isOpen && (
        <Card
          variant="glass"
          padding="sm"
          className={`
            absolute top-10 right-0 w-56 z-50
            animate-slide-in transform transition-all duration-300
          `}
        >
          {renderMenuContent()}
        </Card>
      )}
      
      {/* Game Info Badge */}
      <div className="absolute top-10 right-0 mt-2">
        <Badge variant="secondary" size="sm" className="text-xs">
          Room: {currentRoom} | Players: {players.length}
        </Badge>
      </div>
    </div>
  );
}