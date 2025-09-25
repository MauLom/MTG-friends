import { create } from 'zustand';
import { subscribeWithSelector, devtools } from 'zustand/middleware';
import { Socket } from 'socket.io-client';
import { GameState, Player, Card, ChatMessage, Deck } from '@/types/game';

interface GameStore {
  // Connection state
  socket: Socket | null;
  connected: boolean;
  
  // Game state
  currentRoom: string | null;
  playerName: string | null;
  players: Pick<Player, 'name' | 'socketId'>[];
  gameState: GameState | null;
  
  // Deck state
  currentDeck: Deck | null;
  deckImporting: boolean;
  
  // UI state
  currentScreen: 'connection' | 'game';
  statusMessage: { message: string; type: 'info' | 'success' | 'error' } | null;
  
  // Chat
  chatMessages: ChatMessage[];
  
  // Actions
  setSocket: (socket: Socket | null) => void;
  setConnected: (connected: boolean) => void;
  setCurrentRoom: (roomId: string | null) => void;
  setPlayerName: (name: string | null) => void;
  setPlayers: (players: Pick<Player, 'name' | 'socketId'>[]) => void;
  setGameState: (gameState: GameState | null) => void;
  setCurrentScreen: (screen: 'connection' | 'game') => void;
  setStatusMessage: (message: string, type: 'info' | 'success' | 'error') => void;
  clearStatusMessage: () => void;
  addChatMessage: (message: ChatMessage) => void;
  addPlayer: (player: Pick<Player, 'name' | 'socketId'>) => void;
  removePlayer: (socketId: string) => void;
  
  // Deck actions
  setCurrentDeck: (deck: Deck | null) => void;
  setDeckImporting: (importing: boolean) => void;
  importDeckFromMoxfield: (deckUrl: string) => void;
  
  // Game actions
  joinRoom: (roomId: string, playerName: string) => void;
  moveCard: (cardId: string, from: string, to: string, position?: number) => void;
  sendChatMessage: (message: string) => void;
}

export const useGameStore = create<GameStore>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // Initial state
      socket: null,
      connected: false,
      currentRoom: null,
      playerName: null,
      players: [],
      gameState: null,
      currentScreen: 'connection',
      statusMessage: null,
      chatMessages: [],
      currentDeck: null,
      deckImporting: false,
      
      // Basic setters
      setSocket: (socket) => set({ socket }),
      setConnected: (connected) => set({ connected }),
      setCurrentRoom: (currentRoom) => set({ currentRoom }),
      setPlayerName: (playerName) => set({ playerName }),
      setPlayers: (players) => set({ players }),
      setGameState: (gameState) => set({ gameState }),
      setCurrentScreen: (currentScreen) => set({ currentScreen }),
      
      setStatusMessage: (message, type) => set({ 
        statusMessage: { message, type } 
      }),
      clearStatusMessage: () => set({ statusMessage: null }),
      
      addChatMessage: (message) => set((state) => ({
        chatMessages: [...state.chatMessages, message]
      })),
      
      addPlayer: (player) => set((state) => ({
        players: [...state.players, player]
      })),
      
      removePlayer: (socketId) => set((state) => ({
        players: state.players.filter(p => p.socketId !== socketId)
      })),
      
      // Deck actions
      setCurrentDeck: (currentDeck) => set({ currentDeck }),
      setDeckImporting: (deckImporting) => set({ deckImporting }),
      
      importDeckFromMoxfield: (deckUrl) => {
        const { socket, currentRoom } = get();
        if (socket && currentRoom) {
          set({ deckImporting: true });
          socket.emit('import-deck', { roomId: currentRoom, deckUrl });
        }
      },
      
      // Game actions
      joinRoom: (roomId, playerName) => {
        const { socket } = get();
        if (socket) {
          socket.emit('join-room', roomId, playerName);
        }
      },
      
      moveCard: (cardId, from, to, position) => {
        const { socket, currentRoom } = get();
        if (socket && currentRoom) {
          socket.emit('move-card', {
            roomId: currentRoom,
            cardId,
            from,
            to,
            position
          });
        }
      },
      
      sendChatMessage: (message) => {
        const { socket, currentRoom, playerName } = get();
        if (socket && currentRoom && playerName) {
          const chatMessage: ChatMessage = {
            playerName,
            message,
            timestamp: new Date()
          };
          
          // Add to local chat immediately
          get().addChatMessage(chatMessage);
          
          // Send to server (in real implementation)
          // socket.emit('chat-message', currentRoom, message);
        }
      },
    }))
  )
);