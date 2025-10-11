# Component Migration Guide: Framework Normalization (Mantine-first)

## Overview

This document outlines the framework normalization effort to standardize the UI stack around Mantine. The goal is to create a consistent, maintainable UI layer that leverages Mantine components while keeping Tailwind utility classes where they provide value.

## Key Changes

### 1. Theme Configuration
- **Old Location**: `src/lib/theme.ts`
- **New Location**: `src/theme/mantineTheme.ts`
- **Changes**: Enhanced theme with comprehensive color palette, spacing, and component defaults
- **Backward Compatibility**: Old import path maintained with deprecation notice

### 2. UI Provider
- **Old Location**: `src/components/providers/MantineProvider.tsx`
- **New Location**: `src/app/providers/UiProvider.tsx`
- **Changes**: Centralized provider with better documentation and consistent naming
- **Backward Compatibility**: Old import path maintained with deprecation notice

### 3. Component Structure
All UI components in `src/components/ui/` already use Mantine as their base:
- ✅ **Button** → Uses `@mantine/core` Button with custom variants
- ✅ **Card** → Uses `@mantine/core` Paper with glass morphism
- ✅ **Badge** → Uses `@mantine/core` Badge with custom color mapping
- ✅ **Input** → Uses `@mantine/core` TextInput with glass variants

## Mantine Component Coverage

### Currently Implemented
- [x] Button (with gradient and glass variants)
- [x] Card/Paper (with glass morphism)
- [x] Badge (with custom color palette)
- [x] TextInput (with glass effect)
- [x] Notifications (global notification system)

### Available But Not Yet Wrapped
The following Mantine components are available and can be imported directly:
- Modal - `import { Modal } from '@mantine/core'`
- Drawer - `import { Drawer } from '@mantine/core'`
- Select - `import { Select } from '@mantine/core'`
- MultiSelect - `import { MultiSelect } from '@mantine/core'`
- Textarea - `import { Textarea } from '@mantine/core'`
- NumberInput - `import { NumberInput } from '@mantine/core'`
- Switch - `import { Switch } from '@mantine/core'`
- Checkbox - `import { Checkbox } from '@mantine/core'`
- Radio - `import { Radio } from '@mantine/core'`
- Tabs - `import { Tabs } from '@mantine/core'`
- Menu - `import { Menu } from '@mantine/core'`
- Popover - `import { Popover } from '@mantine/core'`
- Tooltip - `import { Tooltip } from '@mantine/core'`
- Accordion - `import { Accordion } from '@mantine/core'`
- Table - `import { Table } from '@mantine/core'`
- Pagination - `import { Pagination } from '@mantine/core'`

### Not Using Mantine
- **No shadcn/ui components** - Project does not use shadcn/ui despite having components.json
- **Tailwind utilities** - Used for spacing, layout, and custom styling (acceptable pattern)

## Tailwind Usage Guidelines

### ✅ Acceptable Uses
- Spacing utilities: `p-4`, `m-2`, `gap-4`, `space-y-2`
- Layout utilities: `flex`, `grid`, `items-center`, `justify-between`
- Sizing: `w-full`, `h-screen`, `max-w-md`
- Display: `hidden`, `block`, `inline-flex`
- Position: `absolute`, `relative`, `fixed`
- Overflow: `overflow-hidden`, `overflow-auto`
- Animations: `transition-all`, `duration-300`, `hover:scale-105`

### ⚠️ Use Mantine Instead
- Colors → Use Mantine color props: `color="primary"`, `bg="dark.8"`
- Borders → Use Mantine component props: `withBorder`, `borderRadius`
- Shadows → Use Mantine shadow prop: `shadow="md"`
- Typography → Use Mantine Text/Title components
- Buttons/Inputs → Use Mantine components with variants
- Cards → Use Mantine Paper/Card components

## Migration Examples

### Example 1: Button Migration
```tsx
// ❌ Old (Tailwind-only)
<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
  Click Me
</button>

// ✅ New (Mantine with Tailwind utilities)
<Button variant="primary" className="transition-all duration-300">
  Click Me
</Button>
```

### Example 2: Card Migration
```tsx
// ❌ Old (Tailwind-only)
<div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
  Content
</div>

// ✅ New (Mantine Card component)
<Card variant="glass" padding="md">
  Content
</Card>
```

### Example 3: Badge Migration
```tsx
// ❌ Old (Tailwind-only)
<span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
  New
</span>

// ✅ New (Mantine Badge)
<Badge variant="primary" size="sm">
  New
</Badge>
```

## Component Replacement Summary

| Component Type | Old Approach | New Approach | Status |
|---------------|--------------|--------------|---------|
| Buttons | Tailwind classes | Mantine Button wrapper | ✅ Complete |
| Cards | Tailwind classes | Mantine Paper/Card | ✅ Complete |
| Badges | Tailwind classes | Mantine Badge | ✅ Complete |
| Inputs | Tailwind classes | Mantine TextInput | ✅ Complete |
| Modals | Not implemented | Use Mantine Modal | 📋 Available |
| Drawers | Not implemented | Use Mantine Drawer | 📋 Available |
| Notifications | Not implemented | Mantine Notifications | ✅ Configured |

## Theme Customization

The new theme (`src/theme/mantineTheme.ts`) includes:

### Color Palette
- **Primary**: Purple/Indigo gradient (#667eea)
- **Secondary**: Pink/Purple gradient (#d946ef)
- **Success**: Green shades
- **Warning**: Yellow/Amber shades
- **Error**: Red shades

### Typography
- Font Family: System font stack (Apple System, Segoe UI, Roboto)
- Monospace: UI Monospace stack

### Spacing & Layout
- Default Radius: `md`
- Shadows: xs, sm, md, lg, xl
- Spacing: xs (0.5rem) to xl (2rem)

### Component Defaults
- Buttons: Medium radius, smooth transitions
- Cards/Paper: Extra-large radius, medium shadow
- Inputs: Large radius
- Badges: Extra-large radius, light variant
- Modals: Large radius, centered, extra-large shadow
- Drawers: Medium radius, extra-large shadow

## How to Use

### Importing the Theme
```typescript
// Direct import (recommended)
import { mantineTheme } from '@/theme/mantineTheme';

// Legacy import (deprecated but supported)
import { theme } from '@/lib/theme'; // Re-exports mantineTheme
```

### Using the Provider
```tsx
// New approach (recommended)
import { UiProvider } from '@/app/providers/UiProvider';

<UiProvider>
  <App />
</UiProvider>

// Legacy approach (deprecated but supported)
import { MantineProvider } from '@/components/providers/MantineProvider';

<MantineProvider>
  <App />
</MantineProvider>
```

### Using Mantine Components
```tsx
import { Button, Card, Badge, Modal, Drawer } from '@mantine/core';
// Or use custom wrappers
import { Button, Card, Badge } from '@/components/ui';

// Components automatically inherit theme settings
<Button color="primary">Primary Button</Button>
<Card shadow="lg" p="xl">Card Content</Card>
<Badge color="success">Status</Badge>
```

## Best Practices

1. **Use Mantine components for UI primitives** (Button, Card, Input, Modal, etc.)
2. **Keep Tailwind for utilities** (spacing, layout, positioning)
3. **Leverage the theme** for colors, spacing, shadows instead of hardcoding
4. **Create wrappers** for common patterns (like our glass-effect cards)
5. **Document custom variants** in component files
6. **Use TypeScript** for prop types and better DX

## Files Modified

### Core Files
- ✅ `src/theme/mantineTheme.ts` - New comprehensive theme (created)
- ✅ `src/app/providers/UiProvider.tsx` - New centralized provider (created)
- ✅ `src/app/layout.tsx` - Updated to use UiProvider
- ✅ `src/lib/theme.ts` - Updated to re-export for backward compatibility
- ✅ `src/components/providers/MantineProvider.tsx` - Updated to re-export for backward compatibility

### Component Files (No Changes Needed)
- ✅ `src/components/ui/buttons/Button.tsx` - Already using Mantine
- ✅ `src/components/ui/layout/Card.tsx` - Already using Mantine
- ✅ `src/components/ui/feedback/Badge.tsx` - Already using Mantine
- ✅ `src/components/ui/inputs/Input.tsx` - Already using Mantine
- ✅ `src/components/ui/index.ts` - Export structure maintained

## Testing Checklist

- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors
- [ ] All pages render correctly
- [ ] Theme colors display properly in dark mode
- [ ] Button variants work (primary, secondary, danger, etc.)
- [ ] Card variants work (glass, default, solid)
- [ ] Input variants work (glass, default)
- [ ] Badge colors display correctly
- [ ] Notifications appear correctly
- [ ] Responsive design maintained

## Future Enhancements

1. **Create wrapper components** for Modal and Drawer with glass effect
2. **Add more component variants** (e.g., outline buttons, filled inputs)
3. **Implement light mode** support (currently dark-only)
4. **Create Storybook** documentation for all components
5. **Add animation presets** for common transitions
6. **Consider removing components.json** if shadcn/ui is not being used

## Support

For questions or issues related to the component migration:
- Check Mantine documentation: https://mantine.dev
- Review component examples in `src/components/ui/`
- Refer to theme configuration in `src/theme/mantineTheme.ts`
