# Seating & Placement Selectors Implementation Summary

## Overview

This implementation adds a comprehensive seating and placement selector system to the MTG Friends application. The selectors provide deterministic player mapping based on turn order, supporting 1-6 players and various edge cases.

## Files Changed

### Core Implementation

1. **`src/types/game.ts`**
   - Added `currentTurnIndex?: number` to GameState
   - Added `turnOrder?: string[]` to GameState
   - These fields enable turn tracking across the application

2. **`src/lib/store.ts`**
   - Added `selfSocketId: string | null` to track current player
   - Added `setSelfSocketId` action
   - Exported all selector functions and types for easy access

3. **`src/lib/selectors.ts`** (NEW)
   - Created four main selectors:
     - `selectOnTurnPlayer()` - Returns player whose turn it is
     - `selectPreviousTurnPlayer()` - Returns previous turn player
     - `selectPreviewSides()` - Returns left/right players (previous/next in turn order)
     - `selectSelfPlayer()` - Returns current player (self)
   - Created React hooks for each selector:
     - `useOnTurnPlayer()`
     - `usePreviousTurnPlayer()`
     - `usePreviewSides()`
     - `useSelfPlayer()`
   - All selectors use proper Zustand patterns with internal functions

4. **`src/hooks/useSocket.ts`**
   - Updated to set `selfSocketId` on socket connect
   - Clears `selfSocketId` on socket disconnect
   - Added `setSelfSocketId` to dependency array

### Documentation & Examples

5. **`docs/SELECTORS.md`** (NEW)
   - Comprehensive documentation for all selectors
   - Usage examples for both direct selectors and hooks
   - Type definitions and edge case descriptions

6. **`src/components/game/SeatingExample.tsx`** (NEW)
   - Example React component demonstrating selector usage
   - Shows proper implementation patterns

## Features Implemented

✅ **Deterministic Mapping**: Turn order defines player positions
✅ **1-6 Players**: Works correctly with any number of players
✅ **Reconnection Support**: Uses socketId for persistent player identity
✅ **Spectator Mode**: Returns null when no self player (spectating)
✅ **Empty Placeholders**: Returns null when positions are unassigned
✅ **Turn Wrapping**: Correctly handles first→last and last→first transitions
✅ **Reactive Updates**: Automatically updates when turn changes via Zustand

## Edge Cases Handled

1. **No Game State**: All selectors return null or empty results
2. **Single Player**: Preview sides both return the same player
3. **Index 0 Bug**: Correctly handles currentTurnIndex === 0 (was falsy check)
4. **Undefined vs Null**: Proper handling with ?? operator
5. **Missing Players**: Returns null if player not in players array
6. **Reconnection**: Automatically works when player rejoins with same socketId

## Testing

Validated with comprehensive test scenarios:
- No game state (spectator mode)
- 2 players
- 4 players  
- 6 players
- Turn wrapping (last player → first player)
- Spectator mode (no selfSocketId)
- All edge cases

Build passes without errors.

## Usage Examples

### Using Selectors Directly
```typescript
import { selectOnTurnPlayer } from '@/lib/store';

const currentPlayer = selectOnTurnPlayer();
console.log(currentPlayer?.name);
```

### Using React Hooks
```tsx
import { useOnTurnPlayer, useSelfPlayer } from '@/lib/store';

function TurnIndicator() {
  const onTurnPlayer = useOnTurnPlayer();
  const selfPlayer = useSelfPlayer();
  
  const isMyTurn = onTurnPlayer?.socketId === selfPlayer?.socketId;
  
  return (
    <div>
      {isMyTurn ? "Your turn!" : `${onTurnPlayer?.name}'s turn`}
    </div>
  );
}
```

## Architecture Decisions

1. **Separate Selector Module**: Keeps store clean and selectors organized
2. **Internal + Public Pattern**: Internal functions take state parameter for Zustand compatibility
3. **Type Safety**: All selectors are fully typed with SeatedPlayer and PreviewSides types
4. **Null Convention**: Return null for empty/missing values (not undefined)
5. **Socket-based Identity**: Uses socketId instead of player name for reliable identification

## Future Enhancements

The implementation provides a foundation for:
- Visual seating arrangements in the UI
- Turn order visualization
- Player positioning logic
- Spectator views
- Multi-player game layouts

## Dependencies

No new dependencies added. Uses existing:
- Zustand (state management)
- TypeScript (type safety)
- Socket.io-client (player identity)
