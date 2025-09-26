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
    addChatMessage,
    setCurrentDeck,
    setDeckImporting,
    importDeckFromMoxfield,
    setPlayerHand,
    setPlayerLibrary,
    setPlayerGraveyard,
    setPlayerBattlefield,
    setPlayerExile
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
        
        // Check if there's a pending Moxfield URL to import
        const pendingMoxfieldUrl = sessionStorage.getItem('pendingMoxfieldUrl');
        if (pendingMoxfieldUrl) {
          // Clear the stored URL
          sessionStorage.removeItem('pendingMoxfieldUrl');
          // Import the deck
          setTimeout(() => {
            importDeckFromMoxfield(pendingMoxfieldUrl);
          }, 500); // Small delay to ensure room is fully set up
        }
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

      // Deck import events
      newSocket.on('deck-imported', (data: any) => {
        console.log('Deck imported:', data.deck);
        console.log('Deck cards array:', data.deck.cards);
        console.log('Number of cards:', data.deck.cards?.length || 0);
        setCurrentDeck(data.deck);
        setDeckImporting(false);
        setStatusMessage(`Deck "${data.deck.name}" imported successfully!`, 'success');
      });

      newSocket.on('deck-import-error', (data: any) => {
        setDeckImporting(false);
        setStatusMessage(`Failed to import deck: ${data.error}`, 'error');
      });

      newSocket.on('card-drawn', (data: any) => {
        const currentDeck = useGameStore.getState().currentDeck;
        if (currentDeck) {
          setCurrentDeck({
            ...currentDeck,
            remainingCards: data.remainingCards
          });
        }
        setStatusMessage(`Drew "${data.card.name}" from deck`, 'success');
      });

      newSocket.on('draw-card-error', (data: any) => {
        setStatusMessage(`Failed to draw card: ${data.error}`, 'error');
      });

      newSocket.on('player-zones-updated', (data: any) => {
        const { zones } = data;
        setPlayerHand(zones.hand || []);
        setPlayerLibrary(zones.library || []);
        setPlayerGraveyard(zones.graveyard || []);
        setPlayerBattlefield(zones.battlefield || []);
        setPlayerExile(zones.exile || []);
      });

      setSocket(newSocket);
    }

    return () => {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [socket, setSocket, setConnected, setCurrentRoom, setPlayers, setGameState, setCurrentScreen, setStatusMessage, addPlayer, removePlayer, addChatMessage, setCurrentDeck, setDeckImporting, importDeckFromMoxfield, setPlayerHand, setPlayerLibrary, setPlayerGraveyard, setPlayerBattlefield, setPlayerExile]);

  return socket;
};