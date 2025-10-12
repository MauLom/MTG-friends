'use client';

import { useState, useEffect } from 'react';
import { Drawer, Popover, Tabs, ActionIcon, ScrollArea, Text, Stack, Switch, Code, Box, Badge as MantineBadge } from '@mantine/core';
import { useMediaQuery, useLocalStorage } from '@mantine/hooks';
import { Button } from '@/components/ui';
import { useGameStore } from '@/lib/store';
import { Menu, X } from 'lucide-react';

interface MenuPanelProps {
  className?: string;
}

interface GameLogEntry {
  id: number;
  message: string;
  timestamp: Date;
  type: 'info' | 'success' | 'error';
}

export default function MenuPanel({ className = '' }: MenuPanelProps) {
  // Responsive breakpoint - mobile is < 768px (md breakpoint)
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Persist open/close state in localStorage
  const [isOpen, setIsOpen] = useLocalStorage({
    key: 'menu-panel-open',
    defaultValue: false,
  });
  
  const [activeTab, setActiveTab] = useState<string | null>('log');
  
  const { 
    currentRoom, 
    players, 
    drawCardFromDeck,
    gameReady,
    currentDeck
  } = useGameStore();

  // Mock game log (in a real app, this would come from the store)
  const [gameLog, setGameLog] = useState<GameLogEntry[]>([
    { id: 1, message: 'TestPlayer joined the game', timestamp: new Date(), type: 'info' },
    { id: 2, message: 'Deck "Test Deck with Card Images" imported', timestamp: new Date(), type: 'success' },
    { id: 3, message: 'Game started', timestamp: new Date(), type: 'info' },
  ]);
  
  // Settings state (could be moved to store in production)
  const [autoPassPriority, setAutoPassPriority] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [cardAnimations, setCardAnimations] = useState(true);
  
  // Add log entries for certain actions
  useEffect(() => {
    if (gameReady && currentDeck) {
      const newEntry: GameLogEntry = {
        id: Date.now(),
        message: `Deck "${currentDeck.name}" is ready`,
        timestamp: new Date(),
        type: 'success'
      };
      setGameLog(prev => [...prev.slice(-19), newEntry]); // Keep last 20 entries
    }
  }, [gameReady, currentDeck]);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };
  
  const handleDrawCard = () => {
    drawCardFromDeck();
    const newEntry: GameLogEntry = {
      id: Date.now(),
      message: 'Drew a card from library',
      timestamp: new Date(),
      type: 'info'
    };
    setGameLog(prev => [...prev.slice(-19), newEntry]);
  };
  
  const handleDrawOpeningHand = () => {
    for (let i = 0; i < 7; i++) {
      setTimeout(() => drawCardFromDeck(), i * 150);
    }
    const newEntry: GameLogEntry = {
      id: Date.now(),
      message: 'Drew opening hand (7 cards)',
      timestamp: new Date(),
      type: 'info'
    };
    setGameLog(prev => [...prev.slice(-19), newEntry]);
  };

  // Render the panel content with tabs
  const renderPanelContent = () => (
    <Tabs value={activeTab} onChange={setActiveTab} variant="pills" orientation="horizontal">
      <Tabs.List grow>
        <Tabs.Tab value="log">Log</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
        <Tabs.Tab value="shortcuts">Shortcuts</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="log" pt="md">
        <Stack gap="md">
          {/* Game Actions */}
          <Box>
            <Text size="sm" fw={600} c="white" mb="xs">Game Actions</Text>
            <Stack gap="xs">
              <Button
                onClick={handleDrawCard}
                variant="primary"
                size="sm"
                disabled={!gameReady || !currentDeck}
                className="w-full text-xs"
              >
                Draw Card
              </Button>
              
              <Button
                onClick={handleDrawOpeningHand}
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
            </Stack>
          </Box>
          
          {/* Game Log */}
          <Box>
            <Text size="sm" fw={600} c="white" mb="xs">Recent Events</Text>
            <ScrollArea.Autosize mah={200} type="auto">
              <Stack gap="xs">
                {gameLog.slice().reverse().map((entry) => (
                  <Box key={entry.id} p="xs" style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                    borderRadius: '8px',
                    borderLeft: `3px solid ${
                      entry.type === 'success' ? '#4ade80' : 
                      entry.type === 'error' ? '#ef4444' : 
                      '#94a3b8'
                    }`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <MantineBadge 
                        size="sm"
                        color={
                          entry.type === 'success' ? 'green' : 
                          entry.type === 'error' ? 'red' : 
                          'gray'
                        }
                      >
                        {entry.type}
                      </MantineBadge>
                      <Text size="xs" c="dimmed">
                        {entry.timestamp.toLocaleTimeString()}
                      </Text>
                    </div>
                    <Text size="sm" c="white">{entry.message}</Text>
                  </Box>
                ))}
              </Stack>
            </ScrollArea.Autosize>
          </Box>
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="md">
        <Stack gap="md">
          <Box>
            <Text size="sm" fw={600} c="white" mb="sm">Game Preferences</Text>
            <Stack gap="md">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text size="sm" c="white">Auto-pass Priority</Text>
                <Switch
                  checked={autoPassPriority}
                  onChange={(event) => setAutoPassPriority(event.currentTarget.checked)}
                  color="primary"
                />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text size="sm" c="white">Sound Effects</Text>
                <Switch
                  checked={soundEffects}
                  onChange={(event) => setSoundEffects(event.currentTarget.checked)}
                  color="primary"
                />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text size="sm" c="white">Card Animations</Text>
                <Switch
                  checked={cardAnimations}
                  onChange={(event) => setCardAnimations(event.currentTarget.checked)}
                  color="primary"
                />
              </div>
            </Stack>
          </Box>
          
          <Box>
            <Text size="sm" fw={600} c="white" mb="xs">Room Info</Text>
            <Text size="xs" c="dimmed">
              Room: {currentRoom || 'Not connected'}
            </Text>
            <Text size="xs" c="dimmed">
              Players: {players.length}
            </Text>
            {currentDeck && (
              <Text size="xs" c="dimmed">
                Deck: {currentDeck.name}
              </Text>
            )}
          </Box>
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="shortcuts" pt="md">
        <Stack gap="md">
          <Text size="sm" fw={600} c="white">Keyboard Shortcuts</Text>
          <ScrollArea.Autosize mah={250} type="auto">
            <Stack gap="sm">
              <Box>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <Text size="sm" c="white">Draw Card</Text>
                  <Code style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>D</Code>
                </div>
                <Text size="xs" c="dimmed">Draw a card from your library</Text>
              </Box>
              
              <Box>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <Text size="sm" c="white">Toggle Menu</Text>
                  <Code style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>M</Code>
                </div>
                <Text size="xs" c="dimmed">Open/close this menu panel</Text>
              </Box>
              
              <Box>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <Text size="sm" c="white">Next Phase</Text>
                  <Code style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>Space</Code>
                </div>
                <Text size="xs" c="dimmed">Advance to the next phase</Text>
              </Box>
              
              <Box>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <Text size="sm" c="white">Pass Priority</Text>
                  <Code style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>Enter</Code>
                </div>
                <Text size="xs" c="dimmed">Pass priority to next player</Text>
              </Box>
              
              <Box>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <Text size="sm" c="white">Close Panel</Text>
                  <Code style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>Esc</Code>
                </div>
                <Text size="xs" c="dimmed">Close the menu panel</Text>
              </Box>
              
              <Box>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <Text size="sm" c="white">Shuffle Library</Text>
                  <Code style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>S</Code>
                </div>
                <Text size="xs" c="dimmed">Shuffle your library</Text>
              </Box>
            </Stack>
          </ScrollArea.Autosize>
        </Stack>
      </Tabs.Panel>
    </Tabs>
  );

  // Menu toggle button
  const menuButton = (
    <ActionIcon
      onClick={togglePanel}
      size="lg"
      variant="filled"
      color="dark"
      style={{
        backgroundColor: isOpen ? 'rgba(102, 126, 234, 0.8)' : 'rgba(255, 255, 255, 0.1)',
        transition: 'all 300ms ease',
      }}
      aria-label="Toggle menu panel"
    >
      {isOpen ? <X size={20} /> : <Menu size={20} />}
    </ActionIcon>
  );

  return (
    <div className={`menu-panel relative ${className}`}>
      {/* Mobile: Use Drawer */}
      {isMobile ? (
        <>
          {menuButton}
          <Drawer
            opened={isOpen}
            onClose={() => setIsOpen(false)}
            position="right"
            size="md"
            title={
              <Text size="lg" fw={700} c="white">
                Menu
              </Text>
            }
            overlayProps={{ opacity: 0.5, blur: 4 }}
            styles={{
              content: {
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
              },
              header: {
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              },
              body: {
                padding: '1rem',
              },
            }}
            trapFocus
            closeOnEscape
          >
            {renderPanelContent()}
          </Drawer>
        </>
      ) : (
        // Desktop: Use Popover
        <Popover
          opened={isOpen}
          onChange={setIsOpen}
          position="bottom-end"
          width={400}
          shadow="xl"
          withArrow
          withinPortal
          trapFocus
          closeOnEscape
        >
          <Popover.Target>{menuButton}</Popover.Target>
          <Popover.Dropdown
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {renderPanelContent()}
          </Popover.Dropdown>
        </Popover>
      )}
      
      {/* Game Info Badge - only show when panel is closed */}
      {!isOpen && (
        <div className="absolute top-12 right-0">
          <MantineBadge color="gray" variant="filled" size="sm">
            {currentRoom ? `${currentRoom} • ${players.length} players` : 'Not connected'}
          </MantineBadge>
        </div>
      )}
    </div>
  );
}