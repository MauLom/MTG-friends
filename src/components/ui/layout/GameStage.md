# GameStage Component

A responsive 3-row grid layout component for game stage UI, built with Mantine Grid/Stack/Container.

## Features

- **3-Row Layout Structure:**
  - Row 1: `info` | `onTurn` | `actions` (center prioritized on mobile)
  - Row 2: `prevLeft` | `hudCenter` | `prevRight` (evenly distributed)
  - Row 3: `self` (full width)
- **Responsive Design:** Adapts to different screen sizes with proper content ordering
- **Overflow Handling:** Each panel manages overflow independently
- **Flexible Props:** All areas accept React nodes for slotting existing components

## Usage

```tsx
import { GameStage } from '@/components/ui';

function MyGame() {
  return (
    <GameStage
      info={<MyInfoPanel />}
      onTurn={<TurnTracker />}
      actions={<ActionButtons />}
      prevLeft={<OpponentLeft />}
      hudCenter={<Battlefield />}
      prevRight={<OpponentRight />}
      self={<PlayerZone />}
    />
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `info` | `React.ReactNode` | Info panel content (Row 1, left on desktop) |
| `onTurn` | `React.ReactNode` | Turn tracker content (Row 1, center - prioritized) |
| `actions` | `React.ReactNode` | Actions panel content (Row 1, right on desktop) |
| `prevLeft` | `React.ReactNode` | Previous/opponent left content (Row 2, left) |
| `hudCenter` | `React.ReactNode` | HUD center content (Row 2, center) |
| `prevRight` | `React.ReactNode` | Previous/opponent right content (Row 2, right) |
| `self` | `React.ReactNode` | Self player zone content (Row 3, full width) |
| `className` | `string` | Additional CSS classes |

## Responsive Behavior

- **Desktop (≥768px):** 
  - Row 1: 3 columns (25% | 50% | 25%) - info | onTurn | actions
  - Row 2: 3 equal columns (33% each) - prevLeft | hudCenter | prevRight
  - Row 3: Full width - self
  
- **Tablet (640px-767px):**
  - Row 1: 2 columns + full width - onTurn (full width) → actions | info (two columns)
  - Row 2: Stacked vertically - hudCenter → prevLeft → prevRight
  - Row 3: Full width - self

- **Mobile (<640px):**
  - Single-column ordered stack: hudCenter → onTurn → actions → self → prevLeft → prevRight → info
  - All hit areas ≥44px minimum
  - No horizontal overflow

### Accessibility Features
- Minimum touch target size of 44px for all interactive elements
- Horizontal overflow prevention on all breakpoints
- Semantic ordering prioritizes game state visibility on mobile

## Notes

- All panels include placeholder content when no props are provided
- Overflow is handled with `overflow-auto` on each panel
- Built with Mantine components for consistency
- No business logic - purely structural scaffold
