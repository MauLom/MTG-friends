import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useGameStore } from '@/lib/store';
import { Card } from '@/types/game';

export const useSocket = () => {
  const {
    socket,
    setSocket,
    setConnected,
    setSelfSocketId,
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
    setPlayerExile,
    setIsJoiningRoom,
    setGameReady
  } = useGameStore();

  useEffect(() => {
    if (!socket) {
      const newSocket = io();
      
      // Connection events
      newSocket.on('connect', () => {
        console.log('Connected to server');
        setConnected(true);
        setSelfSocketId(newSocket.id || null);
        setStatusMessage('Connected to server', 'success');
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
        setConnected(false);
        setSelfSocketId(null);
        setStatusMessage('Disconnected from server', 'error');
      });

      // Game events
      newSocket.on('room-joined', (data: any) => {
        setCurrentRoom(data.roomId);
        setPlayers(data.players);
        setGameState(data.gameState);
        setIsJoiningRoom(false);
        
        // Check if there's a pending Moxfield URL to import
        const pendingMoxfieldUrl = sessionStorage.getItem('pendingMoxfieldUrl');
        if (pendingMoxfieldUrl) {
          // Clear the stored URL
          sessionStorage.removeItem('pendingMoxfieldUrl');
          setStatusMessage('Importing deck...', 'info');
          // Import the deck
          setTimeout(() => {
            importDeckFromMoxfield(pendingMoxfieldUrl);
          }, 500); // Small delay to ensure room is fully set up
        } else {
          // No deck to import, go straight to game
          setCurrentScreen('game');
          setGameReady(true);
          setStatusMessage(`Joined room ${data.roomId}`, 'success');
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
        const { playerId, cardId, from, to } = data;
        
        // Only handle moves from other players, not our own
        const currentState = useGameStore.getState();
        if (playerId !== currentState.selfSocketId) {
          console.log('Card moved by other player:', data);
          // Here we would update the opponent's zones if we tracked them
          // For now, just log it
        }
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
        
        // Set the current deck
        setCurrentDeck(data.deck);
        
        // Convert deck cards to Card objects and populate the library
        const libraryCards: Card[] = [];
        if (data.deck.cards) {
          data.deck.cards.forEach((deckCard: any) => {
            for (let i = 0; i < deckCard.quantity; i++) {
              libraryCards.push({
                id: `${deckCard.name}-${i}-${Date.now()}-${Math.random()}`,
                name: deckCard.name,
                imageUrl: deckCard.imageUrl,
                manaCost: deckCard.manaCost,
                type: deckCard.type,
                oracleText: deckCard.oracleText,
                faceDown: true // Library cards start face down
              });
            }
          });
        }
        
        // Shuffle the library
        const shuffledLibrary = libraryCards.sort(() => Math.random() - 0.5);
        setPlayerLibrary(shuffledLibrary);
        
        // Clear any existing hand first
        setPlayerHand([]);
        
        // Draw initial hand of 7 cards
        setTimeout(() => {
          useGameStore.getState().drawInitialHand(7);
        }, 100);
        
        setDeckImporting(false);
        setGameReady(true);
        setCurrentScreen('game');
        setStatusMessage(`Deck "${data.deck.name}" imported successfully! ${shuffledLibrary.length} cards loaded into library.`, 'success');
      });

      newSocket.on('deck-import-error', (data: any) => {
        setDeckImporting(false);
        setStatusMessage(`Failed to import deck: ${data.error}`, 'error');
      });

      newSocket.on('card-drawn', (data: any) => {
        // For multiplayer sync - update other players' deck counts
        console.log('Other player drew a card:', data);
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
  }, [socket, setSocket, setConnected, setSelfSocketId, setCurrentRoom, setPlayers, setGameState, setCurrentScreen, setStatusMessage, addPlayer, removePlayer, addChatMessage, setCurrentDeck, setDeckImporting, importDeckFromMoxfield, setPlayerHand, setPlayerLibrary, setPlayerGraveyard, setPlayerBattlefield, setPlayerExile]);

  return socket;
};