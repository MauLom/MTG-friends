'use client';

import { useState } from 'react';
import { useGameStore } from '@/lib/store';

export default function ConnectionScreen() {
  const [playerName, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState('');
  const { joinRoom, setPlayerName: setStorePlayerName } = useGameStore();

  const handleJoinGame = () => {
    if (!playerName.trim()) {
      alert('Please enter your name');
      return;
    }

    const finalRoomId = roomId.trim() || generateRoomId();
    setStorePlayerName(playerName.trim());
    joinRoom(finalRoomId, playerName.trim());
  };

  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  return (
    <div className="screen flex items-center justify-center h-screen bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="connection-form bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 min-w-[400px] text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
          MTG Friends
        </h1>
        <p className="mb-8 opacity-80">
          Play Magic: The Gathering with your friends online
        </p>
        
        <div className="form-group mb-6 text-left">
          <label htmlFor="player-name" className="block mb-2 font-medium">
            Your Name:
          </label>
          <input
            type="text"
            id="player-name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name"
            maxLength={20}
            className="w-full p-3 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
          />
        </div>
        
        <div className="form-group mb-8 text-left">
          <label htmlFor="room-id" className="block mb-2 font-medium">
            Room ID:
          </label>
          <input
            type="text"
            id="room-id"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter room ID or leave blank for new room"
            className="w-full p-3 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
          />
        </div>

        <button
          onClick={handleJoinGame}
          className="btn primary w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          Join Game
        </button>

        <div className="divider my-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/30"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white/10 px-4 text-sm backdrop-blur-lg">
              or
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            const newRoomId = generateRoomId();
            setRoomId(newRoomId);
          }}
          className="btn secondary w-full py-3 px-6 bg-white/20 text-white font-medium rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300"
        >
          Create New Room
        </button>
      </div>
    </div>
  );
}