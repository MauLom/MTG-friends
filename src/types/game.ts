export interface Card {
  id: string;
  name: string;
  faceDown?: boolean;
}

export interface Player {
  socketId: string;
  name: string;
  hand: Card[];
  library: Card[];
  graveyard: Card[];
  battlefield: Card[];
  deck?: Deck;
}

export interface Deck {
  name: string;
  cards: DeckCard[];
}

export interface DeckCard {
  name: string;
  quantity: number;
}

export interface GameState {
  phase: 'waiting' | 'playing' | 'ended';
  cards: Card[];
  boardState: Record<string, any>;
}

export interface GameRoom {
  id: string;
  players: Player[];
  gameState: GameState;
}

export interface CardMovement {
  playerId: string;
  cardId: string;
  from: string;
  to: string;
  position?: number;
}

export interface ChatMessage {
  playerName: string;
  message: string;
  timestamp: Date;
}

export interface SocketEvents {
  // Client to Server
  'join-room': (roomId: string, playerName: string) => void;
  'move-card': (data: CardMovement & { roomId: string }) => void;
  'send-chat': (roomId: string, message: string) => void;
  'import-deck': (data: { roomId: string; deckUrl: string }) => void;
  
  // Server to Client
  'room-joined': (data: { roomId: string; players: Pick<Player, 'name' | 'socketId'>[]; gameState: GameState }) => void;
  'player-joined': (data: { name: string; socketId: string }) => void;
  'player-left': (data: { name: string; socketId: string }) => void;
  'card-moved': (data: CardMovement) => void;
  'chat-message': (data: { playerName: string; message: string }) => void;
  'deck-imported': (data: { deck: Deck }) => void;
  'deck-import-error': (data: { error: string }) => void;
  'connect': () => void;
  'disconnect': () => void;
}