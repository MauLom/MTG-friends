import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useGameStore } from '@/lib/store';

export const useSocket = () => {
  const {
    socket,
    setSocket,
    setConnected,
    setCurrentRoom,
    setPlayers,
    setGameState,
    setCurrentScreen,
    setStatusMessage,
    addPlayer,
    removePlayer,
    addChatMessage
  } = useGameStore();

  useEffect(() => {
    if (!socket) {
      const newSocket = io();
      
      // Connection events
      newSocket.on('connect', () => {
        console.log('Connected to server');
        setConnected(true);
        setStatusMessage('Connected to server', 'success');
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
        setConnected(false);
        setStatusMessage('Disconnected from server', 'error');
      });

      // Game events
      newSocket.on('room-joined', (data: any) => {
        setCurrentRoom(data.roomId);
        setPlayers(data.players);
        setGameState(data.gameState);
        setCurrentScreen('game');
        setStatusMessage(`Joined room ${data.roomId}`, 'success');
      });

      newSocket.on('player-joined', (data: any) => {
        addPlayer(data);
        setStatusMessage(`${data.name} joined the game`, 'success');
      });

      newSocket.on('player-left', (data: any) => {
        removePlayer(data.socketId);
        setStatusMessage(`${data.name} left the game`, 'info');
      });

      newSocket.on('card-moved', (data: any) => {
        // Handle card movement from other players
        // This would update the local game state
        console.log('Card moved:', data);
      });

      newSocket.on('chat-message', (data: any) => {
        addChatMessage({
          playerName: data.playerName,
          message: data.message,
          timestamp: new Date()
        });
      });

      setSocket(newSocket);
    }

    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [socket, setSocket, setConnected, setCurrentRoom, setPlayers, setGameState, setCurrentScreen, setStatusMessage, addPlayer, removePlayer, addChatMessage]);

  return socket;
};