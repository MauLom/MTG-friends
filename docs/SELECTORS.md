# Seating & Placement Selectors

This document describes the seating and placement selectors available in the game store.

## Overview

The seating selectors provide a deterministic way to map players to UI positions based on turn order. They handle various scenarios including:

- 1-6 players
- Player reconnections
- Spectator mode (no self player)
- Empty placeholders when positions are unassigned

## Selectors

### `selectOnTurnPlayer()`

Returns the player whose turn it currently is.

**Returns:** `SeatedPlayer | null`
- `SeatedPlayer` - The player whose turn it is
- `null` - No active turn or player not found

**Example:**
```typescript
import { selectOnTurnPlayer } from '@/lib/store';

const onTurnPlayer = selectOnTurnPlayer();
console.log(onTurnPlayer?.name); // "Alice"
```

---

### `selectPreviousTurnPlayer()`

Returns the player who had the previous turn.

**Returns:** `SeatedPlayer | null`
- `SeatedPlayer` - The player who had the previous turn
- `null` - Not applicable or player not found

**Example:**
```typescript
import { selectPreviousTurnPlayer } from '@/lib/store';

const previousPlayer = selectPreviousTurnPlayer();
console.log(previousPlayer?.name); // "Bob"
```

---

### `selectPreviewSides()`

Returns the players on the left and right sides (previous and next turn players).

**Returns:** `PreviewSides`
```typescript
interface PreviewSides {
  left: SeatedPlayer;   // Previous turn player
  right: SeatedPlayer;  // Next turn player
}
```

- `left` - The player who had the previous turn
- `right` - The player who will have the next turn
- Both can be `null` if not applicable

**Example:**
```typescript
import { selectPreviewSides } from '@/lib/store';

const sides = selectPreviewSides();
console.log(sides.left?.name);  // "Bob"
console.log(sides.right?.name); // "Charlie"
```

---

### `selectSelfPlayer()`

Returns the current player (self).

**Returns:** `SeatedPlayer | null`
- `SeatedPlayer` - The current player's data
- `null` - Spectating or not connected

**Example:**
```typescript
import { selectSelfPlayer } from '@/lib/store';

const selfPlayer = selectSelfPlayer();
if (selfPlayer) {
  console.log(`You are: ${selfPlayer.name}`);
} else {
  console.log('Spectator mode');
}
```

## React Hooks

Each selector has a corresponding React hook that automatically subscribes to store changes:

- `useOnTurnPlayer()`
- `usePreviousTurnPlayer()`
- `usePreviewSides()`
- `useSelfPlayer()`

**Example Component:**
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

## Types

### `SeatedPlayer`

```typescript
type SeatedPlayer = Pick<Player, 'name' | 'socketId'> | null;
```

A seated player contains only the essential information:
- `name` - The player's display name
- `socketId` - The player's unique socket identifier

### `PreviewSides`

```typescript
interface PreviewSides {
  left: SeatedPlayer;
  right: SeatedPlayer;
}
```

## Game State Requirements

For the selectors to work properly, the game state must include:

```typescript
interface GameState {
  currentTurnIndex?: number;  // Index in turnOrder array (0-based)
  turnOrder?: string[];       // Array of socketIds defining turn order
}
```

## Edge Cases Handled

1. **No Game State**: All selectors return `null` or empty results
2. **Single Player**: Preview sides both return the same (only) player
3. **Spectator Mode**: `selectSelfPlayer()` returns `null`
4. **Turn Wrapping**: Handles first/last turn transitions correctly
5. **Missing Players**: Returns `null` if player is not in the players list
6. **Reconnection**: Works automatically when player rejoins with same socketId

## Usage in UI Components

### Example 1: Turn Tracker
```tsx
function TurnTracker() {
  const onTurnPlayer = useOnTurnPlayer();
  
  return (
    <div className="turn-indicator">
      {onTurnPlayer ? (
        <span>Current Turn: {onTurnPlayer.name}</span>
      ) : (
        <span>Waiting for game to start...</span>
      )}
    </div>
  );
}
```

### Example 2: Seating Arrangement
```tsx
function SeatingArrangement() {
  const sides = usePreviewSides();
  const selfPlayer = useSelfPlayer();
  
  return (
    <div className="seating-grid">
      <div className="left-seat">
        {sides.left?.name || "Empty"}
      </div>
      <div className="center-seat">
        {selfPlayer?.name || "Spectator"}
      </div>
      <div className="right-seat">
        {sides.right?.name || "Empty"}
      </div>
    </div>
  );
}
```

## Testing

The selectors have been validated with the following scenarios:

- ✅ No game state (spectator mode)
- ✅ 2 players
- ✅ 4 players
- ✅ 6 players
- ✅ Turn wrapping (last to first)
- ✅ Spectator mode
- ✅ Empty placeholders

See `/tmp/test-selectors.ts` for validation examples.
