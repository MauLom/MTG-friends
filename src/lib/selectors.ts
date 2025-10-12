import { useGameStore } from './store';
import { Player } from '@/types/game';

/**
 * Represents a player in the seating arrangement
 */
export type SeatedPlayer = Pick<Player, 'name' | 'socketId'> | null;

/**
 * Result of preview sides selector
 */
export interface PreviewSides {
  left: SeatedPlayer;
  right: SeatedPlayer;
}

/**
 * Get the player whose turn it currently is
 * @returns The player on turn, or null if no turn is active or player not found
 */
export const selectOnTurnPlayer = (): SeatedPlayer => {
  const state = useGameStore.getState();
  const { gameState, players } = state;

  // No game state or no current turn
  if (!gameState || gameState.currentTurnIndex === undefined || !gameState.turnOrder) {
    return null;
  }

  // Get the socketId from turn order
  const currentSocketId = gameState.turnOrder[gameState.currentTurnIndex];
  if (!currentSocketId) {
    return null;
  }

  // Find the player with this socketId
  const player = players.find(p => p.socketId === currentSocketId);
  return player || null;
};

/**
 * Get the player who had the previous turn
 * @returns The previous turn player, or null if not applicable
 */
export const selectPreviousTurnPlayer = (): SeatedPlayer => {
  const state = useGameStore.getState();
  const { gameState, players } = state;

  // No game state or no turn order
  if (!gameState?.turnOrder || gameState.currentTurnIndex === undefined) {
    return null;
  }

  const turnOrder = gameState.turnOrder;
  const currentIndex = gameState.currentTurnIndex;

  // Calculate previous index (wrapping around)
  const previousIndex = currentIndex === 0 
    ? turnOrder.length - 1 
    : currentIndex - 1;

  // Get the socketId from turn order
  const previousSocketId = turnOrder[previousIndex];
  if (!previousSocketId) {
    return null;
  }

  // Find the player with this socketId
  const player = players.find(p => p.socketId === previousSocketId);
  return player || null;
};

/**
 * Get the players on the left and right sides (previous and next turn players)
 * @returns Object with left (previous turn) and right (next turn) players
 */
export const selectPreviewSides = (): PreviewSides => {
  const state = useGameStore.getState();
  const { gameState, players } = state;

  // Default empty result
  const emptyResult: PreviewSides = { left: null, right: null };

  // No game state or no turn order
  if (!gameState?.turnOrder || gameState.currentTurnIndex === undefined) {
    return emptyResult;
  }

  const turnOrder = gameState.turnOrder;
  const currentIndex = gameState.currentTurnIndex;

  // Need at least 2 players for sides to make sense
  if (turnOrder.length < 2) {
    return emptyResult;
  }

  // Calculate previous (left) and next (right) indices
  const previousIndex = currentIndex === 0 
    ? turnOrder.length - 1 
    : currentIndex - 1;
  
  const nextIndex = currentIndex === turnOrder.length - 1 
    ? 0 
    : currentIndex + 1;

  // Get socketIds
  const leftSocketId = turnOrder[previousIndex];
  const rightSocketId = turnOrder[nextIndex];

  // Find players
  const leftPlayer = leftSocketId 
    ? players.find(p => p.socketId === leftSocketId) || null
    : null;
  
  const rightPlayer = rightSocketId 
    ? players.find(p => p.socketId === rightSocketId) || null
    : null;

  return {
    left: leftPlayer,
    right: rightPlayer
  };
};

/**
 * Get the current player (self)
 * @returns The current player's data, or null if spectating or not connected
 */
export const selectSelfPlayer = (): SeatedPlayer => {
  const state = useGameStore.getState();
  const { selfSocketId, players } = state;

  // No socket ID means spectating or not connected
  if (!selfSocketId) {
    return null;
  }

  // Find self in players list
  const selfPlayer = players.find(p => p.socketId === selfSocketId);
  return selfPlayer || null;
};

/**
 * Hook versions of the selectors for use in React components
 */

export const useOnTurnPlayer = (): SeatedPlayer => {
  return useGameStore(selectOnTurnPlayer);
};

export const usePreviousTurnPlayer = (): SeatedPlayer => {
  return useGameStore(selectPreviousTurnPlayer);
};

export const usePreviewSides = (): PreviewSides => {
  return useGameStore(selectPreviewSides);
};

export const useSelfPlayer = (): SeatedPlayer => {
  return useGameStore(selectSelfPlayer);
};
