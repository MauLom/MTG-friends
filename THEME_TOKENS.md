# Theme Tokens Documentation

This document describes the custom CSS variables and design tokens used for the tabletop aesthetic theme.

## Tabletop Theme Overview

The MTG Friends application uses a dark, immersive tabletop aesthetic with subtle reflections, soft depth, and glow effects to create an authentic gaming experience.

## CSS Custom Properties

### Surface Colors

Define the base background gradients and surface colors for the tabletop theme.

| Token | Value | Usage |
|-------|-------|-------|
| `--tabletop-bg-start` | `#0f1419` | Start color for main background gradient |
| `--tabletop-bg-end` | `#1a1f2e` | End color for main background gradient |
| `--tabletop-surface` | `rgba(20, 25, 35, 0.85)` | Semi-transparent surface overlay |

**Example:**
```css
background: linear-gradient(135deg, var(--tabletop-bg-start), var(--tabletop-bg-end));
```

### Glow Colors

Glow effects for interactive elements and active states.

| Token | Value | Usage |
|-------|-------|-------|
| `--glow-primary` | `rgba(102, 126, 234, 0.4)` | Primary glow effect (40% opacity) |
| `--glow-primary-strong` | `rgba(102, 126, 234, 0.6)` | Stronger primary glow (60% opacity) |
| `--glow-accent` | `rgba(139, 92, 246, 0.3)` | Accent glow effect (30% opacity) |

**Example:**
```css
box-shadow: 0 0 20px var(--glow-primary);
```

### Shadow Depths

Progressive shadow depths for creating visual hierarchy.

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-soft` | `0 2px 8px rgba(0, 0, 0, 0.15)` | Subtle elevation for smaller elements |
| `--shadow-medium` | `0 4px 16px rgba(0, 0, 0, 0.25)` | Medium elevation for cards |
| `--shadow-deep` | `0 8px 24px rgba(0, 0, 0, 0.35)` | Deep shadow for elevated modals |

**Example:**
```css
box-shadow: var(--shadow-medium);
```

### Card Wrapper Shadows

Special shadows for card components that include glow effects on hover.

| Token | Value | Usage |
|-------|-------|-------|
| `--card-shadow-idle` | `0 4px 12px rgba(0, 0, 0, 0.3)` | Default card shadow in idle state |
| `--card-shadow-hover` | `0 8px 24px rgba(0, 0, 0, 0.4), 0 0 20px var(--glow-primary)` | Enhanced shadow with glow on hover |

**Example:**
```css
.card {
  box-shadow: var(--card-shadow-idle);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: var(--card-shadow-hover);
}
```

### Reflection Gradient

Subtle reflection overlay for glass-effect surfaces.

| Token | Value | Usage |
|-------|-------|-------|
| `--reflection-gradient` | `linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(0, 0, 0, 0.05) 100%)` | Creates subtle top-to-bottom reflection |

**Example:**
```css
.glass::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--reflection-gradient);
  pointer-events: none;
}
```

## Utility Classes

### Glass Effects

Pre-built glass-effect utilities with built-in reflections.

| Class | Description |
|-------|-------------|
| `.glass-light` | Light glass effect with 10% opacity and subtle reflection |
| `.glass-medium` | Medium glass effect with 20% opacity and subtle reflection |
| `.glass-dark` | Dark glass effect with 30% opacity, no reflection |

**Usage:**
```tsx
<div className="glass-light rounded-lg p-4">
  Content with glass effect
</div>
```

### Tabletop Card

Enhanced card wrapper with hover effects.

| Class | Description |
|-------|-------------|
| `.tabletop-card` | Adds shadow, hover glow, and slight lift animation (respects reduced motion) |

**Usage:**
```tsx
<div className="tabletop-card rounded-xl p-6">
  Card content
</div>
```

### Glow Pulse Animation

Animated glow pulse for active states (respects reduced motion preferences).

| Class | Description |
|-------|-------------|
| `.glow-pulse` | 2-second infinite pulse animation with glow effects |

**Usage:**
```tsx
<button className="glow-pulse">
  Active Phase
</button>
```

**Behavior:**
- **Normal motion**: Smooth 2s pulse animation with varying glow intensity
- **Reduced motion**: Static glow without animation

## Accessibility

### Reduced Motion Support

All animations respect the `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  /* Animations are disabled or simplified */
  .glow-pulse {
    /* Shows static glow without animation */
    box-shadow: 0 0 15px var(--glow-primary);
  }
  
  .tabletop-card:hover {
    /* No transform, only shadow change */
    box-shadow: var(--card-shadow-hover);
  }
}
```

### Tailwind Motion Utilities

Use Tailwind's motion-safe and motion-reduce variants:

```tsx
{/* Animate only when motion is safe */}
<div className="motion-safe:animate-ping" />

{/* Alternative style when motion is reduced */}
<div className="motion-reduce:opacity-100 motion-safe:animate-fade-in" />
```

## Component Integration

### Card Component

The `Card` component from `@/components/ui/layout/Card.tsx` automatically applies:
- Variant-specific shadows (`--card-shadow-idle`)
- Tabletop card hover effects (`.tabletop-card` class)
- Subtle reflections for glass variants

**Example:**
```tsx
import { Card } from '@/components/ui';

<Card variant="glass" padding="md">
  {/* Content automatically gets tabletop styling */}
</Card>
```

### TurnTracker Component

The `TurnTracker` component uses:
- `.glow-pulse` for active phase indicators
- `motion-safe:animate-ping` for turn indicator
- Reduced motion-aware hover effects

**Example:**
```tsx
<Button className="glow-pulse">
  Active Phase
</Button>
```

## Design Principles

### Consistent Tone
- All shadows use consistent black with varying opacity (15%, 25%, 35%)
- All glows use primary brand color (`--glow-primary`) for unity
- Reflections are subtle (2-5% white/black opacity)

### Soft Depth
- Use progressive shadow depths (`soft`, `medium`, `deep`)
- Combine shadows with slight transforms for elevation
- Avoid harsh edges with generous border-radius

### Subtle Reflections
- Glass surfaces have top-to-bottom gradient overlays
- Reflections are barely visible (2-5% opacity)
- Always use `pointer-events: none` on reflection overlays

### Performance
- CSS custom properties for easy theme switching
- Hardware-accelerated transforms and opacity
- Minimal repaints with `will-change` where needed

## Migration Guide

### From Old Shadow System

**Before:**
```css
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
```

**After:**
```css
box-shadow: var(--shadow-medium);
```

### From Inline Styles

**Before:**
```tsx
<div style={{ boxShadow: '0 0 20px rgba(102, 126, 234, 0.4)' }}>
```

**After:**
```tsx
<div className="tabletop-card">
```

### Adding Custom Glow

**Before:**
```tsx
<div className="shadow-lg shadow-primary-400/25">
```

**After:**
```tsx
<div className="glow-pulse">
```

## Browser Support

All CSS custom properties and features are supported in:
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 15+

For older browsers, fallbacks are provided in the theme configuration.
