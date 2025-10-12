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
- **Purpose**: Preview opponent/player boards with miniature mode
- **Props**: 
  - `position?: 'left' | 'right'` - Specifies which side
  - `miniature?: boolean` - Enable miniature scaling mode (default: true)
  - `scale?: number` - Scale percentage for miniature mode (default: 0.65 = 65%)
  - `children?: React.ReactNode` - Custom content to display
  - `className`
- **Features**:
  - Miniature scaling (60-75%) using CSS transform
  - Hover to preview at larger scale (+10%)
  - Click/tap to expand to 100% in accessible Modal
  - Smooth transitions with no layout shift
  - Focus trapping in expanded view

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

// PreviewBoard with custom content and miniature mode
function CustomPreview() {
  return (
    <PreviewBoard position="left" scale={0.65}>
      <Stack gap="md" p="lg">
        <Text size="xl" fw={700}>Opponent 1</Text>
        <Group>
          <Badge color="red">Life: 15</Badge>
          <Badge color="blue">Hand: 6</Badge>
        </Group>
        <Text size="sm">Click to expand to full view</Text>
      </Stack>
    </PreviewBoard>
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
