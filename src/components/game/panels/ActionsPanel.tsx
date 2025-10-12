'use client';

import React from 'react';
import { Group, ActionIcon, Tooltip } from '@mantine/core';
import { 
  Undo2, 
  Play, 
  Settings, 
  Flag, 
  HelpCircle 
} from 'lucide-react';
import { Card, Button } from '@/components/ui';

export interface ActionsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * ActionsPanel - Shell component for game actions
 * Row 1 - Right position
 * 
 * Features:
 * - Back/Undo button (Ctrl+Z)
 * - Next Phase button (Space)
 * - Settings button (S)
 * - Concede button (Alt+C)
 * - Help button (?)
 * 
 * No logic implemented - purely structural with disabled states
 */
export default function ActionsPanel({ className, ...props }: ActionsPanelProps) {
  // Placeholder state for phase readiness
  // In real implementation, this would come from game state
  const isPhaseReady = false;
  
  return (
    <Card 
      variant="glass" 
      padding="md" 
      className={className}
      role="region"
      aria-label="Game Actions"
      {...props}
    >
      <Group gap="md" justify="space-between">
        {/* Back/Undo Action */}
        <Tooltip 
          label="Undo last action (Ctrl+Z)" 
          position="bottom"
          withArrow
        >
          <ActionIcon
            variant="light"
            color="gray"
            size="lg"
            disabled
            aria-label="Undo last action"
          >
            <Undo2 size={20} />
          </ActionIcon>
        </Tooltip>

        {/* Next Phase Button */}
        <Tooltip 
          label="Advance to next phase (Space)" 
          position="bottom"
          withArrow
        >
          <div>
            <Button
              variant="primary"
              size="sm"
              disabled={!isPhaseReady}
              aria-label="Next phase"
            >
              <Group gap="xs">
                <Play size={16} />
                <span>Next Phase</span>
              </Group>
            </Button>
          </div>
        </Tooltip>

        {/* Action Icons Group */}
        <Group gap="xs">
          {/* Settings */}
          <Tooltip 
            label="Open settings (S)" 
            position="bottom"
            withArrow
          >
            <ActionIcon
              variant="light"
              color="blue"
              size="lg"
              disabled
              aria-label="Settings"
            >
              <Settings size={20} />
            </ActionIcon>
          </Tooltip>

          {/* Concede */}
          <Tooltip 
            label="Concede game (Alt+C)" 
            position="bottom"
            withArrow
          >
            <ActionIcon
              variant="light"
              color="red"
              size="lg"
              disabled
              aria-label="Concede game"
            >
              <Flag size={20} />
            </ActionIcon>
          </Tooltip>

          {/* Help */}
          <Tooltip 
            label="Show help (?)" 
            position="bottom"
            withArrow
          >
            <ActionIcon
              variant="light"
              color="cyan"
              size="lg"
              disabled
              aria-label="Help"
            >
              <HelpCircle size={20} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </Card>
  );
}
