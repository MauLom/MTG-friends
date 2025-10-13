import { create } from 'zustand';
import { subscribeWithSelector, devtools } from 'zustand/middleware';
import { Socket } from 'socket.io-client';
import { GameState, Player, Card, ChatMessage, Deck } from '@/types/game';

// Export selectors
export {
  selectOnTurnPlayer,
  selectPreviousTurnPlayer,
  selectPreviewSides,
  selectSelfPlayer,
  useOnTurnPlayer,
  usePreviousTurnPlayer,
  usePreviewSides,
  useSelfPlayer,
} from './selectors';
export type { SeatedPlayer, PreviewSides } from './selectors';

interface GameStore {
  // Connection state
  socket: Socket | null;
  connected: boolean;
  selfSocketId: string | null; // Current player's socket ID
  
  // Game state
  currentRoom: string | null;
  playerName: string | null;
  players: Pick<Player, 'name' | 'socketId'>[];
  gameState: GameState | null;
  
  // Player zones
  playerHand: Card[];
  playerLibrary: Card[];
  playerGraveyard: Card[];
  playerBattlefield: Card[];
  playerExile: Card[];
  
  // Deck state
  currentDeck: Deck | null;
  deckImporting: boolean;
  
  // UI state
  currentScreen: 'connection' | 'game' | 'loading';
  statusMessage: { message: string; type: 'info' | 'success' | 'error' } | null;
  isJoiningRoom: boolean;
  gameReady: boolean;
  
  // Chat
  chatMessages: ChatMessage[];
  
  // Actions
  setSocket: (socket: Socket | null) => void;
  setConnected: (connected: boolean) => void;
  setSelfSocketId: (socketId: string | null) => void;
  setCurrentRoom: (roomId: string | null) => void;
  setPlayerName: (name: string | null) => void;
  setPlayers: (players: Pick<Player, 'name' | 'socketId'>[]) => void;
  setGameState: (gameState: GameState | null) => void;
  setCurrentScreen: (screen: 'connection' | 'game' | 'loading') => void;
  setIsJoiningRoom: (isJoining: boolean) => void;
  setGameReady: (ready: boolean) => void;
  setStatusMessage: (message: string, type: 'info' | 'success' | 'error') => void;
  clearStatusMessage: () => void;
  addChatMessage: (message: ChatMessage) => void;
  addPlayer: (player: Pick<Player, 'name' | 'socketId'>) => void;
  removePlayer: (socketId: string) => void;
  
  // Player zone actions
  setPlayerHand: (cards: Card[]) => void;
  setPlayerLibrary: (cards: Card[]) => void;
  setPlayerGraveyard: (cards: Card[]) => void;
  setPlayerBattlefield: (cards: Card[]) => void;
  setPlayerExile: (cards: Card[]) => void;
  
  // Deck actions
  setCurrentDeck: (deck: Deck | null) => void;
  setDeckImporting: (importing: boolean) => void;
  importDeckFromMoxfield: (deckUrl: string) => void;
  drawCardFromDeck: () => void;
  drawInitialHand: (count?: number) => void;
  shuffleLibrary: () => void;
  
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
      selfSocketId: null,
      currentRoom: null,
      playerName: null,
      players: [],
      gameState: null,
      currentScreen: 'connection',
      statusMessage: null,
      chatMessages: [],
      currentDeck: null,
      deckImporting: false,
      isJoiningRoom: false,
      gameReady: false,
      
      // Player zones initial state
      playerHand: [],
      playerLibrary: [],
      playerGraveyard: [],
      playerBattlefield: [],
      playerExile: [],
      
      // Basic setters
      setSocket: (socket) => set({ socket }),
      setConnected: (connected) => set({ connected }),
      setSelfSocketId: (selfSocketId) => set({ selfSocketId }),
      setCurrentRoom: (currentRoom) => set({ currentRoom }),
      setPlayerName: (playerName) => set({ playerName }),
      setPlayers: (players) => set({ players }),
      setGameState: (gameState) => set({ gameState }),
      setCurrentScreen: (currentScreen) => set({ currentScreen }),
      setIsJoiningRoom: (isJoiningRoom: boolean) => set({ isJoiningRoom }),
      setGameReady: (gameReady: boolean) => set({ gameReady }),
      
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
      
      // Player zone actions
      setPlayerHand: (playerHand) => set({ playerHand }),
      setPlayerLibrary: (playerLibrary) => set({ playerLibrary }),
      setPlayerGraveyard: (playerGraveyard) => set({ playerGraveyard }),
      setPlayerBattlefield: (playerBattlefield) => set({ playerBattlefield }),
      setPlayerExile: (playerExile) => set({ playerExile }),
      
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

      drawCardFromDeck: () => {
        const state = get();
        const { socket, currentRoom, playerLibrary, playerHand } = state;
        
        // Check if there are cards in the library
        if (playerLibrary.length === 0) {
          get().setStatusMessage('No cards left in library!', 'error');
          return;
        }
        
        // Take the top card from the library
        const drawnCard = { ...playerLibrary[0] };
        drawnCard.faceDown = false; // Reveal the card when drawn
        
        // Update local state immediately
        const newLibrary = playerLibrary.slice(1);
        const newHand = [...playerHand, drawnCard];
        
        set({
          playerLibrary: newLibrary,
          playerHand: newHand
        });
        
        // Show feedback to player
        get().setStatusMessage(`Drew "${drawnCard.name}" from deck`, 'success');
        
        // Send to server for multiplayer sync (if needed)
        if (socket && currentRoom) {
          socket.emit('draw-card', { 
            roomId: currentRoom,
            cardId: drawnCard.id,
            cardName: drawnCard.name 
          });
        }
      },
      
      drawInitialHand: (count = 7) => {
        const state = get();
        const { playerLibrary, playerHand } = state;
        
        if (playerLibrary.length < count) {
          get().setStatusMessage(`Not enough cards in library to draw ${count} cards!`, 'error');
          return;
        }
        
        // Draw the specified number of cards
        const drawnCards = playerLibrary.slice(0, count).map(card => ({
          ...card,
          faceDown: false // Reveal cards in hand
        }));
        
        const newLibrary = playerLibrary.slice(count);
        const newHand = [...playerHand, ...drawnCards];
        
        set({
          playerLibrary: newLibrary,
          playerHand: newHand
        });
        
        get().setStatusMessage(`Drew initial hand of ${count} cards`, 'success');
      },
      
      shuffleLibrary: () => {
        const { playerLibrary } = get();
        const shuffledLibrary = [...playerLibrary].sort(() => Math.random() - 0.5);
        
        set({ playerLibrary: shuffledLibrary });
        get().setStatusMessage('Library shuffled', 'info');
      },
      
      // Game actions
      joinRoom: (roomId, playerName) => {
        const { socket } = get();
        if (socket) {
          socket.emit('join-room', roomId, playerName);
        }
      },
      
      moveCard: (cardId, from, to, position) => {
        const { socket, currentRoom, selfSocketId } = get();
        
        // Update local state immediately for better UX
        const state = get();
        const sourceZone = from === 'hand' ? 'playerHand' : 
                          from === 'battlefield' ? 'playerBattlefield' : 
                          from === 'graveyard' ? 'playerGraveyard' : 
                          from === 'exile' ? 'playerExile' :
                          from === 'library' ? 'playerLibrary' : null;
                          
        const targetZone = to === 'hand' ? 'playerHand' : 
                          to === 'battlefield' ? 'playerBattlefield' : 
                          to === 'graveyard' ? 'playerGraveyard' : 
                          to === 'exile' ? 'playerExile' :
                          to === 'library' ? 'playerLibrary' : null;
        
        if (sourceZone && targetZone) {
          const sourceCards = state[sourceZone as keyof typeof state] as Card[];
          const targetCards = state[targetZone as keyof typeof state] as Card[];
          
          const cardIndex = sourceCards.findIndex(card => card.id === cardId);
          if (cardIndex >= 0) {
            const card = { ...sourceCards[cardIndex] };
            const newSourceCards = [...sourceCards];
            newSourceCards.splice(cardIndex, 1);
            
            // Handle library placement (top vs bottom)
            let newTargetCards = [...targetCards];
            if (to === 'library') {
              card.faceDown = true; // Cards going to library are face down
              if (position === 0) {
                newTargetCards.unshift(card); // Add to top
              } else {
                newTargetCards.push(card); // Add to bottom (default)
              }
            } else {
              if (from === 'library') {
                card.faceDown = false; // Cards leaving library are revealed
              }
              newTargetCards.push(card); // Add to end for other zones
            }
            
            set({
              [sourceZone]: newSourceCards,
              [targetZone]: newTargetCards
            });
          }
        }
        
        // Send to server
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