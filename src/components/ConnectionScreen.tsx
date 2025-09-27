'use client';

import { useState } from 'react';
import { useGameStore } from '@/lib/store';
import { Button, Input, Card } from '@/components/ui';

export default function ConnectionScreen() {
  const [playerName, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [moxfieldUrl, setMoxfieldUrl] = useState('');
  const [nameError, setNameError] = useState('');
  const [moxfieldError, setMoxfieldError] = useState('');
  const { 
    joinRoom, 
    setPlayerName: setStorePlayerName, 
    deckImporting, 
    isJoiningRoom,
    setIsJoiningRoom,
    setCurrentScreen 
  } = useGameStore();

  const isValidMoxfieldUrl = (url: string) => {
    const patterns = [
      /^https?:\/\/(www\.)?moxfield\.com\/decks\/[a-zA-Z0-9_-]+\/?$/
    ];
    return patterns.some(pattern => pattern.test(url));
  };

  const handleJoinGame = () => {
    if (!playerName.trim()) {
      setNameError('Please enter your name');
      return;
    }

    if (!moxfieldUrl.trim()) {
      setMoxfieldError('Please enter a Moxfield deck URL');
      return;
    }

    if (!isValidMoxfieldUrl(moxfieldUrl.trim())) {
      setMoxfieldError('Please enter a valid Moxfield deck URL');
      return;
    }

    setNameError('');
    setMoxfieldError('');
    const finalRoomId = roomId.trim() || generateRoomId();
    setStorePlayerName(playerName.trim());
    
    // Store the Moxfield URL for import after joining
    sessionStorage.setItem('pendingMoxfieldUrl', moxfieldUrl.trim());
    
    // Show loading screen
    setIsJoiningRoom(true);
    setCurrentScreen('loading');
    
    joinRoom(finalRoomId, playerName.trim());
  };

  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateNewRoom = () => {
    const newRoomId = generateRoomId();
    setRoomId(newRoomId);
  };

  return (
    <div className="screen flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-600 to-secondary-700 p-4">
      <Card 
        variant="glass" 
        padding="xl" 
        className="min-w-[400px] max-w-md w-full text-center animate-scale-in"
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
          MTG Friends
        </h1>
        <p className="text-white/80 mb-8">
          Play Magic: The Gathering with your friends online
        </p>

        <div className="space-y-6 text-left">
          <Input
            label="Your Name"
            value={playerName}
            onChange={(e) => {
              setPlayerName(e.target.value);
              if (nameError) setNameError('');
            }}
            placeholder="Enter your name"
            maxLength={20}
            error={nameError}
            variant="glass"
          />

          <Input
            label="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter room ID or leave blank for new room"
            helperText="Leave blank to create a new room"
            variant="glass"
          />

          <Input
            label="Moxfield Deck URL"
            type="url"
            value={moxfieldUrl}
            onChange={(e) => {
              setMoxfieldUrl(e.target.value);
              if (moxfieldError) setMoxfieldError('');
            }}
            placeholder="https://www.moxfield.com/decks/..."
            helperText="Required: Enter your Moxfield deck URL to join the game"
            error={moxfieldError}
            variant="glass"
            required
          />
        </div>

        <div className="mt-8 space-y-4">
          <Button
            onClick={handleJoinGame}
            variant="primary"
            size="lg"
            className="w-full"
            disabled={deckImporting}
          >
            {deckImporting ? 'Importing Deck...' : 'Join Game'}
          </Button>

          <div className="divider my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/30"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-glass-light px-4 text-sm text-white/70 rounded-full">
                or
              </span>
            </div>
          </div>

          <Button
            onClick={handleCreateNewRoom}
            variant="secondary"
            size="lg"
            className="w-full"
          >
            Create New Room
          </Button>
        </div>
      </Card>
    </div>
  );
}