# Panel Shell Components

This directory contains shell components for each zone in the game layout, built using Mantine primitives.

## Components

### InfoPanel
- **Location**: Row 1 - Left
- **Purpose**: Display game information
- **Props**: `className`

### OnTurnBoard
- **Location**: Row 1 - Middle
- **Purpose**: Turn tracking display
- **Props**: `className`

### ActionsPanel
- **Location**: Row 1 - Right
- **Purpose**: Game actions and controls
- **Props**: `className`

### PreviewBoard
- **Location**: Row 2 - Sides (left and right)
- **Purpose**: Preview opponent/player boards
- **Props**: 
  - `position?: 'left' | 'right'` - Specifies which side
  - `className`

### HudCenter
- **Location**: Row 2 - Middle
- **Purpose**: Central HUD/battlefield display
- **Props**: `className`

### SelfBoard
- **Location**: Row 3 - Full width
- **Purpose**: Current player's board
- **Props**: `className`

## Usage

All components are exported from `@/components/ui` for convenience:

```tsx
import { 
  InfoPanel,
  OnTurnBoard,
  ActionsPanel,
  PreviewBoard,
  HudCenter,
  SelfBoard,
  GameStage
} from '@/components/ui';

function MyGameLayout() {
  return (
    <GameStage
      info={<InfoPanel />}
      onTurn={<OnTurnBoard />}
      actions={<ActionsPanel />}
      prevLeft={<PreviewBoard position="left" />}
      hudCenter={<HudCenter />}
      prevRight={<PreviewBoard position="right" />}
      self={<SelfBoard />}
    />
  );
}
```

## Design

- **Framework**: Built with Mantine primitives (Card, Box, Text, Center)
- **Styling**: Uses the custom Card component with 'glass' variant
- **Layout**: No business logic - purely structural shells
- **Extensibility**: All components accept `className` and other HTML div attributes

## Notes

- These are shell components with no game logic
- Content is placeholder text for visual structure
- Designed to be replaced or extended with actual game components
- See `GameStage.example.tsx` for integration examples
