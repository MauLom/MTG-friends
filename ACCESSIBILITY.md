# Accessibility Implementation

This document describes the accessibility features implemented in the MTG Friends application.

## WCAG 2.1 Level AA Compliance

### Keyboard Navigation

All interactive elements are accessible via keyboard:
- **Tab**: Navigate forward through interactive elements
- **Shift+Tab**: Navigate backward through interactive elements
- **Enter/Space**: Activate buttons and links
- **Arrow keys**: Navigate within grouped elements (future implementation)

### Skip Links

Skip links allow keyboard users to bypass repetitive navigation:
- **Skip to HUD**: Jump directly to the main game HUD
- **Skip to Self**: Jump to the player's own board
- **Skip to Controls**: Jump to game controls

Skip links are:
- Hidden by default
- Visible when focused (Tab key)
- Styled with high contrast (white text on purple background #667eea)
- Positioned at the top of the page

### Focus Indicators

All focusable elements have visible focus indicators:
- **Focus ring**: 3px solid outline in primary color (#818cf8)
- **Outline offset**: 2px for better visibility
- **Focus style**: Applied via `:focus-visible` pseudo-class
- **Contrast ratio**: Meets WCAG AA requirements (>3:1)

### ARIA Landmarks and Regions

#### GameStage Component
- **main**: Main game battlefield area (`role="main"`)
- **navigation**: Game controls section (`role="navigation"`)
- **complementary**: Previous player boards (`role="complementary"`)
- **region**: Self player board (`role="region"`)

#### HudCenter Component
- **region "HUD Center"**: Main HUD container
- **status "Current turn phase"**: Turn phase indicator
- **region "Player life totals"**: Life totals grid
- **status**: Each player's life total card
- **timer "Game timer"**: Timer display
- **region "Dice tray"**: Dice controls and history
- **group "Dice controls"**: Dice buttons
- **log "Dice roll history"**: Dice roll history

#### Board Components
- **OnTurnBoard**: `role="region"` with `aria-label="On-Turn Board"`
- **SelfBoard**: `role="region"` with `aria-label="Self Board"`

### ARIA Labels

All interactive elements have descriptive ARIA labels:
- Buttons: Clear action descriptions (e.g., "Pass turn (currently disabled)")
- Badges: Phase indicators with screen reader text
- Player cards: Life total announcements (e.g., "Player 1 has 40 life")
- Timer: Readable time format

### Color Contrast

#### Primary Colors (Mantine Theme)
- primary-4: `#818cf8` - Focus indicators, links
- primary-6: `#667eea` - Skip link backgrounds, active states

#### Contrast Ratios
- **Focus indicators**: 3px solid `#818cf8` on dark backgrounds (>3:1)
- **Skip links**: White text on `#667eea` background (>4.5:1)
- **Text**: White/light text on dark backgrounds (>7:1)
- **Interactive elements**: Meet WCAG AA requirements

## Testing

### Manual Testing Checklist

- [x] Tab through all interactive elements
- [x] Skip links appear on focus
- [x] Skip links navigate to correct sections
- [x] Focus indicators are visible
- [x] ARIA labels are meaningful
- [x] Keyboard navigation follows logical order
- [x] All regions are properly labeled

### Automated Testing Tools

Recommended tools for testing:
- **axe DevTools**: Browser extension for accessibility testing
- **WAVE**: Web accessibility evaluation tool
- **Screen readers**: NVDA (Windows), JAWS (Windows), VoiceOver (macOS)

### Screen Reader Testing

The application has been structured to work with screen readers:
- Semantic HTML elements
- ARIA landmarks for page regions
- ARIA labels for complex controls
- Live regions for dynamic updates (future implementation)

## Future Enhancements

- [ ] Add live regions for game state updates
- [ ] Implement keyboard shortcuts for common actions
- [ ] Add high contrast mode toggle
- [ ] Add reduced motion preferences support (partially implemented)
- [ ] Implement focus trap for modals
- [ ] Add more descriptive error messages
- [ ] Implement keyboard navigation for card selection

## Browser Support

Focus indicators and ARIA features work in:
- Chrome/Edge 88+
- Firefox 78+
- Safari 14+

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Mantine Accessibility](https://mantine.dev/guides/accessibility/)
