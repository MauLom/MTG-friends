/**
 * Shared zone constants for MTG game boards
 * Used by SelfBoard, OnTurnBoard, and other board components
 */

/**
 * Zone types for MTG game boards
 * These correspond to the standard MTG zones
 */
export const ZONES = [
  { id: 'hand', label: 'Hand' },
  { id: 'battlefield', label: 'Battlefield' },
  { id: 'command', label: 'Command' },
  { id: 'graveyard', label: 'Graveyard' },
  { id: 'exile', label: 'Exile' },
] as const;

/**
 * Shared zone styling classes
 * Includes drop-zone class for hover/focus effects
 */
export const ZONE_CLASSES = 'drop-zone p-3 rounded-lg border-2 border-dashed border-white/20 bg-white/5 min-h-[80px] flex items-center justify-center';
